import { Link } from 'react-router-dom'
import { useState } from 'react'
import { FaTrash, FaEdit } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { deletePublishedPaper } from '../features/publishedPapers/publishedPapersSlice'

import EditModePaperForm from './EditModePaperForm'

function PublishedPaperItem({ publishedPaper }) {
  const { user } = useSelector((state) => state.auth)
  const { isLoading, isError, isSuccess, message, isUpdated } = useSelector(
    (state) => state.publishedPapers
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
        dispatch(deletePublishedPaper(publishedPaper._id))
      }
    } else if (e.target.classList.contains('editPost')) {
      setInEditMode(true)
    }
  }

  // const handleCloseEditMode = (e) => {
  //   setInEditMode(false)
  // }
  if (!inEditMode)
    return (
      <Link
        to={`/published-paper/${publishedPaper._id}`}
        className="containerItem"
        onClick={handleClick}
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
        <div className="relevant-tags">
          {publishedPaper.relevantTags.map((tag) => (
            <div className="relevant-tag">{tag}</div>
          ))}
        </div>
        {user.publishedPapers.includes(publishedPaper._id) && (
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
          {publishedPaper.sauProfessorDepartment}
        </div>
        <div className="totalViews">
          {Math.ceil(publishedPaper.totalViews / 2)} Views
        </div>
      </Link>
    )
  else
    return (
      <EditModePaperForm
        publishedPaper={publishedPaper}
        setInEditMode={setInEditMode}
        isUpdated={isUpdated}
        isSuccess={isSuccess}
        isError={isError}
        message={message}
      />
    )
}

export default PublishedPaperItem
