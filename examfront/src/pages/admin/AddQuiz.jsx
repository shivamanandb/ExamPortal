import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { addQuiz } from '../../services/operations/quizAPI'
import { Button, Card, FormControl, InputLabel, MenuItem, Select, Switch, TextField, Typography } from '@mui/material'
import { getAllCategories } from '../../services/operations/categoryAPI'

export const AddQuiz = () => {

    const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm()
    const { token } = useSelector((state) => state.auth)
    const [categories, setCategories] = useState([])
    const [publishStatus, setPublishStatus] = useState(false) // State for Switch component
    const [selectedCategory, setSelectedCategory] = useState([]) // State for Select component

        useEffect(() => {
            const getCategories = async () => {
                try {
                    const res = await getAllCategories(token);
                    setCategories(res)
                } catch (error) {
                    console.log("fetching Categories error")
                }
            };
            getCategories();
        }, [token])

    const formSubmit = (data) => {
        data.active = publishStatus; // Set the active property based on the Switch component
        data.category = selectedCategory // Set the category based on the Select component
        // console.log("DATA:", data)
        addQuiz(data, token)
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                title: "",
                description: "",
                maxMarks: "",
                numberOfQuestions: "",
                category: null
            })
            setPublishStatus(false); // Reset Switch component to default state
            setSelectedCategory(""); // Reset Select component to default state
        }
    }, [isSubmitSuccessful, reset])

    return (
        <div>
            <Card className='flex flex-col gap-4'>
                <Typography variant="subtitle1" className='p-4' component="div" style={{ fontWeight: 'bold' }}>
                    <div className='text-2xl'> Add New Quiz</div>
                </Typography>

                <div className='p-7'>
                    <form className='flex flex-col items-center justify-center gap-6' onSubmit={handleSubmit(formSubmit)}>
                        <TextField className='w-8/12 mx-auto'
                            size='small'
                            id="text-filled"
                            label="Title"
                            name='title'
                            variant="filled"
                            color='secondary'
                            placeholder='Enter Title here'
                            {...register("title", { required: true })}
                        />
                        {errors.title && (
                            <span className="-mt-5 text-[12px] text-yellow-900">
                                Please enter the Title.
                            </span>
                        )}
                        <TextField rows={4}
                            className='w-8/12'
                            size='small'
                            multiline
                            id="text-filled"
                            label="Description"
                            name='description'
                            color='secondary'
                            variant="filled"
                            placeholder='Enter Description here'
                            {...register("description", { required: true })}
                        />
                        {errors.description && (
                            <span className="-mt-5 text-[12px] text-yellow-900">
                                Please enter Description.
                            </span>
                        )}

                        <div className='flex flex-row justify-between w-8/12 gap-3'>
                            <div className='flex flex-col w-6/12'>
                                <TextField

                                    size='small'
                                    id="text-filled"
                                    label="Maximum Marks"
                                    name='maxMarks'
                                    color='secondary'
                                    variant="filled"
                                    placeholder='Enter Maximum Marks'
                                    type="text" // Set input type to "text"
                                    inputProps={{ pattern: "^[0-9]*$", inputMode: "numeric" }} // Specify pattern for integers only and set input mode to "numeric"
                                    {...register("maxMarks", { required: true })} // Add required validation
                                    onChange={(e) => {
                                        const { value } = e.target;
                                        if (!Number.isInteger(Number(value))) {
                                            e.target.value = value.slice(0, -1);
                                        }
                                    }} // Remove non-numeric characters on change
                                />
                                {errors.maxMarks && (
                                    <span className="mt-1 text-[12px] text-yellow-900">
                                        Please enter Maximum Marks.
                                    </span>
                                )}
                            </div>
                            <div className='flex flex-col w-6/12'>
                                <TextField
                                    size='small'
                                    id="text-filled"
                                    label="Number of Questions"
                                    name='numberOfQuestions'
                                    color='secondary'
                                    variant="filled"
                                    placeholder='Enter Number of Questions'
                                    type="text" // Set input type to "text"
                                    inputProps={{ pattern: "^[0-9]*$", inputMode: "numeric" }} // Specify pattern for integers only and set input mode to "numeric"
                                    {...register("numberOfQuestions", { required: true })} // Add required validation
                                    onChange={(e) => {
                                        const { value } = e.target;
                                        if (!Number.isInteger(Number(value))) {
                                            e.target.value = value.slice(0, -1);
                                        }
                                    }} // Remove non-numeric characters on change
                                />

                                {errors.numberOfQuestions && (
                                    <span className="mt-1 text-[12px] text-yellow-900">
                                        Please enter the Number of Questions.
                                    </span>
                                )}
                            </div>
                        </div>


                        <div className='flex items-center justify-start'>
                            <Switch
                                checked={publishStatus}
                                onChange={() => setPublishStatus(!publishStatus)} // Toggle publish status
                                inputProps={{ 'aria-label': 'controlled' }}
                                color='warning'
                            /> Publish Status
                        </div>
                        <FormControl className='w-8/12' variant="filled">
                            <InputLabel color='secondary' id="demo-simple-select-filled-label">Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                size='small'
                                color='secondary'
                                value={selectedCategory} // Pass the entire category object as the value
                                {...register("category", { required: true })} // Add required validation
                                onChange={(e) => setSelectedCategory(e.target.value)} // Update selectedCategory state
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {
                                    categories.map((category) => ( // Map over categories array
                                        <MenuItem key={category.cid} value={category}> {category.title} </MenuItem> // Pass category object as value
                                    ))
                                }
                            </Select>

                            {errors.category && (
                                <span className="mt-1 text-[12px] text-yellow-900">
                                    Please Enter valid category.
                                </span>
                            )}
                        </FormControl>

                        <div className='flex items-center justify-center gap-10 mt-5'>
                            <Button type='submit' variant="contained" color="success">
                                ADD
                            </Button>
                            <Button type='button' variant="contained" color="success" onClick={() => reset()}>
                                Reset
                            </Button>
                        </div>
                    </form>

                </div>
            </Card>
        </div>
    )
}
