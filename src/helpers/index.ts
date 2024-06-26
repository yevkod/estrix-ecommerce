import { useSelector } from "react-redux";
import { Product } from "../store/productsSlice";
import { RootState } from "../store";

export const calculateDiscountedPrice = (price: number, discountPercentage: number) => {
    const discountedPrice = price * (1 - discountPercentage / 100);
    const discountAmount = price - discountedPrice;
    return {
        discountedPrice: discountedPrice,
        discountAmount: discountAmount
    };
};

export const calcTotalPrice = (items: Product[]) => items.reduce((acc: number, item: Product) => (acc += item.price), 0);

export const calcTotalPriceWithDiscount = (items: Product[]) => {
    let totalPriceWithDiscount = 0;
    items.forEach((item: Product) => {
        const { price, discountPercentage } = item;
        const { discountedPrice } = calculateDiscountedPrice(price, discountPercentage);
        totalPriceWithDiscount += discountedPrice;
    });
    return totalPriceWithDiscount;
};


export const randomOrderNumber = Math.floor(Math.random() * 1000);

export const SkeletonColorClasses = {
    baseColor: 'rgba(108, 122, 137, 0.4)',
    highlightColor: 'rgba(255,255,255,.2)',
    mb: '6px',
};
