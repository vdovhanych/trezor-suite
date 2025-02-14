import electronLocalshortcut from 'electron-localshortcut';
import { Module } from './index';

const init: Module = ({ mainWindow, src }) => {
    const { logger } = global;

    // Register more shortcuts for opening dev tools
    const openDevToolsShortcuts = ['CommandOrControl+Shift+I', 'CommandOrControl+Alt+I'];
    openDevToolsShortcuts.forEach(shortcut => {
        electronLocalshortcut.register(mainWindow, shortcut, () => {
            logger.info('shortcuts', `${shortcut} pressed`);
            mainWindow.webContents.openDevTools();
        });
    });

    electronLocalshortcut.register(mainWindow, 'F5', () => {
        logger.info('shortcuts', 'F5 pressed');
        mainWindow.loadURL(src);
    });

    electronLocalshortcut.register(mainWindow, 'CommandOrControl+R', () => {
        logger.info('shortcuts', 'CTRL+R pressed');
        mainWindow.loadURL(src);
    });
};

export default init;
