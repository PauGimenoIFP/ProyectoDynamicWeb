import React from 'react' 
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Registration_Section } from './registration_Section.jsx'
import { SignUp_Form } from './signUp_Form.jsx'
import { Login } from './login.jsx'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Registration_Section />} />
            <Route path="/signup" element={<SignUp_Form />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    </BrowserRouter>
)
