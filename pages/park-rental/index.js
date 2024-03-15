import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout';
import styles from './styles/park.module.sass';
import { sendGetRequest } from '../../api/helper';
import DownloadArea from '../../components/download';

const ParkRental = ({setPageTitle}) => {
  const breadcrumbs = [
    {
      title: '園區場地租借說明',
    }
  ];
  // hooks
  const [content, setContent] = useState();
  const [files, setFiles] = useState();

  const PARK_RENTAL_URL = '/api/content?id=park-rental&culture=1';

  useEffect(() => {
    (async () => {
      const result = await sendGetRequest(PARK_RENTAL_URL);
      setContent(result.Description);
      setFiles(result.AttachedFiles);
    })();
  }, []);
  return (
    <Layout
      pageTitle={'園區場地租借說明'}
      setPageTitle={setPageTitle}
      pageSub={`提供園區各場地租借相關事宜`}
      img={{ img_main: `/images/park/title-obj-site-01.png` }}
      breadcrumbs={breadcrumbs}
      type={'online-rental'}
    >
      {/* <div className="container"><DownloadArea data={files} /></div> */}
      <div className="container pt-3" dangerouslySetInnerHTML={{ __html: content }}></div>
    </Layout>
  );
};

export default ParkRental;
