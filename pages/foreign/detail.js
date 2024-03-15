import Layout from '../../components/layout';
import Content from '../../components/shared/about/detail';
import DownloadArea from '../../components/shared/download';
import { sendGetRequest, sendPostRequest } from '../../api/helper';
import { useEffect } from 'react';
import massage from '../../data/i18n/messages';
import { useRouter } from 'next/router';

const AboutDetail = ({ data, isMobile, setPageTitle }) => {
  const dataID =
    data.ID === '1e9bd2c4-04e1-41ee-a09a-b9cbc7f5bbba' ? '01'
      : data.ID === '0e2c5577-150d-4e9c-92ea-653d341736d9' ? '02'
        : data.ID === '80ff13d2-22f4-4412-814b-5f11e89a1ea7' ? '03' : '04';
  const router = useRouter();
  const { locale } = router;
  const breadcrumbs = [
    {
      title: massage[`${locale}`].map_title_00,
      link: `/`,
    },
    {
      title: massage[`${locale}`][`map_title_${dataID}`],
    },
  ];

  // 設定外文網站內容
  if (locale !== 'tw') {
    data.Description = massage[`${locale}`][`map_introduc_${dataID}`];
    data.Name = massage[`${locale}`][`map_title_${dataID}`];
    data.Title = massage[`${locale}`][`map_title_${dataID}`];

    dataID == '01' ? data.TransportImagePath = '/images/static/en/wugu.jpg' :
      dataID == '02' ? data.TransportImagePath = '/images/static/en/breeze.jpg' :
        dataID == '03' ? data.TransportImagePath = '/images/static/en/metro.jpg' :
          data.TransportImagePath = '/images/static/en/family.jpg';
  }

  useEffect(() => {
    async function getData() {
      const payload = {
        Limit: 9999,
        Offset: 0,
        ParkID: data.ID,
        Culture: 1,
      };
      await sendPostRequest('/api/facility/Paging', payload);
    }
    getData();
  }, []);

  return (
    <Layout
      pageTitle={massage[`${locale}`].map_title_00}
      setPageTitle={setPageTitle}
      pageSub={''}
      img={{
        img_main: ``,
        img_sub: ``,
      }}
      breadcrumbs={breadcrumbs}>
      <Content data={data} isMobile={isMobile} />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { query } = context;
  const data = await sendGetRequest('/api/park/Details?id=' + query.id);

  return {
    props: {
      data,
    },
  };
}

export default AboutDetail;
