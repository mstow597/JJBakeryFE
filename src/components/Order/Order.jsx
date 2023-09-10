import { useEffect, useRef, useState } from "react";
import SlideInWrapper from "../Utils/SlideInWrapper/SlideInWrapper";
import styles from "./Order.module.css";
import OrderList from "./OrderList";
import OrderNavigation from "./OrderNavigation";
import Button from "../UI/Button/Button";
import OrderItemDetailed from "./OrderItemDetailed";
import { useSelector } from "react-redux";

export default (props) => {
  const [loadMoreClicked, setLoadMoreClicked] = useState(false);
  const [loadMore, setLoadMore] = useState(10);

  const activeCategory = useSelector((state) => state.order.activeCategory);
  const filteredProductList = useSelector(
    (state) => state.order.filteredProductList,
  );
  const showItemDetails = useSelector((state) => state.order.showItemDetails);

  const loadMoreElement = useRef();

  const numFilteredProducts = filteredProductList.length;
  const canLoadMore = numFilteredProducts > loadMore;
  const displayedProductList = canLoadMore
    ? filteredProductList.slice(0, loadMore)
    : filteredProductList;

  const onIntersection = (entries) => {
    if (entries[0].isIntersecting && canLoadMore && loadMoreClicked)
      loadMoreHandler();
  };

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);

    if (observer && loadMoreElement.current)
      observer.observe(loadMoreElement.current);

    return () => {
      if (observer) observer.disconnect();
    };
  }, [displayedProductList]);

  useEffect(() => {
    setLoadMoreClicked(false);
    setLoadMore(10);
  }, [activeCategory, filteredProductList]);

  loadMoreHandler = () => {
    setLoadMore((prevState) => prevState + 10);
    setLoadMoreClicked(true);
  };

  return (
    <>
      <OrderNavigation />
      {showItemDetails && <OrderItemDetailed />}
      <SlideInWrapper>
        {numFilteredProducts > 0 && (
          <div className={styles.order}>
            <OrderList productList={displayedProductList}></OrderList>
            {!loadMoreClicked && canLoadMore && (
              <Button onClick={loadMoreHandler} classes="button-flex-center">
                Load More
              </Button>
            )}
            {loadMoreClicked && canLoadMore && (
              <div ref={loadMoreElement}></div>
            )}
          </div>
        )}
        {numFilteredProducts === 0 && <p>Sorry, no products available.</p>}
      </SlideInWrapper>
    </>
  );
};
