import React from 'react';
import DiscountScroll from '../components/DiscountScroll';
import CatalogMain from '../components/CatalogMain';
import Recommendation from '../components/Recommendation';

export default function Catalog() {
    return (
        <>
            <DiscountScroll
                props={[
                    {
                        id: 1,
                        title: 'Cashback Offer: 10% Back on Your First Order',
                        pills: ['best deals', 'Cashback']
                    },
                    {
                        id: 2,
                        title: 'Free Shipping on Orders Over $50',
                        pills: ['best deals', 'Free Shipping']
                    },
                    {
                        id: 3,
                        title: 'Cashback Offer: 10% Back on Your First Order',
                        pills: ['best deals', 'Cashback']
                    },
                    {
                        id: 4,
                        title: 'Free Shipping and Cashback on Orders Over $80',
                        pills: ['best deals', 'Free Shipping', 'Cashback']
                    }
                ]} />
            <CatalogMain />
            <Recommendation />
        </>
    )
}