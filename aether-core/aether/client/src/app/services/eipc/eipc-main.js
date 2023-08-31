"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var globals = require('../globals/globals');
var fesupervisor = require('../fesupervisor/fesupervisor');
var ipcMain = require('electron').ipcMain; // Register IPC caller
/*----------  Main receivers  ----------*/
// i.e. main does something at the request of renderer
ipcMain.handle('GetFrontendReady', function () {
    return globals.FrontendReady;
});
ipcMain.on('SetFrontendReady', function (ready) {
    globals.FrontendReady = ready;
});
ipcMain.on('SetRendererReady', function (ready) {
    globals.RendererReady = ready;
});
ipcMain.handle('GetFrontendAPIPort', function () {
    return globals.FrontendAPIPort;
});
ipcMain.on('SetFrontendAPIPort', function (port) {
    globals.FrontendAPIPort = port;
});
ipcMain.handle('GetFrontendClientConnInitialised', function () {
    return globals.FrontendClientConnInitialised;
});
ipcMain.on('SetFrontendClientConnInitialised', function (initialised) {
    globals.FrontendClientConnInitialised = initialised;
});
ipcMain.handle('GetClientAPIServerPort', function () {
    return globals.ClientAPIServerPort;
});
ipcMain.handle('SetClientAPIServerPort', function (port) {
    console.log('ipc client api server port: ', port);
    globals.ClientAPIServerPort = port;
    return fesupervisor.StartFrontendDaemon(globals.ClientAPIServerPort);
});
// module.exports = ipc
//# sourceMappingURL=eipc-main.js.map