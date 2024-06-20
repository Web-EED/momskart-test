import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    userdata: {},
    cartAddress: {},
    selectedAddress:{}
};

export const ecommerce = createSlice({
    name: 'message',
    initialState,
    reducers: {
        reset: () => initialState,
        userChangeIsLoggedIn: (state, action) => {
            return {
                ...state,
                isLoggedIn: action.payload.isloggedin,
                userdata: action.payload.userdata,
            };
        },
        userCartAddress: (state, action) => {
            return {
                ...state,
                cartAddress:action.payload
            };
        },
    },
});

export const { reset, userChangeIsLoggedIn, userCartAddress } = ecommerce.actions;

export default ecommerce.reducer;
