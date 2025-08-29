// src/store/productCategory/thunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  getProducts as getProductCategoriesApi,
  getCategoryByid as getProductCategoryByidApi,
  addNewProduct as addProductCategoryApi,
  updateProduct as updateProductCategoryApi,
  deleteProducts as deleteProductCategoryApi,
  categoryStatusChange as StatusChangeApi,
} from "../../helpers/auth_api_helper";

// ---- GET ALL ----
export const getProductCategories = createAsyncThunk(
  "productCategory/getProductCategories",
  async (
    {
      offset = 0,
      limit = 10,
      context,
      searchValue = "",
      ProductCategoryStatus = "",
    }: {
      offset?: number;
      limit?: number;
      context: "table" | "dropdown";
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
        ProductCategoryStatus,
      );
      return {
        data: response.data,
        recordsTotal: response.recordsTotal,
        recordsFiltered: response.recordsFiltered,
        offset,
        context,
      };
    } catch (error: any) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

// ---- GET ById ----
export const getProductCategoryById = createAsyncThunk(
  "productCategory/getById",
  async (id: number | string, { rejectWithValue }) => {
    try {
      const response = await getProductCategoryByidApi(id);
      console.log(response);
      return response.data;
    } catch (error: any) {
      toast.error("Failed to load product category", { autoClose: 3000 });
      return rejectWithValue(error?.response?.data || error.message);
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

      if (error.status === 2) {
        toast.warning(error.message, { autoClose: 3000 });
      } else {
      toast.error(error.message, { autoClose: 3000 });
      }

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
      console.log(error);
      if (error.details.statusCode === 0) {
          toast.warning(error?.message, { autoClose: 3000 });
      } else {
          toast.error(error?.message, { autoClose: 3000 });
      }
      return rejectWithValue(error || "Failed to delete product category");
    }
  }
);


// ---- STATUS CHANGE ----
export const categoryStatusChange = createAsyncThunk(
  "productCategory/statusChange",
  async ({ id, currentStatus }, { rejectWithValue }) => {
    try {
      const response = await StatusChangeApi(id);
      toast.success(response.message || "Status updated successfully", {
        autoClose: 3000,
      });
      if (response.success) {
        // backend doesn’t send new status, so we toggle locally
        const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
        return { id, newStatus };
      } else {
        return rejectWithValue("Failed to change status");
      }
    } catch (error: any) {
      console.error("Status Change Error:", error?.message);
      toast.error(error?.message || "Failed to update status", {
        autoClose: 3000,
      });
      return rejectWithValue(error?.message || "Failed to update status");
    }
  }
);