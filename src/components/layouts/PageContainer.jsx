'use client';
import React,{useEffect} from 'react';
import HeaderDefault from '~/components/shared/headers/HeaderDefault';
import FooterFullwidth from '~/components/shared/footers/FooterFullwidth';
import HeaderMobile from '~/components/shared/headers/HeaderMobile';
import { useDispatch, useSelector } from 'react-redux';
import { userChangeIsLoggedIn } from '~/redux/features/userSlide';

const initHeaders = (
    <>
        <HeaderDefault />
        <HeaderMobile />
    </>
);
const initFooters = <FooterFullwidth />;

const PageContainer = ({
    header = initHeaders,
    footer = initFooters,
    children,
}) => {
    const dispatch = useDispatch();

    useEffect(() => { 
        let user_id = localStorage.getItem("user_id");
        let user_data = localStorage.getItem("user_data");
        if (user_id && user_data) {
            dispatch(userChangeIsLoggedIn({ isloggedin: true, userdata: JSON.parse(user_data) }));
            
        } else if (user_id && !user_data) {
            dispatch(userChangeIsLoggedIn({ isloggedin: true, userdata: {} }));
            
        }
     }, []);
    return (
        <>
            {header}
            {children}
            {footer}
        </>
    );
};

export default PageContainer;
