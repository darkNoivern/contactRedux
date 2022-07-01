import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import "./style.css";

const AddContact = () => {

    const contacts = useSelector((state) => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');

    const verifySubmit = (event) => {
        event.preventDefault();

        const checkEmailPresent = contacts.find((contact) => {
            return (contact.email === email);
        })

        const checkNumberPresent = contacts.find((contact) => {
            return (contact.number === parseInt(number));
        })

        // if(checkNumberPresent===undefined){
        //     console.log(typeof(parseInt(number)), typeof(contacts[0].number))
        // }

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
            id: contacts.length>0 ? contacts[contacts.length - 1].id + 1 : 0,
            name,
            email,
            number: parseInt(number),
        }

        console.log(data);

        dispatch({
            type: 'ADD_CONTACT',
            payload: data,
        });

        toast.success('Contact added succesfully', { theme: "colored" })
        navigate('/')
    }

    return (
        <>
            <div className="d-flex justify-content-center">
                <div className="addContainer">
                    <div className="banner text-center mt-lg-5 mt-3 mb-lg-5 mb-3">
                        Add Contact
                    </div>
                    <div className="form-container p-lg-5 py-4 px-3">
                        <form>

                            <label htmlFor="contactName" className="form-label">Name</label>
                            <input
                                type="text"
                                id="contactName"
                                className="mb-3 form-control"
                                value={name}
                                onChange={(event) => { setName(event.target.value) }} />

                            <label htmlFor="contactEmail" className="form-label">Email</label>
                            <input
                                type="email"
                                id="contactEmail"
                                className="mb-3 form-control"
                                value={email}
                                onChange={(event) => { setEmail(event.target.value) }} />

                            <label htmlFor="contactNumber" className="form-label">Number</label>
                            <input
                                type="number"
                                id="contactNumber"
                                className="mb-3 form-control"
                                value={number}
                                onChange={(event) => { setNumber(event.target.value) }} />

                            <div className="add-submit-btn">
                                <button
                                onClick={verifySubmit}
                                className="btn btn-dark form-control mt-4">
                                Add Contact
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddContact
