import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { MovieConntext } from '/Context'
import { img_300, unavailable } from 'components/Config/Config'
import axios from 'axios'
import Helmet from '/components/Helmet/Helmet'
import Carousel from 'components/Carousel/Carousel'
import './MovieItem.scss'

const MovieItem = () => {
    const { contentFilter, content } = useContext(MovieConntext)
    const location = useLocation()
    const [movieList, setMovieList] = useState([])
    const [video, setVideo] = useState()
    const [typeMenu, setTypeMenu] = useState([])
    const path = location.pathname.split("/")[2]
    const movie = contentFilter.find((p) => p.id === Math.round(path))
    const movieByTrending = content.find((p) => p.id === Math.round(path))


    const fetchVideo = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${path}/videos?api_key=6de13cb06459580e8f7ab054d9dbb28e`)
        const videos = data.results.filter(x => x.name === 'Official Trailer' && x.type === 'Trailer')
        setVideo(videos[0].key)
    }
    useEffect(() => {
        fetchVideo()
    }, [])

    const fetchTypeMenu = async () => {
        const { data } = await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=6de13cb06459580e8f7ab054d9dbb28e&language=en-US')
        setTypeMenu(data.genres)
    }

    useEffect(() => {
        fetchTypeMenu()
    }, [])

    const page = Math.floor(Math.random() * 100)

    const fetMovie = async () => {
        const { data } = await axios.get(`
        https://api.themoviedb.org/3/discover/movie?api_key=6de13cb06459580e8f7ab054d9dbb28e&page=${page}
          `)
        setMovieList(data.results)

    }


    useEffect(() => {
        fetMovie()
    }, [])
    
    const url = `http://image.tmdb.org/t/p/w500/${movie ? movie.backdrop_path : movieByTrending.backdrop_path }`

    return (
        <Helmet title={`${movie ? movie.title : movieByTrending.title} (${movie ? movie.release_date.slice(0, 4) : movieByTrending.release_date.slice(0, 4)} )`}>
            <div className='background' style={{ backgroundImage: 'url(' + url + ')' }}>
                <div className='container__heading'>
                    <img className='heading__poster' src={`${img_300}${movie ? movie.poster_path : movieByTrending.poster_path}`} alt="poster" style={{ height: 400 }} />
                    <div className='heading__container-content'>
                        <h2 className='heading__title__movie'>{movie ? movie.title : movieByTrending.title}</h2>
                        <div>{movie ? movie.overview : movieByTrending.overview}</div>
                       {/*  {typeMenu.map((item, i) => (
                            <div key={i}>{item.name}</div>
                        ))} */}
                    </div>
                </div>
            </div>
            <div style={{ marginTop: 150, marginBottom: 300, color: 'white' }}>


                <Carousel path={path} type={'movie'} />

                <h3>TRAILER</h3>
                <div className='container__clip'>
                    <iframe src={`https://www.youtube.com/embed/${video}`}
                        frameBorder='0'
                        allow={'autoplay; encrypted-media'}
                        allowFullScreen
                        title={'video'}
                        style={{ width: '80%', height: '100%' }}
                    />
                </div>
           {/*      <h2>SIMILAR</h2>
                <div className='grid wide'>
                    <div className="row">
                        {list.map((item, index) => (
                            <div className='l-4 m-6 c-12' key={index}>
                                <CardItem
                                    types={movie}
                                    name={item.title || item.original_title}
                                    id={item.id}
                                    date={item.release_date}
                                    image={item.poster_path}
                                    title={item.title}
                                    mark={item.vote_average} />
                            </div>
                        ))}
                    </div>
                </div> */}

            </div>
        </Helmet>
    )
}

export default MovieItem