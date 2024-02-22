import React, { useState, useEffect, useContext } from 'react'
import classNames from 'classnames/bind'
import axios from 'axios'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import styles from './Movies.module.scss'
import PaginationSize from 'components/Panigation/Panigation'
import CardItem from 'components/CardItem/CardItem'
import Helmet from 'components/Helmet/Helmet'
import { MovieConntext } from '/Context'

const cx = classNames.bind(styles)
let Year = []
for (let i = 2000; i <= 2023; i++) {
  const element = i;
  Year.push(element)
}

const language = [
  {
    name: 'en',
    title: 'English'
  },
  {
    name: 'fr',
    title: 'French'
  },
  {
    name: 'de',
    title: 'German'
  },
  {
    name: 'ms',
    title: 'Malay'
  },
  {
    name: 'zh',
    title: 'Mandarin'
  }
]


const Movies = () => {
  const { contentFilter, setYear, setType, setPage, totalPage, types } = useContext(MovieConntext)
  const [typeMenu, setTypeMenu] = useState([])




  const fetchTypeMenu = async () => {
    const { data } = await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=6de13cb06459580e8f7ab054d9dbb28e&language=en-US')
    setTypeMenu(data.genres);
  }



  useEffect(() => {
    fetchTypeMenu();
  })


  const handleScroll = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (

    <Helmet title='Movies'>
      <div>
        <div className={cx('wrapper')}>
          <div onClick={handleScroll}><span className={cx('scroll-button')}><ArrowUpwardIcon /></span></div>
          <h3>Movies</h3>


          <div className={cx('wrapper_select')}>
            <div className={cx('navbar')}>
              <div className={cx('dropdown')} style={{ backgroundColor: '#000' }}>
                <button className={cx('dropbtn')}>Type
                  <ArrowDropDownIcon />
                </button>
                <div className={cx("dropdown-content")}>

                  <div className={cx("row")}>
                    <div className={cx("column")} >
                      {typeMenu.slice(0, 6).map((item, index) => (
                        <div className={cx('item_select')} key={index} onClick={() => setType(item.id)}>{item.name}</div>
                      ))}
                    </div>
                    <div className={cx("column")} >
                      {typeMenu.slice(7, 13).map((item, index) => (
                        <div className={cx('item_select')} key={index} onClick={() => setType(item.id)}>{item.name}</div>
                      ))}
                    </div>


                  </div>
                </div>
              </div>
            </div>

            <div className={cx('navbar')} style={{ marginLeft: '12px' }}>
              <div className={cx('dropdown')} style={{ backgroundColor: '#000' }}>
                <button className={cx('dropbtn')}>Year
                  <ArrowDropDownIcon />
                </button>
                <div className={cx("dropdown-content")}>

                  <div className={cx("row")}>
                    <div className={cx("column")}>
                      {Year.slice(0, 6).map((item, index) => (
                        <div className={cx('item_select')} key={index} onClick={() => setYear(item)}>{item}</div>
                      ))}
                    </div>
                    <div className={cx("column")}>
                      {Year.slice(7, 13).map((item, index) => (
                        <div className={cx('item_select')} key={index} onClick={() => setYear(item)}>{item}</div>
                      ))}
                    </div>

                    <div className={cx("column")}>
                      {Year.slice(14, 20).map((item, index) => (
                        <div className={cx('item_select')} key={index} onClick={() => setYear(item)}>{item}</div>
                      ))}
                    </div>

                    <div className={cx("column")}>
                      {Year.slice(21, 24).map((item, index) => (
                        <div className={cx('item_select')} key={index} onClick={() => setYear(item)}>{item}</div>
                      ))}
                    </div>


                  </div>
                </div>
              </div>
            </div>
          </div>



          <div className="grid wide">
            <div className="row">
              {contentFilter.map((item, index) => (
                <div className="l-3 m-4 c-6" key={index}>
                  <CardItem name={item.title}
                    types
                    id={item.id}
                    date={item.release_date}
                    image={item.poster_path}
                    title={item.title}
                    mark={item.vote_average} />
                </div>
              ))}
            </div>
          </div>
          <div className={cx('wrapper-panigation')}><PaginationSize Movie={true} setPage={setPage} totalPage={totalPage > 500 ? 500 : totalPage} /></div>
        </div>
      </div>
    </Helmet>
  )
}

export default Movies