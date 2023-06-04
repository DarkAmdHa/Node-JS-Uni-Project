import React from 'react'
import { Link } from 'react-router-dom'

function SearchResultItem({ result, handleClick }) {
  return (
    <Link className="searchResultItem" to={result.url} onClick={handleClick}>
      <h3 className="paperTitle">
        <span className="paperType">{result.type}</span>: {result.name}
      </h3>
      <div className="author">Prof. {result.sauAuthorProfessor}</div>
      <div className="relevant-tags">
        {result.relevantTags.map((tag, index) => {
          return <div className="relevant-tag">{tag}</div>
        })}
      </div>
      <div className="totalViews">{result.totalViews} Views</div>
    </Link>
  )
}

export default SearchResultItem
