import React, { useEffect, useState } from 'react'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import classNames from 'classnames/bind'
import axios from 'axios'

import styles from './Home.module.scss'
import CardItem from 'components/CardItem/CardItem'
import PaginationSize from 'components/Panigation/Panigation';


const cx = classNames.bind(styles)


const Home = () => {
  const [content, setContent] = useState([])
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState()



  const fetchTrending = async () => {
    const { data } = await axios.get(`
    https://api.themoviedb.org/3/trending/all/day?api_key=6de13cb06459580e8f7ab054d9dbb28e&page=${page}`)
    setContent(data.results)
    setTotalPage(data.total_pages)
  }


  useEffect(() => {
    fetchTrending()
  }, [page])

const handleScroll = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

  return (

    <div className={cx('wrapper')}>
      <div onClick={handleScroll}><span className={cx('scroll-button') }><ArrowUpwardIcon/></span></div>
      <h3 >TRENDING</h3>
      <div className="grid wide">
        <div className="row">
          {content.map((item, index) => (
            <div className="l-4 m-6 c-12" key={index}>

              <CardItem title={item.title} mark={item.vote_average} name={item.name} id={item.id} date={item.release_date} firstDate={item.first_air_date} image={item.poster_path} />

            </div>
          ))}

        </div>
      </div>
      <div className={cx('wrapper-panigation')}><PaginationSize setPage={setPage} totalPage={totalPage > 10 ? 10 : totalPage}/></div>
    </div>
  )
}

export default Home