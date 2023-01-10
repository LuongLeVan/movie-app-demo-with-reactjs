import React, { useContext, useEffect, useState } from 'react'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import classNames from 'classnames/bind'
import styles from './Home.module.scss'
import CardItem from 'components/CardItem/CardItem'
import PaginationSize from 'components/Panigation/Panigation';
import Helmet from 'components/Helmet/Helmet';
import { MovieConntext } from 'Context';


const cx = classNames.bind(styles)


const Home = () => {
  const {setPageTrending, content, totalPageTrending } = useContext(MovieConntext)



  

const handleScroll = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

  return (

    <Helmet title='Home'>
      <div className={cx('wrapper')}>
        <div onClick={handleScroll}><span className={cx('scroll-button') }><ArrowUpwardIcon/></span></div>
        <h3 >TRENDING</h3>
        <div className="grid wide">
          <div className="row">
            {content.map((item, index) => (
              <div className="l-4 m-6 c-12" key={index}>
                <CardItem mediaType={item.media_type} title={item.title} mark={item.vote_average} name={item.name} id={item.id} date={item.release_date} firstDate={item.first_air_date} image={item.poster_path} />
              </div>
            ))}
          </div>
        </div>
        <div className={cx('wrapper-panigation')}><PaginationSize Movie={true} setPage={setPageTrending} totalPage={totalPageTrending > 10 ? 10 : totalPageTrending}/></div>
      </div>
    </Helmet>
  )
}

export default Home