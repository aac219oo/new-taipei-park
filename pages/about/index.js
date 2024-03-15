import Layout from '../../components/layout';
import AboutPark from '../../components/about';
import { sendPostRequest } from '../../api/helper';

export default function About({ parkData, facilityData, setPageTitle }) {
  const breadcrumbs = [{ title: '新北大都會公園介紹' }];

  return (
    <Layout
      pageTitle={"新北大都會公園介紹"}
      setPageTitle={setPageTitle}
      pageSub="新北大都會公園圖文介紹"
      img={{ img_sub: '/images/about/title-obj-park-intro-01.png' }}
      breadcrumbs={breadcrumbs}
      bgColor="#f5f0e0"
    >
      <AboutPark parkData={parkData} facilityData={facilityData} />
    </Layout>
  );
}

export async function getServerSideProps() {
  const payload1 = { Limit: 10000, Offset: 0, Culture: 1 };
  const payload2 = {
    ParkID: null,
    FacilityType: null,
    Search: '',
    Sort: 'SequenceNo',
    Order: 'desc',
    Limit: 10000,
    Offset: 0,
    Culture: 1,
  };

  const [parkData, facilityData] = await Promise.all([
    sendPostRequest('/api/park/Paging', payload1),
    sendPostRequest('/api/facility/Paging', payload2),
  ]);

  return { props: { parkData, facilityData } };
}
