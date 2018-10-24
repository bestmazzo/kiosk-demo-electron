const {remote, ipcRenderer} = require('electron')
const {Menu, MenuItem} = remote

const menu = new Menu()
const ipc = require('electron').ipcRenderer;
ipc.on('input', (event, message) => {
    console.log(message); // logs out "Hello second window!"
    document.getElementById('message').textContent = message
})
menu.append(new MenuItem(
  {
    label: 'Electron',
    submenu: [
      {
        label: 'Prefs',
        click: function () {
            ipcRenderer.send('toggle-prefs')
        }
      }
    ]
  })
)

Menu.setApplicationMenu(menu)
