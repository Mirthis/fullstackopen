import { setFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = props => {
  const handleChange = event => {
    const filterValue = event.target.value
    props.setFilter(filterValue)
  }
  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      filter{' '}
      <input value={props.filter} onChange={handleChange} name="filter" />
    </div>
  )
}

const mapStateToProps = state => state.filter

const mapDispatchToProps = {
  setFilter,
}

const connectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter)

export default connectedFilter
