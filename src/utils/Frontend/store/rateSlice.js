import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const fetchRate = createAsyncThunk("rate", async (_, thunkAPI) => {
  try {
    const response = await fetch(`${process.env.HOST}/api/rates`, {
      cache: "no-cache",
    });
    const data = await response.json();

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const rateSlice = createSlice({
  name: "rate",
  initialState: {
    rate: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRate.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.rate = action.payload;
      })
      .addCase(fetchRate.rejected, (state, action) => {
        state.rate = action.payload;
        state.status = "failed";
      });
  },
});

export { fetchRate };
export default rateSlice.reducer;
