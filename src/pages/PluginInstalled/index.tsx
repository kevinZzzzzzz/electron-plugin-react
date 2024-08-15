import { pluginList } from "@/pluginModules/pluginList";
import { estimatePlugin } from "@/utils";
import { useNavigate } from "react-router-dom";
import { Button, Divider, Empty, Spin, Typography } from "antd";
import React, { useState, useEffect, useMemo } from "react";
import MarketItem from "./components/MarketItem";
import styles from "./index.module.scss";

function PluginInstalledPage(props: any) {
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // 控制加载效果
  const handleLoading = (flag) => {
    setLoading(flag);
  };
  // 获取已下载的插件
  const pluginListAct = useMemo(() => {
    return pluginList?.filter((item) => {
      return estimatePlugin(item.id);
    });
  }, [loading]);
  return (
    <Spin spinning={loading}>
      <div className={styles.myPlugin}>
        <h1>我的插件</h1>
        <div className={styles.divider}></div>
        {pluginListAct && pluginListAct.length ? (
          <ul className={styles.myPlugin_list}>
            {pluginListAct?.map((item) => {
              return (
                <li className={styles.myPlugin_list_item} key={item.id}>
                  <MarketItem {...item} handleLoading={handleLoading} />
                </li>
              );
            })}
          </ul>
        ) : (
          <Empty imageStyle={{ height: 60 }} description="暂无插件">
            <Button
              type="primary"
              onClick={() => {
                Navigate("/plugin-market");
              }}
            >
              去下载
            </Button>
          </Empty>
        )}
      </div>
    </Spin>
  );
}
export default PluginInstalledPage;
