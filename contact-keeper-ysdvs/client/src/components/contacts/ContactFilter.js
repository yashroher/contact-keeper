import React,{useRef,useEffect,useContext} from 'react'
import ContactContext from '../../context/contact/ContactContext'

const ContactFilter = () => {
    const contactContext = useContext(ContactContext);
    const {filterContacts,clearFilter,filtered} = contactContext;
    const text = useRef('');
    
    useEffect(() => {
        if(filtered == null){
            text.current.value = "";
        }
    })

    const onChange = e =>{
        if(text.current.value !== ''){
            filterContacts(e.target.value)
        }else{
            clearFilter();
        }
    }

    return (
        <form>
            <input 
                ref = {text}
                placeholder = "Filter Contacts..."
                type = "text"
                onChange = {onChange}            
            />
        </form>
    )
}
export default ContactFilter
