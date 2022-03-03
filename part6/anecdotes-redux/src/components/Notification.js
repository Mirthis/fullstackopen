import { connect } from 'react-redux'

const Notification = props => {
  //const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }
  return props.notification && <div style={style}>{props.notification}</div>
}

const mapStateToProp = state => {
  return { notification: state.notification.text }
}

const connectedNotification = connect(mapStateToProp)(Notification)

export default connectedNotification
