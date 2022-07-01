import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import './style.css'

const Contacts = () => {

    const contacts = useSelector(state => state);
    const dispatch = useDispatch();

    const delContact = (id) => {
        
        const data = {
            id: id,
        }

        dispatch({
            type: 'DELETE_CONTACT',
            payload: data,
        });

        toast.success('Contact deleted succesfully', { theme: "colored" })
    }

    return (
        <>
            <div className="background d-flex justify-content-center">
                <div className="table-container mt-5">
                    <div className="btn-contact text-end mt-lg-3 mt-2 mb-lg-5 mb-4">
                        <Link exact to="/add">
                            <button className="btn btn-outline-dark">Add Contact</button>
                        </Link>
                    </div>
                    <table className="table text-center">
                        <thead className="text-white bg-dark">
                            <tr>
                                <td>#</td>
                                <td>Name</td>
                                <td>Email</td>
                                <td>Number</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                contacts.map((contact, index) => {
                                    return (
                                        <>
                                            <tr>
                                                <td className="pt-3">{contact.id}</td>
                                                <td className="pt-3">{contact.name}</td>
                                                <td className="pt-3">{contact.email}</td>
                                                <td className="pt-3">{contact.number}</td>
                                                <td>
                                                    <Link to={`/edit/${index}`}>
                                                        <button 
                                                        className="btn flexy action-btn me-2 btn-small btn-primary">
                                                        Edit
                                                        </button>
                                                    </Link>
                                                    <button 
                                                    onClick={()=>delContact(contact.id)}
                                                    className="btn flexy action-btn btn-small btn-danger">
                                                    Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Contacts
