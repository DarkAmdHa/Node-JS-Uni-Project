import { Link } from 'react-router-dom'

function PublishedPaperItem({ publishedPaper }) {
  return (
    <Link
      to={`/published-paper/${publishedPaper._id}`}
      className="containerItem"
    >
      <h3 className="paperTitle">{publishedPaper.name}</h3>
      <p className="author">By Prof. {publishedPaper.sauAuthorProfessor}</p>
      <p className="paperExcerpt">
        {publishedPaper.excerpt.length > 250
          ? publishedPaper.excerpt.slice(0, 250) + '...'
          : publishedPaper.excerpt}
      </p>
      <p className="journalOfPublication">
        {publishedPaper.journalOfPublication +
          ', ' +
          new Date(publishedPaper.createdAt).getUTCFullYear()}
      </p>
      <div class="relevant-tags">
        {publishedPaper.relevantTags.map((tag) => (
          <div class="relevant-tag">{tag}</div>
        ))}
      </div>
      <div className="teacherDepartment">
        {publishedPaper.sauProfessorDepartment}
      </div>
      <div className="totalViews">
        {Math.ceil(publishedPaper.totalViews / 2)} Views
      </div>
    </Link>
  )
}

export default PublishedPaperItem
