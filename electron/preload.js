
const {contextBridge, ipcRenderer} = require('electron')

window.addEventListener('DOMContentLoaded', () => {
  // const replaceText = (selector, text) => {
  //   const element = document.getElementById(selector)
  //   if (element) element.innerText = text
  // }

  for (const type of ['chrome', 'node', 'electron']) {
    console.log(`${type}-version`, process.versions[type])
  }
})

contextBridge.exposeInMainWorld('$electronAPI', {
  showNotification: (title, body) =>  ipcRenderer.send('show-notification', title, body )
})