import React, { useState, useEffect, memo } from "react";
import styles from "./index.module.scss";
import { DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { uninstallPlugins } from "@/utils";

function MarketItem(props: any) {
  const { id, shortName, name, description, path, handleLoading } = props;

  /**
   * 卸载插件
   * @params id 插件id
   */
  const unInstallPlugin = (id) => {
    handleLoading(true);
    const cb = () => {
      handleLoading(false);
    };
    uninstallPlugins(id, cb);
  };
  return (
    <div className={styles.marketItem}>
      <div className={styles.marketItem_main}>
        <div className={styles.marketItem_main_photo}>
          <p>{shortName}</p>
        </div>
        <div className={styles.marketItem_main_info}>
          <h2>{name}</h2>
          <p>{description}</p>
          <Button
            danger
            onClick={() => {
              unInstallPlugin(id);
            }}
            icon={<DeleteOutlined />}
          >
            卸载
          </Button>
        </div>
      </div>
    </div>
  );
}
export default memo(MarketItem);
