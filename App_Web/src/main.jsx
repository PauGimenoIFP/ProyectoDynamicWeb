import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Registration_Section } from './registration_Section.jsx'
import { SignUp_Form } from './signUp_Form.jsx'
import { Package_Payment } from './package_Payment.jsx'
import { Package_Payment1 } from './Package_Payment1.jsx'
import { Package_Payment2 } from './Package_Payment2.jsx'
import { Package_Payment3 } from './Package_Payment3.jsx'
import { Login } from './login.jsx'
import { Main_Panel } from './main_Panel.jsx'
import { Pagos } from './pagos.jsx'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Registration_Section />} />
            <Route path="/SignUp_Form" element={<SignUp_Form />} />
            <Route path="/Package_Payment" element={<Package_Payment/>} />
            <Route path="/Package_Payment1" element={<Package_Payment1/>} />
            <Route path="/Package_Payment2" element={<Package_Payment2/>} />
            <Route path="/Package_Payment3" element={<Package_Payment3/>} />
            <Route path="/Main_Panel" element={<Main_Panel/>} />
            <Route path="/Pagos" element={<Pagos/>} />
            <Route path="/Login" element={<Login />} />
        </Routes>
    </BrowserRouter>
)
