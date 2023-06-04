import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { updatePublishedPaper } from '../features/publishedPapers/publishedPapersSlice'

function EditModePaperForm({ publishedPaper, setInEditMode }) {
  const { user } = useSelector((state) => state.auth)
  const { isError, isSuccess, message } = useSelector(
    (state) => state.publishedPapers
  )

  const dispatch = useDispatch()

  const [authorCheckbox, setAuthorCheckbox] = useState(false)
  const [emailCheckbox, setEmailCheckbox] = useState(false)

  const [editModePaperFormData, setEditModePaperFormData] =
    useState(publishedPaper)

  //For Edit mode:
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
  } = editModePaperFormData

  const onSubmit = (e) => {
    console.log('first')
    const updateData = {
      id: publishedPaper._id,
      editModePaperFormData,
    }
    dispatch(updatePublishedPaper(updateData))
  }
  const onChange = (e) => {
    setEditModePaperFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleAuthorCheckbox = (e) => {
    setAuthorCheckbox(e.target.checked)
    if (e.target.checked === false) {
      setEditModePaperFormData((prevState) => ({
        ...prevState,
        sauAuthorProfessor: '',
      }))
    }
  }

  const handleEmailCheckbox = (e) => {
    setEmailCheckbox(e.target.checked)
    if (e.target.checked === false) {
      setEditModePaperFormData((prevState) => ({
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
            <label for="sauProfessorDepartment">Author's SAU Department</label>
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

export default EditModePaperForm
