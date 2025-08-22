// src/store/productCategory/thunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  getProducts as getProductCategoriesApi,
  addNewProduct as addProductCategoryApi,
  updateProduct as updateProductCategoryApi,
  deleteProducts as deleteProductCategoryApi,
} from "../../helpers/auth_api_helper";

// ---- GET ALL ----
export const getProductCategories = createAsyncThunk(
  "productCategory/getProductCategories",
  async (
    {
      offset = 0,
      limit = 10,
      searchValue = "",
      ProductCategoryStatus = "",
    }: {
      offset?: number;
      limit?: number;
      searchValue?: string;
      ProductCategoryStatus?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await getProductCategoriesApi(
        offset,
        limit,
        searchValue,
        ProductCategoryStatus
      );
      return {
        data: response.data,
        recordsTotal: response.recordsTotal,
        recordsFiltered: response.recordsFiltered,
      };
    } catch (error: any) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

// ---- ADD ----
export const addProductCategory = createAsyncThunk(
  "productCategory/addProductCategory",
  async (category: { name: string; status: "Active" | "Inactive" }, { rejectWithValue }) => {
    try {
      const response = await addProductCategoryApi(category);
      toast.success( response.message, { autoClose: 3000 });
      return response.message;
    } catch (error: any) {
      toast.error(error.message, { autoClose: 3000 });
      return rejectWithValue(error.message || "Failed to add category");
    }
  }
);

// ---- UPDATE ----
export const updateProductCategory = createAsyncThunk(
  "productCategory/updateProductCategory",
  async (category: { id: string; name: string; status: "Active" | "Inactive" }, { rejectWithValue }) => {
    try {
      const response = await updateProductCategoryApi(category);
      toast.success(response.message, { autoClose: 3000 });
      return response.message;
    } catch (error: any) {
      toast.error(error.message, { autoClose: 3000 });
      return rejectWithValue(error || "Failed to update category");
    }
  }
);

// ---- DELETE ----
 export const deleteProductCategory = createAsyncThunk(
  "productCategory/deleteProductCategory",
  async (id: number | string, { rejectWithValue }) => {
    try {
      const response = await deleteProductCategoryApi(id);
      toast.success(response?.message || "Category deleted successfully", { autoClose: 3000 });
      return response?.message;
    } catch (error: any) {
      toast.error(error?.message || "Failed to delete category", { autoClose: 3000 });
      return rejectWithValue(error || "Failed to delete product category");
    }
  }
);