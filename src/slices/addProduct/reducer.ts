// src/store/product/ProductSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getProducts, addProduct, updateProduct, deleteProduct } from "./thunk";

export interface Product {
  id: number | string;
  serial_no: number | string;
  category_id: number | string;
  category_name: string;
  name: string;
  description: string;
  slug: string;
  icon: string | null;
  status: "Active" | "Inactive";
  created_at: string;
}

// If API response includes pagination metadata
export interface ProductResponse {
  data: Product[];
  recordsTotal: number;
  recordsFiltered: number;
}

interface RequestState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

interface ProductState {
  list: Product[];
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

const initialState: ProductState = {
  list: [],
  recordsTotal: 0,
  recordsFiltered: 0,
  fetchState: { ...initialRequestState },
  addState: { ...initialRequestState },
  updateState: { ...initialRequestState },
  deleteState: { ...initialRequestState },
};

const ProductSlice = createSlice({
  name: "product",
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
    // Fetch Products
    builder
      .addCase(getProducts.pending, (state) => {
        state.fetchState.loading = true;
        state.fetchState.error = null;
      })
      .addCase(
        getProducts.fulfilled,
        (state, action: PayloadAction<ProductResponse>) => {
          state.fetchState.loading = false;
          state.fetchState.success = true;
          state.list = action.payload.data;
          state.recordsTotal = action.payload.recordsTotal;
          state.recordsFiltered = action.payload.recordsFiltered;
        }
      )
      .addCase(getProducts.rejected, (state, action) => {
        state.fetchState.loading = false;
        state.fetchState.error =
          (action.payload as string) ||
          action.error.message ||
          "Failed to fetch products";
      });

    // Add Product
    builder
      .addCase(addProduct.pending, (state) => {
        state.addState.loading = true;
        state.addState.error = null;
      })
      .addCase(addProduct.fulfilled, (state) => {
        state.addState.loading = false;
        state.addState.success = true;
        // ✅ No list push (UI will call getProducts after add)
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.addState.loading = false;
        state.addState.error =
          (action.payload as string) ||
          action.error.message ||
          "Failed to add product";
      });

    // Update Product
    builder
      .addCase(updateProduct.pending, (state) => {
        state.updateState.loading = true;
        state.updateState.error = null;
      })
      .addCase(
        updateProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.updateState.loading = false;
          state.updateState.success = true;
          const index = state.list.findIndex((p) => p.id === action.payload.id);
          if (index !== -1) {
            state.list[index] = action.payload;
          }
        }
      )
      .addCase(updateProduct.rejected, (state, action) => {
        state.updateState.loading = false;
        state.updateState.error =
          (action.payload as string) ||
          action.error.message ||
          "Failed to update product";
      });

// builder
//   .addCase(updateProduct.pending, (state) => {
//     state.updateState.loading = true;
//     state.updateState.error = null;
//     state.updateState.success = false; // reset success
//   })
//   .addCase(updateProduct.fulfilled, (state, action) => {
//     state.updateState.loading = false;
//     state.updateState.success = true;

//     const updatedProduct = action.payload; // must be Product
//     const index = state.list.findIndex((p) => p.id === updatedProduct.id);

//     if (index !== -1) {
//       state.list[index] = updatedProduct;
//     }
//   })
//   .addCase(updateProduct.rejected, (state, action) => {
//     state.updateState.loading = false;
//     state.updateState.error =
//       (action.payload as string) ||
//       action.error.message ||
//       "Failed to update product";
//   });



    // Delete Product
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.deleteState.loading = true;
        state.deleteState.error = null;
      })
      .addCase(
        deleteProduct.fulfilled,
        (state, action: PayloadAction<number | string>) => {
          state.deleteState.loading = false;
          state.deleteState.success = true;
          // state.list = state.list.filter((p) => p.id !== action.payload);
            state.list = state.list.filter(
            (item) => item.id !== action.meta.arg);

          state.recordsTotal = Math.max(state.recordsTotal - 1, 0);
          state.recordsFiltered = Math.max(state.recordsFiltered - 1, 0);
        }
      )
      .addCase(deleteProduct.rejected, (state, action) => {
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
} = ProductSlice.actions;

export default ProductSlice.reducer;