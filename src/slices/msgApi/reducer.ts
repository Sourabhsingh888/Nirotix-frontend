import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getMessagesApi,
  addMessageApi,
  updateMessageApi,
  deleteMessageApi,
  getMessageByIdApi,
  changeMessageStatusApi,
} from "./thunk";

export interface Message {
  id: number | string;
  api_name: string;
  api_type: string;
  base_url: string;
  params?: string;
  method?: string;
  status: "Active" | "Inactive";
  created_at: string;
}

export interface MessageResponse {
  data: Message[];
  recordsTotal: number;
  recordsFiltered: number;
}

interface RequestState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

interface MessageState {
  list: Message[];
  recordsTotal: number;
  recordsFiltered: number;
  fetchState: RequestState;
  addState: RequestState;
  updateState: RequestState;
  deleteState: RequestState;
  statusState: RequestState;
  selectedMessage: Message | null;
  selectedMessageState: RequestState;
}

const initialRequestState: RequestState = {
  loading: false,
  success: false,
  error: null,
};

const initialState: MessageState = {
  list: [],
  recordsTotal: 0,
  recordsFiltered: 0,
  fetchState: { ...initialRequestState },
  addState: { ...initialRequestState },
  updateState: { ...initialRequestState },
  deleteState: { ...initialRequestState },
  statusState: { ...initialRequestState },
  selectedMessage: null,
  selectedMessageState: { ...initialRequestState },
};

const MessageSlice = createSlice({
  name: "message",
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
    resetSelectedMessageState: (state) => {
      state.selectedMessageState = { ...initialRequestState };
      state.selectedMessage = null;
    },
  },
  extraReducers: (builder) => {
    // ---- Fetch Messages ----
    builder
      .addCase(getMessagesApi.pending, (state) => {
        state.fetchState.loading = true;
        state.fetchState.success = false;
        state.fetchState.error = null;
      })
      .addCase(getMessagesApi.fulfilled, (state, action: PayloadAction<MessageResponse>) => {
        state.fetchState.loading = false;
        state.fetchState.success = true;
        state.list = action.payload.data;
        state.recordsTotal = action.payload.recordsTotal;
        state.recordsFiltered = action.payload.recordsFiltered;
      })
      .addCase(getMessagesApi.rejected, (state, action) => {
        state.fetchState.loading = false;
        state.fetchState.error =
          (action.payload as string) || action.error.message || "Failed to fetch messages";
      });

    // ---- Add Message ----
    builder
      .addCase(addMessageApi.pending, (state) => {
        state.addState.loading = true;
        state.addState.success = false;
        state.addState.error = null;
      })
      .addCase(addMessageApi.fulfilled, (state) => {
        state.addState.loading = false;
        state.addState.success = true;
      })
      .addCase(addMessageApi.rejected, (state, action) => {
        state.addState.loading = false;
        state.addState.error =
          (action.payload as string) || action.error.message || "Failed to add message";
      });

    // ---- Update Message ----
    // builder
    //   .addCase(updateMessageApi.pending, (state) => {
    //     state.updateState.loading = true;
    //     state.updateState.success = false;
    //     state.updateState.error = null;
    //   })
    //   .addCase(updateMessageApi.fulfilled, (state, action: PayloadAction<any>) => {
    //     state.updateState.loading = false;
    //     state.updateState.success = true;
    //     const updated = action.payload?.data || action.payload;
    //     if (!updated?.id) return;
    //     const index = state.list.findIndex((m) => m.id === updated.id);
    //     if (index !== -1) {
    //       state.list[index] = updated;
    //     }
    //   })
    //   .addCase(updateMessageApi.rejected, (state, action) => {
    //     state.updateState.loading = false;
    //     state.updateState.error =
    //       (action.payload as string) || action.error.message || "Failed to update message";
    //   });


    builder
  .addCase(updateMessageApi.pending, (state) => {
    state.updateState.loading = true;
    state.updateState.success = false;
    state.updateState.error = null;
  })
  .addCase(updateMessageApi.fulfilled, (state, action: PayloadAction<any>) => {
    state.updateState.loading = false;
    state.updateState.success = true;
    
    const updated = action.payload?.data || action.payload;
    if (!updated?.id) return;
    
    const index = state.list.findIndex((m) => m.id === updated.id);
    if (index !== -1) {
      state.list[index] = { ...state.list[index], ...updated }; // 👈 safe merge
    }
  })
  .addCase(updateMessageApi.rejected, (state, action) => {
    state.updateState.loading = false;
    state.updateState.error =
      (action.payload as string) || action.error.message || "Failed to update message";
  });


    // ---- Delete Message ----
    builder
      .addCase(deleteMessageApi.pending, (state) => {
        state.deleteState.loading = true;
        state.deleteState.success = false;
        state.deleteState.error = null;
      })
      .addCase(deleteMessageApi.fulfilled, (state, action) => {
        state.deleteState.loading = false;
        state.deleteState.success = true;
        const id = action.meta.arg;
        state.list = state.list.filter((m) => m.id !== id);
        state.recordsTotal = Math.max(state.recordsTotal - 1, 0);
        state.recordsFiltered = Math.max(state.recordsFiltered - 1, 0);
      })
      .addCase(deleteMessageApi.rejected, (state, action) => {
        state.deleteState.loading = false;
        state.deleteState.error =
          (action.payload as string) || action.error.message || "Failed to delete message";
      });

    // ---- Change Status ----
   builder
  .addCase(changeMessageStatusApi.pending, (state) => {
    state.statusState.loading = true;
    state.statusState.success = false;
    state.statusState.error = null;
  })
  .addCase(changeMessageStatusApi.fulfilled, (state, action) => {
    state.statusState.loading = false;
    state.statusState.success = true;

    // backend se jo data aaya hai (id + status)
    const updated = action.payload; // { id, status }
    if (!updated?.id) return;

    // list me find karke sirf status update karo
    const index = state.list.findIndex((m) => m.id.toString() === updated.id.toString());
    if (index !== -1) {
      state.list[index].status = updated.status;
    }
  })
  .addCase(changeMessageStatusApi.rejected, (state, action) => {
    state.statusState.loading = false;
    state.statusState.error =
      (action.payload as string) || action.error.message || "Failed to change status";
  });

    // ---- Get Message by ID ----
    builder
      .addCase(getMessageByIdApi.pending, (state) => {
        state.selectedMessageState.loading = true;
        state.selectedMessageState.success = false;
        state.selectedMessageState.error = null;
        state.selectedMessage = null;
      })
      .addCase(getMessageByIdApi.fulfilled, (state, action: PayloadAction<Message>) => {
        state.selectedMessageState.loading = false;
        state.selectedMessageState.success = true;
        state.selectedMessage = action.payload;
      })
      .addCase(getMessageByIdApi.rejected, (state, action) => {
        state.selectedMessageState.loading = false;
        state.selectedMessageState.error =
          (action.payload as string) || action.error.message || "Failed to fetch message by id";
        state.selectedMessage = null;
      });
  },
});

export const {
  resetAddState,
  resetUpdateState,
  resetDeleteState,
  resetFetchState,
  resetStatusState,
  resetSelectedMessageState,
} = MessageSlice.actions;

export default MessageSlice.reducer;
