'use client';
import React, { useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import SkeletonProductDetail from '~/components/elements/skeletons/SkeletonProductDetail';
import BreadCrumb from '~/components/elements/BreadCrumb';
import ProductWidgets from '~/components/partials/product/ProductWidgets';
import ProductDetailAffiliate from '~/components/elements/detail/ProductDetailAffiliate';
import CustomerBought from '~/components/partials/product/CustomerBought';
import RelatedProduct from '~/components/partials/product/RelatedProduct';
import PageContainer from '~/components/layouts/PageContainer';
import Newsletters from '~/components/partials/commons/Newletters';
import useGetProducts from '~/hooks/useGetProducts';

const ProductDefaultPage = () => {
    const params = useParams();
    const { pid } = params;
    const { loading, getStrapiProduct, product } = useGetProducts();

    useEffect(() => {
        getStrapiProduct(pid);
    }, [pid]);

    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Shop',
            url: '/shop',
        },
        {
            text: product?.attributes.title || 'Untitled Product',
        },
    ];
    // Views

    const productDetails = useMemo(() => {
        if (loading) {
            return <SkeletonProductDetail />;
        }
        if (product) {
            return <ProductDetailAffiliate product={product} />;
        }
    }, [loading, product]);

    return (
        <PageContainer title="Product Afilliate" boxed={true}>
            <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
            <div className="ps-page--product">
                <div className="ps-container">
                    <div className="ps-page__container">
                        <div className="ps-page__left">{productDetails}</div>
                        <div className="ps-page__right">
                            <ProductWidgets />
                        </div>
                    </div>

                    <CustomerBought
                        layout="standard"
                        collectionSlug="customer-bought"
                    />
                    <RelatedProduct collectionSlug="shop-recommend-items" />
                </div>
            </div>
            <Newsletters layout="container" />
        </PageContainer>
    );
};

export default ProductDefaultPage;
