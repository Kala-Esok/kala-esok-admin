import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { UserEntity } from '@/types';
import { dummyUsers } from '@/lib/dummy-data';
// import { userService } from '@/lib/api'; // Uncomment when BE is ready

// ─── Async Thunks (connect to BE here) ───────────────────────
export const fetchUsers = createAsyncThunk('users/fetchAll', async (_, { rejectWithValue }) => {
  try {
    // const res = await userService.getAll(token);
    // return res.data as UserEntity[];

    // Dummy fallback
    return dummyUsers as UserEntity[];
  } catch (err) {
    return rejectWithValue((err as Error).message);
  }
});

// ─── State ───────────────────────────────────────────────────
interface UsersState {
  items: UserEntity[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  selectedUser: UserEntity | null;
}

const initialState: UsersState = {
  items: [],
  status: 'idle',
  error: null,
  selectedUser: null,
};

// ─── Slice ───────────────────────────────────────────────────
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    selectUser(state, action: PayloadAction<UserEntity | null>) {
      state.selectedUser = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { selectUser, clearError } = usersSlice.actions;
export default usersSlice.reducer;
