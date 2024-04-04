import React from 'react';
import StarRatings from 'react-star-ratings';
import { AppDispatch, RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedProduct } from '../../store/selectedProductSlice';
import { Product } from '../../store/productsSlice';
import { useNavigate } from 'react-router';
import { Button } from '../button/Button';
import { calculateDiscountedPrice } from '../../helpers';
import { deleteItemFromCart, setItemInCart } from '../../store/cartSlice';

export const ItemsView = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: RootState) =>
    Object.values(state.products.entities)
  );
  const productsBasket = useSelector(
    (state: RootState) => state.cart.itemsInCart
  );

  const handleProductClick = (product: Product) => {
    dispatch(setSelectedProduct(product));
    navigate(`/items/${product.id}`);
  };

  const handleItemBasket = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    productsBasket.some((item) => item.id === product?.id)
      ? dispatch(deleteItemFromCart(product?.id))
      : dispatch(setItemInCart(product));
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 max-w-[90rem] mt-8 mx-auto">
        {products.length > 0 &&
          products[0]?.map((item: Product) => (
            <div
              className=""
              key={item.id}
              onClick={() => handleProductClick(item)}
            >
              <div
                className="flex relative items-center flex-col p-5 w-full h-full min-h-[350px] hover:scale-105 transition-all cursor-pointer rounded-md bg-slate-700 text-white"
                key={item.id}
              >
                <div className="flex absolute right-7 top-3 font-bold text-[20px] bg-red-500 max-w-[40%] justify-center p-2 mt-5 items-center rounded-lg">
                  <div className="">-{item?.discountPercentage} %</div>
                </div>
                <div className="max-w-[100%]">
                  <img
                    className="max-w-[100%] h-40 w-full"
                    src={item.thumbnail}
                    alt=""
                  />
                </div>
                <div className=" text-white font-medium text-xl pt-4">
                  {item.title}
                </div>
                <div className="pt-5">
                  <StarRatings
                    rating={item.rating}
                    starDimension="23px"
                    starSpacing="15px"
                    starRatedColor="gold"
                  />{' '}
                </div>
                <div className="flex gap-8 pt-5 text-white items-center font-bold text-[20px]">
                  {item?.price &&
                    item?.discountPercentage &&
                    calculateDiscountedPrice(
                      item.price,
                      item.discountPercentage
                    ).discountedPrice.toFixed(0)}
                  $<div className="line-through">{item?.price} $</div>
                </div>
                <div className="flex items-center pt-5">
                  <Button
                    text={`${
                      !productsBasket.some(
                        (basketItem) => basketItem.id === item?.id
                      )
                        ? 'Buy now'
                        : 'Delete from cart'
                    }`}
                    className={`px-16 py-3 ${
                      productsBasket.some(
                        (basketItem) => basketItem.id === item?.id
                      )
                        ? '!bg-gray-500 !active:bg-gray-700 !hover:bg-gray-600'
                        : '!bg-blue-500 !active:bg-blue-700 !hover:bg-blue-600'
                    } `}
                    onClick={(e) => handleItemBasket(e, item)}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
