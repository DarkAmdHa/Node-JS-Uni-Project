import BackButton from '../components/BackButton'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  createPublishedPaper,
  reset,
} from '../features/publishedPapers/publishedPapersSlice'
import { refetchUser, reset as resetAuth } from '../features/auth/authSlice'

import Spinner from '../components/Spinner'

import { toast } from 'react-toastify'

function CreatePaper() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    user,
    isSuccess: userIsSuccess,
    isError: userIsError,
    message: userMessage,
    isLoading: userIsLoading,
  } = useSelector((state) => state.auth)

  const { isLoading, isError, message, publishedPaper, isCreated } =
    useSelector((state) => state.publishedPapers)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isCreated) {
      toast.success('Paper Created')
      //The paper is created, so we should refetch the user.
      dispatch(refetchUser(user))
    }

    if (userIsError) {
      toast.error(userMessage)
    }
    if (userIsSuccess) {
      navigate('/published-papers')
    }

    dispatch(reset())
    dispatch(resetAuth())
  }, [
    isError,
    isCreated,
    message,
    user,
    userIsError,
    userIsSuccess,
    userMessage,
  ])

  const [formData, setFormData] = useState({
    name: '',
    excerpt: '',
    journalOfPublication: '',
    contributors: '',
    sauAuthorProfessor: '',
    linkToPublication: '',
    sauProfessorEmail: '',
    sauProfessorDepartment: '',
    dateWritten: '',
    relevantTags: '',
  })

  const [authorCheckbox, setAuthorCheckbox] = useState(false)
  const [emailCheckbox, setEmailCheckbox] = useState(false)

  const {
    name,
    excerpt,
    journalOfPublication,
    contributors,
    sauAuthorProfessor,
    linkToPublication,
    sauProfessorEmail,
    sauProfessorDepartment,
    dateWritten,
    relevantTags,
  } = formData

  function isValidHttpUrl(string) {
    try {
      const newUrl = new URL(string)
      return newUrl.protocol === 'http:' || newUrl.protocol === 'https:'
    } catch (err) {
      return false
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (journalOfPublication == '') {
      toast.error('Please select a journal of publication')
      return false
    }

    if (!isValidHttpUrl(linkToPublication)) {
      toast.error('Please provide a valid url to the publication.')
      return false
    }

    if (name.length < 5) {
      toast.error('Please provide a title longer than 5 characters.')
      return false
    }

    if (excerpt.length < 50) {
      toast.error('Please provide an excerpt of at least 50 characters.')
      return false
    }

    const relevantTagsArray = relevantTags.split(',')
    if (relevantTagsArray.length < 3) {
      toast.error('Your paper should have at least 3 tags.')
      return false
    }
    let finalAuthorEmail, finalAuthorName
    if (!authorCheckbox) {
      finalAuthorName = user.name
    } else {
      finalAuthorName = sauAuthorProfessor
    }
    if (!emailCheckbox) {
      finalAuthorEmail = user.email
    } else {
      finalAuthorEmail = sauProfessorEmail
    }
    const paperData = {
      name,
      excerpt,
      journalOfPublication,
      contributors,
      sauAuthorProfessor: finalAuthorName,
      linkToPublication,
      sauProfessorEmail: finalAuthorEmail,
      sauProfessorDepartment,
      dateWritten,
      relevantTags: relevantTagsArray,
      createdBy: user._id,
    }

    dispatch(createPublishedPaper(paperData))
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleAuthorCheckbox = (e) => {
    setAuthorCheckbox(e.target.checked)
    if (e.target.checked === false) {
      setFormData((prevState) => ({
        ...prevState,
        sauAuthorProfessor: '',
      }))
    }
  }
  const handleEmailCheckbox = (e) => {
    setEmailCheckbox(e.target.checked)
    if (e.target.checked === false) {
      setFormData((prevState) => ({
        ...prevState,
        sauProfessorEmail: '',
      }))
    }
  }

  if (isLoading) return <Spinner />
  return (
    <>
      <BackButton url="/create" />
      <h1>Create A New Paper</h1>
      <p>Please enter all the details related to the new paper below:</p>
      <section className="form creationForm">
        <form onSubmit={onSubmit}>
          <div className="form-group hasSubgroups">
            <div className="form-subgroup">
              <label htmlFor="name">Title</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={name}
                onChange={onChange}
                placeholder="Enter the title of the paper, as it appears in the journal"
                required
              />
            </div>
            <div className="form-subgroup">
              <label htmlFor="name">Excerpt</label>
              <textarea
                type="text"
                className="form-control"
                id="excerpt"
                name="excerpt"
                value={excerpt}
                onChange={onChange}
                placeholder="Please give a short description of the paper."
                required
              />
            </div>
          </div>

          <div className="form-group hasSubgroups">
            <div className="form-subgroup">
              <label htmlFor="journalOfPublication">
                Journal Of Publication
              </label>
              <select
                defaultValue=""
                className="form-control"
                id="journalOfPublication"
                name="journalOfPublication"
                value={journalOfPublication}
                onChange={onChange}
                required
              >
                <option value="" disabled>
                  Select A Journal
                </option>
                <option value="IEEE Transactions on Pattern Analysis and Machine Intelligence">
                  IEEE Transactions on Pattern Analysis and Machine Intelligence
                </option>
                <option value="ACM Computing Surveys">
                  ACM Computing Surveys
                </option>
                <option value="Foundations and Trends in Machine Learning">
                  Foundations and Trends in Machine Learning
                </option>
                <option value="AI Open">AI Open</option>
                <option value="SN Computer Science">SN Computer Science</option>
              </select>
            </div>
            <div className="form-subgroup">
              <label htmlFor="name">Contributors</label>
              <input
                type="text"
                className="form-control"
                id="contributors"
                name="contributors"
                value={contributors}
                onChange={onChange}
                placeholder="Please add the names, seperated by a comma."
                required
              />
            </div>
          </div>

          <div className="form-group hasSubgroups">
            <div className="form-subgroup">
              <label htmlFor="name">Publishing Author's name</label>
              <div className="checkboxField">
                <input
                  type="checkbox"
                  id="useOtherName"
                  value="useOtherName"
                  onChange={handleAuthorCheckbox}
                />
                <label htmlFor="useOtherName">
                  Use name other than yours ?
                </label>
              </div>
              {authorCheckbox ? (
                <input
                  type="text"
                  className="form-control"
                  id="sauAuthorProfessor"
                  name="sauAuthorProfessor"
                  value={sauAuthorProfessor}
                  onChange={onChange}
                  placeholder="Author's Name"
                  required
                />
              ) : (
                <input
                  type="text"
                  className="form-control"
                  id="sauProfessorName"
                  name="sauProfessorName"
                  value={user.name}
                  disabled
                />
              )}
            </div>
            <div className="form-subgroup">
              <label htmlFor="sauProfessorEmail">
                Publishing Author's Email
              </label>
              <div className="checkboxField">
                <input
                  type="checkbox"
                  id="useOtherEmail"
                  value="useOtherEmail"
                  onChange={handleEmailCheckbox}
                />
                <label htmlFor="useOtherEmail">
                  Use Email other than yours ?
                </label>
              </div>
              {emailCheckbox ? (
                <input
                  type="text"
                  className="form-control"
                  id="sauProfessorEmail"
                  name="sauProfessorEmail"
                  value={sauProfessorEmail}
                  onChange={onChange}
                  placeholder="Author's Email"
                  required
                />
              ) : (
                <input
                  type="text"
                  className="form-control"
                  id="sauProfessorEmail"
                  name="sauProfessorEmail"
                  value={user.email}
                  disabled
                />
              )}
            </div>
          </div>

          <div className="form-group hasSubgroups">
            <div className="form-subgroup">
              <label htmlFor="linkToPublication">Link To Publication</label>
              <input
                type="text"
                className="form-control"
                id="linkToPublication"
                name="linkToPublication"
                value={linkToPublication}
                onChange={onChange}
                placeholder="Link to the published paper"
                required
              />
            </div>
            <div className="form-subgroup">
              <label htmlFor="sauProfessorDepartment">
                Author's SAU Department
              </label>

              <select
                defaultValue=""
                className="form-control"
                id="sauProfessorDepartment"
                name="sauProfessorDepartment"
                value={sauProfessorDepartment}
                onChange={onChange}
                required
              >
                <option value="" disabled>
                  Select A Department
                </option>
                <option value="Shenyang Aerospace University Aerospace Department">
                  Shenyang Aerospace University Aerospace Department
                </option>
                <option value="Shenyang Aerospace University Artificial Intelligence Department">
                  Shenyang Aerospace University Artificial Intelligence
                  Department
                </option>
                <option value="Shenyang Aerospace University Computer Science Department">
                  Shenyang Aerospace University Computer Science Department
                </option>
                <option value="Shenyang Aerospace University Electrical Engineering Department">
                  Shenyang Aerospace University Electrical Engineering
                  Department
                </option>
                <option value="Shenyang Aerospace University Mechatronics Department">
                  Shenyang Aerospace University Mechatronics Department
                </option>
              </select>
            </div>
          </div>

          <div className="form-group hasSubgroups">
            <div className="form-subgroup">
              <label htmlFor="dateWritten">Date of Publication</label>
              <input
                type="date"
                className="form-control"
                id="dateWritten"
                name="dateWritten"
                value={dateWritten}
                onChange={onChange}
                placeholder="Date the paper was published"
                min="1970-01-01"
                max={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className="form-subgroup">
              <label htmlFor="relevantTags">Relevant Tags to the article</label>
              <input
                type="input"
                className="form-control"
                id="relevantTags"
                name="relevantTags"
                value={relevantTags}
                onChange={onChange}
                placeholder="Tags should be seperated by commas"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default CreatePaper
