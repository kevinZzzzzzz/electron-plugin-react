import React, { useEffect } from "react";
import {
  HashRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import ReactDOM from "react-dom";
import { AllRouters as routes } from "./router/index";
import DefaultLayout from "./layout/Default";
import api from "@/api";
import HasLayout from "./layout/HasLayout";
import "./index.scss";
import { getDownloadPlugins, importPlugin } from "./utils";
import { message, notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";
declare global {
  interface Window {
    $api: any;
    $electronAPI: any;
    $plugins: any;
  }
}
/* 
  设置全局变量
*/
window.$api = { ...api };
window.$plugins = new Proxy({}, {
  get(target, key) {
    // console.log(target, key)
    if (!Reflect.has(target, key)) {
      message.warning('请先至插件市场下载插件～～～');
      return false
    }
    return Reflect.get(target, key);
  }
})
function App() {
  useEffect(() => {
    const plugins = getDownloadPlugins();
    if (plugins && plugins.length) {
      plugins.forEach((e) => {
        importPlugin(e);
      });
    }
  }, []);
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />}></Route>
        <Route path="/:notFoundPath" element={<Navigate to="/404" />}></Route>
        {routes.map((e: any) => {
          return (
            <Route
              key={e.key}
              path={e.path}
              element={
                e.hasLayout ? (
                  <HasLayout>
                    <e.component />
                  </HasLayout>
                ) : (
                  <DefaultLayout>
                    <e.component />
                  </DefaultLayout>
                )
              }
            ></Route>
          );
        })}
      </Routes>
    </HashRouter>
  );
}
export default App;
