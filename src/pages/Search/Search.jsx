import * as React from 'react';
import { useContext, useEffect, useRef } from 'react';
import './Search.scss'
import CardItem from 'components/CardItem/CardItem';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Helmet from 'components/Helmet/Helmet';
import PaginationSize from '/components/Panigation/Panigation';
import { MovieConntext } from 'Context';
import FormPropsTextFields from 'components/BasicTextFields/FormPropsTextFields';


const Search = () => {
  const { contentSearch, setPageSearch, totalPageSearch, setTypeSearch, setPageTVSearch, fetchMovieBySearch, setSearchText } = useContext(MovieConntext)

  const SearchMovieList = () => {
    setTypeSearch('movie')
    fetchMovieBySearch()

  }

  const SearchTVList = () => {
    setTypeSearch('tv')
    fetchMovieBySearch()
  }
  const btn = useRef(null)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
        btn.current.classList.add('show')
      } else {
        btn.current.classList.remove('show')
      }
    })
  }, [])

  const handleScroll = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <Helmet title='Search'>
      <div className='wrapper__search'>
        <div  onClick={handleScroll}>
          <span ref={btn}  className={('scroll-button')}><ArrowUpwardIcon /></span>
          </div>
        <FormPropsTextFields setSearchText={setSearchText} fetchMovieBySearch={fetchMovieBySearch} SearchMovieList={SearchMovieList} SearchTVList={SearchTVList} />
        <div className="grid wide">
          <div className="row">
            {contentSearch.map((item, index) => (
              <div className="l-3 m-4 c-6" key={index}>
                <CardItem tv={item.first_air_date} movie={item.release_date} title={item.title} mark={item.vote_average} name={item.name} id={item.id} date={item.release_date} dateSeries={(item.first_air_date)} image={item.poster_path} />
              </div>
            ))}
          </div>
        </div>
        <div className={('wrapper-panigation')}>
          <PaginationSize Movie={true} setPage={setPageSearch ? setPageSearch : setPageTVSearch} totalPage={totalPageSearch > 500 ? 500 : totalPageSearch} />
        </div>


      </div>
    </Helmet>

  );
}
export default Search