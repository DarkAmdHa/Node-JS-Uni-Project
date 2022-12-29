import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import patentsService from './patentsService'

const initialState = {
  patents: [],
  patent: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

//Get all Published Papers
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

export const patentSlice = createSlice({
  name: 'patent',
  initialState,
  reducers: {
    reset: (state) => initialState,
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
  },
})

export const { reset } = patentSlice.actions
export default patentSlice.reducer
