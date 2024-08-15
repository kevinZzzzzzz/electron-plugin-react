import React, { useState, useEffect, memo, useMemo } from "react";
import styles from "./index.module.scss";
import { DownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { downloadPlugins, estimatePlugin } from "@/utils";

function MarketItem(props: any) {
  const { id, shortName, name, description, path, handleLoading } = props;
  const [downloaded, setDownloaded] = useState(false);
  /**
   * 下载插件
   * @params id 插件id
   */
  const downPlugin = (id) => {
    handleLoading(true);
    const cb = () => {
      handleLoading(false);
      setDownloaded(true);
    };
    downloadPlugins(id, cb);
  };

  /**
   * 判断是否已下载
   */
  const isInstalled = useMemo(() => {
    return estimatePlugin(id);
  }, [id, downloaded]);
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
            disabled={isInstalled}
            icon={<DownloadOutlined />}
            onClick={() => {
              downPlugin(id);
            }}
          >
            {isInstalled ? "已下载" : "下载"}
          </Button>
        </div>
      </div>
    </div>
  );
}
export default memo(MarketItem);
