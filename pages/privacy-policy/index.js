import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout';
import styles from './styles/privacy.module.sass';
import { sendGetRequest } from '../../api/helper';

const ParkRental = ({setPageTitle}) => {
  const breadcrumbs = [
    {
      title: '隱私權及資訊安全宣告',
    },
  ];
  // hooks
  const [content, setContent] = useState();

  const URL = '/api/content?id=Privacy-policy&culture=1';

  useEffect(() => {
    (async () => {
      const result = await sendGetRequest(URL);
      setContent(result.Description);
    })();
  }, []);

  return (
    <Layout
      pageTitle={"隱私權及資訊安全宣告"}
      setPageTitle={setPageTitle}
      // pageSub={`提供園區各場地租借相關事宜`}
      img={{
        img_main: `/images/park/title-obj-site-01.png`,
      }}
      breadcrumbs={breadcrumbs}
      type={'without-button'}
    >
      <div
        className="container pt-3"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </Layout>
  );
};

export default ParkRental;
