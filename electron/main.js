const {
  app,
  BrowserWindow,
  BrowserView,
  Menu,
  BaseWindow,
  WebContentsView,
  Notification,
  globalShortcut,
  ipcMain,
} = require("electron");
const { autoUpdater } = require("electron-updater");
const path = require("path");
// const Store = require("electron-store");
let store; // 在全局作用域中声明
// const store = new Store(); // 数据持久化

const NODE_ENV = process.env.NODE_ENV;
const isDev = NODE_ENV === "development";
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
function createNotification(title, body) {
  new Notification({ title, body }).show();
}
let win;
// 加载一个新的BrowserWindow实例，并打开窗口
const createWindow = async () => {
  // Menu.setApplicationMenu(null);
  win = new BrowserWindow({
    width: 1000,
    height: 800,
    frame: false,
    // alwaysOnTop: true,
    titleBarStyle: "default",
    backgroundColor: "#fff",
    webPreferences: {
      nodeIntegration: true, // 解决无法使用 require 加载的 bug
      // 引入预加载脚本
      preload: path.join(__dirname, "preload.js"),
    },
  });
  win.setAlwaysOnTop(true); // 打开后置顶

  win.removeMenu() // 隐藏菜单栏
  setTimeout(() => {
    win.setAlwaysOnTop(false);
  }, 3000);
  if (isDev) {
    win.loadURL("http://192.168.1.4:8881/#/home");
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, "../dist/index.html"));
  }
  const { default: Store } = await import("electron-store");
  store = new Store(); // 仓库初始化
  // 定义ipcRenderer监听事件
  // 消息弹窗
  ipcMain.on("show-notification", (event, title, body) => {
    createNotification(title, body);
  });
  // 保存数据
  ipcMain.on("setStore", (_, key, value) => {
    store.set(key, value);
  });
  // 获取数据
  ipcMain.on("getStore", (_, key) => {
    let value = store.get(key);
    _.returnValue = value || "";
  });
  // 删除数据
  ipcMain.on("delStore", (_, key) => {
    store.delete(key);
  });
  // 清空数据
  ipcMain.on("clearStore", () => {
    store.clear();
  });
};
// app模块在ready事件被激发后才会创建浏览器窗口，可以通过使用app.whenReady()API来监听此事件
app.whenReady().then(() => {
  createWindow();
  autoUpdater.checkForUpdates(); // 热更新

  // 刷新
  globalShortcut.register("CommandOrControl+R", () => {
    win.reload();
  });
  // 强制刷新
  globalShortcut.register("CommandOrControl+Shift+R", () => {
    win.webContents.reloadIgnoringCache();
  });
  new Notification({
    title: "测试",
    body: "测试开始",
  }).show();
});
// app.on('ready', () => {
//   console.log(Notification.isSupported(), 123)
//   createWindow()
//   autoUpdater.checkForUpdates()
// })

// 监听窗口关闭时退出应用
app.on("window-all-closed", () => {
  new Notification({
    title: "测试",
    body: "测试",
  }).show();
  if (process.platform !== "darwin") {
    // 如果不是macOS系统
    app.quit();
  }
});
// macOS在没有窗口打开则打开一个新的窗口
app.on("activate", () => {
  // activate事件，用来监听app模块如果没有任何浏览器窗口是打开的，则创建一个新的窗口
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
