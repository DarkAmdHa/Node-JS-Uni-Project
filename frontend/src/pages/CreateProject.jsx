import BackButton from '../components/BackButton'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { createProject, reset } from '../features/projects/projectsSlice'
import { refetchUser, reset as resetAuth } from '../features/auth/authSlice'

import Spinner from '../components/Spinner'

import { toast } from 'react-toastify'

function CreateProject() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    user,
    isSuccess: userIsSuccess,
    isError: userIsError,
    message: userMessage,
    isLoading: userIsLoading,
  } = useSelector((state) => state.auth)

  const { isLoading, isError, message, project, isCreated } = useSelector(
    (state) => state.projects
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isCreated) {
      toast.success('Project Created')
      //The project is created, so we should refetch the user.
      dispatch(refetchUser(user))
    }

    if (userIsError) {
      toast.error(userMessage)
    }
    if (userIsSuccess) {
      navigate('/projects')
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
    projectDetails: '',
    projectFunding: '',
    projectCollaborators: '',
    sauAuthorProfessor: '',
    sauProfessorEmail: '',
    sauProfessorDepartment: '',
    relevantTags: '',
  })

  const [authorCheckbox, setAuthorCheckbox] = useState(false)
  const [emailCheckbox, setEmailCheckbox] = useState(false)

  const {
    name,
    projectDetails,
    projectFunding,
    projectCollaborators,
    sauAuthorProfessor,
    sauProfessorEmail,
    sauProfessorDepartment,
    relevantTags,
  } = formData

  const onSubmit = (e) => {
    e.preventDefault()

    if (name.length < 5) {
      toast.error('Please provide a title longer than 5 characters.')
      return false
    }

    if (projectDetails.length < 50) {
      toast.error(
        'Please provide an project description of at least 50 characters.'
      )
      return false
    }
    if (isNaN(+projectFunding)) {
      toast.error('Please provide a valid project funding amount.')
      return false
    }

    const relevantTagsArray = relevantTags.split(',')
    if (relevantTagsArray.length < 3) {
      toast.error('Your project should have at least 3 tags.')
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
    const projectData = {
      name,
      projectDetails,
      projectFunding,
      projectCollaborators,
      sauAuthorProfessor: finalAuthorName,
      sauProfessorEmail: finalAuthorEmail,
      sauProfessorDepartment,
      relevantTags: relevantTagsArray,
      createdBy: user._id,
    }

    dispatch(createProject(projectData))
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
      <h1>Create A New Project</h1>
      <p>Please enter all the details related to the new project below:</p>
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
                placeholder="Enter the title of the project, as it appears in the journal"
                required
              />
            </div>
            <div className="form-subgroup">
              <label htmlFor="name">Project Description</label>
              <textarea
                type="text"
                className="form-control"
                id="projectDetails"
                name="projectDetails"
                value={projectDetails}
                onChange={onChange}
                placeholder="Please give a short description of the project."
                required
              />
            </div>
          </div>

          <div className="form-group hasSubgroups">
            <div className="form-subgroup">
              <label htmlFor="name">Project Collaborators</label>
              <input
                type="text"
                className="form-control"
                id="projectCollaborators"
                name="projectCollaborators"
                value={projectCollaborators}
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
              <label htmlFor="projectFunding">Project Funding</label>
              <input
                type="number"
                className="form-control"
                id="projectFunding"
                name="projectFunding"
                value={projectFunding}
                onChange={onChange}
                placeholder="Total Amount of Funding in USD"
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

export default CreateProject
