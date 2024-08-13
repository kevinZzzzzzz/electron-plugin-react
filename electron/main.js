const { app, BrowserWindow, BrowserView, BaseWindow, WebContentsView, Notification, ipcMain} = require('electron')
const { autoUpdater } = require('electron-updater')
const path = require('path')

const NODE_ENV = process.env.NODE_ENV
const isDev = NODE_ENV === 'development'

function createNotification(title, body) {
  new Notification({ title, body }).show()
}
// 加载一个新的BrowserWindow实例，并打开窗口
const createWindow = () => {
  const win = new BrowserWindow({ // 单个窗口
  // const win = new BaseWindow({ // 多个窗口
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true, // 解决无法使用 require 加载的 bug
      // 引入预加载脚本
      preload: path.join(__dirname, 'preload.js')
    },
  })


  if (isDev) {
    win.loadURL('http://192.168.1.14:8881/#/home')
    win.webContents.openDevTools()
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'))
  }

  ipcMain.on('show-notification', (event, title, body) => {
    createNotification(title, body)
  })
}
// app模块在ready事件被激发后才会创建浏览器窗口，可以通过使用app.whenReady()API来监听此事件
app.whenReady().then(() => {
  createWindow()
  autoUpdater.checkForUpdates() // 热更新
  new Notification({
    title: '测试',
    body: '测试开始'
  }).show()
})
// app.on('ready', () => {
//   console.log(Notification.isSupported(), 123)
//   createWindow()
//   autoUpdater.checkForUpdates()
// })

// 监听窗口关闭时退出应用
app.on('window-all-closed', () => {
  new Notification({
    title: '测试',
    body: '测试'
  }).show()
  if (process.platform !== 'darwin') { // 如果不是macOS系统
    app.quit()
  }
})
// macOS在没有窗口打开则打开一个新的窗口
app.on('activate', () => {
  // activate事件，用来监听app模块如果没有任何浏览器窗口是打开的，则创建一个新的窗口
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
