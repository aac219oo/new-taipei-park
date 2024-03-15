import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout';
import styles from './styles/security.module.sass';
import { sendGetRequest } from '../../api/helper';

const ParkRental = ({setPageTitle}) => {
  const breadcrumbs = [
    {
      title: '網路安全政策',
    },
  ];
  // hooks
  const [content, setContent] = useState();
  const URL = '/api/content?id=Web-security&culture=1';

  useEffect(() => {
    (async () => {
      const result = await sendGetRequest(URL);
      setContent(result.Description);
    })();
  }, []);

  return (
    <Layout
      pageTitle={'網路安全政策'}
      setPageTitle={setPageTitle}
      // pageSub={`提供園區各場地租借相關事宜`}
      img={{img_main: `/images/park/title-obj-site-01.png`, }}
      breadcrumbs={breadcrumbs}
      type={'without-button'}
    >
      <div className="container pt-3" dangerouslySetInnerHTML={{ __html: content }} ></div>
    </Layout>
  );
};

export default ParkRental;
