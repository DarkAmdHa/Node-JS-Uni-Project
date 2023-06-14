import { useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { getPatents, reset } from '../features/patents/patentsSlice'
import PatentItem from '../components/PatentItem'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import { toast } from 'react-toastify'

function Patents() {
  const {
    patents,
    isLoading,
    isError,
    isSuccess,
    message,
    isUpdated,
    isDeleted,
  } = useSelector((state) => state.patents)

  const [firstLoad, setFirstLoad] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (!firstLoad) {
      dispatch(getPatents())
      setFirstLoad(true)
    }
    if (isSuccess && isUpdated) {
      toast.success('Patent Updated')
      dispatch(getPatents())
    }

    if (isSuccess && isDeleted) {
      toast.success('Patent Deleted')
      dispatch(getPatents())
    }
    dispatch(reset())
  }, [dispatch, firstLoad, isError, isSuccess, isUpdated, isDeleted, message])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <BackButton url="/" />
      <h1>Patents</h1>
      <div className="itemsContainer">
        {patents.map((patent) => (
          <PatentItem key={patent._id} patent={patent} />
        ))}
      </div>
    </>
  )
}

export default Patents
