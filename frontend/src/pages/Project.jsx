import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProject } from '../features/projects/projectsSlice'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import { FaTrash, FaEdit } from 'react-icons/fa'
import EditModeProjectForm from '../components/EditModeProjectForm'
import { deleteProject, reset } from '../features/projects/projectsSlice'

function Project() {
  const {
    isLoading,
    isError,
    isSuccess,
    message,
    project,
    isDeleted,
    isUpdated,
  } = useSelector((state) => state.projects)
  const [inEditMode, setInEditMode] = useState(false)
  const { user } = useSelector((state) => state.auth)
  const { projectId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleDelete = (e) => {
    if (window.confirm('Are sure you want to delete this project?')) {
      //This will delete the project
      dispatch(deleteProject(projectId))
    }
  }

  useEffect(() => {
    dispatch(getProject(projectId))
  }, [])

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess && isDeleted) {
      toast.success('Project Deleted')
      navigate('/projects')
      dispatch(reset())
    }

    if (isSuccess && isUpdated) {
      toast.success('Project Updated')
      setInEditMode(false)
      dispatch(reset())
    }
  }, [projectId, isError, message, isSuccess, isDeleted, isUpdated])

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h3>Something Went Wrong</h3>
  }

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  if (Object.keys(project).length > 0 && !inEditMode) {
    return (
      <div className="mainArticle">
        <header className="ticket-header">
          <BackButton url="/projects" />
        </header>
        <div className="boxContainer">
          {user.projects.includes(project._id) && (
            <>
              <div className="deletePost" onClick={handleDelete}>
                <FaTrash /> Delete
              </div>
              <div className="editPost" onClick={() => setInEditMode(true)}>
                <FaEdit /> Edit
              </div>
            </>
          )}
          <h2>{project.name}</h2>
          <p className="journalOfPublication">
            Project Started In {new Date(project.createdAt).getUTCFullYear()}
          </p>

          <p className="authors">
            <span className="author bold">{project.sauAuthorProfessor}</span>
            {project.projectCollaborators &&
              ', ' + project.projectCollaborators}
          </p>

          <p className="projectFunding">
            Project Funding:
            <span className="fundingAmount">
              ${project.projectFunding.toFixed(2)} USD
            </span>
          </p>

          <hr />

          <div className="abstract">
            <h3 className="abstractHeading">About Project</h3>
            <div className="excerpt">{project.projectDetails}</div>
            <div className="relevant-tags">
              <span>Keywords</span>
              {project.relevantTags.map((tag) => (
                <div className="relevant-tag">{tag}</div>
              ))}
            </div>
          </div>
          <hr />
          <div className="contactInformation">
            <h3>Contact Information</h3>

            <p className="author">Prof {project.sauAuthorProfessor}</p>
            <div className="contact-details">
              <p className="dept">{project.sauProfessorDepartment}</p>
              <p className="contact-email">
                Email: {project.sauProfessorEmail}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  } else if (inEditMode) {
    return (
      <EditModeProjectForm project={project} setInEditMode={setInEditMode} />
    )
  }
}

export default Project
