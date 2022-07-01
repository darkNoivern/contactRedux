import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import "./style.css"

const Edit = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');

    const { id } = useParams();
    const contacts = useSelector(state => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentContact = contacts.find(contact => contact.id === parseInt(id));

    useEffect(() => {
        if (currentContact) {
            setName(contacts[id].name)
            setEmail(contacts[id].email)
            setNumber(contacts[id].number)
        }
    }, [])

    const cancelChanges = (event) => {
        event.preventDefault();
        toast.info('Update cancelled succesfully', { theme: "colored" })
        navigate('/');
    }

    const saveChanges = (event) => {
        
        event.preventDefault();

        const checkEmailPresent = contacts.find((contact) => {
            return (parseInt(id)!==contact.id && contact.email === email);
        })

        const checkNumberPresent = contacts.find((contact) => {
            return (parseInt(id)!==contact.id && contact.number === parseInt(number));
        })

        if (!name || !number || !email) {
            return toast.warn('Please fill all details', { theme: "colored" })
        }

        if (checkEmailPresent !== undefined) {
            return toast.error('Email already exists', { theme: "colored" });
        }

        if (checkNumberPresent !== undefined) {
            return toast.error('Number already exists', { theme: "colored" });
        }

        const data = {
            id: parseInt(id),
            name,
            email,
            number: parseInt(number),
        }

        console.log(data)
        dispatch({
            type: 'UPDATE_CONTACT',
            payload: data,
        });

        toast.success('Contact updated succesfully', { theme: "colored" })
        navigate('/')
    }


    return (
        <>
            {
                currentContact ?
                    <>
                        <div className="d-flex justify-content-center">
                            <div className="addContainer">
                                <div className="banner text-center mt-lg-5 mt-3 mb-lg-5 mb-3">
                                    Edit Contact
                                </div>
                                <div className="form-container p-lg-5 py-4 px-3">
                                    <form>

                                        <label htmlFor="contactName" className="form-label">Name</label>
                                        <input
                                            type="text"
                                            id="contactName"
                                            className=" mb-3 form-control"
                                            value={name}
                                            onChange={(event) => { setName(event.target.value) }} />

                                        <label htmlFor="contactEmail" className="form-label">Email</label>
                                        <input
                                            id="contactEmail"
                                            type="email"
                                            className="mb-3 form-control"
                                            value={email}
                                            onChange={(event) => { setEmail(event.target.value) }} />

                                        <label htmlFor="contactNumber" className="form-label">Number</label>
                                        <input
                                            id="contactNumber"
                                            type="number"
                                            className="mb-3 form-control"
                                            value={number}
                                            onChange={(event) => { setNumber(event.target.value) }} />

                                        <div className="d-flex justify-content-between">
                                            <button
                                            onClick={saveChanges}
                                                className="btn btn-dark mt-4">
                                                Save Changes
                                            </button>
                                            <button
                                            onClick={cancelChanges}
                                                className="btn btn-danger mt-4">
                                                Cancel Changes
                                            </button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </>
                    :
                    <div className="banner text-center my-5">This Contact doesnot exist</div>
            }

        </>
    )
}

export default Edit
