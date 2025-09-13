import { useNavigateWithFromState } from '@/hooks/route-hook';
import styles from './index.less'
import feature1 from './img/feature_1.png'
import feature2 from './img/feature_2.png'
import feature3 from './img/feature_3.png'
import { Routes } from '@/routes';

const featureList = [
  {
    title: '智能体数',
    desc: '打造智能协同调度、实时感知+自主进化，聚焦效率与进化力，用AI重塑业务动能。',
    img: feature1,
  },
  {
    title: '智能体聊天',
    desc: '智能中枢驱动，多任务并行调度，动态资源适配，业务效能飙升！',
    img: feature2,
  },
  {
    title: '智能体搜索',
    desc: '平台提供智能体搜索，灵活设计样式，提升用户与AI的对话体验，迎合智能时代。',
    img: feature3,
  },
]

const progressList = [
  {
    order: '01',
    title: '创建数据流',
  },
  {
    order: '02',
    title: '添加及配置聊天',
  },
  {
    order: '03',
    title: '与搜索绑定',
  },
  {
    order: '04',
    title: '测试智能化',
  },
]

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
]

const Home = () => {
  const navigate = useNavigateWithFromState();

  return (
    <div className={styles.wrap}>
      <div className={styles.banner}>
        <div className={styles.title}>
          欢迎来到猎鹰<span className={styles.hl}>知识库</span>平台 —— 金融领域的<span className={styles.hl}>AI</span>决策中枢
        </div>
        <div className={styles.desc}>
          一键接入知识库，开启金融智能化时代
        </div>
      </div>
      <div className={styles.cardList}>
        {
          featureList.map((item) => (
            <div className={styles.cardItem} key={item.title}>
              <div className={styles.featureIcon}>
                <img src={item.img} alt={item.title} />
              </div>
              <div>
                <div className={styles.featureTitle}>
                  {item.title}
                </div>
                <div className={styles.featureDesc}>
                  {item.desc}
                </div>
              </div>
            </div>
          ))
        }
        <div className={styles.item}>
          
        </div>
      </div>
      <div className={styles.progress}>
          <div className={styles.progressTitle}>
            四步开启智能知识库作业流
          </div>
          <div className={styles.progressBar}>
            <div className={styles.progressTrack}>
              {
                progressList.map((item) => (
                  <div className={styles.progressItem} key={item.order}>
                    <div className={styles.progressPoint}>
                      <div className={styles.progressOrder}>
                        {item.order}
                      </div>
                      <div className={styles.progressLabel}>
                        {item.title}
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
      </div>
      <div className={styles.cardList}>
        {
          funcList.map((item) => (
            <div className={styles.cardItem} key={item.title}>
              <div className={styles.funcCnt}>
                <div className={styles.funcTitle}>
                  {item.title}
                </div>
                <div className={styles.funcCount}>
                  {
                    item.count > 100
                    ? <span>100<span className={styles.funcSub}>+</span></span>
                    : item.count
                  }
                </div>
              </div>
              <div className={styles.funcBtn} onClick={() => navigate(item.path)}>
                去看看
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Home;
