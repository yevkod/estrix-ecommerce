import React, { useEffect, useState } from 'react';
import { HeaderView } from '../../components/header/HeaderView';
import { NavbarView } from '../../components/navbar/NavbarView';
import { FooterView } from '../../components/footer/FooterView';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { fetchProducts } from '../../store/productsSlice';
import '@brainhubeu/react-carousel/lib/style.css';
import '../../App.css';
import { WelcomeView } from '../../components/welcome/WelcomeView';
import { NewItemsView } from '../../components/newItems/NewItemsView';
import { ProductDetailsView } from '../../components/productDetails/ProductDetailsView';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { ItemsView } from '../../components/items/ItemsView';
import { OrderView } from '../../components/order/OrderView';
import { AboutView } from '../../components/about/AboutView';
import { SkeletonColorClasses, randomOrderNumber } from '../../helpers';
import { BankCard } from '../../components/BankCard/BankCard';
import { BurgerMenuView } from '../../components/burgerMenu/BurgerMenuView';
import { SkeletonTheme } from 'react-loading-skeleton';

export const MainView = () => {
  const dispatch: AppDispatch = useDispatch();
  const [menu, setMenu] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchProducts());
  }, []);

  return (
    <div className="MainView bg-gradient-to-t from-white to-black">
      <SkeletonTheme
        baseColor={SkeletonColorClasses.baseColor}
        highlightColor={SkeletonColorClasses.highlightColor}
        enableAnimation
      >
        <BrowserRouter>
          {menu && (
            <div className="flex lg:hidden fixed rounded-lg z-[100000] top-[60px] right-0 flex-col shadow-md bg-[#11101D]">
              <BurgerMenuView setMenu={setMenu} />
            </div>
          )}
          <div className="header z-[100]">
            <HeaderView menu={menu} setMenu={setMenu} />
          </div>
          <div className="navbar">
            <NavbarView />
          </div>
          <div className="flex flex-col min-h-screen p-3 mt-10 lg:p-16 main relative w-full">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <WelcomeView />
                    <NewItemsView />
                  </>
                }
              />
              <Route path="/items/:id" element={<ProductDetailsView />} />
              <Route path="/products" element={<ItemsView />} />
              <Route path="/order" element={<OrderView />} />
              <Route path="/about" element={<AboutView />} />
              <Route
                path={`/payment/${randomOrderNumber}`}
                element={<BankCard />}
              />
            </Routes>
          </div>
          <div className="footer">
            <FooterView />
          </div>
        </BrowserRouter>
      </SkeletonTheme>
    </div>
  );
};
