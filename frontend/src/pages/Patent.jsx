import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPatent } from '../features/patents/patentsSlice'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

function Patent() {
  const { isLoading, isError, isSuccess, message, patent } = useSelector(
    (state) => state.patents
  )
  const { patentId } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    dispatch(getPatent(patentId))
  }, [isError, message, getPatent, patentId])

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
  if (Object.keys(patent).length > 0) {
    return (
      <div className="mainArticle">
        <header className="ticket-header">
          <BackButton url="/patents" />
        </header>
        <div className="boxContainer">
          <h2>{patent.name}</h2>
          <p className="journalOfPublication">
            Patent Registered In{' '}
            {new Date(patent.authorizationDate).getUTCFullYear()}
          </p>

          <p className="authors">
            <span class="author bold">{patent.sauAuthorProfessor}</span>
            {patent.contributors && ', ' + patent.contributors}
          </p>

          <hr />

          <div className="abstract">
            <h3 className="abstractHeading">About Patent</h3>
            <div className="excerpt">{patent.excerpt}</div>
            <div class="relevant-tags">
              <span>Keywords</span>
              {patent.relevantTags.map((tag) => (
                <div class="relevant-tag">{tag}</div>
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
  }
}

export default Patent
