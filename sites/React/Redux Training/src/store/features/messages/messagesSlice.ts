import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../../api/api.ts';
import type Message from "../../../types/MessageType.ts"
import type { MessagesStatus } from "../../../types/MessageType.ts"

interface MessageState {
  data: Message[],
  status: MessagesStatus,
  error: string | null,
}

const initialState: MessageState = {
  data: [],
  status: 'idle',
  error: null,
};

export const fetchMessages = createAsyncThunk('messages/fetchMessages', async () => {
  const response = await api.get<Message[]>('api/messages')
  return response.data
})

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.status = 'loading',
        state.error = null
      })
      .addCase(fetchMessages.fulfilled, (state, action: PayloadAction<Message[]>) => {
        state.status = 'succeeded',
        state.data = action.payload
      })
      .addCase(fetchMessages.rejected, (state) => {
        state.status = 'failed',
        state.error = 'Failed to load messages :('
      })
  }
})

export default messageSlice.reducer