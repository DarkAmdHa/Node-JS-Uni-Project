import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPublishedPaper } from '../features/publishedPapers/publishedPapersSlice'
import { toast } from 'react-toastify'
import { FaHandPointRight } from 'react-icons/fa'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

function PublishedPaper() {
  const { isLoading, isError, isSuccess, message, publishedPaper } =
    useSelector((state) => state.publishedPapers)
  const { paperId } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    dispatch(getPublishedPaper(paperId))
  }, [isError, message, getPublishedPaper, paperId])

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

  if (Object.keys(publishedPaper).length > 0) {
    return (
      <div className="mainArticle">
        <header className="ticket-header">
          <BackButton url="/published-papers" />
        </header>
        <div className="boxContainer">
          <h2>{publishedPaper.name}</h2>
          <p className="journalOfPublication">
            {publishedPaper.journalOfPublication +
              ', ' +
              new Date(publishedPaper.dateWritten).getUTCFullYear()}
          </p>

          <div className="aboutArticle">
            <p className="datePosted">
              Posted:{' '}
              {new Date(publishedPaper.createdAt).getDate() +
                ' ' +
                monthNames[new Date(publishedPaper.createdAt).getMonth()] +
                ', ' +
                new Date(publishedPaper.createdAt).getFullYear()}
            </p>
            <p className="dateRevised">
              Last Revised:{' '}
              {new Date(publishedPaper.updatedAt).getDate() +
                ' ' +
                monthNames[new Date(publishedPaper.updatedAt).getMonth()] +
                ', ' +
                new Date(publishedPaper.updatedAt).getFullYear()}
            </p>
          </div>

          <p className="authors">
            <span class="author bold">{publishedPaper.sauAuthorProfessor}</span>
            {publishedPaper.contributors && ', ' + publishedPaper.contributors}
          </p>
          <div className="aboutPublication">
            <div className="dateWritten">
              Date Written:{' '}
              {new Date(publishedPaper.dateWritten).getDate() +
                ' ' +
                monthNames[new Date(publishedPaper.dateWritten).getMonth()] +
                ', ' +
                new Date(publishedPaper.dateWritten).getFullYear()}
            </div>

            <a
              href={`${publishedPaper.linkToPublication}`}
              target="_blank"
              className="linkOutside btn"
            >
              Link To Publication
              <FaHandPointRight />
            </a>
          </div>
          <hr />

          <div className="abstract">
            <h3 className="abstractHeading">Abstract</h3>
            <div className="excerpt">{publishedPaper.excerpt}</div>
            <div class="relevant-tags">
              <span>Keywords</span>
              {publishedPaper.relevantTags.map((tag) => (
                <div class="relevant-tag">{tag}</div>
              ))}
            </div>
          </div>
          <hr />
          <div className="contactInformation">
            <h3>Contact Information</h3>

            <p className="author">Prof {publishedPaper.sauAuthorProfessor}</p>
            <div className="contact-details">
              <p className="dept">{publishedPaper.sauProfessorDepartment}</p>
              <p className="contact-email">
                Email: {publishedPaper.sauProfessorEmail}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PublishedPaper
