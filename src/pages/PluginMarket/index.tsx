import { pluginList } from "@/pluginModules/pluginList";
import { Divider, Spin } from "antd";
import React, { useState, useEffect } from "react";
import MarketItem from "./components/MarketItem";
import styles from "./index.module.scss";
function PluginMarket(props: any) {
  const [loading, setLoading] = useState(false);
  // 控制加载效果
  const handleLoading = (flag) => {
    setLoading(flag);
  };
  return (
    <Spin spinning={loading}>
      <div className={styles.market}>
        <h1>插件市场</h1>
        <div className={styles.divider}></div>
        <ul className={styles.market_list}>
          {pluginList?.map((item) => {
            return (
              <li className={styles.market_list_item} key={item.id}>
                <MarketItem {...item} handleLoading={handleLoading} />
              </li>
            );
          })}
        </ul>
      </div>
    </Spin>
  );
}
export default PluginMarket;
