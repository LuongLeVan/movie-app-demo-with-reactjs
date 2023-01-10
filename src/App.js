import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Movies from "./pages/Movies/Movies";
import Series from "./pages/Series/Series";
import Search from "./pages/Search/Search";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import NavbarBottom from "./components/NavbarBottom/NavbarBottom";
import MovieItem from "./pages/MovieItem/MovieItem";
import { MovieConntext } from "./Context";
import { useEffect, useState } from "react";
import axios from "axios";
import SeriItem from "./pages/SeriItem/SeriItem";
function App() {
  const [contentFilter, setContentFilter] = useState([])
  const [page, setPage] = useState(1)
  const [pageTV, setPageTV] = useState(1)
  const [totalPage, setTotalPage] = useState()
  const [totalPageTV, setTotalPageTV] = useState()
  const [types, setTypes] = useState('movie')
  const [sencondType, setSencondType] = useState('tv')
  const [type, setType] = useState(null)
  const [typeTV, setTypeTV] = useState(null)
  const [year, setYear] = useState(null)
  const [yearTV, setYearTV] = useState()
  const [listFilm, setListFilm] = useState([])

  const [originLanguage, setOriginLanguage] = useState('en')
  const [originLanguageTV, setOriginLanguageTV] = useState('en')
  const [content, setContent] = useState([])
  const [totalPageTrending, setTotalPageTrending] = useState()
  const [pageTrending, setPageTrending] = useState(1)



  const fetchMovie = async () => {
    const { data } = await axios.get(`
    https://api.themoviedb.org/3/discover/${types}?api_key=6de13cb06459580e8f7ab054d9dbb28e&with_genres=${type}&page=${page}&primary_release_year=${year}&with_original_language=${originLanguage}
      `)
    setContentFilter(data.results)
    setTotalPage(data.total_pages)

  }


  useEffect(() => {

    fetchMovie()
  }, [page, type, year, originLanguage])

  const fetchSeries = async () => {
    const { data } = await axios.get(`
    https://api.themoviedb.org/3/discover/${sencondType}?api_key=6de13cb06459580e8f7ab054d9dbb28e&with_genres=${typeTV}&page=${pageTV}&first_air_date_year=${yearTV}&with_original_language=${originLanguageTV}`)
    setListFilm(data.results)
    setTotalPageTV(data.total_pages)
  }


  useEffect(() => {

    fetchSeries()
  }, [pageTV, originLanguageTV, typeTV, yearTV])


  const fetchTrending = async () => {
    const { data } = await axios.get(`
    https://api.themoviedb.org/3/trending/all/day?api_key=6de13cb06459580e8f7ab054d9dbb28e&page=${pageTrending}`)
    setContent(data.results)
    setTotalPageTrending(data.total_pages)
  }


  useEffect(() => {
    fetchTrending()
  }, [pageTrending, totalPageTrending])

  return (
    <MovieConntext.Provider value={{
      contentFilter, setContentFilter, year, types,
      setYear, originLanguage, page, setPage, totalPage, setTotalPage,
      type, setType, listFilm, setListFilm, sencondType, setSencondType,
      pageTV, setPageTV, totalPageTV, setTotalPageTV, typeTV, setTypeTV, yearTV, setYearTV,
      pageTrending, setPageTrending, content, totalPageTrending, setTotalPageTrending
    }}>
      <div className="App">
        <Header />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/movies"} element={<Movies />} />
          <Route path={"/movies/:id"} element={<MovieItem />} />
          <Route path={"/series"} element={<Series />} />
          <Route path={"/series/:id"} element={<SeriItem />} />
          <Route path={"/search"} element={<Search />} />
        </Routes>
        <Footer />
        <NavbarBottom />
      </div>
    </MovieConntext.Provider>
  );
}

export default App;
