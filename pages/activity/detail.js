import Layout from '../../components/layout';
import Detail from '../../components/activity/detail';
import DownloadArea from '../../components/download';
import { sendGetRequest } from '../../api/helper';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function DetailActivity({setPageTitle}) {
  const router = useRouter();
  const [detail, setDetail] = useState({});
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;

    (async () => {
      const detail = await sendGetRequest('/api/activity/Details?id=' + id);
      setDetail(detail);
    })();
  }, [id]);

  const breadcrumbs = [
    { title: '活動行事曆', link: '/activity/list' },
    { title: detail?.Title },
  ];

  return (
    <Layout
      pageTitle={"活動行事曆"}
      setPageTitle={setPageTitle}
      pageSub=""
      img={{ img_main: '/images/activity/title-obj-activity-01.png' }}
      breadcrumbs={breadcrumbs}
      type="activity-calendar"
    >
      <div className="container">
        <Detail detail={detail} />

        {detail?.AttachedFiles?.length > 0 && (
          <DownloadArea data={detail?.AttachedFiles} />
        )}
      </div>
    </Layout>
  );
}
