import React, { useState, useEffect, memo } from "react";
import styles from "./index.module.scss";
import { menuList, menuMap } from "./menu";
import { useNavigate, useLocation } from "react-router-dom";
import electron from "@/assets/electron.png";
import { Tooltip } from "antd";
import { mutiClassName } from "@/utils";
function SiderComp(props: any) {
  const [activeTab, setActiveTab] = useState("1");
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  useEffect(() => {
    setActiveTab(menuMap[pathname]);
  }, [location]);
  /**
   * 点击菜单跳转路由
   * @param item
   */
  const jumpPath = (item) => {
    setActiveTab(item.id);
    navigate(item.path);
  };
  return (
    <div className={styles.sider}>
      <div className={styles.sider_title}>
        <img src={electron} alt="" />
      </div>
      <ul className={styles.sider_main}>
        {menuList.map((item: any) => {
          return (
            <li
              key={item.id}
              className={mutiClassName([
                styles["sider_main_tab"],
                activeTab == item.id && styles["sider_main_tab-active"],
              ])}
              onClick={() => jumpPath(item)}
            >
              <Tooltip placement="right" title={item.title}>
                <img src={item.iconPath} />
              </Tooltip>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default memo(SiderComp);
