import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import publishedPapersService from './publishedPapersService'

const initialState = {
  publishedPapers: [],
  publishedPaper: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

//Get all Published Papers
export const getPublishedPapers = createAsyncThunk(
  'publishedPapers/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await publishedPapersService.getPublishedPapers(token)
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

export const getPublishedPaper = createAsyncThunk(
  'publishedPapers/get',
  async (paperId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await publishedPapersService.getPublishedPaper(paperId, token)
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

export const publishedPaperSlice = createSlice({
  name: 'publishedPaper',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPublishedPapers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPublishedPapers.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.publishedPapers = action.payload
      })
      .addCase(getPublishedPapers.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getPublishedPaper.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPublishedPaper.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.publishedPaper = action.payload
      })
      .addCase(getPublishedPaper.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = publishedPaperSlice.actions
export default publishedPaperSlice.reducer
