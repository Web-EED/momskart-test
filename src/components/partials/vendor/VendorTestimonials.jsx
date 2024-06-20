import React, { Component } from 'react';
import Slider from 'react-slick';

class VendorTestimonials extends Component {
    constructor(props) {
        super(props);
    }

    handleCarouselPrev = (e) => {
        e.preventDefault();
        this.slider.slickPrev();
    };

    handleCarouselNext = (e) => {
        e.preventDefault();
        this.slider.slickNext();
    };

    render() {
        const carouselSetting = {
            dots: false,
            arrows: false,
            infinite: true,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1366,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: false,
                    },
                },
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true,
                        arrows: false,
                    },
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: true,
                        arrows: false,
                    },
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        dots: true,
                        arrows: false,
                    },
                },
            ],
        };
        return (
            <div className="ps-client-say">
                <div className="container">
                    <div className="ps-section__header">
                        <h3>Seller Success Stories</h3>
                        <div className="ps-section__nav">
                            <a
                                className="ps-carousel__prev"
                                href="#"
                                onClick={this.handleCarouselPrev}>
                                <i className="icon-chevron-left" />
                            </a>
                            <a
                                className="ps-carousel__next"
                                href="#"
                                onClick={this.handleCarouselNext}>
                                <i className="icon-chevron-right" />
                            </a>
                        </div>
                    </div>
                    <div className="ps-section__content">
                        <Slider
                            ref={(slider) => (this.slider = slider)}
                            {...carouselSetting}
                            className="ps-carousel outside">
                            <div className="ps-block--testimonial">
                                <div className="ps-block__header">
                                    <img
                                        src="https://www.themomskart.com/assets/Kalyani, Sahruday Foods ( MH ).png"
                                        alt="martfury"
                                    />
                                </div>
                                <div className="ps-block__content">
                                    <i className="icon-quote-close" />
                                    <h4>
                                    Kalyani
                                        <span>Sahruday Foods</span>
                                    </h4>
                                    <p>
                                    Thanks to Momskart, our business has experienced remarkable growth across India. The exposure to a vast customer base, efficient order management, and strategic marketing support have been instrumental in achieving this success. Looking forward to continued collaboration and even greater achievements! 
                                    </p>
                                </div>
                            </div>
                            <div className="ps-block--testimonial" >
                                <div className="ps-block__header">
                                    <img
                                        src="https://www.themomskart.com/assets/Neeta Ganatra, Shri Ji Foods ( MP ).png"
                                        alt="martfury"
                                    />
                                </div>
                                <div className="ps-block__content" >
                                    <i className="icon-quote-close" />
                                    <h4>
                                    Neeta Gangantra
                                        <span>Shreeji Food (M.P)</span>
                                    </h4>
                                    <p>
                                    Momskart ke sath milke humara business online grow hua hai and order manage krna bhi bhot aasan hai, phone par hi sab manage krwa dete hai or payment direct bank account me aajata hai time se. 
                                    </p>
                                </div>
                            </div>
                            <div className="ps-block--testimonial">
                                <div className="ps-block__header">
                                    <img
                                        src="https://www.themomskart.com/assets/Priti Arora, Founder Karma Kettle ( WB ).png"
                                        alt="martfury"
                                    />
                                </div>
                                <div className="ps-block__content">
                                    <i className="icon-quote-close" />
                                    <h4>
                                    Priti Arora
                                        <span> Karma Kettle</span>
                                    </h4>
                                    <p>
                                    Momskart has proven to be the perfect platform for our business expansion. The seamless experience, extensive reach, and dedicated support have significantly contributed to our success. Thank you for providing such a conducive environment for women entrepreneurs to thrive 
                                    </p>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }
}

export default VendorTestimonials;
