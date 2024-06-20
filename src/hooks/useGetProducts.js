import { useState } from 'react';
import { DEFAULT_QUERY_GET_PRODUCT } from '~/services/queries/productStrapiQueries';
import {
    getStrapiEntriesService,
    getStrapiEntryByIdService,
} from '~/services/strapi/strapiQueryServices';
import { loadHomeData,loadProductDetails,loadCart,getCheckout } from '~/services/apiService';
import { useDispatch, useSelector } from 'react-redux';
import { setUpdatedCart } from '~/redux/features/ecommerceSlide';


const COLLECTION_TYPE = 'products';

export default function useGetProducts() {
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState(null);
    const [relatedProduct, setRelatedProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [cartData, setCart] = useState([]);
    const [cartCalculations, setCartCalculation] = useState({});
    const [cartcheckoutCalculations, setCheckoutCartCalculation] = useState({});
    const [meta, setMeta] = useState(null);
    const toggleLoading = (state) => setLoading(state);
    const dispatch = useDispatch();
    const getStrapiProducts = async (queryRaw) => {
        toggleLoading(true);
        try {
            const response = await loadHomeData(queryRaw);
            // const response = await getStrapiEntriesService(
            //     COLLECTION_TYPE,
            //     queryRaw
            // );
            setProducts(response.data.result || []);
            setMeta(response.meta || null);
        } catch (error) {
            console.error('Error fetching products:', error);
            setProducts([]);
            setMeta(null);
        } finally {
            toggleLoading(false);
        }
    };

    const getStrapiProduct = async (slug) => {
        toggleLoading(true);
        try {
            let query = {product_slug:slug,device_id: "5197"}
            const response = await loadProductDetails(query);
            setProduct(response.data.result);
            setRelatedProducts(response.data.related_product)
        } catch (error) {
            console.error('Error fetching product:', error);
            setProduct(null);
        } finally {
            toggleLoading(false);
        }
    };

    const getCart = async (slug) => {
        toggleLoading(true);
        try {
            const response = await loadCart();
            // setProduct(response.data.result);
            response.data.result && setCart(response.data.result);
            response.data.result && setCartCalculation(response.data);
        } catch (error) {
            console.error('Error fetching product:', error);
        } finally {
            toggleLoading(false);
        }
    };

    const getCheckoutData = async(pincode) => {
        toggleLoading(true);
        try {
            const query = { customer_pincode: pincode };
            const response = await getCheckout(query);
            console.log(response.data,"-----function");
            response.data.result && setCart(response.data.result);
            response.data.result && setCheckoutCartCalculation(response.data);
            dispatch(setUpdatedCart(response.data));
            return true;
        } catch (error) {
            console.error('Error fetching Cart:', error);
            return false;
        } finally {
            toggleLoading(false);
        }
    }

    

    return {
        loading,
        product,
        relatedProduct,
        products,
        meta,
        getStrapiProducts,
        getStrapiProduct,
        getCart,
        cartData,
        cartCalculations,
        getCheckoutData,
        cartcheckoutCalculations
    };
}
