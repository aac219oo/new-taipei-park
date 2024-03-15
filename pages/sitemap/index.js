import Layout from '../../components/layout';
import styles from './styles/sitemap.module.sass';
import Link from 'next/link';

const Sitemap = ({setPageTitle}) => {
  const breadcrumbs = [
    {
      title: '網站導覽',
    },
  ];

  return (
    <Layout
      pageTitle={'網站導覽'}
      setPageTitle={setPageTitle}
      pageSub={`提供網頁無障礙導覽相關資訊`}
      img={{
        img_main: `/images/park/title-obj-site-01.png`,
      }}
      breadcrumbs={breadcrumbs}
    >
      <div className="container">
        <p className={styles['paragraph']}>
          本網站的設計致力於符合無障礙的標準，其中並提供便捷鍵 ( Accesskey )
          的設定，以幫助障礙人士使用。
          <br />
          本網站依無障礙網頁設計原則而建置，網站的主要樣版內容分為三個大區塊：
          <br />
          1.上方導覽連結區 2.中央主要內容區塊 3. 下方功能區塊。
          <br />
          註：IE Accesskey 請搭配 Alt 使用；Firefox Accesskey請搭配
          Shift+Alt使用，快速鍵(Access Key、Hot
          Key)：提供在不使用或不能使用滑鼠操作網頁的環境，也能快速操作網頁。
          <br />
          本站的便捷鍵 ( Accesskey,也稱為快速鍵 ) 設定如下：
          <br />
          ALT + U：上方導覽連結區，此區塊列有本網站的連結。
          <br />
          ALT + C：中間主要內容區，此區塊呈現各網頁的網頁。
          <br />
          ALT + Z：下方功能區，並包括下一層所屬連結與其他相關資訊。
          <br />
          ※日期選擇器的彈跳視窗可以使用鍵盤的方向鍵「↑」、「↓」、「←」、「→」選擇日期。
        </p>
        <div className="row mt-5 text-center">
          <div className="col-md-3 mb-4">
            <Link href="/about">
              <a className={styles['wrapper']} title={"移至新北大都會公園介紹"}>
                <img src="/images/sitemap/nav-icon-01.png" alt="" />
                <div className={styles['title']}>新北大都會公園介紹</div>

                <div className={styles['sub']}>新北大都會公園圖文介紹</div>
              </a>
            </Link>
          </div>
          <div className="col-md-3 mb-4">
            <Link href="/maps">
              <a className={styles['wrapper']} title={"移至園區設施地圖"}>
                <img src="/images/sitemap/nav-icon-02.png" alt="" />
                <div className={styles['title']}>園區設施地圖</div>

                <div className={styles['sub']}>
                  提供新北大都會公園園區設施地圖位置相關資訊
                </div>
              </a>
            </Link>
          </div>
          <div className="col-md-3 mb-4">
            <Link href="/park-rental">
              <a className={styles['wrapper']} title={"移至園區場地租借"}>
                <img src="/images/sitemap/nav-icon-03.png" alt="" />
                <div className={styles['title']}>園區場地租借</div>

                <div className={styles['sub']}>提供園區各場地租借相關事宜</div>
              </a>
            </Link>
          </div>
          <div className="col-md-3 mb-4">
            <Link href="/news">
              <a className={styles['wrapper']} title={"移至最新消息"}>
                <img src="/images/sitemap/nav-icon-04.png" alt="" />
                <div className={styles['title']}>最新消息</div>

                <div className={styles['sub']}>
                  提供四大園區最新消息及即時公布欄訊息
                </div>
              </a>
            </Link>
          </div>

          <div className="col-md-3 ml-auto mb-4">
            <Link href="/video">
              <a className={styles['wrapper']} title={"移至影音專區"}>
                <img src="/images/sitemap/nav-icon-05.png" alt="" />
                <div className={styles['title']}>影音專區</div>

                <div className={styles['sub']}>
                  提供新北大都會公園相關影音訊息
                </div>
              </a>
            </Link>
          </div>
          <div className="col-md-3 mr-auto mb-4">
            <Link href="/activity">
              <a className={styles['wrapper']} title={"移至活動行事曆"}>
                <img src="/images/sitemap/nav-icon-06.png" alt="" />
                <div className={styles['title']}>活動行事曆</div>

                <div className={styles['sub']}>
                  提供新北大都會公園各園區相關活動訊息
                </div>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Sitemap;
