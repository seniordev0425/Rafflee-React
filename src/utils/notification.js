import {notification} from 'antd'

export const openNotification = (type, message, description) => {
    notification[type]({
        message: message,
        duration: 8,
        description: description
    });
}