import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase.init'

const AuthProvider = ({children}) => {

        const [user,setUser] = useState(null)


    const createUser = (email, password) =>{
       return createUserWithEmailAndPassword(auth, email, password) 
    } 

    const signInUser = (email,password) =>{
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signOutUser = () =>{
        return signOut(auth);
    }

    const userInfo = {
        user,
        createUser,
        signInUser,
        signOutUser
    }

    // onAuthStateChanged(auth, (currentUser)=>{
    //     if(currentUser){
    //         console.log('has current user', currentUser);
    //     }
    //     else{
    //         console.log('Current User', currentUser)
    //     }
    // })


    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, currentUser=>{
            console.log('current user inside useEffect on auth state change', currentUser)
            setUser(currentUser)
        })
        return ()=>{
            unSubscribe()
        }
    },[])


    return (
            <AuthContext value={userInfo}>
                {children}
            </AuthContext>

    );
};

export default AuthProvider;