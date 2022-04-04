import React,{useReducer} from "react";
import axios from "axios";
import ContactContext from "./ContactContext";
import ContactReducer from "./ContactReducer";

import {
    GET_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    CLEAR_CURRENT,
    SET_CURRENT,
    UPDATE_CONTACT,
    CLEAR_CONTACTS,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR
} from "../types";

const ContactState = props => {
    const initialState = {
        contacts : null,
        current : null,
        filtered : null,
        error : null,
        loading : true
    }

    const [state,dispatch] = useReducer(ContactReducer,initialState);

    //Get Contacts
    const getContacts = async () => {
        try{
            const res = await axios.get("/api/contacts");
            dispatch({
                type : GET_CONTACTS,
                payload : res.data
            })
        }catch(err){
            dispatch({
                type : CONTACT_ERROR,
                payload : err.reponse.msg
            })
        }
    }

    //ADD_CONTACT
    const addContact = async contact => {
        const config = {
            headers : {
                'Content-Type' : "application/json"
            }
        }

        try{
            const res = await axios.post("/api/contacts",contact,config);
            dispatch({
                type : ADD_CONTACT,
                payload : res.data
            })
        }catch(err){
            dispatch({
                type : CONTACT_ERROR,
                payload : err.reponse.msg
            })
        }
    }


    //DELETE_CONTACT
    const deleteContact = async id => {
        try{
            const res = await axios.delete(`/api/contacts/${id}`);
            dispatch({
                type : DELETE_CONTACT,
                payload : id
            })
        }catch(err){
            dispatch({
                type : CONTACT_ERROR,
                payload : err.reponse.msg
            })
        }
    }


    //UPDATE_CONTACT
    const updateContact = async contact => {
        const config = {
            headers : {
                'Content-Type' : "application/json"
            }
        }

        try{
            const res = await axios.put(`/api/contacts/${contact._id}`,contact,config);
            dispatch({
                type : UPDATE_CONTACT,
                payload : res.data
            })
        }catch(err){
            dispatch({
                type : CONTACT_ERROR,
                payload : err.reponse.msg
            })
        }
    }

    //Clear Contacts
    const clearContacts = () => dispatch({type : CLEAR_CONTACTS});

    //SET_CURRENT
    const setCurrent = contact => {
        dispatch({
            type : SET_CURRENT,
            payload : contact
        });
    }

    //CLEAR_CURRENT
    const clearCurrent = () => {
        dispatch({
            type : CLEAR_CURRENT
        });
    }
    
    //FILTER_CONTACTS
    const filterContacts = text => {
        dispatch({
            type : FILTER_CONTACTS,
            payload : text
        })
    }


    //CLEAR_FILTER
    const clearFilter = () => {
        dispatch({
            type : CLEAR_FILTER
        })
    }

    return (
        <ContactContext.Provider
            value = {{
                contacts : state.contacts,
                current : state.current,
                filtered : state.filtered,
                error : state.error,
                loading : state.loading,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                filterContacts,
                clearFilter,
                getContacts,
                clearContacts
            }}
        >
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState;