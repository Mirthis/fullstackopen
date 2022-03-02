import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const handleChange = event => {
    console.log(event.target.value)
    const filterValue = event.target.value
    dispatch(setFilter(filterValue))
  }
  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      filter <input value={filter} onChange={handleChange} name="filter" />
    </div>
  )
}

export default Filter
