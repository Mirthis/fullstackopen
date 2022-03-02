import { useSelector } from 'react-redux'
import {
  removeNotification,
  setNotification,
} from '../reducers/notificationReducer'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }
  return notification && <div style={style}>{notification}</div>
}

export const showNotification = (dispatch, text) => {
  dispatch(setNotification(text))
  setTimeout(() => dispatch(removeNotification), 5000)
}

export default Notification
