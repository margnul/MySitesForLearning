import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "./features/counter/counterSlice.ts";
import { counterMiddleware } from './features/counter/counterMiddleware.ts';

import messagesReducer from "./features/messages/messagesSlice.ts";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    messages: messagesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(counterMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;