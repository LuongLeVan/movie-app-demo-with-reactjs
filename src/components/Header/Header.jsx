import React, { useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import logo from '/assets/tmovie.png'
import './Header.scss'
const mainNav = [
  {
    display: 'Trending',
    path: '/',
  },
  {
    display: 'Movies',
    path: '/movies',
  },
  {
    display: 'TV Series',
    path: '/series',
  },
  {
    display: 'Search',
    path: '/search',
  }
];

const Header = () => {

  const { pathname } = useLocation()

  const activeNav = mainNav.findIndex(e => e.path === pathname)

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
      
      <div className='header__wrapper'>
       {/*  <div className='header__menu'>
          {mainNav.map((item, index) => (
            <Link to={item.path} key={index} className='header__menu-item'>
              <span className={`${index === activeNav ? 'active' : ''}`}>{item.display}</span>

            </Link>
          ))}
        </div> */}
        <div className='logo-container'>
          <Link to="/">
{/*             <h3 className='title_App'>MOVIE APP</h3>
 */}            <img className='logo' src={logo} alt="" />
           
          </Link>
        </div>
      {/*   <div className="header__infor">
          <span className='header__info-item'><i className='bx bx-user'></i></span>
          <span className='header__info-item'><i className='bx bx-search'></i></span>
          <span className='header__info-item'><i className='bx bx-cart'></i></span>
        </div> */}
      </div>
    </div>
  )
}

export default Header