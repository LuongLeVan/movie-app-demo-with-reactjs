import React, { useState, useEffect } from 'react'
import classNames from 'classnames/bind'
import axios from 'axios'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';


import styles from './Movies.module.scss'
import CardItem from 'components/CardItem/CardItem'
import PaginationSize from 'components/Panigation/Panigation'

const cx = classNames.bind(styles)


const Movies = () => {
  const [content, setContent] = useState([])
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState()
  const fetchMovie = async () => {
    const { data } = await axios.get(`
      https://api.themoviedb.org/3/discover/movie?api_key=6de13cb06459580e8f7ab054d9dbb28e&language=en-US&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate
      `)
    setContent(data.results)
    setTotalPage(data.total_pages)
    console.log(data);
  }
  
  useEffect(() => {
    fetchMovie()
  }, [page])

  
  const handleScroll = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (

    <div>
      <div className={cx('wrapper')}>
      <div onClick={handleScroll}><span className={cx('scroll-button') }><ArrowUpwardIcon/></span></div>
        <h3>MOVIES</h3>
        <div className="grid wide">
          <div className="row">
            {content.map((item, index) => (
              <div className='l-4 m-6 c-12' key={index}>
                <CardItem name={item.title}
                  id={item.id}
                  date={item.release_date}
                  image={item.poster_path}
                  title={item.title}
                  mark={item.vote_average} />
              </div>
            ))}

          </div>
        </div>
        <div className={cx('wrapper-panigation')}><PaginationSize setPage={setPage} totalPage={totalPage > 500 ? 500 : totalPage} /></div>
      </div>
    </div>
  )
}

export default Movies