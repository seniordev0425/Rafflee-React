import { message } from 'antd'

export const openNotification = (type, msg, description) => {
  if (type === 'success') {
    message.success(msg, 3)
  } else {
    message.warning(msg, 3)
  }
}