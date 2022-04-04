import React,{useState,useContext,useEffect} from 'react';
import ContactContext from '../../context/contact/ContactContext';

const ContactForm = () => {
    const contactContext = useContext(ContactContext);
    const {addContact,clearCurrent,current,updateContact} = contactContext;

    useEffect(() => {
        if(current !== null){
            setContact(current);
        }
        else{
            setContact({
                name : "",
                email : "",
                phone : "",
                type : "personal"
            });
        }
    },[contactContext,current])

    const [contact,setContact] = useState({
        name : "",
        email : "",
        phone : "",
        type : "personal"
    })

    const {name,email,phone,type} = contact;

    const onChange = e => setContact({...contact,[e.target.name]:e.target.value});

    const onSubmit = e =>{
        e.preventDefault();
        if(current == null){
            addContact(contact);
            setContact({
                name : "",
                email : "",
                phone : "",
                type : "personal"
            });
        }
        else{
            updateContact(contact);
            clearCurrent();
        }
    }

    const clearAll = () => clearCurrent();

    return (
        <form onSubmit = {onSubmit}>
            <h2 className = "text-primary">
                {current ? "Edit Contact" : "Add Contact"}
            </h2>
            <input 
                placeholder = "Name"
                onChange = {onChange}
                value = {name}
                type = "text"
                name = "name"                
            />
            <input 
                placeholder = "Email"
                onChange = {onChange}
                value = {email}
                type = "email"
                name = "email"                
            />
            <input 
                placeholder = "Phone"
                onChange = {onChange}
                value = {phone}
                type = "text" 
                name = "phone"               
            />
            <h5>Contact Type</h5>
            <input
                type = "radio"
                value = "personal"
                checked = {type === "personal"}
                name = "type"
                onChange = {onChange}
            /> Personal {" "}
            <input
                type = "radio"
                value = "professional"
                checked = {type === "professional"}
                name = "type"
                onChange = {onChange}
            /> Professional
            <div>
                <input 
                    type = "submit"
                    className = "btn btn-primary btn-block"
                    value  = {current ? "Edit Contact" : "Add Contact"}
                />
            </div>
            {current && <div>
                    <button onClick = {clearAll} className = "btn btn-light btn-block">
                        Clear
                    </button>
                </div>}
        </form>
    )
}

export default ContactForm
