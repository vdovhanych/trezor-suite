import React from 'react';
import { useSpring, config, animated } from 'react-spring';
import styled from 'styled-components';
import { isWeb } from '@suite-utils/env';
import { TroubleshootingTips } from '@onboarding-components';
import { Translation } from '@suite-components/Translation';

const Wrapper = styled(animated.div)`
    display: flex;
`;

const tips = [
    {
        key: '1',
        heading: <Translation id="TR_TROUBLESHOOTING_TIP_BRIDGE_TITLE" />,
        description: <Translation id="TR_TROUBLESHOOTING_TIP_BRIDGE_DESCRIPTION" />,
        hide: !isWeb(),
    },
    {
        key: '2',
        heading: <Translation id="TR_TROUBLESHOOTING_TIP_INCOGNITO_TITLE" />,
        description: <Translation id="TR_TROUBLESHOOTING_TIP_INCOGNITO_DESCRIPTION" />,
        hide: !isWeb(),
    },
    {
        key: '3',
        heading: <Translation id="TR_TROUBLESHOOTING_TIP_USB_PORT_TITLE" />,
        description: <Translation id="TR_TROUBLESHOOTING_TIP_USB_PORT_DESCRIPTION" />,
    },
    {
        key: '4',
        heading: <Translation id="TR_TROUBLESHOOTING_TIP_COMPUTER_TITLE" />,
        description: <Translation id="TR_TROUBLESHOOTING_TIP_COMPUTER_DESCRIPTION" />,
    },
];
interface Props {
    offerWebUsb: boolean;
}
const NoDeviceDetected = ({ offerWebUsb }: Props) => {
    const fadeStyles = useSpring({
        config: { ...config.default },
        delay: 1000,
        from: { opacity: 0 },
        to: { opacity: 1 },
    });

    return (
        <Wrapper style={fadeStyles}>
            <TroubleshootingTips
                label={<Translation id="TR_STILL_DONT_SEE_YOUR_TREZOR" />}
                items={tips}
                offerWebUsb={offerWebUsb}
            />
        </Wrapper>
    );
};

export default NoDeviceDetected;
