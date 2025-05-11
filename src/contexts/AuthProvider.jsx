import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../firebase.init'

const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({children}) => {

    const [user,setUser] = useState(null)

    const [loading,setLoading] = useState(true);

    const createUser = (email, password) =>{
        setLoading(true);
       return createUserWithEmailAndPassword(auth, email, password) 
    } 

    const signInUser = (email,password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

        const googleSignIn = () =>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const signOutUser = () =>{
        setLoading(true);
        return signOut(auth);
    }


    const userInfo = {
        user,
        loading,
        createUser,
        signInUser,
        signOutUser,
        googleSignIn
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
            setUser(currentUser);
            setLoading(false)
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