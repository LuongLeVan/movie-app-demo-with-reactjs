import React from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import Trending from "./pages/Trending/Trending";
import Movies from "./pages/Movies/Movies";
import Series from "./pages/Series/Series";
import Search from "./pages/Search/Search";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import NavbarBottom from "./components/NavbarBottom/NavbarBottom";
import MovieItem from "./components/MovieItem/MovieItem";
import { MovieConntext } from "./Context";
import SeriItem from "./components/SeriItem/SeriItem";



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
  const [typeSearch, setTypeSearch] = useState('movie')
  const [list, setList] = useState([])
  const [listTV, setListTV] = useState([])
  const [pageSearch, setPageSearch] = useState(1)
  const [pageTVSearch, setPageTVSearch] = useState(1)
  const [searchText, setSearchText] = useState("")
  const [contentSearch, setContentSearch] = useState([])
  const [totalPageSearch, setTotalPageSearch] = useState(null)
  const [value, setValue] = useState(0)
  const [pageRandom, setPageRandom] = useState(8)
  const [pageRandomTV, setPageRandomTV] = useState(8)
  const [totalPageRandom, setTotalPageRandom] = useState()
  const [totalPageRandomTV, setTotalPageRandomTV] = useState()



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

  const fetchMovieBySearch = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/search/${typeSearch}?api_key=6de13cb06459580e8f7ab054d9dbb28e&language=en-US&query=${searchText}&page=${pageSearch ? pageSearch : pageTVSearch}&include_adult=false`)
    setContentSearch(data.results)
    setTotalPageSearch(data.total_pages)
  }


  useEffect(() => {

    fetchMovieBySearch()
  }, [typeSearch, pageTVSearch, pageSearch, totalPageSearch])


  const numberRandomMovie = Math.floor(Math.random() * 60) + 1
  const randomList = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=6de13cb06459580e8f7ab054d9dbb28e&page=${numberRandomMovie}
      `)
    setList(data.results)
    setTotalPageRandom(data.total_pages)
  }
  useEffect(() => {
    randomList()
  }, [pageRandom, totalPageRandom])

  const numberRandomTV = Math.floor(Math.random() * 60) + 1


  const randomListTV = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=6de13cb06459580e8f7ab054d9dbb28e&page=${numberRandomTV}
      `)
    setListTV(data.results)
    setTotalPageRandomTV(data.total_pages)
  }
  useEffect(() => {
    randomListTV()
  }, [pageRandomTV, totalPageRandomTV])

  return (
    <MovieConntext.Provider value={{
      contentFilter, setContentFilter, year, types,
      setYear, originLanguage, page, setPage, totalPage, setTotalPage,
      type, setType, listFilm, setListFilm, sencondType, setSencondType,
      pageTV, setPageTV, totalPageTV, setTotalPageTV, typeTV, setTypeTV, yearTV, setYearTV,
      pageTrending, setPageTrending, content, totalPageTrending, setTotalPageTrending,
      contentSearch, setPageSearch, totalPageSearch,
      contentSearch,
      setTypeSearch, setPageTVSearch, fetchMovieBySearch, setSearchText,
      list, setValue, value, setPageRandom, setTotalPageRandom, setPageRandomTV, setTotalPageRandomTV, listTV
    }}>
      <div className="App">
        <Header />
        <Routes>
          <Route path={"/"} element={<Trending />} />
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
