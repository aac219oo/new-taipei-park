import Layout from '../../components/layout';
import GlobalMaps from '../../components/maps';

const Maps = ({setPageTitle}) => {
  const breadcrumbs = [{ title: '園區設施地圖' }];
  return (
    <Layout
      pageTitle={"園區設施地圖"}
      setPageTitle={setPageTitle}
      pageSub="新北大都會公園園區設施地圖介紹"
      img={{ img_sub: '/images/about/title-obj-park-intro-01.png' }}
      breadcrumbs={breadcrumbs}
      bgColor="#f5f0e0"
    >
      <GlobalMaps />
    </Layout>
  );
};

export default Maps;
