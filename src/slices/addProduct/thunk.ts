import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  addProductList as addProductApi,
  getProductList as getProductListApi,
  getProductByid as getProductByidApi,
  updateProductList as updateProductApi,
  deleteProductList as deleteProductApi,
  productStatusChange as productStatusChangeApi,
} from "../../helpers/auth_api_helper";

// ---- GET ALL ----
export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (
    {
      offset = 0,
      limit = 10,
      context,
      searchValue = "",
      ProductStatus = "",
      categoryId = "",

    }: {
      offset?: number;
      limit?: number;
      context: "table" | "dropdown";
      searchValue?: string;
      ProductStatus?: string;
      categoryId?: string;

    },
    { rejectWithValue }
  ) => {

    try {

      const response = await getProductListApi(
        offset,
        limit,
        searchValue,
        ProductStatus,
        categoryId

      );
      return {
        data: response.data,
        recordsTotal: response.recordsTotal,
        recordsFiltered: response.recordsFiltered,
        offset,
        context,
      };
    } catch (error: any) {
      toast.error("Failed to load products");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ---- GET ById ----
export const getProductById = createAsyncThunk(
  "product/getById",
  async (id: number | string, { rejectWithValue }) => {
    try {
      const response = await getProductByidApi(id);
      console.log(response);
      return response.data;

    } catch (error: any) {
      toast.error("Failed to load product", { autoClose: 3000 });
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);


// ---- ADD ----
export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (formData: FormData, { rejectWithValue }) => {

    try {
      const response = await addProductApi(formData);
      toast.success(response.message, { autoClose: 3000 });
      return response;
    } catch (error: any) {
      toast.error(error.message, { autoClose: 3000 });
      return rejectWithValue(error.message || "Failed to add product");
    }
  }
);


// ---- UPDATE ----
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (
    { id, data }: { id: string | number; data: { price: string; currency: string } },
    { rejectWithValue }
  ) => {
    try {
      const response = await updateProductApi(id, data);
      toast.success(response.message);
      return response;
    } catch (error: any) {
      toast.error(error.message || "Failed to update product", {
        autoClose: 3000,
      });
      return rejectWithValue(error || "Failed to update product");
    }
  }
);


// ---- DELETE ----
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id: number | string, { rejectWithValue }) => {
    try {
      const response = await deleteProductApi(id);
      toast.success(response?.message || "Product deleted successfully", {
        autoClose: 3000,
      });

      return response;

    } catch (error: any) {
      toast.error(error?.message || "Failed to delete product", {
        autoClose: 3000,
      });
      return rejectWithValue(error || "Failed to delete product");
    }
  }
);


// ---- STATUS CHANGE ----
export const productStatusChange = createAsyncThunk(
  "product/statusChange",
  async ({ id, currentStatus }, { rejectWithValue }) => {
    try {
      const response = await productStatusChangeApi(id);
      toast.success(response.message || "Status updated successfully", {
        autoClose: 3000,
      });
      if (response.success) {
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