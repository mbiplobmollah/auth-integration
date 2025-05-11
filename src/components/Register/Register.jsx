// import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { use } from 'react';
import { Link, Navigate, useNavigate } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';
// import { auth } from '../../firebase.init';

const Register = () => {

  const {createUser} = use(AuthContext)
  // console.log(userInfo)
  const navigate = useNavigate();

    const handleRegister = e => {
        e.preventDefault();
        const name = e.target.name.value
        const email = e.target.email.value
        const password = e.target.password.value

        console.log(name,email,password)

        // createUserWithEmailAndPassword(auth,email,password)
        // .then(result => {
        //     console.log(result)
        // })
        // .catch(error =>{
        //     console.log(error)
        // })

        createUser(email,password)
        .then(result=>{
          console.log(result)
          navigate('/')
        })
        .catch(error=>{
          console.log(error)
        })


    }

    return (
        <div>
        <div className="card mx-auto mt-15 bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <h1 className="text-4xl mx-auto mt-5 font-bold">Register now!</h1>
          <div className="card-body">  
            <form onSubmit={handleRegister} className="fieldset">
              <label className="label">Name</label>
              <input name='name' type="text" className="input" placeholder="Name" />
              <label className="label">Email</label>
              <input name='email' type="email" className="input" placeholder="Email" />
              <label className="label">Password</label>
              <input name='password' type="password" className="input" placeholder="Password" />
              <button className="btn btn-neutral mt-4">Register</button>
            </form>
            <p>Do you already have and account? please <Link className='text-blue-500 underline' to={'/login'}>Login!</Link></p>
          </div>
        </div>
      </div>
    );
};

export default Register;