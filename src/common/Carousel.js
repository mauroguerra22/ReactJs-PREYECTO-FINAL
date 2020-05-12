import React from 'react'
import imagen1 from '../assets/img/imagen1.jpg';
import imagen2 from '../assets/img/imagen2.jpg';
import imagen3 from '../assets/img/imagen3.jpg';
import imagen4 from '../assets/img/imagen4.jpg';
import { Carousel } from 'antd';

function commonCarousel() {
    return (
        <Carousel autoplay>
            <div>
                <img className="imagen-carousel" src={imagen1}/>
            </div>
            <div>
                <img className="imagen-carousel" src={imagen2}/>
            </div>
            <div>
                <img className="imagen-carousel" src={imagen3}/>
            </div>
            <div>
                <img className="imagen-carousel" src={imagen4}/>
            </div>
        </Carousel>
    )
}

export default commonCarousel
