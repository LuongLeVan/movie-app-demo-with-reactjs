import React from 'react'
import { Link } from 'react-router-dom'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import './Footer.scss'


const Footer = () => {
  return (

    <div className='wrapper'>
      <div className="container">
        <div className="grid wide">
          <div className="row">
            <div className="l-3 m-6 c-12 ">
              <div className='footer-item'> <Link to={"/"}>Home</Link></div>
              <div className='footer-item'> <Link to={"/"}>Contact us</Link></div>
              <div className='footer-item'> <Link to={"/"}>Term of service</Link></div>
              <div className='footer-item'> <Link to={"/"}>About us</Link></div>

            </div>
            <div className="l-3 m-6 c-12 ">
              <div className='footer-item'><Link to={'/'}>Live</Link></div>
              <div className='footer-item'><Link to={'/'}>FAQ</Link></div>
              <div className='footer-item'><Link to={'/'}>Premium</Link></div>
              <div className='footer-item'><Link to={'/'}>Privacy policy</Link></div>

            </div>
            <div className="l-3 m-6 c-12 ">
              <div className='footer-item'><Link to={'/'}>You must watch</Link></div>
              <div className='footer-item'><Link to={'/'}>Recent release</Link></div>
              <div className='footer-item'><Link to={'/'}>TOP IMDB</Link></div>

            </div>

            <div className="l-3 m-6 c-12 ">
              <h3>Contact by</h3>
              <div className='container__social'>
                <Link to={'https://www.facebook.com'} target='_blank' className='footer-item'><FacebookIcon /></Link>
                <Link to={'https://www.instagram.com'} target='_blank' className='footer-item'><InstagramIcon /></Link>
                <Link to={'https://twitter.com/home'} target='_blank' className='footer-item'><TwitterIcon /></Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Footer