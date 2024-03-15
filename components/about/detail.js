import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Slider from 'react-slick';
import { sendPostRequest } from '../../api/helper';
import styles from './styles/about.module.sass';

const settings = {
  arrows: true,
  dots: false,
  lazyLoad: true,
  infinite: true,
  speed: 1250,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
  autoplaySpeed: 4000,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};

export default function Content({ data, isMobile }) {
  const [otherPark, setOtherPark] = useState();
  const [recommend, setRecommend] = useState();

  const router = useRouter();
  useEffect(() => {
    (async () => {
      const payload = {
        ParkID: router.query.id,
        FacilityType: null,
        Search: '',
        Sort: 'SequenceNo',
        Order: 'desc',
        Limit: 9999,
        Offset: 0,
        Culture: 1,
        IsShowRecommend: true
      };

      const res = await sendPostRequest('/api/facility/Paging', payload);
      const recommendResult = res.Data.rows;
      setRecommend(recommendResult);
    })();
  }, [router.query.id]);

  useEffect(() => {
    if (!data.ID) return;
    (async () => {
      const payload = { Limit: 5, Offset: 0, Culture: 1 };
      const res = await sendPostRequest('/api/park/Paging', payload);
      const otherParkResult = res.Data.rows.filter(item => item.ID !== data.ID);
      setOtherPark(otherParkResult);
      // var dots = document.querySelectorAll(".slick-dots button");
      // if (dots && dots.length > 0) {
      //   for (var i = 0; i < dots.length; i++) {
      //     dots[i].setAttribute("title", "切換輪播圖");
      //   }
      // }
    })();
  }, [data.ID]);

  useEffect(() => {
    if (!recommend) return;
  }, [recommend]);

  function getMapFileName(title) {
    switch (title) {
      case '五股濕地區': return 'maps04.png';
      case '都會運動區': return 'maps02.png';
      case '親子休閒區': return 'maps01.png';
      case '微風運河區': return 'maps03.png';
      default: return '';
    }
  }

  return (
    <div className={styles['content']}>
      <div className="container mb-5">
        <div className="row mt-4">
          <div className="col-md-12 mb-3">
            <div className={styles['title']}>{data.Title}</div>
          </div>
        </div>
        {data?.AttachedFiles?.length > 0 && (
          <Slider {...settings} className="slick-detail">
            {data?.AttachedFiles?.map((item, index) => {
              const { FilePath } = item;
              const unThumbImgPath = FilePath.replace('_thumb', '');
              return (
                <img
                  src={(process.env.NEXT_PUBLIC_URL ?? '') + unThumbImgPath}
                  alt={data.Title + '周邊生態環境全景' + (index + 1)}
                  key={index} />
              );
            })}
          </Slider>
        )}
        <div dangerouslySetInnerHTML={{ __html: data.Description.replace(/\n/g, '<br />'), }} className={`${styles['description']} mt-5`} />
        <hr />

        <div className={styles['title']}>【交通地圖】</div>
        <img
          src={(process.env.NEXT_PUBLIC_URL ?? '') + data.TransportImagePath}
          alt={data.Title + "周邊景點及交通路線圖，包含下方遊玩推薦的景點"} />
        <div className="container mt-3">
          <div className="row justify-content-center">
            <Link href={`/maps?park=${router.query.id}`}>
              <a className="strip_btn mx-2" title="移至線上設施地圖檢視">
                <img className="mr-1" src="/images/map-marker.png" alt="" />前往線上地圖檢視
              </a>
            </Link>
          </div>
        </div>
        <hr />

        <div className="text-left">
          <div className={styles['big-title']}>遊玩推薦</div>
          <div className={isMobile ? 'col-12 d-flex flex-nowrap' : 'row my-3'} style={isMobile ? { overflowX: 'scroll' } : {}}>
            {recommend?.map((item, idx) => {
              const { Name, ImagePath, ID, IsShowRecommend } = item;
              return (IsShowRecommend &&
                <div className={isMobile ? 'col-8' : "col-4"} key={idx} style={isMobile ? { padding: '0px 10px' } : {}}>
                  <div className={styles['recommand_area']}>
                    <div className={styles['img_box']}>
                      <img className={styles['infoImg']} src={(process.env.NEXT_PUBLIC_URL ?? '') + ImagePath.replace('_thumb', '')} alt={ Name + "周邊全景" } />
                    </div>
                    <div className={styles['big-title']}>{Name}</div>
                    <div className={styles['links']}>
                      <div className={styles['link']}>
                        <Link href={`/facility-detail?id=${ID}`}>
                          <a className={styles['icon']} title={ "移至" + Name + "相關介紹" }>
                            <img src="/images/about/rec-att-icon-intro.png" alt={ Name + "相關介紹" } />
                          </a>
                        </Link>
                        <p>相關介紹</p>
                      </div>
                      <div className={styles['link']}>
                        <Link href={`/maps?facility=${ID}`}>
                          <a className={styles['icon']} title={ "移至" + Name + "所在位置" }>
                            <img src="/images/about/rec-att-icon-map.png" alt={ Name + "所在位置" } />
                          </a>
                        </Link>
                        <p>所在位置</p>
                      </div>
                      <div className={styles['link']}>
                        <a
                          href={`https://maps.google.com/?q=${item.Latitude},${item.Longitude}`}
                          title={ "移至" + Name + " Google地圖(開啟新視窗)" }
                          target="_blank"
                          className={styles['icon']}
                          rel="noopener noreferrer">
                          <img src="/images/about/rec-att-icon-route.png" alt={ Name + "路線導引" } />
                        </a>
                        <p>路線導引</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <hr />

        <div className="text-center">
          <div className={styles['big-title']} style={{ marginBottom: `${isMobile ? 2 : 6}rem` }}>其他園區介紹</div>
          <div className={`col-12 d-flex ${isMobile ? 'flex-nowrap' : 'justify-content-center'}`}
            style={isMobile ? { overflowY: 'hidden', overflowX: 'scroll' } : {}}>
            {otherPark?.map((item, idx) => {
              const { FacilityCount, Name, ThumbImagePath, ID } = item;
              return (
                <Link key={idx} href={`/about/detail?id=${ID}`} replace>
                  <a className={styles['other_area']} key={idx} title={ "移至" + Name } >
                    <div className={styles['gallery']}>
                      <img src={(process.env.NEXT_PUBLIC_URL ?? '') + ThumbImagePath} alt={Name + "周邊導覽"} />
                    </div>
                    <div className={styles['info']}>
                      <div className={styles['map']}>
                        <img src={`/images/maps/${getMapFileName(Name)}`} alt="地圖" />
                      </div>
                      <div className={styles['text']}>
                        <div className={styles['place']}>
                          <img src="/images/about/icon-map-location.png" className={`${styles['icon-loc']} mr-1`} alt="" />
                          <span>{Name}</span>
                        </div>
                        <small>既有設施 <span>{FacilityCount}</span> 項</small>
                      </div>
                    </div>
                  </a>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <a
      href="#!"
      title="上一張輪播圖"
      className={className}
      style={{
        ...style,
        display: 'block',
        transform: 'scale(1, 1) translate(50px, -20px)',
        width: '50px',
        height: 'auto',
        zIndex: 5,
      }}
      onClick={onClick}>
      <img src="/images/home/slider-arrow-prev.png" alt="上一張" />
    </a>
  );
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <a
      href="#!"
      title="下一張輪播圖"
      className={className}
      style={{
        ...style,
        display: 'block',
        transform: 'scale(-1, 1) translate(50px, -20px)',
        width: '50px',
        height: 'auto',
        zIndex: '10',
      }}
      onClick={onClick}
    >
      <img src="/images/home/slider-arrow-prev.png" alt="下一張" />
    </a>
  );
}
