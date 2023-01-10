import React, { useContext, useEffect, useState } from 'react'

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


  return (

    <Helmet title='TV Series'>
      <div>
        <div className={cx('wrapper')}>
          <h3>TV SERIES</h3>
          <div style={{display: 'flex'}}>
            <div>
              {typeMenu.map((item, index) => (
                <div key={index} onClick={() => setTypeTV(item.id)}>{item.name}</div>
              ))}
            </div>
            <div>
            {YearTV.map((item, index) => (
                <div key={index} onClick={() => setYearTV(item)}>{item}</div>
              ))}
            </div>
          </div>
          <div className="grid wide">
            <div className="row">
              {listFilm.map((item,index)=> (
                <div className="l-4 m-6 c-12" key={index}>
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