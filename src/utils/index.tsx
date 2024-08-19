import { SmileOutlined } from "@ant-design/icons";
import { message, notification } from "antd";

/*
  处理元素多个classname，且支持按条件挂载
*/
export const mutiClassName = (arr: any) => {
  return arr.map((d: any) => `${d}`).join(" ");
};

/**
 * 下载插件
 * @params id 插件id
 * @params cb 回调函数
 */
export const downloadPlugins = (id, cb) => {
  saveCacheData("downloadedPlugins", [id]);
  setTimeout(() => {
    cb();
    message.success("下载成功");
  }, 1000);
  importPlugin(id);
};
/**
 * 卸载插件
 * @params id 插件id
 * @params cb 回调函数
 */
export const uninstallPlugins = (id, cb) => {
  const downloadedPlugins = getDownloadPlugins();
  const index = downloadedPlugins.indexOf(id);
  if (index > -1) {
    downloadedPlugins.splice(index, 1);
    window.$electronAPI.setStoreValue("downloadedPlugins", downloadedPlugins);
  }
  setTimeout(() => {
    cb();
    message.success("卸载成功");
    removePlugin(id);
  }, 1000);
};
/**
 * 获取已下载的插件列表
 */
export const getDownloadPlugins = () => {
  return window.$electronAPI.getStoreValue("downloadedPlugins") || [];
};

/**
 * 判断插件是否已下载
 */
export const estimatePlugin = (id) => {
  return getDownloadPlugins().includes(id);
};
/**
 * 保存缓存数据
 */
export const saveCacheData = (key, data) => {
  if (window.$electronAPI.getStoreValue(key)) {
    const cache = window.$electronAPI.getStoreValue(key);
    if (Array.isArray(cache)) {
      window.$electronAPI.setStoreValue(key, [...cache, ...data]);
    } else {
      window.$electronAPI.setStoreValue(key, {
        ...cache,
        data,
      });
    }
  } else {
    window.$electronAPI.setStoreValue(key, data);
  }
};

/**
 * 导入插件至全局
 */
export const importPlugin = (id) => {
  // const script = document.createElement("script");
  // script.src = `pluginList/p${id}.js`;
  // script.type = "module";
  // // script.async = true;
  // document.body.appendChild(script);

  import(/* @vite-ignore */ `../../pluginList/p${id}.js`).then((res) => {
    window.$plugins[`P${id}`] = res.default;
  });
  notification.open({
    message: `插件${id}运行成功`,
    description: `插件${id}运行成功`,
    icon: <SmileOutlined style={{ color: "#108ee9" }} />,
  });
};

/**
 * 删除全局插件脚本
 */
export const removePlugin = (id) => {
  // const scriptList = document.getElementsByTagName("script");
  // for (const i of scriptList) {
  //   if (i.getAttribute("src") == `pluginList/p${id}.js`) {
  //     i.parentNode.removeChild(i);
  //   }
  // }
  delete window.$plugins[`P${id}`];
};

/**
 * 清空插件缓存
 */
export const clearPluginsCache = () => {
  getDownloadPlugins().forEach((id) => {
    removePlugin(id);
  });
  window.$electronAPI.setStoreValue("downloadedPlugins", []);
  notification.open({
    message: `清空完成`,
  });
};
