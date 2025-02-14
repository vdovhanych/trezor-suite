import fs from 'fs';
import path from 'path';
import openpgp from 'openpgp';

import { getSignatureFileURL } from '@suite/services/github';

const signingKey = process.env.APP_PUBKEY;

// This will prevent the auto-updater from loading if the pubkey is not defined
if (signingKey === undefined) {
    throw new Error('APP_PUBKEY is undefined.');
}

type GetSignatureFileProps = { feedURL?: string; version: string; filename: string };

const getSignatureFile = async ({ version, filename, feedURL }: GetSignatureFileProps) => {
    /**
     * Signature files should be available at the URL of the custom feed beside installation files.
     * But Github provides download URLs for each asset related to release.
     */
    const signatureFileURL = feedURL
        ? `${feedURL.replace(/\/+$/, '')}/${filename}.asc`
        : await getSignatureFileURL(filename, version);

    const signatureFile = await fetch(signatureFileURL);

    return signatureFile.text();
};

type VerifySignatureProps = { feedURL?: string; version: string; downloadedFile: string };

export const verifySignature = async ({
    version,
    downloadedFile,
    feedURL,
}: VerifySignatureProps) => {
    // Find the right signature for the downloaded file
    const filename = path.basename(downloadedFile);

    const signatureFile = await getSignatureFile({
        version,
        filename,
        feedURL,
    });

    // Read downloaded file and create message to verify
    const file = await fs.promises.readFile(downloadedFile);
    const message = await openpgp.createMessage({ binary: file });

    // Load pubkey and signature
    const pubkey = await openpgp.readKey({ armoredKey: signingKey });
    const signature = await openpgp.readSignature({
        armoredSignature: signatureFile,
    });

    // Check file against signature
    const verified = await openpgp.verify({
        message,
        signature,
        verificationKeys: pubkey,
        format: 'binary',
    });

    // Get result (validity of the signature)
    const valid = await verified.signatures[0].verified;
    if (!valid) {
        throw new Error('Invalid signature.');
    }
};
