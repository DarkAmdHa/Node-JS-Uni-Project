import BackButton from '../components/BackButton'
import { Link } from 'react-router-dom'
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa'

function Create() {
  return (
    <>
      <BackButton url="/" />
      <h1>Create A New Entry</h1>
      <p>What would you like to create ?</p>

      <div class="selectableOptions">
        <Link
          to="/create-paper"
          className="btn btn-reverse  btn-block mainNavBtn"
        >
          <FaQuestionCircle /> A New Paper
        </Link>
        <Link to="/create-patent" className="btn btn-block mainNavBtn">
          <FaTicketAlt /> A new patent
        </Link>
        <Link to="/projects" className="btn btn-reverse btn-block mainNavBtn">
          <FaQuestionCircle /> A new project
        </Link>
      </div>
    </>
  )
}

export default Create
