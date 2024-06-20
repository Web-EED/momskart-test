import React, { useEffect } from 'react';
import Link from 'next/link';

import { Form, Input, notification,Spin } from 'antd';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { userChangeIsLoggedIn } from '~/redux/features/userSlide';
import useAccount from '~/hooks/useAccount';

export default function Login() {
    const Router = useRouter();

    function handleFeatureWillUpdate(e) {
        // e.preventDefault();
        notification.open({
            message: e,
            // description: 'This feature has been updated later!',
            duration: 100,
        });
    }
    const { loading, getOTP,otpsent,checkOTP,userdata} = useAccount(handleFeatureWillUpdate);


    const dispatch = useDispatch();
    const handleLogin = async(e) => {
        if (e.mobile_number && !e.otp) {
            getOTP(e.mobile_number);
        } else if (e.mobile_number && e.otp) {
            checkOTP(e.mobile_number, e.otp);
        }
    };

    const isLoggedIn = useSelector(({ user }) => user.isLoggedIn);
    useEffect(() => {
        if(isLoggedIn)
            Router.push('/account/user-information');
    },[isLoggedIn])
    useEffect(() => {
        if (Object.keys(userdata).length >0) {
            dispatch(userChangeIsLoggedIn({ isloggedin: true, userdata: userdata }));
            localStorage.setItem("user_id", userdata.user_id_PK);
            localStorage.setItem("user_data",JSON.stringify(userdata));
            Router.push('/account/user-information');
        }
    },[userdata])
    return (
        <div className="ps-my-account">
            <div className="container">
                <Form
                    className="ps-form--account"
                    onFinish={(e) => handleLogin(e)}>
                    <ul className="ps-tab-list">
                        <li className="active">
                            <Link href={'/account/login'}>Login</Link>
                        </li>
                        <li>
                            <Link href={'/account/register'}>Register</Link>
                        </li>
                    </ul>
                    <div className="ps-tab active" id="sign-in">
                        <div className="ps-form__content">
                            <h5>Log In Your Account</h5>
                            <div className="form-group">
                                <Form.Item
                                    name="mobile_number"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Mobile Number!',
                                            min: 10,
                                            max:11
                                        }
                                    ]}>
                                    <Input
                                        className="form-control"
                                        type="number"
                                        placeholder="Mobile Number"
                                        // min= {9}
                                        // max={11}
                                    />
                                </Form.Item>
                            </div>
                           {otpsent && ( <div className="form-group form-forgot">
                                <Form.Item
                                    name="otp"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please ente your OTP!',
                                        },
                                    ]}>
                                    <Input
                                        className="form-control"
                                        type="number"
                                        placeholder="OTP"
                                    />
                                </Form.Item>
                            </div>)}
                            <div className="form-group">
                                <div className="ps-checkbox">
                                    <input
                                        className="form-control"
                                        type="checkbox"
                                        id="remember-me"
                                        name="remember-me"
                                    />
                                    <label htmlFor="remember-me">
                                        Rememeber me
                                    </label>
                                </div>
                            </div>
                            <div className="form-group submit">
                               {loading ? <Spin />: <button
                                    type="submit"
                                    disabled={loading}
                                    className="ps-btn ps-btn--fullwidth">
                                    Login
                                </button>}
                            </div>
                        </div>
                        <div className="ps-form__footer">
                            <p>Connect with:</p>
                            <ul className="ps-list--social">
                                <li>
                                    <a
                                        className="facebook"
                                        href="#"
                                        onClick={(e) => e.preventDefault()}>
                                        <i className="fa fa-facebook" />
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="google"
                                        href="#"
                                        onClick={(e) => e.preventDefault()}>
                                        <i className="fa fa-google-plus" />
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="twitter"
                                        href="#"
                                        onClick={(e) => e.preventDefault()}>
                                        <i className="fa fa-twitter" />
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="instagram"
                                        href="#"
                                        onClick={(e) => e.preventDefault()}>
                                        <i className="fa fa-instagram" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
}
