import { useState, useEffect } from 'react';
import Layout from '../../components/layout';
import ActivityCalendar from '../../components/home/activity-calendar';
import { sendGetRequest, sendPostRequest } from '../../api/helper';

const Activity = ({ params, limit, data, locale, setPageTitle }) => {
  const breadcrumbs = [
    {
      title: '活動行事曆',
    },
  ];

  const [lists, setLists] = useState([]);

  useEffect(() => {
    setLists(data?.Data);
  }, [data]);

  useEffect(() => {
    async function getData() {
      const payload = {
        Limit: 9999,
        Offset: limit,
        Culture: 1,
      };
      const data = await sendPostRequest('/api/activity/Paging', payload);

      setLists(data?.Data);
    }
    getData();
  }, []);

  return (
    <Layout
      pageTitle={'活動行事曆'}
      setPageTitle={setPageTitle}
      pageSub={`當月總共有 <span>${lists.total}</span> 則活動訊息`}
      img={{
        img_main: `/images/activity/title-obj-activity-01.png`,
      }}
      breadcrumbs={breadcrumbs}
      type={'activity-calendar'}
    >
      <div className="container">
        <ActivityCalendar posterData={lists} />
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { locale } = context;
  const limit = 12;
  const payload = {
    Limit: limit,
    Offset: 0,
    Culture: 1,
  };
  const data = await sendPostRequest('/api/activity/Paging', payload);
  const params = await sendGetRequest('/api/activity/Index?culture=1');

  return {
    props: {
      data,
      params,
      limit,
      locale,
    },
  };
}

export default Activity;
