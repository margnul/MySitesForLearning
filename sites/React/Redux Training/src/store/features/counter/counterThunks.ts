import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../api/api.ts"


export const addAsync = createAsyncThunk(
  'counter/addAsync',
  async () => {
    await new Promise((res) => setTimeout(res, 1000))
    return 5
  }
)

export const loadCounter = createAsyncThunk(
  'counter/loadCounter',
  async () => {
    const res = await api.get('/posts/1');
    return res.data.id; // jsonplaceholder hack :)
  }
);

// save counter
export const saveCounter = createAsyncThunk(
  'counter/saveCounter',
  async (value) => {
    await api.post('/posts', { value });
    return true;
  }
);

export const blockForValueSeconds = createAsyncThunk(
  'counter/blockForValueSeconds',
  async (curValue: number) => {
    await new Promise((res) => setTimeout(res, curValue * 1000))
    return 0
  }
)