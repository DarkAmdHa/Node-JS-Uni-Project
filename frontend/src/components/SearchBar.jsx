import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { search, reset, searchReset } from '../features/search/searchSlice'
import SearchResultItem from './SearchResultItem'
import notLoggedIn from '../assets/notLoggedIn.png'
import notFound from '../assets/notFound.png'
import { toast } from 'react-toastify'

function SearchBar() {
  const [searchValue, setSearchValue] = useState('')
  const [searchThrough, setSearchThrough] = useState('All')
  const [specificField, setSpecificField] = useState('All')
  const [isValidMinMax, setIsValidMinMax] = useState(true)

  const { isLoading, isError, isSuccess, searchResults } = useSelector(
    (state) => state.search
  )

  const { user } = useSelector((state) => state.auth)

  const [isFocussed, setIsFocussed] = useState(false)
  const dispatch = useDispatch()
  const toastId = useRef(null)

  useEffect(() => {
    // Make the search request whenever searchValue, searchThrough, or specificField changes
    const searchData = {
      searchValue,
      searchThrough,
      specificField,
    }

    //Don't if invalid:
    if (isValidMinMax) {
      // Skip the initial search request if searchValue is empty
      if (searchValue !== '') {
        dispatch(search(searchData))
      } else {
        dispatch(searchReset())
      }
    }
  }, [searchValue, searchThrough, specificField, isValidMinMax])

  const handleSearchValueChange = (event) => {
    const value = event.target.value
    setSearchValue(value)

    if (specificField === 'projectFunding') {
      const fundingMin = +event.target.value.split('-')[0]
      const fundingMax = +event.target.value.split('-')[1]
      if (isNaN(fundingMin) || isNaN(fundingMax) || fundingMin > fundingMax) {
        setIsValidMinMax(false)
      } else {
        setIsValidMinMax(true)
      }
    } else {
      setIsValidMinMax(true)
    }
  }

  const handleSearchThroughChange = (event) => {
    const selectedSearchThrough = event.target.value
    setSearchThrough(selectedSearchThrough)
  }

  const handleSpecificFieldChange = (event) => {
    const selectedSpecificField = event.target.value
    setSpecificField(selectedSpecificField)

    if (event.target.value === 'projectFunding') {
      toastId.current = toast.info(
        'Please enter a minimum and maximum value for the funding, such as 2000-40000',
        {
          position: 'top-left',
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      )
      const fundingMin = +searchValue.split('-')[0]
      const fundingMax = +searchValue.split('-')[1]
      if (isNaN(fundingMin) || isNaN(fundingMax) || fundingMin > fundingMax) {
        setIsValidMinMax(false)
      } else {
        setIsValidMinMax(true)
      }
    } else {
      toast.dismiss(toastId.current)
      setIsValidMinMax(true)
    }
  }

  const handleClick = (e) => {
    setSearchValue('')
    setIsFocussed(false)
    setSearchThrough('All')
    setSpecificField('All')
  }

  const searchBarRef = useRef(null)
  const handleBlur = (e) => {
    const { relatedTarget } = e
    const searchBarElement = searchBarRef.current

    if (relatedTarget === null || !searchBarElement.contains(relatedTarget))
      setIsFocussed(false)
  }

  const loadingJSX = (
    <div className="searchResults loadingResults">
      <div className="loadingSpinner"></div>
    </div>
  )

  const showResults = (
    <div className="searchResults">
      {searchResults.map((result, index) => (
        <SearchResultItem
          key={index}
          result={result}
          handleClick={handleClick}
        />
      ))}
    </div>
  )

  const noResults = (
    <div className="searchResults noResults">
      <img src={notFound} alt="No Result Found" />
      <h3 className="noResultHeading">No Result Found !</h3>
    </div>
  )

  const loginPrompt = (
    <div className="searchResults login">
      <h3 className="noResultHeading">
        <img
          src={notLoggedIn}
          alt="Not Authorized."
          className="notAuthorizedImg"
        />
        You need to login in order to be able to search!
      </h3>
      <div className="notAuthorizedButtons">
        <Link
          to="/login"
          className="mainButton"
          onClick={() => setIsFocussed(false)}
        >
          Login
        </Link>
        <p>
          Don't have an account ?{' '}
          <Link
            to="/register"
            className="signUpButton"
            onClick={() => setIsFocussed(false)}
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
  return (
    <div
      ref={searchBarRef}
      className={
        setIsValidMinMax ? 'searchBarComponent hasError' : 'searchBarComponent'
      }
      onFocus={() => setIsFocussed(true)}
      onBlur={handleBlur}
    >
      <div className="searchOptions">
        <div className="searchBar">
          <input
            type="text"
            id="searchText"
            className={searchValue != '' && 'hasValue'}
            value={searchValue}
            onChange={handleSearchValueChange}
          />
          <label htmlFor="searchText">Search</label>
        </div>
        <div
          className={
            searchThrough != 'All'
              ? 'searchThrough searchThroughSpecific'
              : 'searchThrough'
          }
        >
          <select
            className="searchThroughDropdown"
            onChange={handleSearchThroughChange}
            value={searchThrough}
            defaultValue="All"
          >
            <option value="All">All</option>
            <option value="publishedPapers" selected>
              Published Papers
            </option>
            <option value="projects" selected>
              Projects
            </option>
            <option value="patents" selected>
              Patents
            </option>
          </select>
        </div>
        {searchThrough != 'All' && searchThrough === 'patents' && (
          <div className="specificField">
            <select
              className="specificFieldDropdown"
              value={specificField}
              onChange={handleSpecificFieldChange}
              defaultValue="All"
            >
              <option value="All">All</option>
              <option value="name">Name</option>
              <option value="excerpt">Excerpt</option>
              <option value="contributors">Contributors</option>
              <option value="sauAuthorProfessor">SAU Author Professor</option>
              <option value="sauProfessorDepartment">
                SAU Professor Department
              </option>
              <option value="sauProfessorEmail">SAU Professor Email</option>
              <option value="relevantTags">Relevant Tags</option>
            </select>
          </div>
        )}

        {searchThrough != 'All' && searchThrough === 'projects' && (
          <div className="specificField">
            <select
              defaultValue="All"
              className="specificFieldDropdown"
              value={specificField}
              onChange={handleSpecificFieldChange}
            >
              <option value="All">All</option>
              <option value="name">Name</option>
              <option value="projectDetails">Project Details</option>
              <option value="projectFunding">Project Funding</option>
              <option value="projectCollaborators">
                Project Collaborators
              </option>
              <option value="sauAuthorProfessor">SAU Author Professor</option>
              <option value="sauProfessorDepartment">
                SAU Professor Department
              </option>
              <option value="sauProfessorEmail">SAU Professor Email</option>
              <option value="relevantTags">Relevant Tags</option>
            </select>
          </div>
        )}

        {searchThrough != 'All' && searchThrough === 'publishedPapers' && (
          <div className="specificField">
            <select
              defaultValue="All"
              className="specificFieldDropdown"
              value={specificField}
              onChange={handleSpecificFieldChange}
            >
              <option value="All">All</option>
              <option value="name">Name</option>
              <option value="excerpt">Excerpt</option>
              <option value="journalOfPublication">
                Journal of Publication
              </option>
              <option value="contributors">Contributors</option>
              <option value="sauAuthorProfessor">SAU Author Professor</option>
              <option value="linkToPublication">Link to Publication</option>
              <option value="sauProfessorEmail">SAU Professor Email</option>
              <option value="sauProfessorDepartment">
                SAU Professor Department
              </option>
              <option value="relevantTags">Relevant Tags</option>
            </select>
          </div>
        )}
      </div>
      {!isValidMinMax ? (
        <div className="errorMsg">
          Please provide a valid minimum and maximum value.
        </div>
      ) : !user && isFocussed ? (
        loginPrompt
      ) : isLoading ? (
        loadingJSX
      ) : searchResults.length > 0 && isFocussed ? (
        showResults
      ) : searchValue === '' ? (
        ''
      ) : (
        searchResults.length === 0 &&
        !isLoading &&
        searchValue != '' &&
        isFocussed &&
        noResults
      )}
    </div>
  )
}

export default SearchBar
