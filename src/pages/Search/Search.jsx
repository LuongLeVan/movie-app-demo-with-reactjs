import * as React from 'react';
import { useContext } from 'react';
import './Search.scss'
import CardItem from 'components/CardItem/CardItem';
import Helmet from 'components/Helmet/Helmet';
import PaginationSize from '/components/Panigation/Panigation';
import { MovieConntext } from 'Context';



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

  return (
    <Helmet title='Search'>
      <div className='wrapper__search'>
        <input type="text" placeholder='temptation' onChange={(e) => setSearchText(e.target.value)}/> <button onClick={fetchMovieBySearch}>Search</button>
        <br />
      <div onClick={SearchMovieList}>Movie</div> <br />
      <div onClick={SearchTVList}>TV</div>
        <div className="grid wide">
          <div className="row">
            {contentSearch.map((item, index) => (
              <div className="l-4 m-6 c-12" key={index}>
                 <CardItem tv={item.first_air_date} movie={item.release_date} title={item.title} mark={item.vote_average} name={item.name} id={item.id} date={item.release_date} firstDate={item.first_air_date} image={item.poster_path} />
              </div>
            ))}
          </div>
        </div>
        <div className={('wrapper-panigation')}>
            <PaginationSize Movie={true}  setPage={setPageSearch ? setPageSearch : setPageTVSearch} totalPage={totalPageSearch > 500 ? 500 : totalPageSearch}/>
          </div>


      </div>
    </Helmet>

  );
}
export default Search