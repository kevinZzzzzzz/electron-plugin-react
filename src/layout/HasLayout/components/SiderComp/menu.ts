import test from "@/assets/test.png";
import installedPlugin from "@/assets/installedPlugin.png";
import pluginUnInstall from "@/assets/pluginUnInstall.png";
import setting from "@/assets/setting.png";

export const menuList = [
  {
    id: 1,
    title: "测试页",
    iconPath: test,
    path: "/home",
  },
  {
    id: 2,
    title: "插件管理",
    iconPath: installedPlugin,
    path: "/plugin-installed",
  },
  {
    id: 3,
    title: "插件市场",
    iconPath: pluginUnInstall,
    path: "/plugin-market",
  },
  {
    id: 4,
    title: "设置",
    iconPath: setting,
    path: "/setting",
  },
];
export const menuMap = {
  "/home": 1,
  "/plugin-installed": 2,
  "/plugin-market": 3,
  "/setting": 4,
};
