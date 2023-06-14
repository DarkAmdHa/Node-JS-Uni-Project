import BackButton from '../components/BackButton'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { createPatent, reset } from '../features/patents/patentsSlice'
import { refetchUser, reset as resetAuth } from '../features/auth/authSlice'

import Spinner from '../components/Spinner'

import { toast } from 'react-toastify'

function CreatePatent() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    user,
    isSuccess: userIsSuccess,
    isError: userIsError,
    message: userMessage,
    isLoading: userIsLoading,
  } = useSelector((state) => state.auth)

  const { isLoading, isError, message, patent, isCreated } = useSelector(
    (state) => state.patents
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isCreated) {
      toast.success('Patent Created')
      //The patent is created, so we should refetch the user.
      dispatch(refetchUser(user))
    }

    if (userIsError) {
      toast.error(userMessage)
    }
    if (userIsSuccess) {
      navigate('/patents')
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
    authorizationDate: '',
    excerpt: '',
    contributors: '',
    sauAuthorProfessor: '',
    sauProfessorEmail: '',
    sauProfessorDepartment: '',
    relevantTags: '',
  })

  const [authorCheckbox, setAuthorCheckbox] = useState(false)
  const [emailCheckbox, setEmailCheckbox] = useState(false)

  const {
    name,
    authorizationDate,
    excerpt,
    contributors,
    sauAuthorProfessor,
    sauProfessorEmail,
    sauProfessorDepartment,
    relevantTags,
  } = formData

  const onSubmit = (e) => {
    e.preventDefault()

    if (authorizationDate == '') {
      toast.error('Please provide an authorization date')
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
      toast.error('Your patent should have at least 3 tags.')
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
    const patentData = {
      name,
      excerpt,
      authorizationDate,
      contributors,
      sauAuthorProfessor: finalAuthorName,
      sauProfessorEmail: finalAuthorEmail,
      sauProfessorDepartment,
      relevantTags: relevantTagsArray,
      createdBy: user._id,
    }

    dispatch(createPatent(patentData))
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
      <h1>Create A New Patent</h1>
      <p>Please enter all the details related to the new patent below:</p>
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
                placeholder="Enter the title of the patent, as it appears in the journal"
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
                placeholder="Please give a short description of the patent."
                required
              />
            </div>
          </div>

          <div className="form-group hasSubgroups">
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
              <label htmlFor="authorizationDate">Date of Authorization</label>
              <input
                type="date"
                className="form-control"
                id="authorizationDate"
                name="authorizationDate"
                value={authorizationDate}
                onChange={onChange}
                placeholder="Date the patent was authorized"
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

export default CreatePatent
