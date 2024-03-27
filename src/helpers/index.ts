import { Product } from "../store/productsSlice";

export const calculateDiscountedPrice = (price: number, discountPercentage: number) => {
    const discountedPrice = price * (1 - discountPercentage / 100);
    const discountAmount = price - discountedPrice;
    return {
        discountedPrice: discountedPrice,
        discountAmount: discountAmount
    };
};

export const calcTotalPrice = (items: Product[]) => items.reduce((acc: number, item: Product) => (acc += item.price), 0);