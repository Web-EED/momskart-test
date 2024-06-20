import React from 'react';
import Link from 'next/link';

const VendorBanner = () => (
    <div
        className="ps-vendor-banner bg--cover"
        style={{ backgroundImage: "url('/static/img/bg/vendor.jpg')" }}>
        <div className="ps-vendor-banner">
            <div className="container">
                <h2>
                Join the Momskart Marketplace and Reach Customers Across India

                </h2>
                <Link href="https://play.google.com/store/apps/details?id=in.sellers.momskart" className="ps-btn ps-btn--lg">
                    Start Selling
                </Link>
            </div>
        </div>
    </div>
);

export default VendorBanner;
