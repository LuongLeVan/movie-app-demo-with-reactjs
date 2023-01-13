import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { img_300 } from 'components/Config/Config'
import './SeriItem.scss'
import Helmet from 'components/Helmet/Helmet'
import { MovieConntext } from 'Context'
import Carousel from 'components/Carousel/Carousel'
import CardItem from 'components/CardItem/CardItem'
import PaginationSize from 'components/Panigation/Panigation'



const SerieItem = () => {
    const { listFilm, content, contentSearch,setPageRandomTV, setTotalPageRandomTV, listTV } = useContext(MovieConntext)
    const location = useLocation()
    const [video, setVideo] = useState()
    const [list, setList] = useState([])
    const path = location.pathname.split("/")[2]
    const serie = listFilm.find((p) => p.id === Math.round(path))
    const series = content.find((p) => p.id === Math.round(path))
    const serieSearch = contentSearch.find((p) => p.id === Math.round(path))
    const itemSelectByRandom = listTV.find((p) => p.id === Math.round(path))





    const page = Math.floor(Math.random() * 100) 
    const randomList = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=6de13cb06459580e8f7ab054d9dbb28e&page=${page}
        `)
        setList(data.results)
    }
    useEffect(() => {
        randomList()
    }, [page])


        const fetchVideo = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/tv/${path}/videos?api_key=6de13cb06459580e8f7ab054d9dbb28e`)
        const videos = data.results.filter(x => x.name === 'Official Trailer' && x.type === 'Trailer' || x.type ==='Trailer' || x.type ==='Opening Credits' || x.type === 'Teaser')
       
        setVideo(videos[0].key)
    }
    useEffect(() => {
        fetchVideo()
    }, [path, page])

    const url = `http://image.tmdb.org/t/p/w500/${serie ? serie.backdrop_path : itemSelectByRandom ? itemSelectByRandom.backdrop_path :  series ? series.backdrop_path :   serieSearch.backdrop_path }`  
    return (
        <Helmet title={`${serie ? serie.name :  itemSelectByRandom ? itemSelectByRandom.name : series ? series.name :   serieSearch.name} (${ serie ? serie.first_air_date.slice(0,4)   :  itemSelectByRandom ? itemSelectByRandom.first_air_date.slice(0, 4) : series ? series.first_air_date.slice(0,4) :   serieSearch.first_air_date.slice(0,4)})`}>
            <div className='background' style={{ backgroundImage: 'url(' + url + ')' }}>
                <div className='container__heading'>
                    <img className='heading__poster' src={`${img_300}${serie ? serie.poster_path : itemSelectByRandom ? itemSelectByRandom.poster_path  :  series ? series.poster_path :   serieSearch.poster_path}`} alt="poster" style={{ height: 400 }} />
                    <div className='heading__container-content'>
                        <h2 className='heading__title__movie'>{serie ? serie.title : itemSelectByRandom ? itemSelectByRandom.title :series ? series.title :   serieSearch.title}</h2>
                        <div>{serie ? serie.overview : itemSelectByRandom ? itemSelectByRandom.overview : series ? series.overview :   serieSearch.overview}</div>

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

                <h2>SIMILAR</h2>

                <div className="grid wide">
                    <div className="row">
                        {listTV.map((item, index) => (
                            <div className='l-4 m-6 c-12' key={index} >
                                <CardItem 
                                    secondType
                                    name={item.name}
                                    id={item.id}
                                    date={item.first_air_date}
                                    image={item.poster_path}
                                    title={item.name}
                                    mark={item.vote_average} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className={('wrapper-panigation')}><PaginationSize  setPageTV={setPageRandomTV} totalPageTV={setTotalPageRandomTV > 500 ? 20 : 10} /></div>


            </div>
        </Helmet>
    )
}

export default SerieItem