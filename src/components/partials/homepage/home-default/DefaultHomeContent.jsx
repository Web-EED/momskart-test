'use client';
import React, { useEffect, useMemo } from 'react';
import HomeDefaultBanner from '~/components/partials/homepage/home-default/HomeDefaultBanner';
import SiteFeatures from '~/components/partials/homepage/home-default/SiteFeatures';
import HomeDefaultDealOfDay from '~/components/partials/homepage/home-default/HomeDefaultDealOfDay';
import HomeAdsColumns from '~/components/partials/homepage/home-default/HomeAdsColumns';
import HomeDefaultTopCategories from '~/components/partials/homepage/home-default/HomeDefaultTopCategories';
import HomeDefaultProductListing from '~/components/partials/homepage/home-default/HomeDefaultProductListing';
import HomeAds from '~/components/partials/homepage/home-default/HomeAds';
import DownLoadApp from '~/components/partials/commons/DownLoadApp';
import NewArrivals from '~/components/partials/homepage/home-default/NewArrivals';
import Newletters from '~/components/partials/commons/Newletters';
import useBanner from '~/hooks/useBanner';

export default function DefaultHomeContent() {
    const { loading, homedata, getAllHomeData } = useBanner();
    useEffect(() => {
        getAllHomeData();
    }, []);
    return (
        <main id="homepage-1">
            <HomeDefaultBanner
                loading={loading}
                banners={homedata.bannerData ? homedata.bannerData : []}
            />
            <SiteFeatures />
            <HomeDefaultDealOfDay
                loading={loading}
                products={homedata.bestSellingProduct}
            />
            <HomeAdsColumns />
            <HomeDefaultTopCategories />
            {/* {homedata?.homedata?.map((category_data,i) =>  {
                 return category_data.productList?category_data.productList ? (<HomeDefaultDealOfDay
                    categorySlug="17"
                    title={category_data.name}
                    products={category_data.productList?category_data.productList:[]}
                    loading={loading}
                    key={i}
                />) :(<></>)
            })} */}
            {homedata?.homedata?.map((category_data, i) => {
                if (category_data.productList.length > 0) {
                    return (
                        <HomeDefaultDealOfDay
                            categorySlug={category_data.slug}
                            title={category_data.name}
                            products={category_data.productList}
                            loading={loading}
                            key={i}
                        />
                    );
                }
                return null;
            })}
            <HomeAds />
            <DownLoadApp />
            {/* <NewArrivals collectionSlug="hot-new-arrivals" /> */}
            <Newletters />
        </main>
    );
}
