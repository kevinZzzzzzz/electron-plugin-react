import { injectJsError } from "@/utils/monitor";
import { Button, notification } from "antd";
import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import Installed from "@/assets/installed.png";
import { estimatePlugin } from "@/utils";

function HomePage(props: any) {
  useEffect(() => {
    injectJsError();
  }, []);
  const handlePluginRun = (id) => {
    window.$plugins[`P${id}`].print();
    notification.success({
      message: window.$plugins[`P${id}`].name,
      description: window.$plugins[`P${id}`].describe,
    });
  };
  return (
    <div className={styles.home}>
      <h1>插件测试</h1>
      <div className={styles.divider}></div>
      <div className={styles.home_list}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
          return (
            <div
              className={styles.item}
              key={item}
              onClick={() => {
                handlePluginRun(item);
              }}
            >
              插件 {item}
              {estimatePlugin(item) ? <img src={Installed} alt="" /> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default HomePage;
