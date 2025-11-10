import { createSlice } from "@reduxjs/toolkit";
import { loadCounter, saveCounter, addAsync, blockForValueSeconds } from './counterThunks.ts';

interface CounterState{
  value: number;
  loading: boolean;
  error: string | undefined;
}

const initialState: CounterState = {
  value: 0,
  loading: false,
  error: "false",
}

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => { state.value += 1; },
    decrement: (state) => { state.value -= 1; },
    reset: (state) => { state.value = 0; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.value += action.payload;
      })
      .addCase(addAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(loadCounter.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadCounter.fulfilled, (state, action) => {
        state.loading = false;
        state.value = action.payload;
      })
      .addCase(loadCounter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(saveCounter.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveCounter.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(saveCounter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      .addCase(blockForValueSeconds.pending, (state) => {
        state.loading = true;
      })
      .addCase(blockForValueSeconds.fulfilled, (state, action) => {
        state.loading = false;
        state.value = action.payload;
      })
      .addCase(blockForValueSeconds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
})

export const { increment, decrement, reset } = counterSlice.actions;
export default counterSlice.reducer;