import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContactCard } from "../component/ContactCard.js";
import { Modal } from "../component/Modal";
import { Context } from "../store/appContext.js";

export const Contacts = () => {
  const [state, setState] = useState({ showModal: false });
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getContacts();
  }, []); // Ensure actions is included if it's memoized in Context

  const [contactIdToDelete, setContactIdToDelete] = useState(null);

  const onDeleteConfirm = async () => {
    const response = await fetch(
      `https://playground.4geeks.com/contact/agendas/bhooker/contacts/${contactIdToDelete}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.ok) {
      actions.getContacts();
      setState({ showModal: false });
      console.log("Contact deleted successfully");
    } else {
      const errorResponse = await response.json();
      console.error('Failed to delete contact:', errorResponse);
    }
    setContactIdToDelete(null); // Reset deletion candidate
  };

  return (
    <div className="container">
      <div>
        <p className="text-right my-3">
          <Link className="btn btn-success" to="/add">
            Add new contact
          </Link>
        </p>
        <div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
          <ul className="list-group pull-down" id="contact-list">
            {store.contacts?.map((contact, index) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                onEdit={() => navigate(`/contacts/${contact.id}`)}
                onDelete={() => {
                  setState({ showModal: true });
                  setContactIdToDelete(contact.id);
                }}
              />
            ))}
          </ul>
        </div>
      </div>
      <Modal
        show={state.showModal}
        onClose={() => setState({ showModal: false })}
        onConfirm={onDeleteConfirm}
      />
    </div>
  );
};
