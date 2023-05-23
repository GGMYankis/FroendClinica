

import React from 'react'
import { useSelector } from 'react-redux'

function Email() {

    const user = useSelector((state) => state.user)
    return (
        <header>

            <ul>
                <li>Name :{user.name}</li>
                <li>Name :{user.email}</li>
                <li>Name :{user.username}</li>
            </ul>
        </header>
    )
}

export default Email


