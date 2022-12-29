import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import projectsService from './projectsService'

const initialState = {
  projects: [],
  project: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

//Get all projects
export const getProjects = createAsyncThunk(
  'projects/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await projectsService.getProjects(token)
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

export const getProject = createAsyncThunk(
  'projects/get',
  async (projectId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await projectsService.getProject(projectId, token)
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

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProjects.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.projects = action.payload
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getProject.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProject.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.project = action.payload
      })
      .addCase(getProject.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = projectSlice.actions
export default projectSlice.reducer
