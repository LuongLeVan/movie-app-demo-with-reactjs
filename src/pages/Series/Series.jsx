import React, { useContext, useEffect, useState } from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import styles from './Series.module.scss'
import classNames from 'classnames/bind'
import Helmet from 'components/Helmet/Helmet'
import axios from 'axios'
import CardItem from '/components/CardItem/CardItem'
import PaginationSize from '/components/Panigation/Panigation'
import { MovieConntext } from 'Context'


const cx = classNames.bind(styles)
let YearTV = []
for (let i = 2000; i <= 2023; i++) {
  const element = i;
  YearTV.push(element)
}


const Series = () => {
  const { listFilm, setYearTV, yearTV, setTypeTV, setPageTV, totalPageTV, sencondType, setSencondType } = useContext(MovieConntext)
  const [typeMenu, setTypeMenu] = useState([])

  const fetchListType = async () => {
    const { data } = await axios.get('https://api.themoviedb.org/3/genre/tv/list?api_key=6de13cb06459580e8f7ab054d9dbb28e&language=en-US')
    setTypeMenu(data.genres)
  }

  useEffect(() => {
    fetchListType()
  })

  const handleScroll = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


  return (

    <Helmet title='TV Series'>
      <div>
        <div className={cx('wrapper')}>
          <h3>TV series</h3>
          <div onClick={handleScroll}><span className={cx('scroll-button')}><ArrowUpwardIcon /></span></div>

          <div className={cx('wrapper_select')}>
            <div className={cx('navbar')}>
              <div className={cx('dropdown')} style={{backgroundColor: '#000'}}>
                <button className={cx('dropbtn')}>Type
                  <ArrowDropDownIcon />
                </button>
                <div className={cx("dropdown-content")}>

                  <div className={cx("row")}>
                    <div className={cx("column")}>
                      {typeMenu.slice(0, 6).map((item, index) => (
                        <div className={cx('item_select')} key={index} onClick={() => setTypeTV(item.id)}>{item.name}</div>
                      ))}
                    </div>
                    <div className={cx("column")}>
                      {typeMenu.slice(7, 13).map((item, index) => (
                        <div className={cx('item_select')} key={index} onClick={() => setTypeTV(item.id)}>{item.name}</div>
                      ))}
                    </div>


                  </div>
                </div>
              </div>
            </div>

            <div className={cx('navbar')} style={{ marginLeft: '12px' }}>
              <div className={cx('dropdown')} style={{backgroundColor: '#000'}}>
                <button className={cx('dropbtn')}>Year
                  <ArrowDropDownIcon />
                </button>
                <div className={cx("dropdown-content")}>

                  <div className={cx("row")}>
                    <div className={cx("column")}>
                      {YearTV.slice(0, 6).map((item, index) => (
                        <div className={cx('item_select')} key={index} onClick={() => setYearTV(item)}>{item}</div>
                      ))}
                    </div>
                    <div className={cx("column")}>
                      {YearTV.slice(7, 13).map((item, index) => (
                        <div className={cx('item_select')} key={index} onClick={() => setYearTV(item)}>{item}</div>
                      ))}
                    </div>

                    <div className={cx("column")}>
                      {YearTV.slice(14, 20).map((item, index) => (
                        <div className={cx('item_select')} key={index} onClick={() => setYearTV(item)}>{item}</div>
                      ))}
                    </div>

                    <div className={cx("column")}>
                      {YearTV.slice(21, 24).map((item, index) => (
                        <div className={cx('item_select')} key={index} onClick={() => setYearTV(item)}>{item}</div>
                      ))}
                    </div>


                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid wide">
            <div className="row">
              {listFilm.map((item, index) => (
                <div className="l-3 m-4 c-6" key={index}>
                  <CardItem name={item.name}
                    sencondType
                    id={item.id}
                    date={item.first_air_date}
                    image={item.poster_path}
                    title={item.name}
                    mark={item.vote_average} />
                </div>
              ))}
            </div>
            <div className={cx('wrapper-panigation')}><PaginationSize Movie={false} setPageTV={setPageTV} totalPageTV={totalPageTV > 500 ? 500 : totalPageTV} /></div>

          </div>
        </div>
      </div>
    </Helmet>
  )
}

export default Series