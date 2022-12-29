import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProject } from '../features/projects/projectsSlice'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

function Project() {
  const { isLoading, isError, isSuccess, message, project } = useSelector(
    (state) => state.projects
  )
  const { projectId } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    dispatch(getProject(projectId))
  }, [isError, message, getProject, projectId])

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
  if (Object.keys(project).length > 0) {
    return (
      <div className="mainArticle">
        <header className="ticket-header">
          <BackButton url="/projects" />
        </header>
        <div className="boxContainer">
          <h2>{project.name}</h2>
          <p className="journalOfPublication">
            Project Started In {new Date(project.createdAt).getUTCFullYear()}
          </p>

          <p className="authors">
            <span class="author bold">{project.sauAuthorProfessor}</span>
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
            <div class="relevant-tags">
              <span>Keywords</span>
              {project.relevantTags.map((tag) => (
                <div class="relevant-tag">{tag}</div>
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
  }
}

export default Project
