import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  getPublishedPapers,
  reset,
} from '../features/publishedPapers/publishedPapersSlice'
import { toast } from 'react-toastify'

import PublishedPaperItem from '../components/PublishedPaperItem'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

function PublishedPapers() {
  const {
    publishedPapers,
    isLoading,
    isError,
    isSuccess,
    message,
    isUpdated,
    isDeleted,
  } = useSelector((state) => state.publishedPapers)

  const [firstLoad, setFirstLoad] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (!firstLoad) {
      dispatch(getPublishedPapers())
      setFirstLoad(true)
    }
    if (isSuccess && isUpdated) {
      toast.success('Paper Updated')
      dispatch(getPublishedPapers())
    }

    if (isSuccess && isDeleted) {
      toast.success('Paper Deleted')
      dispatch(getPublishedPapers())
    }
    dispatch(reset())
  }, [dispatch, firstLoad, isError, isSuccess, isUpdated, isDeleted, message])

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
