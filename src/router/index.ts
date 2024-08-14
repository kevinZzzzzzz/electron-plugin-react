import { lazy } from "react";

interface RouterInterface {
  key: number,
  name: string,
  // 描述
  description?: string,
  path: string,
  component: any,
  hasLayout?: boolean,
  children?: any[]
}

const HomePage: RouterInterface = {
  key: 0,
  name: 'Home',
  description: '首页',
  path: '/home',
  hasLayout: true,
  component: lazy(() => import(/* webpackChunkName: "home" */ '@/pages/Home/index')),
  children: []
}
const PluginInstalledPage: RouterInterface = {
  key: 1,
  name: 'PluginInstalled',
  description: '插件列表',
  hasLayout: true,
  path: '/plugin-installed',
  component: lazy(() => import(/* webpackChunkName: "plugin-installed" */ '@/pages/PluginInstalled/index')),
  children: []
}
const PluginNotInstalledPage: RouterInterface = {
  key: 2,
  name: 'PluginNotInstalled',
  description: '插件市场',
  hasLayout: true,
  path: '/plugin-not-installed',
  component: lazy(() => import(/* webpackChunkName: "plugin-not-installed" */ '@/pages/PluginNotInstalled/index')),
  children: []
}
const SettingPage: RouterInterface = {
  key: 3,
  name: 'Setting',
  description: '设置',
  hasLayout: true,
  path: '/setting',
  component: lazy(() => import(/* webpackChunkName: "setting" */ '@/pages/Setting/index')),
  children: []
}
const NotFoundPage: RouterInterface = {
  key: 1000,
  name: 'NotFound',
  path: '/404',
  component: lazy(() => import(/* webpackChunkName: "404" */ '@/pages/404/index')),
  children: []
}

const AllRouters: RouterInterface[] = ([
  HomePage,
  NotFoundPage,
  PluginInstalledPage,
  PluginNotInstalledPage,
  SettingPage
])

export {
  AllRouters
}