import React, { Component, useEffect, useState } from 'react'
import logo from "../assets/logo.png"
import { Button, Card, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { apiConnector } from '../services/apiConnector'
import { endpoints } from '../services/api'
import toast from 'react-hot-toast'
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../services/operations/authAPI'
import { useNavigate } from 'react-router-dom'


export const Login = () => {

    const {register, handleSubmit, reset, formState:{errors, isSubmitSuccessful}} = useForm();

    useEffect(() => {
        if (isSubmitSuccessful) {
          reset({
            username: "",
            password: "",
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
          })
        }
      }, [reset, isSubmitSuccessful])

      const dispatch = useDispatch();
      const navigate = useNavigate();
      const {user} = useSelector((state) => state.profile)
      const {token} = useSelector((state) => state.auth)

    const formSubmit = (data) => {
        
        dispatch(login(data.username, data.password, navigate))
        
        console.log("Token: ",token);
        // console.log("User: ", user);
    }
    
    // const formSubmit = async (data) => {
    //     try {
    //       // Make API call to the backend
    //       const response = await fetch('http://localhost:8080/generate-token', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //           username: data.username,
    //           password: data.password,
    //         }),
    //       });
      
    //       if (response.ok) {
    //         // Handle successful response
    //         const responseData = await response.json();
    //         console.log('Token:', responseData.token);
      
    //         // Dispatch actions or update state as needed
    //       } else {
    //         // Handle error response
    //         console.error('Error:', response.statusText);
    //         toast.error('Authentication failed. Please check your credentials.');
    //       }
    //     } catch (error) {
    //       console.error('Error:', error.message);
    //       toast.error('An error occurred while processing your request.');
    //     }
    //   };
      
    
  return (
    <div>
        <div>
        <Paper variant="elevation" elevation={4} className='flex flex-col items-center w-4/12 gap-5 p-5 mx-auto mt-10 border'>
            <div className='flex flex-col items-center'>
                <img src={logo} height={120} width={120} alt='logo' />
                <h1 className='text-2xl'>Login Here !!</h1>
            </div>
            <div className="w-full">
                <form className='flex flex-col gap-3' onSubmit={handleSubmit(formSubmit)}>

                    {/* Username */}
                    <TextField
                        type='text'
                        id="outlined-basic"
                        name='username'
                        label="Username*"
                        color='secondary'
                        variant="outlined"
                        className="w-full rounded-md"
                        placeholder='Enter Username'
                        size="small" 
                        margin="dense" 
                        {...register("username", {required: true})}
                    />
                    {errors.username && (
                        <span className="-mt-3 text-[12px] text-yellow-900">
                            Please enter your username.
                        </span>
                    )}

                    {/* Password */}
                    <TextField
                        type='password'
                        id="outlined-basic"
                        name='password'
                        label="Password*"
                        color='secondary'
                        variant="outlined"
                        className="w-full rounded-md"
                        placeholder='Enter Password'
                        size="small"  
                        margin="dense"
                        {...register("password", {required: true})}

                    />
                    {errors.password && (
                        <span className="-mt-3 text-[12px] text-yellow-900">
                            Please enter your password.
                        </span>
                    )}

                    <div className='flex items-center justify-center gap-10 mt-5'>
                        <Button type='submit'  variant="contained" color="success">
                            login
                        </Button>

                        <Button type='reset' variant="contained" color="error">
                            reset
                        </Button>
                    </div>

                </form>
            </div>
        </Paper>
    </div>
  )
    </div>
  )
}
