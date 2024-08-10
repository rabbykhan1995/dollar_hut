"use client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for user login
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("/api/auth/login", credentials);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post("/api/auth/manual", userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const editUser = createAsyncThunk(
  "user/editUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post("/api/profile/edit", userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchInitialUser = createAsyncThunk(
  "user/fetchInitialUser",
  async (_, thunkAPI) => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      if (path === "/login" || path === "/register") {
        return thunkAPI.rejectWithValue(
          "Skipping fetchInitialUser on login or register page"
        );
      }
    }

    const response = await fetch("/api/user", { cache: "no-cache" });
    if (response.ok) {
      return await response.json();
    }
    throw new Error("Failed to fetch user data");
  }
);
