import { Link } from 'react-router-dom'

function ProjectItem({ project }) {
  return (
    <Link to={`/project/${project._id}`} className="containerItem">
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
      <div class="relevant-tags">
        {project.relevantTags.map((tag) => (
          <div class="relevant-tag">{tag}</div>
        ))}
      </div>
      <div className="teacherDepartment">{project.sauProfessorDepartment}</div>
      <div className="totalViews">
        {Math.ceil(project.totalViews / 2)} Views
      </div>
    </Link>
  )
}

export default ProjectItem
