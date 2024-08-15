"use strict";
const {
  app,
  BrowserWindow,
  BrowserView,
  Menu,
  BaseWindow,
  WebContentsView,
  Notification,
  globalShortcut,
  ipcMain
} = require("electron");
const { autoUpdater } = require("electron-updater");
const path = require("path");
let store;
const NODE_ENV = process.env.NODE_ENV;
const isDev = NODE_ENV === "development";
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
function createNotification(title, body) {
  new Notification({ title, body }).show();
}
let win;
const createWindow = async () => {
  win = new BrowserWindow({
    width: 1e3,
    height: 800,
    frame: false,
    // alwaysOnTop: true,
    titleBarStyle: "default",
    backgroundColor: "#fff",
    webPreferences: {
      nodeIntegration: true,
      // 解决无法使用 require 加载的 bug
      // 引入预加载脚本
      preload: path.join(__dirname, "preload.js")
    }
  });
  win.setAlwaysOnTop(true);
  win.removeMenu();
  setTimeout(() => {
    win.setAlwaysOnTop(false);
  }, 3e3);
  if (isDev) {
    win.loadURL("http://192.168.1.4:8881/#/home");
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, "../dist/index.html"));
  }
  const { default: Store } = await Promise.resolve().then(() => require("./index-bbba46ab.js"));
  store = new Store();
  ipcMain.on("show-notification", (event, title, body) => {
    createNotification(title, body);
  });
  ipcMain.on("setStore", (_, key, value) => {
    store.set(key, value);
  });
  ipcMain.on("getStore", (_, key) => {
    let value = store.get(key);
    _.returnValue = value || "";
  });
  ipcMain.on("delStore", (_, key) => {
    store.delete(key);
  });
  ipcMain.on("clearStore", () => {
    store.clear();
  });
};
app.whenReady().then(() => {
  createWindow();
  autoUpdater.checkForUpdates();
  globalShortcut.register("CommandOrControl+R", () => {
    win.reload();
  });
  globalShortcut.register("CommandOrControl+Shift+R", () => {
    win.webContents.reloadIgnoringCache();
  });
  new Notification({
    title: "测试",
    body: "测试开始"
  }).show();
});
app.on("window-all-closed", () => {
  new Notification({
    title: "测试",
    body: "测试"
  }).show();
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
