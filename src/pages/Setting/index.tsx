import React, { useState, useEffect } from "react";
import styles from './index.module.scss'
import { Button, Modal } from "antd";
import { clearPluginsCache, getDownloadPlugins } from "@/utils";
import { ExclamationCircleFilled } from "@ant-design/icons";
function SettingPage(props: any) {
  const { confirm } = Modal
  const [pluginsLen, setPluginsLen] = useState<any>(getDownloadPlugins().length)
  const handleClearPlugin = () => {
    confirm({
      title: ' 确认清空插件缓存?',
      icon: <ExclamationCircleFilled />,
      content: '',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        clearPluginsCache()
        setPluginsLen(0)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  return (
    <div className={styles.setting}>
      <h1>设置</h1>
      <div className={styles.divider}></div>
      <Button disabled={!pluginsLen} onClick={() => {
        handleClearPlugin()
      }}>清空插件缓存</Button>
    </div>
  )
}
export default SettingPage;
