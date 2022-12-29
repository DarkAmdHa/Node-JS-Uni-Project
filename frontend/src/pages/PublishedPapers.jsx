import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  getPublishedPapers,
  reset,
} from '../features/publishedPapers/publishedPapersSlice'
import PublishedPaperItem from '../components/PublishedPaperItem'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

function PublishedPapers() {
  const { publishedPapers, isLoading, isError, isSuccess, message } =
    useSelector((state) => state.publishedPapers)

  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      if (isSuccess) dispatch(reset())
    }
  }, [dispatch, isSuccess])

  useEffect(() => {
    dispatch(getPublishedPapers())
  }, [dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <BackButton url="/" />
      <h1>Published Papers</h1>
      <div className="itemsContainer">
        {publishedPapers.map((publishedPaper) => (
          <PublishedPaperItem
            key={publishedPaper._id}
            publishedPaper={publishedPaper}
          />
        ))}
      </div>
    </>
  )
}

export default PublishedPapers
