import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import ModuleEcomerceCartItems from '~/components/ecomerce/modules/ModuleEcomerceCartItems';
import ModuleCartSummary from '~/components/ecomerce/modules/ModuleCartSummary';
import useGetProducts from '~/hooks/useGetProducts';

export default function CartContent() {
    const cartItems = useSelector(({ ecomerce }) => ecomerce.cartItems);
    const { getCart,cartData,cartCalculations } = useGetProducts();

    function getCartProducts() {
        if (cartItems.length > 0) {
           
            getCart();
        }
    }

    useEffect(() => {
        getCartProducts();
    }, [cartItems]);

    const cartProducts = useMemo(() => {
        if (cartItems.length === 0) return [];
        return cartData.map((product) => {
            return {
                ...product,
                id: product.product_id_PK,
                title: product.title || 'Untitled Product',
                slug: product.slug || 'untitled-product',
                thumbnailImage: product.image1 || null,
                price: product.price || 0,
                sale_price: product?.sale_price || 0,
                quantity:product?.quantity || 0
            };
        });
    }, [cartData, cartItems]);

    const content = useMemo(() => {
        if (cartData.length === 0) {
            return (
                <div className="ps-section__content">
                    <div className="alert alert-info">
                        <p className="mb-0">Your cart is currently empty.</p>
                    </div>

                    <div className="ps-section__cart-actions">
                        <Link href={'/shop'} className="ps-btn">
                            Back to Shop
                        </Link>
                    </div>
                </div>
            );
        }
        return (
            <>
                <div className="ps-section__content">
                    <ModuleEcomerceCartItems products={cartProducts} />
                    <div className="ps-section__cart-actions">
                        <Link href={'/shop'} className="ps-btn">
                            Back to Shop
                        </Link>
                    </div>
                </div>
                <div className="ps-section__footer">
                    <div className="row justify-space-between">
                        <div className="col-xl-8 col-lg-4 col-md-12 col-sm-12 col-12">
                            <div className="row">
                                <div className="col-lg-6">
                                    <figure>
                                        <figcaption>Coupon Discount</figcaption>
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder="Enter coupon here..."
                                            />
                                        </div>
                                        <div className="form-group">
                                            <button className="ps-btn ps-btn--outline">
                                                Apply
                                            </button>
                                        </div>
                                    </figure>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                            <ModuleCartSummary source={cartProducts} cartCalculations={cartCalculations} />
                            <Link
                                href={'/account/checkout'}
                                className="ps-btn ps-btn--fullwidth">
                                Proceed to checkout
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        );
    }, [cartData, cartItems]);

    return <section>{content}</section>;
}
