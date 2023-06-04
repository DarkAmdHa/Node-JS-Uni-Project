import React from 'react'

function SearchResultItem({ result }) {
  return (
    <a className="searchResultItem" href={result.url}>
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
    </a>
  )
}

export default SearchResultItem
