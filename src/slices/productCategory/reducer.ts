// src/store/productCategory/ProductCategorySlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getProductCategories,
  addProductCategory,
  updateProductCategory,
  deleteProductCategory,
} from "./thunk";

interface ProductCategory {
  id: number;
  name: string;
  status: "active" | "inactive";
  recordsTotal: number;
  recordsFiltered: number;
}

interface ProductCategoryResponse {
  data: ProductCategory[];
  recordsTotal: number;
  recordsFiltered: number;
}

interface RequestState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

interface ProductCategoryState {
  list: ProductCategory[];
  recordsTotal: number;
  recordsFiltered: number;
  fetchState: RequestState;
  addState: RequestState;
  updateState: RequestState;
  deleteState: RequestState;
}

const initialRequestState: RequestState = {
  loading: false,
  success: false,
  error: null,
};

const initialState: ProductCategoryState = {
  list: [],
  recordsTotal: 0,
  recordsFiltered: 0,
  fetchState: { ...initialRequestState },
  addState: { ...initialRequestState },
  updateState: { ...initialRequestState },
  deleteState: { ...initialRequestState },
};

const ProductCategorySlice = createSlice({
  name: "productCategory",
  initialState,
  reducers: {
    resetAddState: (state) => {
      state.addState = { ...initialRequestState };
    },
    resetUpdateState: (state) => {
      state.updateState = { ...initialRequestState };
    },
    resetDeleteState: (state) => {
      state.deleteState = { ...initialRequestState };
    },
    resetFetchState: (state) => {
      state.fetchState = { ...initialRequestState };
    },
  },
  extraReducers: (builder) => {
    // Fetch Categories
    builder
      .addCase(getProductCategories.pending, (state) => {
        state.fetchState.loading = true;
        state.fetchState.error = null;
      })
      .addCase(
        getProductCategories.fulfilled,
        (state, action: PayloadAction<ProductCategoryResponse>) => {
          state.fetchState.loading = false;
          state.fetchState.success = true;
          state.list = action.payload.data;
          state.recordsTotal = action.payload.recordsTotal;
          state.recordsFiltered = action.payload.recordsFiltered;
        }
      )
      .addCase(getProductCategories.rejected, (state, action) => {
        state.fetchState.loading = false;
        state.fetchState.error =
          (action.payload as string) ||
          action.error.message ||
          "Failed to fetch categories";
      });

    // Add Category
    builder
      .addCase(addProductCategory.pending, (state) => {
        state.addState.loading = true;
        state.addState.error = null;
      })
      .addCase(
        addProductCategory.fulfilled,
        (state, action: PayloadAction<ProductCategory>) => {
          state.addState.loading = false;
          state.addState.success = true;
          state.list.push(action.payload);
        }
      )
      .addCase(addProductCategory.rejected, (state, action) => {
        state.addState.loading = false;
        state.addState.error =
          (action.payload as string) ||
          action.error.message ||
          "Failed to add category";
      });

    // Update Category
    builder
      .addCase(updateProductCategory.pending, (state) => {
        state.updateState.loading = true;
        state.updateState.error = null;
      })
      .addCase(
        updateProductCategory.fulfilled,
        (state, action: PayloadAction<ProductCategory>) => {
          state.updateState.loading = false;
          state.updateState.success = true;
          const index = state.list.findIndex(
            (cat) => cat.id === action.payload.id
          );
          if (index !== -1) {
            state.list[index] = action.payload;
          }
        }
      )
      .addCase(updateProductCategory.rejected, (state, action) => {
        state.updateState.loading = false;
        state.updateState.error =
          (action.payload as string) ||
          action.error.message ||
          "Failed to update category";
      });

    // Delete Category
    builder
      .addCase(deleteProductCategory.pending, (state) => {
        state.deleteState.loading = true;
        state.deleteState.error = null;
      })
      .addCase(
        deleteProductCategory.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.deleteState.loading = false;
          state.deleteState.success = true;
          state.list = state.list.filter((item) => item.id !== action.meta.arg);

          // 🔄 Decrement totals
          state.recordsTotal = Math.max(state.recordsTotal - 1, 0);
          state.recordsFiltered = Math.max(state.recordsFiltered - 1, 0);
        }
      )

      .addCase(deleteProductCategory.rejected, (state, action) => {
        state.deleteState.loading = false;
        state.deleteState.error =
          (action.payload as string) ||
          action.error.message ||
          "Failed to delete category";
      });
  },
});

export const {
  resetAddState,
  resetUpdateState,
  resetDeleteState,
  resetFetchState,
} = ProductCategorySlice.actions;

export default ProductCategorySlice.reducer;
