import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import patentsService from './patentsService'

const initialState = {
  patents: [],
  patent: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  isUpdated: false,
  isDeleted: false,
  isCreated: false,
}

//Get all Patents
export const getPatents = createAsyncThunk(
  'patents/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await patentsService.getPatents(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getPatent = createAsyncThunk(
  'patents/get',
  async (patentId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await patentsService.getPatent(patentId, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const createPatent = createAsyncThunk(
  'patent/create',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await patentsService.createPatent(data, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const updatePatent = createAsyncThunk(
  'patent/update',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await patentsService.updatePatent(data, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const deletePatent = createAsyncThunk(
  'patent/delete',
  async (patentId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await patentsService.deletePatent(patentId, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const patentSlice = createSlice({
  name: 'patent',
  initialState,
  reducers: {
    reset: (state) => ({
      ...state,
      isError: false,
      isSuccess: false,
      isLoading: false,
      message: '',
      isUpdated: false,
      isDeleted: false,
      isCreated: false,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPatents.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPatents.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.patents = action.payload
      })
      .addCase(getPatents.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getPatent.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPatent.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.patent = action.payload
      })
      .addCase(getPatent.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(createPatent.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createPatent.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isCreated = true
        state.patent = action.payload
      })
      .addCase(createPatent.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updatePatent.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updatePatent.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.patent = action.payload
        state.isUpdated = true
      })
      .addCase(updatePatent.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deletePatent.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deletePatent.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.patent = {}
        state.isDeleted = true
      })
      .addCase(deletePatent.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = patentSlice.actions
export default patentSlice.reducer
