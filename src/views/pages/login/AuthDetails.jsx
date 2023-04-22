/* eslint-disable prettier/prettier */
import { onAuthStateChanged } from 'firebase/auth';
import { bool } from 'prop-types';
import React, { useEffect, useState } from 'react'
import { auth } from 'src/firebaseConfigFile'

const AuthDetails = () => {
    const [authUser, setAuthUser] = useState(null)

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user)
            } else {
                setAuthUser(null)
            }
        })

        return () => {
            listen()
        }
    }, [])
  return (
  
    <div>{ authUser ? <p>{`Signed In As: ${authUser.email}`}</p> : <p>Signed Out</p> }</div>
  )
}

export default AuthDetails
