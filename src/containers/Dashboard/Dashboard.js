import React, { useState, useEffect } from 'react';
import "./_dashboard.scss"
import "./components/_item.scss"
import { useNavigate } from "react-router-dom";
import { setLocalStorage } from '../../config/localstorage-helper';
import Toast from '../Items/Toast';
import Header from '../Items/Header';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import dayjs from "dayjs"
import { addUserContact, deleteUserContact, getAllContacts } from '../../services/dashboard-services';

const Dashboard = () => {

    let navigate = useNavigate()
    const [contacts, setContacts] = useState([])
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [name, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setMobile] = useState("")
    const [text, setToastText] = useState("")
    const [display, setDisplay] = useState(false)
    const [error, setError] = useState(true)

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    useEffect(async () => {
        getContacts()
    }, []);

    const getContacts = async () => {
        const response = await getAllContacts()
        if (response.status === 401)
            navigate("/login")
        setContacts(response.data)
    }

    const addContact = async () => {
        const data = {
            name,
            email,
            phone
        }
        const response = await addUserContact(data)
        setDisplay(true)
        getContacts()
        if (response.status === true) {
            setToastText("Contact added to list")
            setOpen(false)
            setTimeout(() => {
                setDisplay(false)
            }, 4000);
        }
        else {
            setToastText("Contact already saved")
            setOpen(false)
            setTimeout(() => {
                setDisplay(false)
            }, 4000);
        }
    }

    const checkError = async (name, email, phone) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) && name.length > 4 && phone.length === 10)
            setError(false)
        else
            setError(true)
    }

    const deleteContact = async (contactId) => {
        const resp = window.confirm("Are you sure you want to delete the contact?")
        if (resp === true) {
            const data = {
                contactId
            }
            const response = await deleteUserContact(data)
            if (response.status === 401)
                navigate("/login")
            setDisplay(true)
            getContacts()
            if (response.status === true) {
                setToastText("Contact deleted from list")
                setTimeout(() => {
                    setDisplay(false)
                }, 4000);
            }
            else {
                setToastText("Something went wrong. Please try again")
                setTimeout(() => {
                    setDisplay(false)
                }, 4000);
            }
        }
        else {
            setDisplay(true)
            setToastText("Contact deletion cancelled")
            setTimeout(() => {
                setDisplay(false)
            }, 4000);
        }
    }

    return (
        <React.Fragment>
            <Header dashboard={true} />
            <div className="dashboard-container container">
                <Toast text={text} display={display} />
                <div className='add-contact-div'>
                    <p className='contact-list-text'>Contact List</p>
                    <Button variant="contained" onClick={handleOpen}>Add Contact</Button>
                    <Modal
                        open={open}
                        // onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <div className='close-btn' onClick={handleClose}>X</div>
                            <p className='add-contact-text'>Add Contact</p>
                            <p className='input-field-text'>Please make sure you input every field.</p>

                            <div className='input-box-div'>
                                <TextField
                                    label="Full Name"
                                    id="outlined-size-small"
                                    defaultValue=""
                                    size="small"
                                    onChange={(e) => { setFullName(e.target.value); checkError(e.target.value, email, phone) }}
                                />
                                <TextField
                                    label="Email"
                                    id="outlined-size-small"
                                    defaultValue=""
                                    size="small"
                                    onChange={(e) => { setEmail(e.target.value); checkError(name, e.target.value, phone) }}
                                />
                            </div>
                            <div className='input-box-div second-input-div'>
                                <TextField
                                    label="Mobile Number"
                                    id="outlined-size-small"
                                    defaultValue=""
                                    size="small"
                                    type={"number"}
                                    onChange={(e) => { setMobile(e.target.value); checkError(name, email, e.target.value) }}
                                />
                            </div>
                            <Button variant="contained" disabled={error} onClick={() => addContact()}>Add</Button>

                        </Box>
                    </Modal>
                </div>
                <div className='data-grid-main'>
                    {contacts?.length > 0 ?
                        <table>
                            <tbody>
                                <tr className='row-headers'>
                                    <th className='th-headers'>Full Name</th>
                                    <th className='th-headers'>Email</th>
                                    <th className='th-headers'>Phone Number</th>
                                    <th className='th-headers'>Created At</th>
                                    <th className='th-headers'>Action</th>
                                </tr>
                                {contacts.map((contact, index) => {
                                    return (
                                        <tr key={contact._id}>
                                            <td className='row-values first-column'>{contact.name}</td>
                                            <td className='row-values'>{contact.email}</td>
                                            <td className='row-values'>+91 {contact.phone}</td>
                                            <td className='row-values'>{dayjs(contact.created_at).format("DD/MM/YYYY")}</td>
                                            <td className='row-values delete-options' onClick={() => deleteContact(contact._id)}>Delete</td>
                                        </tr>
                                    )
                                })

                                }
                            </tbody>
                        </table>
                        : <p className='no-contacts-text'>No Contacts</p>
                    }
                </div>
            </div>
        </React.Fragment>
    );
};

export default Dashboard;