const { contextBridge, ipcRenderer } = require("electron");

window.addEventListener("DOMContentLoaded", () => {
  // const replaceText = (selector, text) => {
  //   const element = document.getElementById(selector)
  //   if (element) element.innerText = text
  // }

  for (const type of ["chrome", "node", "electron"]) {
    console.log(`${type}-version`, process.versions[type]);
  }
});

contextBridge.exposeInMainWorld("$electronAPI", {
  showNotification: (title, body) =>
    ipcRenderer.send("show-notification", title, body),
  setStoreValue: (key, value) => {
    ipcRenderer.send("setStore", key, value);
  },
  getStoreValue: (key) => {
    const resp = ipcRenderer.sendSync("getStore", key);
    return resp;
  },
  delStoreValue: (key) => {
    ipcRenderer.send("delStore", key);
  },
  clearStoreValue: () => {
    ipcRenderer.send("clearStore");
  },
  hideWindow: () => {
    ipcRenderer.send("hide-window");
  },
  fullScreen: (flag) => {
    ipcRenderer.send("full-screen", flag);
  },
  isFullScreen: () => {
    const resp = ipcRenderer.sendSync("isFullScreen");
    return resp;
  },
  closeWindow: () => {
    ipcRenderer.send("close-window");
  },
});
