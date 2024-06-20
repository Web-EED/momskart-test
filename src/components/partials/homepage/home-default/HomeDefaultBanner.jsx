import React, { useEffect, useMemo } from 'react';
import Slider from 'react-slick';
import NextArrow from '~/components/elements/carousel/NextArrow';
import PrevArrow from '~/components/elements/carousel/PrevArrow';
import Link from 'next/link';
import Promotion from '~/components/elements/media/Promotion';
import useBanner from '~/hooks/useBanner';
import { getStrapiImageURL } from '~/services/strapiServices/image/getStrapiImageService';

const BANNER_SLUGS = ['home-banner', 'home-right-banner'];

const HomeDefaultBanner = ({loading,banners}) => {
    // const { loading, banners } = useBanner();

    // useEffect(() => {
    //     getBannersBySlugs(BANNER_SLUGS);
    // }, []);

    const primaryBannerItems = useMemo(() => {
        if (loading) return [];
        if (!banners) return [];
        // const primaryBanner = banners.find(
        //     (item) => item.new === '1'
        // );

        return banners
    }, [loading, banners]);

    const secondBannerItems = useMemo(() => {
        if (loading || !banners) return [];
        // const secondBanner = banners.find(
        //     (item) => item.attributes.slug === 'home-right-banner'
        // );

        return banners
           
    }, [loading, banners]);

    const carouselSetting = {
        dots: true,
        infinite: true,
        speed: 70,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    const mainCarouselItems = useMemo(() => {
        if (loading || primaryBannerItems.length === 0) return null;
        console.log(primaryBannerItems,"primaryBannerItems")
        return (
            <Slider {...carouselSetting} className="ps-carousel">
                {primaryBannerItems.map((item, index) => (
                    <div className="slide-item" key={index}>
                        <Link
                            href={'/shop'}
                            className="ps-banner-item--default bg--cover"
                            style={{
                                backgroundImage: `url(${item.offer_image})`,
                            }}
                        />
                    </div>
                ))}
            </Slider>
        );
    }, [loading, primaryBannerItems]);

    // Views

    return (
        // <section className="ps-home-banner">
            <Slider {...carouselSetting} className="ps-carousel">
                {primaryBannerItems.map((banner_item,index) => {
                    return (<div
                        key={index}
                        className="ps-banner--market-1"
                        style={{
                            backgroundImage: `url(${banner_item.offer_image})`,
                        }}>
                        <img
                            src={banner_item.offer_image}
                            alt={banner_item.offer_name}
                        />
                        {/* <div className="ps-banner__content">
                            <h5>Mega Sale Nov 2019</h5>
                            <h3>
                                Double Combo With <br /> The Body Shop
                            </h3>
                            <p>
                                Sale up to <strong>50% Off </strong>
                            </p>
                            <a className="ps-btn" href="#">
                                Shop Now
                            </a>
                        </div> */}
                    </div>)
                })}
            </Slider>
        // </section>
    );
};

export default HomeDefaultBanner;
