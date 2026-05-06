const { app, BrowserWindow, shell, Menu, globalShortcut } = require('electron');
const path = require('path');

let mainWindow = null;

function getViteDevServerUrl() {
    const port = process.env.VITE_PORT || 3000;
    const startRoute = process.env.ELECTRON_START_URL || '/login';
    return `http://localhost:${port}${startRoute}`;
}

async function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 800,
        minWidth: 1024,
        minHeight: 640,
        backgroundColor: '#121214',
        title: 'Flix - Desktop',
        icon: path.join(__dirname, '..', 'public', 'favflix.png'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.cjs'),
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: true,
            devTools: true,
        },
    });

    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: 'deny' };
    });

    if (!app.isPackaged) {
        await mainWindow.loadURL(getViteDevServerUrl());
        mainWindow.webContents.on('did-fail-load', async () => {
            setTimeout(async () => {
                try { await mainWindow.loadURL(getViteDevServerUrl()); } catch (_) { }
            }, 1000);
        });
        // Abre DevTools automaticamente em desenvolvimento
        mainWindow.webContents.openDevTools({ mode: 'detach' });
    } else {
        const distPath = path.join(__dirname, '..', 'dist', 'index.html');
        await mainWindow.loadFile(distPath);
    }

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
    app.quit();
} else {
    app.on('second-instance', () => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.focus();
        }
    });

    app.whenReady().then(() => {
        // Menu com atalhos para DevTools/Reload/Zoom
        const menu = Menu.buildFromTemplate([
            {
                label: 'View',
                submenu: [
                    { role: 'reload' },
                    { role: 'forceReload' },
                    { type: 'separator' },
                    { role: 'toggleDevTools' },
                    { type: 'separator' },
                    { role: 'resetZoom' },
                    { role: 'zoomIn' },
                    { role: 'zoomOut' },
                    { type: 'separator' },
                    { role: 'togglefullscreen' },
                ],
            },
        ]);
        Menu.setApplicationMenu(menu);

        // Atalho global extra (caso o padrão não funcione)
        try {
            globalShortcut.register('Control+Shift+I', () => {
                const win = BrowserWindow.getFocusedWindow();
                if (win) win.webContents.toggleDevTools();
            });
        } catch (_) { }

        createWindow();
    });

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') app.quit();
    });

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });

    app.on('will-quit', () => {
        try { globalShortcut.unregisterAll(); } catch (_) { }
    });
}


