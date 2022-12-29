import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import publishedPapersReducer from '../features/publishedPapers/publishedPapersSlice'
import patentsReducer from '../features/patents/patentsSlice'
import projectsReducer from '../features/projects/projectsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    publishedPapers: publishedPapersReducer,
    patents: patentsReducer,
    projects: projectsReducer,
  },
})
