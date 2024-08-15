import React, { useState, useEffect, memo } from "react";
import HeaderComp from "./components/HeaderComp";
import SiderComp from "./components/SiderComp";
import styles from "./index.module.scss";
function HasLayout(props: any) {
  return (
    <div className={styles.layout}>
      <div className={styles.layout_left}>
        <div className={styles.layout_left_sider}>
          <SiderComp />
        </div>
      </div>
      <div className={styles.layout_right}>
        <div className={styles.layout_right_header}>
          <HeaderComp />
        </div>
        <div className={styles.layout_right_content}>{props.children}</div>
      </div>
    </div>
  );
}
export default memo(HasLayout);
