import { useState } from 'react';
import { useBoolean } from 'ahooks';
import { getStrapiEntriesService } from '~/services/strapi/strapiQueryServices';
import { otpLogin,checkOtp,getUserDetails } from '~/services/apiService';
import { APP_DEFAULT_PAGE_SIZE } from '~/constants/appConstants';

const COLLECTION_TYPE = 'account';

export default function useAccount(handleFeatureWillUpdate) {
    const [loading, { setTrue: enableLoading, setFalse: disableLoading }] = useBoolean();
    const [otpsent, setOtpSent] = useState(false);
    const [userdata, setUserData] = useState({});

    const getOTP = async (mobile) => {
        enableLoading();
        try {
            let query = { mobile_number: mobile };
            const response = await otpLogin(query);
            setOtpSent(true);
            handleFeatureWillUpdate("OTP Sent Successfully");
        } catch (e) {
            setOtpSent(false);
            handleFeatureWillUpdate("Error");
        } finally {
            disableLoading();
        }
    };

    const checkOTP = async (mobile,otp) => {
        enableLoading();
        try {
            let query = { mobile_number: mobile ,OTP:otp};
            const response = await checkOtp(query);
            if (response.data.status) {
                setUserData(response.data.result);
                handleFeatureWillUpdate("Welcome To Momskart");
            } else {
                handleFeatureWillUpdate("Wrong OTP");
                setOtpSent(false);
            }
           
        } catch (e) {
            handleFeatureWillUpdate("Wrong OTP");
            setOtpSent(false);
        } finally {
            disableLoading();
        }
    };
    const fetchUserDetails = async (mobile,otp) => {
        enableLoading();
        try {
            const response = await getUserDetails();
            if (response.data.status) {
                setUserData(response.data.result);
            } else {
                setUserData({});
            }
           
        } catch (e) {
            setUserData({});
        } finally {
            disableLoading();
        }
    };

    return {
        loading,
        getOTP,
        otpsent,
        checkOTP,
        userdata,
        fetchUserDetails
    };
}
