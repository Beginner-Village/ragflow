import { useNavigateWithFromState } from '@/hooks/route-hook';
import { Routes } from '@/routes';
import feature1 from './img/feature_1.png';
import feature2 from './img/feature_2.png';
import feature3 from './img/feature_3.png';
import styles from './index.less';

const featureList = [
  {
    title: '数据集',
    desc: '可创建和配置知识库信息、上传多格式文件、选择数据解析、切片策略，提取知识图谱、使用召回增强 RAPTOR 策略最后进行知识召回检索测试、完成数据集API调用。',
    img: feature1,
  },
  {
    title: '聊天',
    desc: '配置智能体能力，选择模型、检索策略、推理、Rerank模型、关键词分析、知识图谱、发布成API等特色功能。',
    img: feature2,
  },
  {
    title: '搜索',
    desc: '平台提供全文检索、混合检索、向量检索、知识图片搜索功能，且溯源文档提升用户与AI的对话体验。',
    img: feature3,
  },
];

const progressList = [
  {
    order: '01',
    title: '上传多格式文件',
  },
  {
    order: '02',
    title: '多策略切片和提取知识图谱',
  },
  {
    order: '03',
    title: '多策略召回、召回增强RAPTOR策略',
  },
  {
    order: '04',
    title: '观测、分析、优化知识库效果',
  },
];

const funcList = [
  {
    title: '数据集',
    count: 101,
    path: Routes.Datasets,
  },
  {
    title: '聊天',
    count: 101,
    path: Routes.Chats,
  },
  {
    title: '搜索',
    count: 101,
    path: Routes.Searches,
  },
];

const Home = () => {
  const navigate = useNavigateWithFromState();

  return (
    <div className={styles.wrap}>
      <div className={styles.banner}>
        <div className={styles.title}>
          欢迎来到猎鹰<span className={styles.hl}>知识库</span>平台 ——
          金融领域的<span className={styles.hl}>AI</span>知识中枢
        </div>
        <div className={styles.desc}>
          一键接入知识库，打造金融领域的AI知识中枢
        </div>
      </div>
      <div className={styles.cardList}>
        {featureList.map((item) => (
          <div className={styles.cardItem} key={item.title}>
            <div
              className={`${styles.featureIcon} ${item.title === '数据集' ? styles.datasetIcon : ''}`}
            >
              <img src={item.img} alt={item.title} />
            </div>
            <div>
              <div className={styles.featureTitle}>{item.title}</div>
              <div className={styles.featureDesc}>{item.desc}</div>
            </div>
          </div>
        ))}
        <div className={styles.item}></div>
      </div>
      <div className={styles.progress}>
        <div className={styles.progressTitle}>四步开启知识库作业流</div>
        <div className={styles.progressBar}>
          <div className={styles.progressTrack}>
            {progressList.map((item) => (
              <div className={styles.progressItem} key={item.order}>
                <div className={styles.progressPoint}>
                  <div className={styles.progressOrder}>{item.order}</div>
                  <div className={styles.progressLabel}>{item.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.cardList}>
        {funcList.map((item) => (
          <div className={styles.cardItem} key={item.title}>
            <div className={styles.funcCnt}>
              <div className={styles.funcTitle}>{item.title}</div>
              <div className={styles.funcCount}>
                {item.count > 100 ? (
                  <span>
                    100<span className={styles.funcSub}>+</span>
                  </span>
                ) : (
                  item.count
                )}
              </div>
            </div>
            <div className={styles.funcBtn} onClick={() => navigate(item.path)}>
              去看看
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
