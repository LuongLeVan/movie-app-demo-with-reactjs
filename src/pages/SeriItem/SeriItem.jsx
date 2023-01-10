import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { img_300 } from 'components/Config/Config'
import './SeriItem.scss'
import Helmet from 'components/Helmet/Helmet'
import { MovieConntext } from 'Context'
import Carousel from 'components/Carousel/Carousel'



const SerieItem = () => {
    const { listFilm, content } = useContext(MovieConntext)
    const location = useLocation()
    const [movieList, setMovieList] = useState([])
    const [video, setVideo] = useState()
    const path = location.pathname.split("/")[2]
    const serie = listFilm.find((p) => p.id === Math.round(path))
    const series = content.find((p) => p.id === Math.round(path))


    const fetchVideo = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/tv/${path}/videos?api_key=6de13cb06459580e8f7ab054d9dbb28e`)
        const videos = data.results.filter(x => x.name === 'Official Trailer' && x.type === 'Trailer')
        console.log(videos[0].key);  
        setVideo(videos[0].key)
    }
    useEffect(() => {
        fetchVideo()
    }, [])
    

    const url = `http://image.tmdb.org/t/p/w500/${serie ? serie.backdrop_path : series.backdrop_path}`  
    return (
        <Helmet title={`${serie ? serie.name : series.name} (${serie ? serie.first_air_date.slice(0,4) : series.first_air_date.slice(0, 4)})`}>
            <div className='background' style={{ backgroundImage: 'url(' + url + ')' }}>
                <div className='container__heading'>
                    <img className='heading__poster' src={`${img_300}${serie ? serie.poster_path : series.poster_path}`} alt="poster" style={{ height: 400 }} />
                    <div className='heading__container-content'>
                        <h2 className='heading__title__movie'>{serie ? serie.title : series.title}</h2>
                        <div>{serie ? serie.overview :series.overview}</div>

                    </div>
                </div>
            </div>
            <div style={{ marginTop: 150, marginBottom: 300, color: 'white' }}>


                <Carousel path={path} type={'tv'} />

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

            </div>
        </Helmet>
    )
}

export default SerieItem