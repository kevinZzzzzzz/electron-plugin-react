const { globalShortcut, ipcMain, Notification } = require("electron");

function createNotification(title, body) {
  new Notification({ title, body }).show();
}
module.exports = (win, store) => {
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
  // 打开控制台
  globalShortcut.register("CommandOrControl+Shift+I", () => {
    win.webContents.openDevTools();
  });
};
