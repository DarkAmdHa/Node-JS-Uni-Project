import { Link } from 'react-router-dom'
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa'

function Home() {
  return (
    <>
      <section className="heading">
        <h1 className="homePageHeading">Welcome To SAU's Research Portal</h1>
        <p className="homePageSubHeading">What would you like to do ?</p>
      </section>
      <div className="mainNavBtns">
        <Link
          to="/published-papers"
          className="btn btn-reverse  btn-block mainNavBtn"
        >
          <FaQuestionCircle /> Browse Papers Published By SAU Professors
        </Link>
        <Link to="/patents" className="btn btn-block mainNavBtn">
          <FaTicketAlt /> Browse Patents Owned By SAU Professors
        </Link>
        <Link to="/projects" className="btn btn-reverse btn-block mainNavBtn">
          <FaQuestionCircle /> Browse Projects SAU Professors Are Working On
        </Link>
      </div>
    </>
  )
}

export default Home
