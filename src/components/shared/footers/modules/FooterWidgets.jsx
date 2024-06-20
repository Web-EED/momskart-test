import React from 'react';
import Link from 'next/link';

const FooterWidgets = () => (
    // <div className="ps-footer__widgets">
    //     <aside className="widget widget_footer widget_contact-us">
    //         <h4 className="widget-title">Contact us</h4>
    //         <div className="widget_content">
    //             <p>Call us 24/7</p>
    //             <h3>1800 97 97 69</h3>
    <div className="ps-footer__widgets">
    <aside className="widget widget_footer widget_contact-us col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12"  >
      {/* <h4 className="widget-title">Re</h4> */}
      
      <div className="widget_content">
        {/* <p>Call us 24/7</p> */}
        {/* <h3>1800 97 97 69</h3> */}
        
        <div  style={{ width: '150px', height: '100px' }}>
        <img src="/static/img/Momskart-logo's-Footer.png" alt="momskart"/>
        </div>
          {/* <h5 className="text-capitalize mt-3 mb-4" style={{ color: '#212121', fontSize: '16px', fontWeight: 'bolder' }}>
            Reach Us
          </h5> */}
          {/* <span className="footer-link" style={{ fontSize: '12px' }}>
          
            
            <img src="/static/img/Momskart-logo's-Footer.png" alt="momskart"/>
            
          </span> */}
       <p>
More than a Marketplace
By Moms Of BHARAT  </p>

        <ul className="ps-list--social">
          <li>
            <a className="facebook" href="https://www.facebook.com/momskartofficial/" target="_blank" rel="noopener noreferrer">
              <i className="fa fa-facebook" />
            </a>
          </li>
          <li>
            <a className="twitter" href="https://twitter.com/momskart" target="_blank" rel="noopener noreferrer">
              <i className="fa fa-twitter" />
            </a>
          </li>
          <li>
            <a className="youtube" href="https://www.youtube.com/channel/UCi-WObkdYolHYFE7QicQf3g" target="_blank" rel="noopener noreferrer">
            <i  className="fa fa-youtube"/>
            </a>
          </li>
          <li>
            <a className="instagram" href="https://www.instagram.com/momskart/" target="_blank" rel="noopener noreferrer">
              <i className="fa fa-instagram" />
            </a>
          </li>
        </ul>
      </div>
     
    </aside>
  
  
               
                    
        <aside className="widget widget_footer col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">

            <h4 className="widget-title">About Us</h4>
            <ul className="ps-list--link">
                <li>
                    <Link href="/page/blank">Our Story</Link>
                </li>
                
                <li>
                    <Link href="/page/blank">Meet Our Founder</Link>
                </li>
                <li>
                    <Link href="/page/blank">What Makes Us Different?</Link>
                </li>
                <li>
                    <Link href="/page/blank">Blogs/Recipe</Link>
                </li>

                {/* <li>
                    <Link href="/page/faqs">FAQs</Link>
                </li> */}
            </ul>
        </aside>
        <aside className="widget widget_footer col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
            <h4 className="widget-title">Quick Links</h4>
            <ul className="ps-list--link">
                <li>
                    <Link href="/page/about-us">Policy</Link>
                </li>
                <li>
                    <Link href="/page/blank">Affilate</Link>
                </li>
                <li>
                    <Link href="/page/blank">Career</Link>
                </li>
                <li>
                    <Link href="/page/contact-us">Contact</Link>
                </li>
            </ul>
        </aside>
        <aside className="widget widget_footer col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
            <h4 className="widget-title">Contact Us</h4>
            <ul className="ps-list--link">
               
                <li>
                    <Link href="mailto:heymomskart@gmail.com">contact@themomskart.com</Link>
                </li>
                <li>
                    <Link href="/account/user-information">CIN: U74999MP2021PTC055720</Link>
                </li>
                <li>
                    <Link href={'/shop'}>56, New Dewas Road
Near SBI Vallabh Nagar Indore, 452001
Madhya Pradesh, India</Link>
                </li>
            </ul>
        </aside>
    </div>
);

export default FooterWidgets;
