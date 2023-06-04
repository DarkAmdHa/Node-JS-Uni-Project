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

  const { isLoading, isError, isSuccess, message, publishedPaper } =
    useSelector((state) => state.publishedPapers)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      toast.success('Paper Created')
      //The paper is created, so we should refetch the user.
      dispatch(refetchUser(user))
      if (userIsError) {
        toast.error(userMessage)
      }
      if (userIsSuccess) {
        navigate('/published-papers')
      }
    }
    dispatch(reset())
  }, [
    isError,
    isSuccess,
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

  const onSubmit = (e) => {
    e.preventDefault()

    const relevantTagsArray = relevantTags.split(',')
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
              <label for="name">Title</label>
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
              <label for="name">Excerpt</label>
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
              <label for="name">Journal Of Publication</label>
              <input
                type="text"
                className="form-control"
                id="journalOfPublication"
                name="journalOfPublication"
                value={journalOfPublication}
                onChange={onChange}
                placeholder="Enter the title of the journal the paper is published in"
                required
              />
            </div>
            <div className="form-subgroup">
              <label for="name">Contributors</label>
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
              <label for="name">Publishing Author's name</label>
              <div className="checkboxField">
                <input
                  type="checkbox"
                  id="useOtherName"
                  value="useOtherName"
                  onChange={handleAuthorCheckbox}
                />
                <label for="useOtherName">Use name other than yours ?</label>
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
              <label for="sauProfessorEmail">Publishing Author's Email</label>
              <div className="checkboxField">
                <input
                  type="checkbox"
                  id="useOtherEmail"
                  value="useOtherEmail"
                  onChange={handleEmailCheckbox}
                />
                <label for="useOtherEmail">Use Email other than yours ?</label>
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
              <label for="linkToPublication">Link To Publication</label>
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
              <label for="sauProfessorDepartment">
                Author's SAU Department
              </label>
              <input
                type="text"
                className="form-control"
                id="sauProfessorDepartment"
                name="sauProfessorDepartment"
                value={sauProfessorDepartment}
                onChange={onChange}
                placeholder="Author's Department at the SAU"
                required
              />
            </div>
          </div>

          <div className="form-group hasSubgroups">
            <div className="form-subgroup">
              <label for="dateWritten">Date of Publication</label>
              <input
                type="date"
                className="form-control"
                id="dateWritten"
                name="dateWritten"
                value={dateWritten}
                onChange={onChange}
                placeholder="Date the paper was published"
                required
              />
            </div>

            <div className="form-subgroup">
              <label for="relevantTags">Relevant Tags to the article</label>
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
