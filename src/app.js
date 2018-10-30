const {app, BrowserWindow, ipcMain} = require('electron')

app.on('ready', function () {
  var mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  })
  mainWindow.loadURL('file://' + __dirname + '/main.html')
  mainWindow.openDevTools()

  var secondaryWindow = new BrowserWindow({
    width: 400,
    height: 400,
    show: false
  })
  secondaryWindow.loadURL('file://' + __dirname + '/prefs.html')

  ipcMain.on('detach', function (sender, data) {
    secondaryWindow.webContents.send('populate', data)
    secondaryWindow.show()
  })

  ipcMain.on('attach', function (sender, data) {
    mainWindow.webContents.send('populate', data)
    secondaryWindow.hide()
  })

  ipcMain.on('message', function (sender, data) {
    mainWindow.webContents.send('message', data)
    if (secondaryWindow.isVisible()){
      secondaryWindow.webContents.send('message', data)
    }
  })

})
