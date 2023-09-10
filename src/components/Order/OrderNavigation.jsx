import { useEffect, useRef, useState } from "react";
import { orderActions } from "../../store/order";
import { SearchIcon } from "../UI/Icons/Icons";
import styles from "./OrderNavigation.module.css";
import { useDispatch, useSelector } from "react-redux";

export default (props) => {
  const dispatch = useDispatch();
  const activeCategory = useSelector((state) => state.order.activeCategory);
  const searchTerms = useSelector((state) => state.order.searchTerms);
  const [searchFormStyles, setSearchFormStyles] = useState(
    styles["order-nav-search-form"],
  );
  const [searchInFocus, setSearchInFocus] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const searchRef = useRef();
  const searchDropDownRef = useRef();

  const displayedSearchTerms =
    searchInputValue === ""
      ? searchTerms
      : searchTerms.filter((searchTerm) =>
          searchTerm.toLowerCase().includes(searchInputValue.toLowerCase()),
        );

  useEffect(() => {
    dispatch(orderActions.setActiveCategory("all"));
  }, []);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (
        searchInFocus &&
        !searchDropDownRef.current.contains(event.target) &&
        !searchRef.current.contains(event.target)
      ) {
        setSearchFormStyles(styles["order-nav-search-form"]);
        setSearchInFocus(false);
      }
    };

    document.addEventListener("mousedown", handleDocumentClick);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, [searchInFocus]);

  const activeCategoryChangeHandler = (category) => {
    return () => {
      category === "all" && dispatch(orderActions.setActiveCategory("all"));
      category === "bread" && dispatch(orderActions.setActiveCategory("bread"));
      category === "brownie" &&
        dispatch(orderActions.setActiveCategory("brownie"));
      category === "cake" && dispatch(orderActions.setActiveCategory("cake"));
      category === "cookie" &&
        dispatch(orderActions.setActiveCategory("cookie"));
      category === "muffin" &&
        dispatch(orderActions.setActiveCategory("muffin"));
      category === "pastry" &&
        dispatch(orderActions.setActiveCategory("pastry"));
      category === "pie" && dispatch(orderActions.setActiveCategory("pie"));
    };
  };

  const searchFormFocusHandler = () => {
    setSearchFormStyles(
      `${styles["order-nav-search-form"]} ${styles["order-nav-search-form-focused"]}`,
    );
    setSearchInFocus(true);
  };

  const searchSubmitHandler = (event) => {
    event.preventDefault();

    dispatch(orderActions.setProductsBySearch(searchInputValue));

    setSearchFormStyles(styles["order-nav-search-form"]);
    setSearchInFocus(false);
    document.activeElement.blur();

    setSearchInputValue("");
  };

  const inputChangeHandler = (event) => {
    setSearchInputValue(event.target.value);
    searchFormFocusHandler();
  };

  const searchItemSelectHandler = (item) => {
    return () => {
      setSearchInputValue("");
      dispatch(orderActions.setProductsBySearch(item));
      setSearchFormStyles(styles["order-nav-search-form"]);
      setSearchInFocus(false);
    };
  };

  return (
    <nav className={styles["order-nav"]}>
      <li key="order-nav-all">
        <button
          className={styles["order-nav-btn"]}
          onClick={activeCategoryChangeHandler("all")}
        >
          All Bakery Items
          <div
            className={activeCategory === "all" ? `${styles.active}` : ""}
          ></div>
        </button>
      </li>
      <li key="order-nav-bread">
        <button
          className={styles["order-nav-btn"]}
          onClick={activeCategoryChangeHandler("bread")}
        >
          Breads
          <div
            className={activeCategory === "bread" ? `${styles.active}` : ""}
          ></div>
        </button>
      </li>
      <li key="order-nav-brownies">
        <button
          className={styles["order-nav-btn"]}
          onClick={activeCategoryChangeHandler("brownie")}
        >
          Brownies
          <div
            className={activeCategory === "brownie" ? `${styles.active}` : ""}
          ></div>
        </button>
      </li>
      <li key="order-nav-cakes">
        <button
          className={styles["order-nav-btn"]}
          onClick={activeCategoryChangeHandler("cake")}
        >
          Cakes
          <div
            className={activeCategory === "cake" ? `${styles.active}` : ""}
          ></div>
        </button>
      </li>
      <li key="order-nav-pastries|cookies" className={styles["order-nav-btn"]}>
        <button
          className={styles["order-nav-btn"]}
          onClick={activeCategoryChangeHandler("pastry")}
        >
          Cookies & Pastries
          <div
            className={activeCategory === "pastry" ? `${styles.active}` : ""}
          ></div>
        </button>
      </li>
      <li key="order-nav-muffin">
        <button
          className={styles["order-nav-btn"]}
          onClick={activeCategoryChangeHandler("muffin")}
        >
          Muffins
          <div
            className={activeCategory === "muffin" ? `${styles.active}` : ""}
          ></div>
        </button>
      </li>
      <li key="order-nav-pies" className={styles["order-nav-btn"]}>
        <button
          className={styles["order-nav-btn"]}
          onClick={activeCategoryChangeHandler("pie")}
        >
          Pies
          <div
            className={activeCategory === "pie" ? `${styles.active}` : ""}
          ></div>
        </button>
      </li>
      <div className={styles["order-nav-search"]}>
        <form
          onSubmit={searchSubmitHandler}
          onFocus={searchFormFocusHandler}
          className={searchFormStyles}
        >
          <SearchIcon classes={"icon-search-form"} />
          <input
            className={styles["order-nav-search-input"]}
            ref={searchRef}
            value={searchInputValue}
            onChange={inputChangeHandler}
          ></input>
          {searchInFocus && (
            <div
              ref={searchDropDownRef}
              className={styles["order-nav-search-form-results"]}
            >
              <ul className={styles["order-nav-search-form-results-list"]}>
                {displayedSearchTerms.map((item, index) => {
                  return (
                    <li
                      key={index}
                      onClick={searchItemSelectHandler(item)}
                      className={
                        styles["order-nav-search-form-results-list-item"]
                      }
                    >
                      <SearchIcon classes={"icon-search-form"} />
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </form>
      </div>
    </nav>
  );
};
