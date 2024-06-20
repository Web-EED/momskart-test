import React, { useMemo } from 'react';
import Link from 'next/link';

const ModuleProductDetailDescription = ({ product }) => {
    const { seller_name } = product;

    const vendor = useMemo(() => {
        if (!seller_name) return 'No Vendor';
        return seller_name
            ? seller_name
            : 'No Vendor';
    }, [seller_name]);

    return (
        <div className="ps-product__desc">
            <p>
                Sold By:
                <Link href={'/shop'}>
                    <strong> {vendor}</strong>
                </Link>
            </p>
            <ul className="ps-list--dot">
                <li>Unrestrained and portable active stereo speaker</li>
                <li> Free from the confines of wires and chords</li>
                <li> 20 hours of portable capabilities</li>
                <li>Double-ended Coil Cord with 3.5mm Stereo Plugs Included</li>
                <li> 3/4″ Dome Tweeters: 2X and 4″ Woofer: 1X</li>
            </ul>
        </div>
    );
};

export default ModuleProductDetailDescription;
