import Layout from '../../components/layout';
import Videos from '../../components/video';
import Pagination from '../../components/layout/pagination';
import { sendGetRequest, sendPostRequest } from '../../api/helper';
import { useEffect, useState } from 'react';

function Video({ params, limit, data, setPageTitle }) {
  const [lists, setLists] = useState();
  const [selectedPage, setSelectedPage] = useState();
  const [searching, setSearching] = useState(false);
  const [searchString, setSearchString] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [stopDate, setStopDate] = useState(null);
  const [category, setCategory] = useState('');

  useEffect(() => {
    setLists(data?.Data);
  }, [data]);

  useEffect(() => {
    (async () => {
      const payload = {
        Limit: limit,
        Offset: selectedPage * limit,
        Culture: 1,
        Search: searchString,
        StartTime: startDate ?? null,
        EndTime: stopDate ?? null,
        Category: category,
      };
      const res = await sendPostRequest('/api/videoArea/Paging', payload);
      setLists(res?.Data);
    })();
  }, [searching, searchString, selectedPage, category]);

  const breadcrumbs = [{ title: '影音專區' }];

  return (
    <Layout
      pageTitle={'影音專區'}
      setPageTitle={setPageTitle}
      pageSub={`目前總共有 <span>${lists?.total}</span> 則影音訊息`}
      img={{
        img_main: `/images/video/title-obj-video-01.png`,
        img_sub: `/images/video/title-obj-video-02.png`,
      }}
      breadcrumbs={breadcrumbs}
    >
      <Videos
        data={lists} 
        params={params} 
        searchString={setSearchString}
        setSearching={setSearching}
        setStartDateString={setStartDate}
        setStopDateString={setStopDate}
        categoryString={category}
        setCategoryString={setCategory}
        setSelectedPageString={setSelectedPage} />
      {lists?.total > 0 && (
        <Pagination
          pageCount={Math.ceil(lists.total / limit)}
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
        />
      )}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { locale } = context;
  const limit = 10;
  const payload = {
    Limit: limit,
    Offset: 0,
    Culture: 1,
  };
  const data = {};
  const params = await sendGetRequest('/api/videoArea/Index?culture=1');

  return {
    props: {
      data,
      params,
      limit,
      locale,
    },
  };
}

export default Video;
