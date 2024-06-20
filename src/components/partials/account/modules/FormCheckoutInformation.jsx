import React, { useEffect } from 'react';
import Link from 'next/link';
import { Form, Input } from 'antd';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { userCartAddress } from '~/redux/features/userSlide';
import useGetProducts from '~/hooks/useGetProducts';

export default function FormCheckoutInformation() {
    const dispatch = useDispatch()
    const cartAddress = useSelector(({ user }) => user.cartAddress);
    const [form] = Form.useForm();
    const Router = useRouter();
    const { getCheckoutData ,loading,cartcheckoutCalculations} = useGetProducts();

    const handleLoginSubmit = (data = {}) => {
        dispatch(userCartAddress({ ...data }));
        getCheckoutData(data.pincode).then(data => {
            if (data) {
            Router.push('/account/shipping');
            } else {
                alert("error");
            }
        })
    };

    useEffect(() => {
        form.setFieldsValue(cartAddress);
    }, [cartAddress]);


    return (
        <Form className="ps-form__billing-info" form={form} onFinish={handleLoginSubmit}>
            <h3 className="ps-form__heading">Contact information</h3>
            <div className="form-group">
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: false,
                            message: 'Enter an email or mobile phone number!',
                        },
                    ]}>
                    <Input
                        className="form-control"
                        type="text"
                        placeholder="Email"
                    />
                </Form.Item>
            </div>
            <div className="form-group">
                <Form.Item
                    name="mobile"
                    rules={[
                        {
                            required: false,
                            message: 'Enter an mobile number!',
                        },
                    ]}>
                    <Input
                        className="form-control"
                        type="number"
                        placeholder="Mobile"
                    />
                </Form.Item>
            </div>
            <div className="form-group">
                <div className="ps-checkbox">
                    <input
                        className="form-control"
                        type="checkbox"
                        id="keep-update"
                    />
                    <label htmlFor="keep-update">
                        Keep me up to date on news and exclusive offers?
                    </label>
                </div>
            </div>
            <h3 className="ps-form__heading">Shipping address</h3>
            <div className="row">
                <div className="col-sm-6">
                    <div className="form-group">
                        <Form.Item
                            name="firstName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter your first name!',
                                },
                            ]}>
                            <Input
                                className="form-control"
                                type="text"
                                placeholder="First Name"
                            />
                        </Form.Item>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <Form.Item
                            name="lastName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter your last name!',
                                },
                            ]}>
                            <Input
                                className="form-control"
                                type="text"
                                placeholder="Last Name"
                            />
                        </Form.Item>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <Form.Item
                    name="address"
                    rules={[
                        {
                            required: true,
                            message: 'Enter an address!',
                        },
                    ]}>
                    <Input
                        className="form-control"
                        type="text"
                        placeholder="Address"
                    />
                </Form.Item>
            </div>
            <div className="form-group">
                <Form.Item
                    name="apartment"
                    rules={[
                        {
                            required: false,
                            message: 'Enter an Apartment!',
                        },
                    ]}>
                    <Input
                        className="form-control"
                        type="text"
                        placeholder="Apartment, suite, etc. (optional)"
                    />
                </Form.Item>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <div className="form-group">
                        <Form.Item
                            name="city"
                            rules={[
                                {
                                    required: false,
                                    message: 'Enter a city!',
                                },
                            ]}>
                            <Input
                                className="form-control"
                                type="city"
                                placeholder="City"
                            />
                        </Form.Item>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <Form.Item
                            name="pincode"
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter a postal oce!',
                                },
                            ]}>
                            <Input
                                className="form-control"
                                type="postalCode"
                                placeholder="Postal Code"
                            />
                        </Form.Item>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <div className="ps-checkbox">
                    <input
                        className="form-control"
                        type="checkbox"
                        id="save-information"
                    />
                    <label htmlFor="save-information">
                        Save this information for next time
                    </label>
                </div>
            </div>
            <div className="ps-form__submit">
                <Link href={'/account/shopping-cart'}>
                    <i className="icon-arrow-left mr-2" /> Return to shopping
                    cart
                </Link>
                <div className="ps-block__footer">
                    <button className="ps-btn">Continue to shipping</button>
                </div>
            </div>
        </Form>
    );
}
