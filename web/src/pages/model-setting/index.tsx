import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import UserSettingModel from '../user-setting/setting-model';
import styles from './index.less';

const ModelSetting = () => {
  const { i18n } = useTranslation();

  // 设置默认语言为中文
  useEffect(() => {
    if (i18n.language !== 'zh') {
      i18n.changeLanguage('zh');
    }
  }, [i18n]);

  return (
    <ConfigProvider locale={zhCN}>
      <div className={styles.container}>
        <UserSettingModel />
      </div>
    </ConfigProvider>
  );
};

export default ModelSetting;
