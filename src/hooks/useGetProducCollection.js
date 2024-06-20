import { useCallback, useEffect, useState } from 'react';

import { useBoolean } from 'ahooks';
import { DEFAULT_PAGE_SIZE } from '~/utilities/constants';
import { getStrapiEntriesService } from '~/services/strapi/strapiQueryServices';
import { loadHomeData } from '~/services/apiService';

const COLLECTION_TYPE = 'product-collections';

export default function useGetProducCollection(collectionSlug) {
    const [
        collectionLoading,
        { setTrue: enableLoading, setFalse: disableLoading },
    ] = useBoolean();

    const [collectionDetail, setCollectionDetails] = useState(null);

    const getStrapiCollection = useCallback(async () => {
        enableLoading();
        try {
            const response = await loadHomeData();
            console.log(response);
            setCollectionDetails(
                response && response.data.length > 0 ? response.data.result : null
            );
        } catch (err) {
            setCollectionDetails(null);
        } finally {
            disableLoading();
        }
    }, [collectionSlug, enableLoading, disableLoading]);

    useEffect(() => {
        getStrapiCollection();
    }, [collectionSlug]);

    return {
        collectionLoading,
        collectionDetail,
        getStrapiCollection,
    };
}
