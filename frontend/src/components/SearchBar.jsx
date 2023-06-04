import { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { search, reset, searchReset } from '../features/search/searchSlice'
import SearchResultItem from './SearchResultItem'

import notFound from '../assets/notFound.png'
function SearchBar() {
  const [searchValue, setSearchValue] = useState('')
  const [searchThrough, setSearchThrough] = useState('All')
  const [specificField, setSpecificField] = useState('All')

  const { isLoading, isError, isSuccess, searchResults } = useSelector(
    (state) => state.search
  )
  const dispatch = useDispatch()
  useEffect(() => {
    // Make the search request whenever searchValue, searchThrough, or specificField changes
    const searchData = {
      searchValue,
      searchThrough,
      specificField,
    }

    // Skip the initial search request if searchValue is empty
    if (searchValue !== '') {
      dispatch(search(searchData))
    } else {
      dispatch(searchReset())
    }
  }, [searchValue, searchThrough, specificField])

  const handleSearchValueChange = (event) => {
    const value = event.target.value
    setSearchValue(value)
  }

  const handleSearchThroughChange = (event) => {
    const selectedSearchThrough = event.target.value
    setSearchThrough(selectedSearchThrough)
  }

  const handleSpecificFieldChange = (event) => {
    const selectedSpecificField = event.target.value
    setSpecificField(selectedSpecificField)
  }
  return (
    <div className="searchBarComponent">
      <div className="searchOptions">
        <div className="searchBar">
          <input
            type="text"
            id="searchText"
            className={searchValue != '' && 'hasValue'}
            value={searchValue}
            onChange={handleSearchValueChange}
          />
          <label for="searchText">Search</label>
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
          >
            <option value="All" selected>
              All
            </option>
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
            >
              <option value="All">All</option>
              <option value="name">Name</option>
              <option value="authorizationDate">Authorization Date</option>
              <option value="excerpt">Excerpt</option>
              <option value="contributors">Contributors</option>
              <option value="sauAuthorProfessor">SAU Author Professor</option>
              <option value="sauProfessorDepartment">
                SAU Professor Department
              </option>
              <option value="sauProfessorEmail">SAU Professor Email</option>
              <option value="totalViews">Total Views</option>
              <option value="relevantTags">Relevant Tags</option>
            </select>
          </div>
        )}

        {searchThrough != 'All' && searchThrough === 'projects' && (
          <div className="specificField">
            <select
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
              <option value="totalViews">Total Views</option>
              <option value="relevantTags">Relevant Tags</option>
            </select>
          </div>
        )}

        {searchThrough != 'All' && searchThrough === 'publishedPapers' && (
          <div className="specificField">
            <select
              className="specificFieldDropdown"
              value={specificField}
              onChange={handleSpecificFieldChange}
            >
              <option value="All">All</option>
              <option value="createdBy">Created By</option>
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
              <option value="dateWritten">Date Written</option>
              <option value="totalViews">Total Views</option>
              <option value="relevantTags">Relevant Tags</option>
            </select>
          </div>
        )}
      </div>
      {isLoading ? (
        <div className="searchResults loadingResults">
          <div className="loadingSpinner"></div>
        </div>
      ) : searchResults.length > 0 ? (
        <div className="searchResults">
          {searchResults.map((result, index) => (
            <SearchResultItem key={index} result={result} />
          ))}
        </div>
      ) : (
        searchResults.length === 0 &&
        !isLoading &&
        searchValue != '' && (
          <div className="searchResults noResults">
            <img src={notFound} alt="No Result Found" />
            <h3 class="noResultHeading">No Result Found !</h3>
          </div>
        )
      )}
    </div>
  )
}

export default SearchBar
