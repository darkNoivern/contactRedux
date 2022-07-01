import React from 'react'
import Navbar from './Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AddContact from './AddContact'
import Contacts from './Contacts'
import Edit from "./Edit";
import Error from './Error'
import { ToastContainer } from 'react-toastify'

const Index = () => {
    return (
        <>
        <Router>
        <ToastContainer />
            <Navbar />   
            <Routes>
                <Route exact path="/" element={<Contacts />} /> 
                <Route exact path="/add" element={<AddContact />} />
                <Route exact path="/edit/:id" element={<Edit />} />
                <Route element={<Error />} />
            </Routes>
        </Router>
        </>
    )
}

export default Index
