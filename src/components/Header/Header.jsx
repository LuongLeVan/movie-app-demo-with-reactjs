import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom';


import logo from '/assets/tmovie.png'
import './Header.scss'
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';


const Header = () => {

  const ref = useRef(null)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        ref.current.classList.add('shrink')
      } else {
        ref.current.classList.remove('shrink')
      }
    })
  }, [])


  return (
    <div className='header' ref={ref}>


      <div className='logo__container'>
        <Link to="/" style={{textDecoration: 'none'}}>
          <div className='title__container'>
            <h3 className='title_App' style={{fontSize: '18px'}}>
              MOVIE APP
            </h3>
       {/*      <span className='icon__title'><SmartDisplayIcon/></span> */}
          </div>
          <img className='logo' src={logo} alt="" />

        </Link>
      </div>
    </div>
  )
}

export default Header