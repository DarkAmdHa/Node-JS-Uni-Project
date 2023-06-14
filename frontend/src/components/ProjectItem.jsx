import { Link } from 'react-router-dom'
import { useState } from 'react'
import { FaTrash, FaEdit } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { deleteProject } from '../features/projects/projectsSlice'
import EditModeProjectForm from './EditModeProjectForm'

function ProjectItem({ project }) {
  const { user } = useSelector((state) => state.auth)
  const { isLoading, isError, isSuccess, message, isUpdated } = useSelector(
    (state) => state.projects
  )

  const dispatch = useDispatch()
  const [inEditMode, setInEditMode] = useState(false)
  const handleClick = (e) => {
    if (
      e.target.classList.contains('deletePost') ||
      e.target.classList.contains('editPost')
    ) {
      e.preventDefault()
    }
    if (e.target.classList.contains('deletePost')) {
      if (window.confirm('Are sure you want to delete this paper?')) {
        //This will delete the paper
        dispatch(deleteProject(project._id))
      }
    } else if (e.target.classList.contains('editPost')) {
      setInEditMode(true)
    }
  }

  if (!inEditMode)
    return (
      <Link
        to={`/project/${project._id}`}
        className="containerItem"
        onClick={handleClick}
      >
        <h3 className="projectTitle">{project.name}</h3>
        <p className="author">By Prof. {project.sauAuthorProfessor}</p>
        <p className="projectExcerpt">
          {project.projectDetails.length > 250
            ? project.projectDetails.slice(0, 250) + '...'
            : project.projectDetails}
        </p>
        <p className="projectFunding">
          Project Funding:
          <span className="fundingAmount">
            ${project.projectFunding.toFixed(2)} USD
          </span>
        </p>
        <div className="relevant-tags">
          {project.relevantTags.map((tag) => (
            <div className="relevant-tag">{tag}</div>
          ))}
        </div>
        {user.projects.includes(project._id) && (
          <>
            <div className="deletePost">
              <FaTrash /> Delete
            </div>
            <div className="editPost">
              <FaEdit /> Edit
            </div>
          </>
        )}
        <div className="teacherDepartment">
          {project.sauProfessorDepartment}
        </div>
        <div className="totalViews">
          {Math.ceil(project.totalViews / 2)} Views
        </div>
      </Link>
    )
  else
    return (
      <EditModeProjectForm
        project={project}
        setInEditMode={setInEditMode}
        isUpdated={isUpdated}
        isSuccess={isSuccess}
        isError={isError}
        message={message}
      />
    )
}

export default ProjectItem
