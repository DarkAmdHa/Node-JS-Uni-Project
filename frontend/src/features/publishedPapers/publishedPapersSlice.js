import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import publishedPapersService from './publishedPapersService'

const initialState = {
  publishedPapers: [],
  publishedPaper: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  isUpdated: false,
  isDeleted: false,
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

export const createPublishedPaper = createAsyncThunk(
  'publishedPaper/create',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await publishedPapersService.createPublishedPaper(data, token)
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

export const updatePublishedPaper = createAsyncThunk(
  'publishedPaper/update',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await publishedPapersService.updatePublishedPaper(data, token)
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

export const deletePublishedPaper = createAsyncThunk(
  'publishedPaper/delete',
  async (paperId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await publishedPapersService.deletePublishedPaper(paperId, token)
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
    reset: (state) => ({
      ...state,
      isError: false,
      isSuccess: false,
      isLoading: false,
      message: '',
      isUpdated: false,
      isDeleted: false,
    }),
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
      .addCase(createPublishedPaper.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createPublishedPaper.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.publishedPaper = action.payload
      })
      .addCase(createPublishedPaper.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updatePublishedPaper.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updatePublishedPaper.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.publishedPaper = action.payload
        state.isUpdated = true
      })
      .addCase(updatePublishedPaper.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deletePublishedPaper.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deletePublishedPaper.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.publishedPaper = {}
        state.isDeleted = true
      })
      .addCase(deletePublishedPaper.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = publishedPaperSlice.actions
export default publishedPaperSlice.reducer
