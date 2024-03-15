import Layout from '../../components/layout';
import Pagination from '../../components/layout/pagination';
import ActivityList from '../../components/home/activity-list';
import { sendGetRequest, sendPostRequest } from '../../api/helper';
import { useEffect, useState } from 'react';

const Activity = ({ params, limit, data, locale, setPageTitle }) => {
  const breadcrumbs = [
    {
      title: '活動行事曆',
    },
  ];

  const [lists, setLists] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);

  useEffect(() => {
    setLists(data?.Data);
  }, [data]);

  useEffect(() => {
    async function getData() {
      const payload = {
        Limit: limit,
        Offset: selectedPage * limit,
        Culture: 1,
      };
      const res = await sendPostRequest('/api/activity/Paging', payload);
      setLists(res?.Data);
    }
    if (selectedPage !== null) {
      getData();
    }
  }, [selectedPage])

  return (
    <Layout
      pageTitle={'活動行事曆'}
      setPageTitle={setPageTitle}
      pageSub={`當月總共有 <span>${lists?.total}</span> 則活動訊息`}
      img={{img_main: `/images/activity/title-obj-activity-01.png`, }}
      breadcrumbs={breadcrumbs}
      type={'activity-list'}
    >
      <div className="container">
        <ActivityList posterData={lists?.rows} params={params} />
        {lists?.total > 0 && (
          <Pagination
            pageCount={Math.ceil(lists?.total / limit)}
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
          />
        )}
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
