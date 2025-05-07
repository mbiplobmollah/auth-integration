import React from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.init'

const AuthProvider = ({children}) => {

    const createUser = (email, password) =>{
       return createUserWithEmailAndPassword(auth, email, password) 
    } 

    const signInUser = (email,password) =>{
        return signInWithEmailAndPassword(auth, email, password)
    }


    const userInfo = {
        createUser,
        signInUser
    }

    onAuthStateChanged(auth, (currentUser)=>{
        if(currentUser){
            console.log('has current user', currentUser);
        }
        else{
            console.log('Current User', currentUser)
        }
    })


    return (
            <AuthContext value={userInfo}>
                {children}
            </AuthContext>

    );
};

export default AuthProvider;