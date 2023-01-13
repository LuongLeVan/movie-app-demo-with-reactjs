import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { img_300, unavailable } from '../Config/Config';
import './Carousel.scss'


const handleDragStart = (e) => e.preventDefault();
const responsive = {
    0: { items: 3 },
    512: { items: 5 },
    1024: { items: 7 },
};

const Carousel = (props) => {
    const path = props
    const id = path.path
    const type = props
    const typeMovie = path.type

    const [credits, setCredits] = useState([])

    const fetchCharacter = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/${typeMovie}/${id}/credits?api_key=6de13cb06459580e8f7ab054d9dbb28e`)
        setCredits(data.cast);
    }
    useEffect(() => {
        fetchCharacter()
    }, [id])

    const items = credits.map((item) => (
        <div className="carouselItem">
                    <div>
                        <img
                            src={item.profile_path ? `${img_300}/${item.profile_path}` : unavailable}
                            alt={item?.name}
                            onDragStart={handleDragStart}
                            className="carouselItem__img"
                        />
                        <div style={{ textAlign: 'center' }}>
                            <div>{item.name}</div>
                            <div>({item.character})</div>
                        </div>
                    </div>

        </div>
            ))
    

    return (
        <div>
            <h3>CASTING</h3>
            <AliceCarousel
                autoPlay
                responsive={responsive}
                infinite
                mouseTracking
                items={items}
                disableButtonsControls
                disableDotsControls
            />
        </div>
    );
}
export default Carousel