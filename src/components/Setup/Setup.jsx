import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SERVER_URL } from "../../env";
import { authActions } from "../../store/auth";
import { orderActions } from "../../store/order";
import { cartActions } from "../../store/cart";
import ui, { uiActions } from "../../store/ui";

export default () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const loadedImages = useSelector((state) => state.order.loadedImages);
  const productList = useSelector((state) => state.order.productList);
  const isMobile = useSelector((state) => state.ui.isMobile);

  const [isMounted, setIsMounted] = useState(false);

  const checkLoggedIn = async () => {
    const response = await fetch(`${SERVER_URL}/api/v1/users/checkAndRefreshLogin`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: document.cookie.split("=")[1],
      }),
    });
    if (response.ok) {
      dispatch(authActions.login());

      const responseData = await response.json();

      const { name, phone, email } = responseData.data.user;
      dispatch(
        authActions.setUserInfo({
          userName: name,
          userEmail: email,
          userPhone: phone,
        })
      );
    }
  };

  const getProducts = async () => {
    const results = await fetch(`${SERVER_URL}/api/v1/products`);
    const data = await results.json();
    const products = data.data.products;
    dispatch(orderActions.setProductList(products));
  };

  const setMobile = () => {
    if (window.innerWidth < 1250) dispatch(uiActions.setIsMobile());
    else dispatch(uiActions.setIsNotMobile());
  };

  const getPersistentCart = async () => {
    const response = await fetch(`${SERVER_URL}/api/v1/orders/me`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        token: document.cookie.split("=")[1],
      }),
    });

    const data = await response.json();

    return data;
  };

  const setCartItemsLocalStorage = async () => {
    let items = JSON.parse(localStorage.getItem("cart"));
    items = await Promise.all(
      items.map(async (item) => {
        let image;
        if (loadedImages[item.imageSrc]) {
          image = loadedImages[item.imageSrc];
        } else {
          const result = await fetch(`${SERVER_URL}/${item.imageSrc}`, {
            mode: "cors",
          });
          const data = await result.blob();

          image = URL.createObjectURL(data);

          dispatch(
            orderActions.addLoadedImage({
              imageSrc: item.imageSrc,
              imageURL: image,
            })
          );
        }
        return { ...item, image };
      })
    );
    return items;
  };

  const setCartItemsPersistentStorage = async (data) => {
    const matchingProducts = data.cart.products.map((product) => {
      const matchingProduct = productList.find((item) => item._id === product._id);

      if (!matchingProduct) return;

      return {
        id: matchingProduct._id,
        imageSrc: matchingProduct.imageSrc,
        imageAlt: matchingProduct.imageAlt,
        name: matchingProduct.name,
        orderAmount: product.quantity,
        pricePerOrder: matchingProduct.pricePerOrder,
      };
    });
    const items = await Promise.all(
      matchingProducts.map(async (item) => {
        let image;

        if (loadedImages[item.imageSrc]) {
          image = loadedImages[item.imageSrc];
        } else {
          const result = await fetch(`${SERVER_URL}/${item.imageSrc}`, {
            mode: "cors",
          });

          const data = await result.blob();

          image = URL.createObjectURL(data);

          dispatch(
            orderActions.addLoadedImage({
              imageSrc: item.imageSrc,
              imageURL: image,
            })
          );
        }
        return { ...item, image };
      })
    );
    return items;
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const initialSetup = async () => {
      setMobile();
      await checkLoggedIn();
      await getProducts();
    };
    initialSetup();
  }, []);

  useEffect(() => {
    if (isMounted && productList.length !== 0) {
      let items;
      let data;
      const localCartExists =
        JSON.parse(localStorage.getItem("cart")) !== null && JSON.parse(localStorage.getItem("cart")).length !== 0;

      // Logged in and local cart exists
      // Logged in and local cart does not exist
      // Not logged in
      const cartSetup = async () => {
        if (!isLoggedIn && !localCartExists) return;
        if (isLoggedIn) data = await getPersistentCart();
        if (localCartExists) items = await setCartItemsLocalStorage();
        else items = await setCartItemsPersistentStorage(data);

        if (isLoggedIn) {
          const id = data.cart._id;
          dispatch(cartActions.setCart({ id, items }));
        } else dispatch(cartActions.setCart({ items }));
      };
      cartSetup();
    }
  }, [productList, isLoggedIn]);

  useEffect(() => {
    if (isMounted) {
      const updateCart = async () => {
        localStorage.setItem("cart", JSON.stringify(cart.items));
        if (isLoggedIn) {
          const filteredCart = cart.items.map((item) => {
            return { _id: item.id, quantity: item.orderAmount };
          });
          const response = await fetch(`${SERVER_URL}/api/v1/orders/me/update`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              token: document.cookie.split("=")[1],
              products: filteredCart,
            }),
          });
        }
      };
      updateCart();
    }
  }, [cart]);

  return <></>;
};
