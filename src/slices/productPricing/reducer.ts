import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getProductPricing,
  getProductPricingById,
  addProductPricing,
  updateProductPricing,
  deleteProductPricing,
} from "./thunk";


export interface ProductPricing {
  id: number | string;
  price: number;
  currency: string;
}

export interface ProductResponse {
  data: ProductPricing[];
  recordsTotal: number;
  recordsFiltered: number;
}

interface RequestState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

interface ProductPricingState {
  list: ProductPricing[];
  selected: ProductPricing | null;
  recordsTotal: number;
  recordsFiltered: number;
  fetchState: RequestState;
  detailState: RequestState;
  addState: RequestState;
  updateState: RequestState;
  deleteState: RequestState;
}

const initialRequestState: RequestState = {
  loading: false,
  success: false,
  error: null,
};

const initialState: ProductPricingState = {
  list: [],
  selected: null,
  recordsTotal: 0,
  recordsFiltered: 0,
  fetchState: { ...initialRequestState },
  detailState: { ...initialRequestState },
  addState: { ...initialRequestState },
  updateState: { ...initialRequestState },
  deleteState: { ...initialRequestState },
};

const ProductPricingSlice = createSlice({
  name: "ProductPricing",
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
    resetSelected: (state) => {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductPricing.pending, (state) => {
        state.fetchState.loading = true;
        state.fetchState.error = null;
      })
      .addCase(
        getProductPricing.fulfilled,
        (state, action: PayloadAction<ProductResponse>) => {
          state.fetchState.loading = false;
          state.fetchState.success = true;
          state.list = action.payload.data;
          state.recordsTotal = action.payload.recordsTotal;
          state.recordsFiltered = action.payload.recordsFiltered;
        }
      )
      .addCase(getProductPricing.rejected, (state, action) => {
        state.fetchState.loading = false;
        state.fetchState.error =
          (action.payload as string) ||
          action.error.message ||
          "Failed to fetch products";
      });

    // Fetch by ID
    builder
      .addCase(getProductPricingById.pending, (state) => {
        state.detailState.loading = true;
        state.detailState.error = null;
      })
      .addCase(
        getProductPricingById.fulfilled,
        (state, action: PayloadAction<ProductPricing>) => {
          state.detailState.loading = false;
          state.detailState.success = true;
          state.selected = action.payload;
        }
      )
      .addCase(getProductPricingById.rejected, (state, action) => {
        state.detailState.loading = false;
        state.detailState.error =
          (action.payload as string) ||
          action.error.message ||
          "Failed to fetch product by id";
      });

    // Add Product
    builder
      .addCase(addProductPricing.pending, (state) => {
        state.addState.loading = true;
        state.addState.error = null;
      })
      .addCase(
        addProductPricing.fulfilled,
        (state, action: PayloadAction<ProductPricing>) => {
          state.addState.loading = false;
          state.addState.success = true;
          if (action.payload) {
            state.list.push(action.payload);
          }
        }
      )
      .addCase(addProductPricing.rejected, (state, action) => {
        state.addState.loading = false;
        state.addState.error =
          (action.payload as string) ||
          action.error.message ||
          "Failed to ad product";
      });

    // Update Product
    builder
      .addCase(updateProductPricing.pending, (state) => {
        state.updateState.loading = true;
        state.updateState.error = null;
      })
      .addCase(
        updateProductPricing.fulfilled,
        (state, action: PayloadAction<ProductPricing>) => {
          state.updateState.loading = false;
          state.updateState.success = true;
          const index = state.list.findIndex((p) => p.id === action.payload.id);
          if (index !== -1) {
            state.list[index] = action.payload;
          }
        }
      )
      .addCase(updateProductPricing.rejected, (state, action) => {
        state.updateState.loading = false;
        state.updateState.error =
          (action.payload as string) ||
          action.error.message ||
          "Failed to update product";
      });

    // Delete Product
    builder
      .addCase(deleteProductPricing.pending, (state) => {
        state.deleteState.loading = true;
        state.deleteState.error = null;
      })
      .addCase(
        deleteProductPricing.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.deleteState.loading = false;
          state.deleteState.success = true;
          state.list = state.list.filter((p) => p.id !== action.meta.arg);
        }
      )
      .addCase(deleteProductPricing.rejected, (state, action) => {
        state.deleteState.loading = false;
        state.deleteState.error =
          (action.payload as string) ||
          action.error.message ||
          "Failed to delete product";
      });
  },
});

export const {
  resetAddState,
  resetUpdateState,
  resetDeleteState,
  resetFetchState,
  resetSelected,
} = ProductPricingSlice.actions;

export default ProductPricingSlice.reducer;