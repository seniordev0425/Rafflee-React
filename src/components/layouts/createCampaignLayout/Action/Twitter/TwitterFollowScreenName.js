import React, { useState } from 'react'
import { Select, Spin } from 'antd'
import debounce from 'lodash/debounce'
import { openNotification } from '../../../../../utils/notification'

const { Option } = Select

function TwitterFollowScreenName() {
    const [data, setData] = useState([])
    const [value, setValue] = useState([])
    const [fetching, setFetching] = useState(false)

    const fetchUser = value => {
        setData([])
        setFetching(true)

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "JWT " + sessionStorage.getItem('token'))

        var formdata = new FormData()
        formdata.append("search", value)

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://rafflee.io/api/twitter/users/search/", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setFetching(false)
                openNotification('warning', 'Connection Error')
            })
            .catch(error => {
                console.log('error', error)
            });

        // fetch('https://randomuser.me/api/?results=5')
        //     .then(response => response.json())
        //     .then(body => {
        //         const data = body.results.map(user => ({
        //             text: `${user.name.first} ${user.name.last}`,
        //             value: user.login.username,
        //         }))
        //         setData(data)
        //         setFetching(false)
        //     })
    }

    const handleChange = value => {
        setData([])
        setValue(value)
        setFetching(false)
    }

    return (
        <Select
            mode="multiple"
            labelInValue
            value={value}
            placeholder="Select users"
            notFoundContent={fetching ? <Spin size="small" /> : null}
            filterOption={false}
            onSearch={debounce(fetchUser, 800)}
            onChange={handleChange}
            style={{ width: '100%' }}
            open={value.length >= 1 ? false : true}
            size='large'
        >
            {data.map(d => (
                <Option key={d.value}><span>{d.text}</span><img alt="#" /></Option>
            ))}
        </Select>
    )
}

export default TwitterFollowScreenName