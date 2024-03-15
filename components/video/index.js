import { useState, useEffect } from 'react';
//import DatePicker from "react-datepicker";
import Popup from './popup';
import styles from './styles/video.module.sass';
import "react-datepicker/dist/react-datepicker.css";

export default function Video(props) {
  const { data, params, searchString, setSearching, setStartDateString, setStopDateString, categoryString, setCategoryString, setSelectedPageString } = props;
  const [popup, setPopup] = useState('');
  const [categoryList, setCategoryList] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [stopDate, setStopDate] = useState('');
  const [activeElement, setActiveElement] = useState(null);

  useEffect(() => {
    let categoryList = [
      { name: '所有影片', value: '' }
    ];
    params.Formatter.VideoCategoryFormatter.map((item) => {
      categoryList.push({ name: item.Text, value: item.Value });
    });
    setCategoryList(categoryList);
  }, []);

  useEffect(() => {
    if (popup === '') {
      if (activeElement) {
        activeElement.focus();
      }
    }
    else {
      setActiveElement(document.activeElement);
      document.activeElement.blur();
      var icons = document.getElementsByClassName("play_button");
      console.log(icons);
      if (icons && icons.length > 0) {
        icons[icons.length - 1].focus();
        console.log(icons[icons.length - 1]);
      }
    }
  }, [popup]);

  return (
    <>
      <div className="container">
        <div className="row mt-4">
          <div className="col-md-12 mb-4">
            <div className={styles['search-area-mobile']}>
              <label htmlFor="search" className="d-none">
                請輸入關鍵字搜尋
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="請輸入關鍵字搜尋"
                title="請輸入關鍵字搜尋"
                id="search"
              />
              <button className={styles['btn-search']} type="submit">
                <img src="/images/video/icon-search.png" alt="搜尋" />
                <span className='d-none'>搜尋</span>
              </button>
            </div>
          </div>
          <div className={styles['search-bar']}>
            <div className={`${styles['select-out']} col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12`}>
              <div className={styles['select-desc']}>類別</div>
              {categoryList.map(c => (
                <div
                  key={c.name}
                  value={c.value}
                  className={`${styles['select-category']} ${categoryString === c.value ? styles['category-active'] : ''}`}
                  onClick={() => {
                    setCategoryString(c.value);
                    setSelectedPageString(0);
                  }}
                ><a title={"切換至" + c.name + "類別"} href="#!">{c.name}</a></div>
              ))}
            </div>

            <div className={`${styles['floatleft']} ${styles['paddingright05']} ${styles['width095']} col-xl-2 col-lg-2 ${styles['col-md-55']} ${styles['col-sm-55']} ${styles['col-55']} mt-1`}>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                placeholderText="開始日期"
                title="請輸入開始日期"
                className="form-control" />
            </div>
            <div className={`${styles['floatleft']} ${styles['zindex2']} ${styles['width001']} ${styles['alignicon']} `} >～</div>
            <div className={`${styles['floatright']} ${styles['paddingleft05']} col-xl-2 col-lg-2 ${styles['col-md-55']} ${styles['col-sm-55']} ${styles['col-55']} mt-1`}>
              <input
                type="date"
                value={stopDate}
                onChange={(e) => setStopDate(e.target.value)}
                placeholderText="結束日期"
                title="請輸入結束日期"
                className="form-control" />
            </div>

            <label htmlFor="search-input" className="d-none">
              請輸入關鍵字搜尋
            </label>
            <input
              type="text" 
              id='search-input' 
              placeholder="請輸入關鍵字搜尋" 
              title="請輸入關鍵字搜尋" 
              className={`${styles['search-input']} col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12`} 
            />
            <button
              className={styles['search-btn']}
              type="submit"
              onClick={() => {
                searchString(document.querySelector('#search-input').value);
                setStartDateString(startDate);
                setStopDateString(stopDate);
                setSearching(true);
              }}
            >
              <img src="/images/video/icon-search.png" alt="搜尋" />
              <span className="d-none">搜尋</span>
            </button>
          </div>
          {data?.rows?.map((item, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <a
                href="#"
                title={item.Title + "(開啟懸浮視窗)"}
                className={styles['video-wrapper'] + " play_button"}
                onClick={() => setPopup(item)}
              >
                <div className={styles['img-wrapper']}>
                  <img
                    src="/images/home/icon-video-play.png"
                    className={styles['play-icon']}
                    alt=""
                  />
                  <img
                    src={`https://img.youtube.com/vi/${item.LinkUrl.split('be/')[1]
                      }/hqdefault.jpg`}
                    alt={item.Title}
                    key={item.ID}
                    width="100%"
                  />
                </div>
                <div className={styles['title']}>
                  <span className={styles['type']}>{params?.Formatter?.VideoCategoryFormatter?.find(val => val.Value === item.Category)?.Text}</span>
                  <div className={styles['inside']}>{item.Title}</div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
      <Popup popup={popup} setPopup={setPopup} />
    </>
  );
}
