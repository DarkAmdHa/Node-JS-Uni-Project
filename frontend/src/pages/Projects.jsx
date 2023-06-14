import { useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { getProjects, reset } from '../features/projects/projectsSlice'
import ProjectItem from '../components/ProjectItem'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import { toast } from 'react-toastify'

function Projects() {
  const {
    projects,
    isLoading,
    isError,
    isSuccess,
    message,
    isUpdated,
    isDeleted,
  } = useSelector((state) => state.projects)

  const [firstLoad, setFirstLoad] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (!firstLoad) {
      dispatch(getProjects())
      setFirstLoad(true)
    }
    if (isSuccess && isUpdated) {
      toast.success('Project Updated')
      dispatch(getProjects())
    }

    if (isSuccess && isDeleted) {
      toast.success('Project Deleted')
      dispatch(getProjects())
    }
    dispatch(reset())
  }, [dispatch, firstLoad, isError, isSuccess, isUpdated, isDeleted, message])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <BackButton url="/" />
      <h1>Projects</h1>
      <div className="itemsContainer">
        {projects.map((project) => (
          <ProjectItem key={project._id} project={project} />
        ))}
      </div>
    </>
  )
}

export default Projects
