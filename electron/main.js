const {
  app,
  BrowserWindow,
  BrowserView,
  Menu,
  BaseWindow,
  WebContentsView,
  Notification,
  globalShortcut,
  protocol,
  ipcMain,
} = require("electron");
// const { autoUpdater } = require("electron-updater");
// const Multispinner = require("multispinner");
const path = require("path");
// const listenEvent = require("./listenEvent.js");
let store; // 在全局作用域中声明
const NODE_ENV = process.env.NODE_ENV;
const isDev = NODE_ENV === "development"; // 开发环境
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true"; // 禁用安全警告
app.commandLine.appendSwitch("disable-web-security");
app.commandLine.appendSwitch("disable-features", "OutOfBlinkCors"); // 允许跨域
app.commandLine.appendSwitch("--ignore-certificate-errors", "true"); // 忽略证书相关错误
let win; // 窗口实例
protocol.registerSchemesAsPrivileged([
  {
    scheme: "kevin",
    privileges: {
      standard: true,
      secure: true,
      bypassCSP: true,
      supportFetchAPI: true,
      allowServiceWorkers: true,
      corsEnabled: true,
    },
  },
]);
// 加载一个新的BrowserWindow实例，并打开窗口
const createWindow = async () => {
  win = new BrowserWindow({
    width: 1000,
    height: 800,
    frame: false,
    // alwaysOnTop: true,
    titleBarStyle: "default",
    backgroundColor: "#fff",
    title: "测试xxx",
    icon: path.join(__dirname, "../public/electron.png"),
    webPreferences: {
      webSecurity: false,
      enableRemoteModule: true,
      nodeIntegration: true, // 解决无法使用 require 加载的 bug
      // 引入预加载脚本
      preload: path.join(__dirname, "preload.js"),
    },
  });
  win.setAlwaysOnTop(true); // 打开后置顶

  win.removeMenu(); // 隐藏菜单栏
  setTimeout(() => {
    win.setAlwaysOnTop(false);
  }, 3000);
  if (isDev) {
    // win.loadURL("http://192.168.1.4:8881/#/home");
    // win.loadURL("http://192.168.120.178:8881/#/home");
    win.loadURL("http://192.168.31.146:8881/#/home");
    win.webContents.openDevTools();
  } else {
    // protocol.registerFileProtocol("kevin", (request, callback) => {
    //   const url = request.url.substr(7); // 去掉 'atom://' 的前缀
    //   callback({ path: path.normalize(`${__dirname}/${url}`) });
    // });
    win.loadFile("build/index.html").catch(() => null);
    // `file://${__dirname}/index.html`
    // win.loadFile("index.html");
    // win.webContents.openDevTools();
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
  // 隐藏窗口
  ipcMain.on("hide-window", () => {
    win.minimize();
  });
  // 全屏窗口
  ipcMain.on("full-screen", (_, flag) => {
    // flag ? win.maximize() : win.minimize();
    win.setFullScreen(flag);
  });
  // 判断是否全屏
  ipcMain.on("isFullScreen", (_, flag) => {
    _.returnValue = win.isFullScreen();
  });
  // 关闭窗口
  ipcMain.on("close-window", () => {
    win.close();
  });

  // 按键监听
  // 刷新
  globalShortcut.register("CommandOrControl+R", () => {
    win.reload();
  });
  // 强制刷新
  globalShortcut.register("CommandOrControl+Shift+R", () => {
    win.webContents.reloadIgnoringCache();
  });
  // 事件监听
  // listenEvent(win, store);
};
// app模块在ready事件被激发后才会创建浏览器窗口，可以通过使用app.whenReady()API来监听此事件
app.whenReady().then(() => {
  createWindow();
  // autoUpdater.checkForUpdates(); // 热更新

  new Notification({
    title: "测试",
    body: "测试开始",
  }).show();
});

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
