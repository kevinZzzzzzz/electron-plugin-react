import React, { useState, useEffect, memo } from "react";
import styles from "./index.module.scss";

import closeIcon from "@/assets/close.png";
import hiddenIcon from "@/assets/hidden.png";
function HeaderComp(props: any) {
  return (
    <div className={styles.header}>
      <div className={styles.header_empty}></div>
      <div className={styles.header_tools}>
        <img src={hiddenIcon} alt="" />
        <img src={closeIcon} alt="" />
      </div>
    </div>
  );
}
export default memo(HeaderComp);
