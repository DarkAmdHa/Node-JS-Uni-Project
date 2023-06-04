import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import searchService from './searchService'

const initialState = {
  searchResults: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

//Search
export const search = createAsyncThunk(
  'search/search',
  async (searchData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await searchService.search(token, searchData)
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

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    reset: (state) => ({
      ...state,
      isError: false,
      isSuccess: false,
      isLoading: false,
      message: '',
    }),
    searchReset: (state) => ({
      ...state,
      searchResults: [],
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(search.pending, (state) => {
        state.isLoading = true
      })
      .addCase(search.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.searchResults = action.payload
      })
      .addCase(search.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset, searchReset } = searchSlice.actions
export default searchSlice.reducer
