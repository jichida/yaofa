/*
	自动滚动广告组件
*/
import React, { Component } from 'react';
import { Swiper, Slide } from 'react-dynamic-swiper';
import '../../../node_modules/react-dynamic-swiper/lib/styles.css';
import _ from 'lodash';

let swiperOptions = {
    navigation: false,
    pagination: true,
    scrollBar: false
};

class Page extends Component {

	render() {
        return (
        	<Swiper
                swiperOptions={{slidesPerView: 'auto'}}
                {...swiperOptions}
                >
                {_.map(this.props.data,(img, index)=>{
                    return (
                        <Slide key={index}><img src={img}/></Slide>
                    )
                })}
            </Swiper>
        )
    }
}

export default Page;