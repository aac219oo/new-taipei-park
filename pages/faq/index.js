import { useEffect, useState } from 'react';
import { sendGetRequest, sendPostRequest } from '../../api/helper';
import Layout from '../../components/layout';
import FAQModule from '../../components/faq';
import styles from '../../components/faq/styles/faq.module.sass';

function FAQ({ params, data, setPageTitle }) {
  const breadcrumbs = [{ title: '問與答' }];
  const [searchValue, setSearchValue] = useState('')

  const [selectedCategory, setSelectedCategory] = useState(
    params?.Formatter?.QuestionCategoryFormatter[0]?.Value
  );

  const [lists, setLists] = useState([]);

  useEffect(() => {
    if (searchValue ?? null) {
      const list = []
      lists?.rows?.forEach(d => {
        if (d.Title.search(searchValue) !== -1) {
          list.push(d)
        }
      });
      setLists({total: list.length, rows: list})
    } else {
      setLists(data?.Data);
    }
  }, [data, selectedCategory, searchValue]);

  return (
    <Layout
      pageTitle={"常見問題"}
      setPageTitle={setPageTitle}
      pageSub={`目前總共有 ${lists?.total} 則常見問題資訊`}
      img={{img_main: '/images/faq/title-obj-qa-01.png', img_sub: '/images/faq/title-obj-qa-02.png',}}
      breadcrumbs={breadcrumbs}
    >
      <div className="container">
        <div className="faq-tabs">
          <div className="row mt-5 mb-4">
            {params?.Formatter?.QuestionCategoryFormatter?.map(
              (data, index) => (
                <div key={index} className="col-md-2 col-6 mb-2 text-center border-right">
                  <button
                    className={selectedCategory === data.Value && 'active'}
                    onClick={() => setSelectedCategory(data.Value)}
                  >
                    {data.Text}
                  </button>
                </div>
              )
            )}
            <div className={`${styles['search-area']} col`}>
              <label htmlFor="search-input" className="d-none">請輸入關鍵字搜尋</label>
              <input
                type="text"
                className="form-control"
                placeholder="請輸入關鍵字搜尋"
                title="請輸入關鍵字搜尋"
                id="search-input"
              />
              <div
                className={styles['btn-search']} 
                onClick={() => {setSearchValue(document.querySelector('#search-input').value)}}>
                <img src="/images/video/icon-search.png" alt="搜尋" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <FAQModule data={lists?.rows} selectedCategory={selectedCategory} />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { locale } = context;
  const limit = 9999;
  const payload = {
    Limit: limit,
    Offset: 0,
    Culture: 1,
    Sort: 'Sequence',
    Order: 'desc',
  };
  const data = await sendPostRequest('/api/questionArea/Paging', payload);
  const params = await sendGetRequest('/api/questionArea/Index?culture=1');

  return {
    props: {
      data,
      params,
      limit,
      locale,
    },
  };
}

export default FAQ;
