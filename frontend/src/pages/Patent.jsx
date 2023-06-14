import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPatent } from '../features/patents/patentsSlice'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import { FaTrash, FaEdit } from 'react-icons/fa'
import EditModePatentForm from '../components/EditModePatentForm'
import { deletePatent, reset } from '../features/patents/patentsSlice'
function Patent() {
  const {
    isLoading,
    isError,
    isSuccess,
    message,
    patent,
    isDeleted,
    isUpdated,
  } = useSelector((state) => state.patents)
  const [inEditMode, setInEditMode] = useState(false)
  const { user } = useSelector((state) => state.auth)
  const { patentId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleDelete = (e) => {
    if (window.confirm('Are sure you want to delete this patent?')) {
      //This will delete the patent
      dispatch(deletePatent(patentId))
    }
  }

  useEffect(() => {
    dispatch(getPatent(patentId))
  }, [])

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess && isDeleted) {
      toast.success('Patent Deleted')
      navigate('/patents')
      dispatch(reset())
    }

    if (isSuccess && isUpdated) {
      toast.success('Patent Updated')
      setInEditMode(false)
      dispatch(reset())
    }
  }, [patentId, isError, message, isSuccess, isDeleted, isUpdated])

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
  if (Object.keys(patent).length > 0 && !inEditMode) {
    return (
      <div className="mainArticle">
        <header className="ticket-header">
          <BackButton url="/patents" />
        </header>
        <div className="boxContainer">
          {user.patents.includes(patent._id) && (
            <>
              <div className="deletePost" onClick={handleDelete}>
                <FaTrash /> Delete
              </div>
              <div className="editPost" onClick={() => setInEditMode(true)}>
                <FaEdit /> Edit
              </div>
            </>
          )}
          <h2>{patent.name}</h2>
          <p className="journalOfPublication">
            Patent Registered In{' '}
            {new Date(patent.authorizationDate).getUTCFullYear()}
          </p>

          <p className="authors">
            <span className="author bold">{patent.sauAuthorProfessor}</span>
            {patent.contributors && ', ' + patent.contributors}
          </p>

          <hr />

          <div className="abstract">
            <h3 className="abstractHeading">About Patent</h3>
            <div className="excerpt">{patent.excerpt}</div>
            <div className="relevant-tags">
              <span>Keywords</span>
              {patent.relevantTags.map((tag) => (
                <div className="relevant-tag">{tag}</div>
              ))}
            </div>
          </div>
          <hr />
          <div className="contactInformation">
            <h3>Contact Information</h3>

            <p className="author">Prof {patent.sauAuthorProfessor}</p>
            <div className="contact-details">
              <p className="dept">{patent.sauProfessorDepartment}</p>
              <p className="contact-email">Email: {patent.sauProfessorEmail}</p>
            </div>
          </div>
        </div>
      </div>
    )
  } else if (inEditMode) {
    return <EditModePatentForm patent={patent} setInEditMode={setInEditMode} />
  }
}

export default Patent
