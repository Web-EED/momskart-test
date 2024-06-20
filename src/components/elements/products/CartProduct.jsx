import React from 'react';
import Link from 'next/link';
import useProduct from '~/hooks/useProduct';

const CartProduct = ({ product }) => {
    const { thumbnailImageCart } = useProduct(product, product.id);
    return (
        <div className="ps-product--cart">
            <div className="ps-product__thumbnail">
                <Link href={'/product/[pid]'} as={`/product/${product.id}`}>
                    {thumbnailImageCart}
                </Link>
            </div>
            <div className="ps-product__content">{product.title}</div>
        </div>
    );
};

export default CartProduct;
