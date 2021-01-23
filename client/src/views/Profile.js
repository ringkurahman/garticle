//rsc
import React from 'react'
import UserAreaHOC from '../components/UserAreaHOC'


const Profile = () => {
    return (
        <UserAreaHOC>
            <div className="mt-3">
                Welcome to your profile area
            </div>
        </UserAreaHOC>
    )
}

export default Profile