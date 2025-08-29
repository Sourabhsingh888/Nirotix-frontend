// src/store/productCategory/ProductCategorySlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getProductCategories,
  getProductCategoryById,
  addProductCategory,
  updateProductCategory,
  deleteProductCategory,
  categoryStatusChange,
} from "./thunk";

interface ProductCategory {
  id: number;
  name: string;
  status: string,
  recordsTotal: number;
  recordsFiltered: number;
}

interface ProductCategoryResponse {
  data: ProductCategory[];
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

interface StatusState extends RequestState {
  id?: number | null;
}

interface ProductCategoryState {
  tableList: ProductCategory[];
  selected: ProductCategory | null;
  dropdownList: ProductCategory[];
  recordsTotal: number;
  recordsFiltered: number;
  fetchState: RequestState;
  detailState: RequestState;
  addState: RequestState;
  updateState: RequestState;
  deleteState: RequestState;
  statusState: StatusState;
  hasMore: boolean;

  // 🔑 pagination
  offset: number;
  limit: number;
}



const initialRequestState: RequestState = {
  loading: false,
  success: false,
  error: null,
};

const initialState: ProductCategoryState = {
  tableList: [],
  dropdownList: [],
  selected: null,
  recordsTotal: 0,
  recordsFiltered: 0,
  fetchState: { ...initialRequestState },
  detailState: { ...initialRequestState },
  addState: { ...initialRequestState },
  updateState: { ...initialRequestState },
  deleteState: { ...initialRequestState },
  statusState: { ...initialRequestState, id: null },
  hasMore: true,

  // ✅ defaults
  offset: 0,
  limit: 10,
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
    resetStatusState: (state) => {
      state.statusState = { ...initialRequestState };
    },
    resetSelected: (state) => {
      state.selected = null;
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

          const { data, recordsTotal, recordsFiltered, offset, context } =
            action.payload;

          // ✅ always update pagination state
          state.offset = offset;
          state.limit = 10; // or action.payload.limit if your API sends it

          if (context === "table") {
            state.tableList = data;
            state.recordsTotal = recordsTotal;
            state.recordsFiltered = recordsFiltered;
          }

          if (context === "dropdown") {
            if (offset === 0) {
              state.dropdownList = data;
            } else {
              state.dropdownList = [...state.dropdownList, ...data];
            }
            const loadedSoFar = state.dropdownList.length;
            state.hasMore = loadedSoFar < recordsTotal;
          }
        }
      )

      .addCase(getProductCategories.rejected, (state, action) => {
        state.fetchState.loading = false;
        state.fetchState.error =
          (action.payload as string) ||
          action.error.message ||
          "Failed to fetch categories";
      });

    // Fetch by ID
    builder
      .addCase(getProductCategoryById.pending, (state) => {
        state.detailState.loading = true;
        state.detailState.error = null;
      })
      .addCase(getProductCategoryById.fulfilled, (state, action) => {
        state.detailState.loading = false;
        state.detailState.success = true;
        state.selected = action.payload;
      })
      .addCase(getProductCategoryById.rejected, (state, action) => {
        state.detailState.loading = false;
        state.detailState.error =
          (action.payload as string) ||
          action.error.message ||
          "Failed to fetch product by id";
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
          state.tableList.push(action.payload);
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
          const index = state.tableList.findIndex(
            (cat) => cat.id === action.payload.id
          );
          if (index !== -1) {
            state.tableList[index] = action.payload;
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
          state.tableList = state.tableList.filter(
            (item) => item.id !== action.meta.arg
          );

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

    // ---------------- Change Status ----------------
    builder
      .addCase(categoryStatusChange.pending, (state, action) => {
        const { id, currentStatus } = action.meta.arg;
        const newStatus = currentStatus === "Active" ? "Inactive" : "Active";

        // Optimistic UI update
        const index = state.tableList.findIndex((cat) => cat.id === id);
        if (index !== -1) {
          state.tableList[index].status = newStatus;
        }

        state.statusState.loading = true;
        state.statusState.id = id;
      })
      .addCase(categoryStatusChange.fulfilled, (state, action) => {
        state.statusState.loading = false;
        state.statusState.success = true;
        state.statusState.id = null;
      })
      .addCase(categoryStatusChange.rejected, (state, action) => {
        state.statusState.loading = false;
        state.statusState.success = false;
        state.statusState.error = action.payload || "Failed to update";
        state.statusState.id = null;

        // 🔄 rollback status if API failed
        const { id, currentStatus } = action.meta.arg;
        const index = state.tableList.findIndex((cat) => cat.id === id);
        if (index !== -1) {
          state.tableList[index].status = currentStatus; // revert
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
} = ProductCategorySlice.actions;

export default ProductCategorySlice.reducer;
