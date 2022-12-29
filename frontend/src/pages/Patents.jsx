import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPatents, reset } from '../features/patents/patentsSlice'
import PatentItem from '../components/PatentItem'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

function Patents() {
  const { patents, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.patents
  )

  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      if (isSuccess) dispatch(reset())
    }
  }, [dispatch, isSuccess])

  useEffect(() => {
    dispatch(getPatents())
  }, [dispatch])

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
