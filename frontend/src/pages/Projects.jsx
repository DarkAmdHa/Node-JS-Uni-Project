import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProjects, reset } from '../features/projects/projectsSlice'
import ProjectItem from '../components/ProjectItem'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

function Projects() {
  const { projects, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.projects
  )

  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      if (isSuccess) dispatch(reset())
    }
  }, [dispatch, isSuccess])

  useEffect(() => {
    dispatch(getProjects())
  }, [dispatch])

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
