# Adding New Firmwares

In case we are about to release both Suite and firmwares we want to add the signed firmwares during the Freeze so QA has the whole thing to test.

1. Complete the firmware release process including firmware signing.
2. Add firmwares to [webwallet-data](github.com/trezor/webwallet-data/).
3. Deploy them to data.trezor.io. _This is currently done manually and should be automated._
4. File a PR in Connect modifying the releases.json file. See e.g. [a1831647](https://github.com/trezor/connect/commit/a1831647349900f96c3a87cb24b6141162daa645) for an example.
5. Review and merge this PR.
_Note that by merging this PR you are effectively blocking a Connect release in case of emergency (before the release date). That's why this should be done on the day of the Suite Freeze and not sooner. And of course we have `git revert` in the worst case._
6. Bump Connect in Suite. _See [connect/bump.md](../packages/connect/bump.md) on how to do that._
