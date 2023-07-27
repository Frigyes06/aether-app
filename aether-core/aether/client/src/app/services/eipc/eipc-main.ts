export {}

let globals = require('../globals/globals')
let fesupervisor = require('../fesupervisor/fesupervisor')
const {ipcMain} = require('electron') // Register IPC caller

/*----------  Main receivers  ----------*/
// i.e. main does something at the request of renderer

ipcMain.handle('GetFrontendReady', function (): boolean {
  return globals.FrontendReady
})

ipcMain.on('SetFrontendReady', function (ready: boolean) {
  globals.FrontendReady = ready
})

ipcMain.on('SetRendererReady', function (ready: boolean) {
  globals.RendererReady = ready
})

ipcMain.handle('GetFrontendAPIPort', function (): number {
  return globals.FrontendAPIPort
})

ipcMain.on('SetFrontendAPIPort', function (port: number) {
  globals.FrontendAPIPort = port
})

ipcMain.handle('GetFrontendClientConnInitialised', function (): boolean {
  return globals.FrontendClientConnInitialised
})

ipcMain.on(
  'SetFrontendClientConnInitialised',
  function (initialised: boolean) {
    globals.FrontendClientConnInitialised = initialised
  }
)

ipcMain.handle('GetClientAPIServerPort', function (): number {
  return globals.ClientAPIServerPort
})

ipcMain.handle('SetClientAPIServerPort', function (port: number): boolean {
  console.log('ipc client api server port: ', port)
  globals.ClientAPIServerPort = port
  return fesupervisor.StartFrontendDaemon(globals.ClientAPIServerPort)
})

// module.exports = ipc
