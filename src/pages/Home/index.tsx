import { injectJsError } from "@/utils/monitor";
import { Button } from "antd";
import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";

function HomePage(props: any) {
  useEffect(() => {
    injectJsError();
  }, []);
  const handlePluginRun = (id) => {
    // if (!window[`P${id}`]) {
    //   console.log("插件未运行");
    //   return;
    // }
    console.log("插件运行成功");
    window[`P${id}`].print();
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
          </div>
        );
      })}
    </div>
  );
}
export default HomePage;
