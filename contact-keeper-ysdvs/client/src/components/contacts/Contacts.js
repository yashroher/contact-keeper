import React,{Fragment,useContext,useEffect} from 'react';
import ContactContext from '../../context/contact/ContactContext';
import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';

const Contacts = () => {
    const contactContext = useContext(ContactContext);
    const {contacts,filtered,getContacts,loading} = contactContext;

    useEffect(() => {
      getContacts();
      //eslint-disable-next-line
    },[]);

    if(contacts !== null && contacts.length == 0 && !loading){
      return (
        <div>
          <h3>Please Add Contacts</h3>
        </div>
      )
    }
 
    return (
        <Fragment>
          {contacts !==null && !loading ? (filtered !== null ? filtered.map((contact) => (
              <ContactItem
                contact = {contact}
                key = {contact._id}
              />
            )) : contacts.map((contact) => (
              <ContactItem 
                contact = {contact}
                key = {contact._id}
              />
            ))) : <Spinner/>}
        </Fragment>
    )
}

export default Contacts
