import React, { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { calculateAmount } from '~/utilities/ecomerce-helpers';
import useGetProducts from '~/hooks/useGetProducts';

const ModulePaymentOrderSummary = ({ ecomerce, shipping,cart_shipping }) => {
    const cartItems = useSelector(({ ecomerce }) => ecomerce.cartItems);
    const { getCart, cartData } = useGetProducts();

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

    const amount = useMemo(() => {
        if (cartProducts && cartProducts.length > 0) {
            return calculateAmount(cartProducts);
        }
        return 0;
    }, [cartProducts]);

    const listItemsView = useMemo(() => {
        if (cartProducts && cartProducts.length > 0) {
            return cartProducts.map((item) => (
                <Link href="/" key={item.id}>
                    <strong>
                        {item.title}
                        <span>x{item.quantity}</span>
                    </strong>
                    <small>₹{item.quantity * item.price}</small>
                </Link>
            ));
        } else {
            return <p>No Product.</p>;
        }
    }, [cartProducts]);

    const totalView = useMemo(() => {
        const totalAmount = shipping ? parseInt(amount) + parseInt(cart_shipping?.deliveryCharges || 0): parseInt(amount);
        return (
            <figure className="ps-block__total">
                <h3>
                    Total
                    <strong>₹{totalAmount}.00</strong>
                </h3>
            </figure>
        );
    }, [amount, shipping]);
    const shippingView = useMemo(() => {
        if (shipping === true) {
            return (
                <figure>
                    <figcaption>
                        <strong>Shipping Fee</strong>
                        <small>{cart_shipping?.deliveryCharges || 0 }</small>
                    </figcaption>
                </figure>
            );
        }
        return null;
    }, [shipping]);

    return (
        <div className="ps-block--checkout-order">
            <div className="ps-block__content">
                <figure>
                    <figcaption>
                        <strong>Product</strong>
                        <strong>total</strong>
                    </figcaption>
                </figure>
                <figure className="ps-block__items">{listItemsView}</figure>
                <figure>
                    <figcaption>
                        <strong>Subtotal</strong>
                        <small>₹{amount}</small>
                    </figcaption>
                </figure>
                {shippingView}
                {totalView}
            </div>
        </div>
    );
};
export default ModulePaymentOrderSummary;
