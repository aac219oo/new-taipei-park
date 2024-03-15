import { sendGetRequest } from '../../api/helper';
import Layout from '../../components/layout';
import Content from '../../components/about/detail';

export default function AboutDetail({ data, isMobile, setPageTitle }) {
  const breadcrumbs = [
    { title: '新北大都會公園介紹', link: '/about' },
    { title: data?.Name },
  ];
  return (
    <Layout
      pageTitle={"新北大都會公園介紹"}
      setPageTitle={setPageTitle}
      pageSub="新北大都會公園圖文介紹"
      img={{ img_sub: '/images/about/title-obj-park-intro-01.png' }}
      breadcrumbs={breadcrumbs}
      bgColor="#f5f0e0"
    >
      <Content data={data} isMobile={isMobile} />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const data = await sendGetRequest('/api/park/Details?id=' + query.id);

  return { props: { data } };
}
