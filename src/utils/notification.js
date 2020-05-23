import { notification, message } from 'antd'

export const openNotification = (type, msg, description) => {
    // notification[type]({
    //     message: message,
    //     duration: 2,
    //     description: description,
    // });
    if (type === 'success') {
        message.success(msg, 3)
    } else {
        message.warning(msg, 3)
    }
    
}