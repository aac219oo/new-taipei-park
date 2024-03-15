import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout';
import styles from './styles/facility-detail.module.sass';
import { sendGetRequest } from '../../api/helper';
import { useRouter } from 'next/router';
import Slider from 'react-slick';
import Link from 'next/link';

const ParkRental = ({setPageTitle}) => {
  const breadcrumbs = [
    {
      title: '設施介紹',
    },
  ];
  const slickSettings = {
    arrows: true,
    dots: false,
    lazyLoad: true,
    infinite: true,
    speed: 1250,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  // hooks
  const [content, setContent] = useState();
  const [slickImg, setSlickImg] = useState();
  const [pageName, setPageName] = useState();
  const router = useRouter();

  useEffect(() => {
    if (!router.query.id) return;
    const URL = `/api/facility/Details?id=${router.query.id}`;
    (async () => {
      const result = await sendGetRequest(URL);
      setContent(result?.Description);
      setSlickImg(result?.AttachedFiles);
      setPageName(result?.Name);

      // var dots = document.querySelectorAll(".slick-dots button");
      // if (dots && dots.length > 0) {
      //   for (var i = 0; i < dots.length; i++) {
      //     dots[i].setAttribute("title", "切換輪播圖");
      //   }
      // }
    })();
  }, [router.query.id]);

  return (
    <Layout
      pageTitle={pageName}
      setPageTitle={setPageTitle}
      pageSub=""
      img={{img_main: `/images/park/title-obj-site-01.png`, }}
      breadcrumbs={breadcrumbs}
      type={'without-button'}
    >
      <div className="container pt-4">
        <Slider {...slickSettings} className="slick-detail">
          {slickImg?.map((itm, idx, ary) => {
            const { FilePath } = itm;
            const unThumbImgPath = FilePath.replace('_thumb', '');
            return (
              <div key={idx} className={styles['slickBox']}>
                <img
                  className={styles['slickImg']} key={idx}
                  src={(process.env.NEXT_PUBLIC_URL ?? '') + unThumbImgPath}
                  alt={pageName + '周邊生態環境全景' + (idx + 1)} />
              </div>
            );
          })}
        </Slider>
      </div>
      <div className="container mt-5" dangerouslySetInnerHTML={{ __html: content }} ></div>
      <div className="container">
        <div className="row justify-content-center">
          <button className="circle_btn mx-2" onClick={() => router.back()} title="返回上一頁">
            <img src="/images/arrow-left.png" alt="返回" />
            <span className="d-none">返回</span>
          </button>
          <Link href={`/maps?facility=${router.query.id}`}>
            <a className="strip_btn mx-2" title="移至線上地圖檢視">
              <img className="mr-1" src="/images/map-marker.png" alt="地圖檢視" />前往線上地圖檢視
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default ParkRental;

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
      onClick={onClick}
    >
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
      }}
      onClick={onClick}
    >
      <img src="/images/home/slider-arrow-prev.png" alt="下一張" />
    </a>
  );
}
