import React from 'react';
import Link from 'next/link';
import useProduct from '~/hooks/useProduct';

const OnCartProduct = ({ product, children }) => {
    const { thumbnailImageCart } = useProduct(product, product.id);

    return (
        <div className="ps-product--cart-mobile">
            <div className="ps-product__thumbnail">
                <Link href={'/product/[pid]'} as={`/product/${product.id}`}>
                    {thumbnailImageCart}
                </Link>
            </div>
            <div className="ps-product__content">
                {product.title}
                <p>
                    <small>
                        ${product.price} x {product.quantity}
                    </small>
                </p>
                {children}
            </div>
        </div>
    );
};

export default OnCartProduct;
