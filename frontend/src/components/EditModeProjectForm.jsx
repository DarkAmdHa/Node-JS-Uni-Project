import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { updateProject } from '../features/projects/projectsSlice'

function EditModeProjectForm({ project, setInEditMode }) {
  const { user } = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  const [authorCheckbox, setAuthorCheckbox] = useState(false)
  const [emailCheckbox, setEmailCheckbox] = useState(false)

  const [editModeProjectFormData, setEditModeProjectFormData] =
    useState(project)

  //For Edit mode:
  const {
    name,
    projectDetails,
    projectFunding,
    projectCollaborators,
    sauAuthorProfessor,
    sauProfessorEmail,
    sauProfessorDepartment,
    relevantTags,
  } = editModeProjectFormData

  const onSubmit = (e) => {
    const updateData = {
      id: project._id,
      editModeProjectFormData,
    }
    dispatch(updateProject(updateData))
  }
  const onChange = (e) => {
    setEditModeProjectFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleAuthorCheckbox = (e) => {
    setAuthorCheckbox(e.target.checked)
    if (e.target.checked === false) {
      setEditModeProjectFormData((prevState) => ({
        ...prevState,
        sauAuthorProfessor: '',
      }))
    }
  }

  const handleEmailCheckbox = (e) => {
    setEmailCheckbox(e.target.checked)
    if (e.target.checked === false) {
      setEditModeProjectFormData((prevState) => ({
        ...prevState,
        sauProfessorEmail: '',
      }))
    }
  }
  return (
    <div className="containerItem">
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
                Shenyang Aerospace University Artificial Intelligence Department
              </option>
              <option value="Shenyang Aerospace University Computer Science Department">
                Shenyang Aerospace University Computer Science Department
              </option>
              <option value="Shenyang Aerospace University Electrical Engineering Department">
                Shenyang Aerospace University Electrical Engineering Department
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
              <label htmlFor="useOtherName">Use name other than yours ?</label>
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
            <label htmlFor="sauProfessorEmail">Publishing Author's Email</label>
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
        <div className="form-group">
          <button
            className="btn btn-block btn-danger"
            onClick={() => {
              setInEditMode(false)
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditModeProjectForm
