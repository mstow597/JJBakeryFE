import { createSlice } from "@reduxjs/toolkit";

const initialOrderState = {
  productList: [],
  searchTerms: [],
  filteredProductList: [],
  activeCategory: "all",
  loadedImages: {},
  showItemDetails: false,
  itemToShow: {},
};

const generateSearchTerms = (products) => {
  return products
    .map((item) => {
      const { name } = item;
      const capitalizedName = name
        .split(" ")
        .map((word) => {
          if (word === "and") return word;
          return word[0].toUpperCase().concat(word.slice(1));
        })
        .join(" ");
      return capitalizedName;
    })
    .sort();
};

const productListSortCompareFn = (productA, productB) => {
  if (productA.name < productB.name) return -1;
  else if (productA.name > productB.name) return 1;
  else return 0;
};

const orderSlice = createSlice({
  name: "order",
  initialState: initialOrderState,
  reducers: {
    setProductList(state, action) {
      state.productList = action.payload.sort(productListSortCompareFn);
      state.searchTerms = generateSearchTerms(action.payload);
      state.filteredProductList = state.productList;
    },
    setActiveCategory(state, action) {
      state.activeCategory = action.payload;
      state.filteredProductList =
        action.payload === "all"
          ? state.productList
          : state.productList.filter(
              (item) => item.category === action.payload,
            );
    },
    addLoadedImage(state, action) {
      state.loadedImages[action.payload.imageSrc] = action.payload.imageURL;
    },
    setProductsBySearch(state, action) {
      state.filteredProductList = state.productList.filter((item) =>
        item.name.toLowerCase().includes(action.payload.toLowerCase()),
      );
    },
    showOrderItemDetails(state, action) {
      state.showItemDetails = true;
      state.itemToShow = action.payload;
    },
    hideOrderItemDetails(state, action) {
      state.showItemDetails = false;
      state.itemToShow = {};
    },
  },
});

export const orderActions = orderSlice.actions;
export default orderSlice.reducer;
