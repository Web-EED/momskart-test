import React from 'react';
import Link from 'next/link';

const FurniturePromotions2 = () => (
    <div className="ps-home-promotions ps-home-promotions-2">
        <div className="container">
            <Link href={'/shop'} className="ps-collection">
                <img src="/static/img/promotions/home-8/1.jpg" alt="martfury" />
            </Link>
        </div>
    </div>
);

export default FurniturePromotions2;
