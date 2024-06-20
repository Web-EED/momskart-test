import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import OnCartProduct from '~/components/elements/products/OnCartProduct';
import useEcomerce from '~/hooks/useEcomerce';
import { calculateAmount } from '~/utilities/ecomerce-helpers';
import useGetProducts from '~/hooks/useGetProducts';

const MiniCart = () => {
    const { removeItem } = useEcomerce();
    const cartItems = useSelector(({ ecomerce }) => ecomerce.cartItems);
    const { getCart, cartData } = useGetProducts();

    function handleRemoveItem(e, productId) {
        e.preventDefault();
        removeItem({ id: productId }, cartItems, 'cartData');
    }

    function getCartProducts() {
        if (cartItems.length > 0) {
            getCart();
        }
    }

    useEffect(() => {
        getCartProducts();
    }, [cartItems]);

    const cartProducts = useMemo(() => {
        if (cartData.length === 0) return [];
        return cartData.map((product) => {
            return {
                ...product,
                id: product.product_id_PK,
                title: product.title || 'Untitled Product',
                slug: product.slug || 'untitled-product',
                thumbnailImage: product.image1 || null,
                price: product.price || 0,
                sale_price: product?.sale_price || 0,
                quantity:
                product.quantity || 0,
                
            };
        });
    }, [cartData, cartItems]);

    const cartAmount = useMemo(() => {
        return calculateAmount(cartProducts);
    }, [cartProducts]);

    const cartItemsContent = useMemo(() => {
        if (cartProducts.length === 0) {
            return (
                <div className="ps-cart__content">
                    <div className="ps-cart__items">
                        <span>No  in cartData</span>
                    </div>
                </div>
            );
        }

        return (
            <div className="ps-cart__content">
                <div className="ps-cart__items">
                    {cartProducts.map((item) => {
                        return (
                            <OnCartProduct product={item} key={item.id}>
                                <a
                                    className="ps-product__remove"
                                    onClick={(e) =>
                                        handleRemoveItem(e, item.id)
                                    }>
                                    <i className="icon-cross" />
                                </a>
                            </OnCartProduct>
                        );
                    })}
                </div>
                <div className="ps-cart__footer">
                    <h3>
                        Sub Total:
                        <strong>{cartAmount}</strong>
                    </h3>
                    <figure>
                        <Link
                            href={'/account/shopping-cart'}
                            className="ps-btn">
                            View Cart
                        </Link>
                        <Link href={'/account/checkout'} className="ps-btn">
                            Checkout
                        </Link>
                    </figure>
                </div>
            </div>
        );
    }, [cartProducts]);

    return (
        <div className="ps-cart--mini">
            <a className="header__extra" href="#">
                <i className="icon-bag2" />
                <span>
                    {/* <i>{cartData.length}</i> */}
                    <i>{cartData.length}</i>
                </span>
            </a>
            {cartItemsContent}
        </div>
    );
};

export default MiniCart;
