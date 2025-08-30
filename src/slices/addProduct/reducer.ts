import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  productStatusChange,
} from "./thunk";

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

export interface ProductResponse {
  data: Product[];
  recordsTotal: number;
  recordsFiltered: number;
  offset: number;
  context: string;
}

interface RequestState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

interface StatusRequestState extends RequestState {
  id?: number | string | null;
}

interface ProductState {
  tableList: Product[];
  productdropdownList: Product[];
  selected: Product | null;
  recordsTotal: number;
  recordsFiltered: number;
  fetchState: RequestState;
  detailState: RequestState;
  addState: RequestState;
  updateState: RequestState;
  deleteState: RequestState;
  statusState: StatusRequestState;
  hasMore: boolean;
  offset: number;
  limit: number;
}

const initialRequestState: RequestState = {
  loading: false,
  success: false,
  error: null,
};

const initialState: ProductState = {
  tableList: [],
  selected: null,
  productdropdownList: [],
  recordsTotal: 0,
  recordsFiltered: 0,
  fetchState: { ...initialRequestState },
  detailState: { ...initialRequestState },
  addState: { ...initialRequestState },
  updateState: { ...initialRequestState },
  deleteState: { ...initialRequestState },
  statusState: { ...initialRequestState, id: null },
  hasMore: true,
  offset: 0,
  limit: 10,
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
    resetStatusState: (state) => {
      state.statusState = { ...initialRequestState };
    },
    resetSelected: (state) => {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
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

          const { data, recordsTotal, recordsFiltered, offset, context } =
            action.payload;
          state.offset = offset;
          state.limit = 10;

          if (context === "table") {
            state.tableList = data;
            state.recordsTotal = recordsTotal;
            state.recordsFiltered = recordsFiltered;
          }

          if (context === "dropdown") {
            if (offset === 0) {
              state.productdropdownList = data;
            } else {
              state.productdropdownList = [
                ...state.productdropdownList,
                ...data,
              ];
            }

            state.hasMore = data.length >= 10;
          }
        }
      )
      .addCase(getProducts.rejected, (state, action) => {
        state.fetchState.loading = false;
        state.fetchState.error =
          (action.payload as string) ||
          action.error.message ||
          "Failed to fetch products";
      });

    builder
      .addCase(getProductById.pending, (state) => {
        state.detailState.loading = true;
        state.detailState.error = null;
      })
      .addCase(
        getProductById.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.detailState.loading = false;
          state.detailState.success = true;
          state.selected = action.payload;
        }
      )
      .addCase(getProductById.rejected, (state, action) => {
        state.detailState.loading = false;
        state.detailState.error =
          (action.payload as string) ||
          action.error.message ||
          "Failed to fetch product by id";
      });

    builder
      .addCase(addProduct.pending, (state) => {
        state.addState.loading = true;
        state.addState.error = null;
      })
      .addCase(addProduct.fulfilled, (state) => {
        state.addState.loading = false;
        state.addState.success = true;
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
          const index = state.tableList.findIndex(
            (p) => p.id === action.payload.id
          );
          if (index !== -1) {
            state.tableList[index] = action.payload;
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

          state.tableList = state.tableList.filter(
            (item) => item.id !== action.meta.arg
          );

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

    // Change Status 
    builder
      .addCase(productStatusChange.pending, (state, action) => {
        const { id, currentStatus } = action.meta.arg;
        const newStatus = currentStatus === "Active" ? "Inactive" : "Active";

        const index = state.tableList.findIndex((cat) => cat.id === id);
        if (index !== -1) {
          state.tableList[index].status = newStatus;
        }

        state.statusState.loading = true;
        state.statusState.id = id;
      })
      .addCase(productStatusChange.fulfilled, (state, action) => {
        state.statusState.loading = false;
        state.statusState.success = true;
        state.statusState.id = null;
      })
      .addCase(productStatusChange.rejected, (state, action) => {
        state.statusState.loading = false;
        state.statusState.success = false;
        state.statusState.error = action.payload || "Failed to update";
        state.statusState.id = null;
        const { id, currentStatus } = action.meta.arg;
        const index = state.tableList.findIndex((cat) => cat.id === id);
        if (index !== -1) {
          state.tableList[index].status = currentStatus;
        }
      });
  },
});

export const {
  resetAddState,
  resetUpdateState,
  resetDeleteState,
  resetFetchState,
  resetStatusState,
  resetSelected,
} = ProductSlice.actions;

export default ProductSlice.reducer;