import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import projectsService from './projectsService'

const initialState = {
  projects: [],
  project: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  isUpdated: false,
  isDeleted: false,
  isCreated: false,
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

export const createProject = createAsyncThunk(
  'project/create',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await projectsService.createProject(data, token)
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

export const updateProject = createAsyncThunk(
  'project/update',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await projectsService.updateProject(data, token)
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

export const deleteProject = createAsyncThunk(
  'project/delete',
  async (projectId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await projectsService.deleteProject(projectId, token)
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
      .addCase(createProject.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isCreated = true
        state.project = action.payload
      })
      .addCase(createProject.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateProject.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.project = action.payload
        state.isUpdated = true
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteProject.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.project = {}
        state.isDeleted = true
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = projectSlice.actions
export default projectSlice.reducer
