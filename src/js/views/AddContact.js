import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export const AddContact = () => {
  const params = useParams();
  useEffect(() => {
    if ("contactId" in params) {
      console.log(params.contactId);
      fetch(
        `https://playground.4geeks.com/apis/fake/contact/${params.contactId}`
      )
        .then((response) => response.json())
        .then((body) => setNewContact(body[0]));
    }
  }, []);
  const navigate = useNavigate();
  //Function to add new items
  const [newContact, setNewContact] = useState({});
  const updateContact = async () => {
    const response = await fetch(
      `https://playground.4geeks.com/apis/fake/contact/${params.contactId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newContact,
          agenda_slug: "my_super_agenda",
        }),
      }
    );
    if (response.ok) {
      navigate("/contacts/");
    }
  };
  const createContact = async () => {
    const response = await fetch(
      "https://playground.4geeks.com/apis/fake/contact",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newContact,
          agenda_slug: "my_super_agenda",
        }),
      }
    );
    if (response.ok) {
      navigate("/contacts/");
    }
  };

  return (
    <div className="container">
      <div>
        <h1 className="text-center mt-5">Add a new contact</h1>
        <form>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Full Name"
              //add
              value={newContact?.full_name || ""}
              onChange={(e) =>
                setNewContact((previousNewContact) => {
                  return {
                    ...previousNewContact,
                    full_name: e.target.value,
                  };
                })
              }
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              //add
              value={newContact?.email || ""}
              onChange={(e) =>
                setNewContact((previousNewContact) => {
                  return {
                    ...previousNewContact,
                    email: e.target.value,
                  };
                })
              }
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="phone"
              className="form-control"
              placeholder="Enter phone"
              //add
              value={newContact?.phone || ""}
              onChange={(e) =>
                setNewContact((previousNewContact) => {
                  return {
                    ...previousNewContact,
                    phone: e.target.value,
                  };
                })
              }
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter address"
              value={newContact?.address || ""}
              onChange={(e) =>
                setNewContact((previousNewContact) => {
                  return {
                    ...previousNewContact,
                    address: e.target.value,
                  };
                })
              }
            />
          </div>
          <button
            onClick={() => {
              if ("contactId" in params) {
                updateContact();
              } else {
                createContact();
              }
            }}
            type="button"
            className="btn btn-primary form-control"
          >
            save
          </button>
          <Link className="mt-3 w-100 text-center" to="/">
            or get back to contacts
          </Link>
        </form>
      </div>
    </div>
  );
};
