import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import PrivateRoute from './components/PrivateRoute'
import Create from './pages/Create'
import PublishedPapers from './pages/PublishedPapers'
import PublishedPaper from './pages/PublishedPaper'
import Patents from './pages/Patents'
import Patent from './pages/Patent'
import Projects from './pages/Projects'
import Project from './pages/Project'

import CreatePaper from './pages/CreatePaper'
import CreatePatent from './pages/CreatePatent'
import CreateProject from './pages/CreateProject'

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={<Create />} />
            <Route path="/published-papers" element={<PrivateRoute />}>
              <Route path="/published-papers" element={<PublishedPapers />} />
            </Route>
            <Route path="/patents" element={<PrivateRoute />}>
              <Route path="/patents" element={<Patents />} />
            </Route>
            <Route path="/projects" element={<PrivateRoute />}>
              <Route path="/projects" element={<Projects />} />
            </Route>
            <Route path="/published-paper/:paperId" element={<PrivateRoute />}>
              <Route
                path="/published-paper/:paperId"
                element={<PublishedPaper />}
              />
            </Route>
            <Route path="/patent/:patentId" element={<PrivateRoute />}>
              <Route path="/patent/:patentId" element={<Patent />} />
            </Route>
            <Route path="/project/:projectId" element={<PrivateRoute />}>
              <Route path="/project/:projectId" element={<Project />} />
            </Route>
            <Route path="/create-project" element={<PrivateRoute />}>
              <Route path="/create-project" element={<CreateProject />} />
            </Route>
            <Route path="/create-patent" element={<PrivateRoute />}>
              <Route path="/create-patent" element={<CreatePatent />} />
            </Route>
            <Route path="/create-paper" element={<PrivateRoute />}>
              <Route path="/create-paper" element={<CreatePaper />} />
            </Route>
          </Routes>
        </div>
      </Router>

      <ToastContainer />
    </>
  )
}

export default App
