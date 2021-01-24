//rsc
import React from 'react'
import UserAreaHOC from '../components/UserAreaHOC'
import UpdateEmailPass from '../components/profileComponents/UpdateEmailPass'
import UserStats from '../components/profileComponents/UserStats'


const Profile = (props) => {
    return (
        <UserAreaHOC>
            <div className="mt-3">
                <UpdateEmailPass {...props} />
                <UserStats {...props} />
            </div>
        </UserAreaHOC>
    )
}

export default Profile