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
  };
  return (
    <div className={styles.home}>
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
  );
}
export default HomePage;
