import { Link } from 'react-router-dom'
import { useState } from 'react'
import { FaTrash, FaEdit } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { deletePatent } from '../features/patents/patentsSlice'

import EditModePatentForm from './EditModePatentForm'

function PatentItem({ patent }) {
  const { user } = useSelector((state) => state.auth)
  const { isLoading, isError, isSuccess, message, isUpdated } = useSelector(
    (state) => state.patents
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
        dispatch(deletePatent(patent._id))
      }
    } else if (e.target.classList.contains('editPost')) {
      setInEditMode(true)
    }
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
  if (!inEditMode)
    return (
      <Link
        to={`/patent/${patent._id}`}
        className="containerItem"
        onClick={handleClick}
      >
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
        <div className="relevant-tags">
          {patent.relevantTags.map((tag) => (
            <div className="relevant-tag">{tag}</div>
          ))}
        </div>
        {user.patents.includes(patent._id) && (
          <>
            <div className="deletePost">
              <FaTrash /> Delete
            </div>
            <div className="editPost">
              <FaEdit /> Edit
            </div>
          </>
        )}
        <div className="teacherDepartment">{patent.sauProfessorDepartment}</div>
        <div className="totalViews">
          {Math.ceil(patent.totalViews / 2)} Views
        </div>
      </Link>
    )
  else
    return (
      <EditModePatentForm
        patent={patent}
        setInEditMode={setInEditMode}
        isUpdated={isUpdated}
        isSuccess={isSuccess}
        isError={isError}
        message={message}
      />
    )
}

export default PatentItem
