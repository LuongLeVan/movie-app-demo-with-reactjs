import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { MovieConntext } from '/Context'
import { img_300, unavailable } from 'components/Config/Config'
import axios from 'axios'
import Helmet from '/components/Helmet/Helmet'
import Carousel from 'components/Carousel/Carousel'
import './MovieItem.scss'
import CardItem from 'components/CardItem/CardItem'
import PaginationSize from 'components/Panigation/Panigation'

const MovieItem = () => {
    const { contentFilter, content, contentSearch, list, setPageRandom, setTotalPageRandom } = useContext(MovieConntext)
    const location = useLocation()
    const [video, setVideo] = useState()
    const [typeMenu, setTypeMenu] = useState([])
    const path = location.pathname.split("/")[2]
    const movie = contentFilter.find((p) => p.id === Math.round(path))
    const movieByTrending = content.find((p) => p.id === Math.round(path))
    const itemMovieBySearch = contentSearch.find((p) => p.id === Math.round(path))
    const itemSelectByRandom = list.find((p) => p.id === Math.round(path))

    const fetchVideo = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${path}/videos?api_key=6de13cb06459580e8f7ab054d9dbb28e`)
        const videos = data.results.filter(x => x.name === 'Official Trailer' && x.type === 'Trailer' || x.type === 'Trailer' || x.type === 'Opening Credits' || x.type === 'Teaser')
        setVideo(videos[0].key)
    }
    useEffect(() => {
        fetchVideo()
    }, [path])

    const fetchTypeMenu = async () => {
        const { data } = await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=6de13cb06459580e8f7ab054d9dbb28e&language=en-US')
        setTypeMenu(data.genres)
    }

    useEffect(() => {
        fetchTypeMenu()
    }, [])


    const url = `http://image.tmdb.org/t/p/w500/${movie ? movie.backdrop_path : itemSelectByRandom ? itemSelectByRandom.backdrop_path : movieByTrending ? movieByTrending.backdrop_path : itemMovieBySearch.backdrop_path}`

    return (
        <Helmet title={`${movie ? movie.title : itemSelectByRandom ? itemSelectByRandom.title : movieByTrending ? movieByTrending.title : itemMovieBySearch.title} (${movie ? movie.release_date.slice(0, 4) : itemSelectByRandom ? itemSelectByRandom.release_date.slice(0, 4) : movieByTrending ? movieByTrending.release_date.slice(0, 4) : itemMovieBySearch.release_date.slice(0, 4)} )`}>
            {
                <div className='background' style={{ backgroundImage: 'url(' + url + ')' }}>
                    <div className='container__heading' style={{ marginTop: '100' }}>
                        <img className='heading__poster' src={`${img_300}${movie ? movie.poster_path : itemSelectByRandom ? itemSelectByRandom.poster_path : movieByTrending ? movieByTrending.poster_path : itemMovieBySearch.poster_path}`} alt="poster" style={{ height: 400 }} />
                        <div className='heading__container-content'>
                            <h2 className='heading__title__movie'>{movie ? movie.title : itemSelectByRandom ? itemSelectByRandom.title : movieByTrending ? movieByTrending.title : itemMovieBySearch.title}</h2>
                            <div className='heading__overview__movie'>{movie ? movie.overview : itemSelectByRandom ? itemSelectByRandom.overview : movieByTrending ? movieByTrending.overview : itemMovieBySearch.overview}</div>
                        </div>
                    </div>
                </div>
            }
            <div style={{ marginTop: 150, marginBottom: 300, color: 'white' }}>


                <Carousel path={path} type={'movie'} />

                <h3>TRAILER</h3>
                <div className='container__clip'>
                    <iframe className='container__content' src={`https://www.youtube.com/embed/${video}`}
                        frameBorder='0'
                        allow={'autoplay; encrypted-media'}
                        allowFullScreen
                        title={'video'}

                    />
                </div>
                <h2>SIMILAR</h2>
                <div className="grid wide">
                    <div className="row">
                        {list.map((item, index) => (
                            <div className="l-3 m-4 c-6" key={index}>
                                <CardItem name={item.title}
                                    types
                                    id={item.id}
                                    date={item.release_date}
                                    image={item.poster_path}
                                    title={item.title}
                                    mark={item.vote_average} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className={('wrapper-panigation')}><PaginationSize Movie={true} setPage={setPageRandom} totalPage={setTotalPageRandom > 500 ? 20 : 10} /></div>

            </div>
        </Helmet>
    )
}

export default MovieItem