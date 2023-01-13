import React from 'react'
import { img_300, unavailable } from '../Config/Config'
import classNames from 'classnames/bind'
import styles from './CardItem.module.scss'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)

const CardItem = ({
    name,
    id,
    date,
    image,
    title,
    firstDate,
    mark,
    types,
    mediaType,
    secondType,
    tv,
    movie
}) => {
  return (
    <div className={cx('wrapper')} key={id}>
      <Link to={`/${types ? 'movies' : secondType ? 'series' : mediaType === 'movie' ? 'movies' :  tv ? 'series' : movie ? 'movies' : 'series' }/${id}`}>
        <span className={cx('mark')}>{mark===0 ? 7.5 :  mark.toString().slice(0,3)}</span>
        <img className={cx('image')}  src={image ? `${img_300}${image}` : unavailable} alt="poster" />
        <h3 className={cx('title')}>{name ? name : title} ({date ? date.slice(0,4) : firstDate })</h3>
      </Link>
      
    </div>
  )
}

CardItem.propTypes = {
  name: PropTypes.string,
  date: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
  firstDate: PropTypes.string,
  mark: PropTypes.number
}

export default CardItem