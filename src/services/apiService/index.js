import BaseService from '../httpService';

const formDataRequest = (query) => {
    let form_data = new FormData();
    Object.keys(query).forEach(obj_key => {
        console.log(obj_key, "ibside", query[obj_key], form_data);
        form_data.append(obj_key, query[obj_key]);

    })
    console.log(form_data,"form ahi");
    return form_data
}
const getDeviceId = () => {
    let cart_id = localStorage.getItem('cart_id');
    if (!cart_id) {
        const device_id = Math.random().toString(36).substring(2, 15);
        cart_id = localStorage.setItem('cart_id', device_id);
    }
    return cart_id;
};
const getUserId = () => {
    let user_id = localStorage.getItem("user_id");
    return user_id
}
const makeQuery = (data = {}) => {
    data.device_id = getDeviceId();
    if (getUserId()) {
    data.user_id = getUserId();
    }
    return data;
};
const loadHomeData = async (query = {}, pageno) => {
    query = makeQuery(query);
    let res = await BaseService.post(
        'https://momskart.live/api/v1/index.php/customer_webapi/product/getProductList',
        { ...query }
    );
    return res;
};

const loadHomeAllData = async (query = { device_id: '123', user_id: '0' }) => {
    query = makeQuery(query);
    let res = await BaseService.post(
        'https://momskart.live/api/v1/index.php/customer_webapi/home/getHomeDataNew/',
        { ...query }
    );
    return res;
};

const loadProductDetails = async (
    query = { device_id: '123', user_id: '0' }
) => {
    query = makeQuery(query);
    let res = await BaseService.post(
        'https://momskart.live/api/v1/index.php/customer_webapi/product/getProductDetailWeb/',
        { ...query }
    );
    return res;
};

const otpLogin = async (query = { device_id: '123', user_id: '0' }) => {
    query = makeQuery(query);
    let res = await BaseService.post(
        'https://momskart.live/api/v1/index.php/customer_webapi/customer/otpLogin',
        { ...query }
    );
    return res;
};

const checkOtp = async (query = { device_id: '123', user_id: '0' }) => {
    query = makeQuery(query);
    let res = await BaseService.post(
        'https://momskart.live/api/v1/index.php/customer_webapi/customer/checkOTP',
        { ...query }
    );
    return res;
};
const addProductToCart = async (query = { device_id: '123', user_id: '0' }) => {
    query = makeQuery(query);
    let res = await BaseService.post(
        'https://momskart.live/api/v1/index.php/customer_webapi/cart/addToCart',
        { ...query }
    );
    return res;
};

const removeProductToCart = async (query = {}) => {
    query = makeQuery(query);
    let form_equest = formDataRequest(query);
    console.log(form_equest,"return aaya");
    let res = await BaseService.post('https://momskart.live/api/v1/index.php/customer_webapi/cart/removeCart',
        form_equest
    );
    return res;
};

const loadCart = async (query = { device_id: '123', user_id: '0' }) => {
    query = makeQuery(query);
    let res = await BaseService.post(
        'https://momskart.live/api/v1/index.php/customer_webapi/cart/getCartList',
        { ...query }
    );
    return res;
};

const getUserDetails = async (query={}) => {
    query = makeQuery(query);
    let res = await BaseService.post(
        'https://momskart.live/api/v1/index.php/customer_webapi/customer/getUserDetail',
        { ...query }
    );
    return res;
};

const getCheckout = async (query={}) => {
    query = makeQuery(query);
    let res = await BaseService.post('https://momskart.live/api/v1/index.php/customer_webapi/order/getCheckOut',
        { ...query }
    );
    return res;
};

const checkServicibility = async (pincode) => {
    let res = await BaseService.get('https://momskart.live/api/v1/index.php/customer_webapi/delhivery/checkPincode/'+pincode
    );
    return res;
};

const generatePaymentToken = async (formData) => {
    // query = makeQuery(query);
    let res = await BaseService.post('https://momskart.live/api/v1/PaytmMomskart.php',
        formData,
        { headers: {
            'Content-Type': 'multipart/form-data'
        }}
    );
    return res;
};

const createOrder = async (formData) => {
    // query = makeQuery(query);
    let res = await BaseService.post('https://momskart.live/api/v1/index.php/customer_webapi/order/createOrder',
        formData,
        { headers: {
            'Content-Type': 'multipart/form-data'
        }}
    );
    return res;
};
export {
    loadHomeData,
    loadHomeAllData,
    loadProductDetails,
    otpLogin,
    checkOtp,
    addProductToCart,
    loadCart,
    getUserDetails,
    getCheckout,
    removeProductToCart,
    checkServicibility,
    generatePaymentToken,
    createOrder
};
