import { Link } from 'react-router-dom'

function PatentItem({ patent }) {
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
  return (
    <Link to={`/patent/${patent._id}`} className="containerItem">
      <h3 className="patentTitle">{patent.name}</h3>
      <p className="author">By Prof. {patent.sauAuthorProfessor}</p>
      <p className="patentExcerpt">
        {patent.excerpt.length > 250
          ? patent.excerpt.slice(0, 250) + '...'
          : patent.excerpt}
      </p>
      <p className="journalOfPublication">
        Registration Date:{' '}
        {new Date(patent.authorizationDate).getDate() +
          ' ' +
          monthNames[new Date(patent.authorizationDate).getMonth()] +
          ', ' +
          new Date(patent.authorizationDate).getFullYear()}
      </p>
      <div class="relevant-tags">
        {patent.relevantTags.map((tag) => (
          <div class="relevant-tag">{tag}</div>
        ))}
      </div>

      <div className="teacherDepartment">{patent.sauProfessorDepartment}</div>
      <div className="totalViews">{Math.ceil(patent.totalViews / 2)} Views</div>
    </Link>
  )
}

export default PatentItem
