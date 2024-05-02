import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export const AddContact = () => {
  const params = useParams();
  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch contact details only if there's a contactId and it's for editing
    if (params.contactId) {
      fetch(`https://playground.4geeks.com/contact/agendas/bhooker/contacts/${params.contactId}`, {
        headers: { "Content-Type": "application/json" },
        method: "GET"  // Make sure the method is GET if fetching data
      })
      .then(response => response.json())
      .then(data => {
        setNewContact({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || ""
        });
      })
      .catch(error => console.error('Error fetching contact:', error));
    }
  }, [params.contactId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    const url = params.contactId
      ? `https://playground.4geeks.com/contact/agendas/bhooker/contacts/${params.contactId}`
      : `https://playground.4geeks.com/contact/agendas/bhooker/contacts`;
    const method = params.contactId ? "PUT" : "POST";

    const response = await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newContact),
    });

    if (response.ok) {
      navigate("/contacts/");
    } else {
      const errorResponse = await response.json();
      console.error('Failed to submit contact:', errorResponse);
    }
  };

  return (
    <div className="container">
      <div>
        <h1 className="text-center mt-5">{params.contactId ? "Edit Contact" : "Add a New Contact"}</h1>
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" className="form-control" placeholder="Full Name" name="name" value={newContact.name} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" className="form-control" placeholder="Enter email" name="email" value={newContact.email} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input type="phone" className="form-control" placeholder="Enter phone" name="phone" value={newContact.phone} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input type="text" className="form-control" placeholder="Enter address" name="address" value={newContact.address} onChange={handleInputChange} />
          </div>
          <button type="submit" className="btn btn-primary form-control">
            Save
          </button>
          <Link className="mt-3 w-100 text-center" to="/contacts">or get back to contacts</Link>
        </form>
      </div>
    </div>
  );
};
