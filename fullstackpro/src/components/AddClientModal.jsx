import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";

const AddClients = () => {
  const [clientPopup, setClientPopup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });

      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, addClient] },
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(name, email, phone);
    if (name === "" || email === "" || phone === "") {
      return alert("please fill in all fields");
    }
    addClient(name, email, phone);
    setName("");
    setEmail("");
    setPhone("");
  };

  const handleClickOpen = () => {
    setClientPopup(!clientPopup);
  };

  const handleClickClose = () => {
    setClientPopup(false);
  };

  return (
    <div className="client_form_main">
      <button className="add_clients" onClick={handleClickOpen}>
        Add Clients
      </button>

      {clientPopup ? (
        <div className="client_form">
          <div className="client-header">
            <h3>ADD CLIENT</h3>
            <button className="close_btn" onClick={handleClickClose}>
              close
            </button>
          </div>

          <div className="client_entry">
            <form onSubmit={onSubmit}>
              <div className="client_fields">
                <label>Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="client_fields">
                <label>Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="client_fields">
                <label>Phone</label>
                <input
                  type="text"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <button type="submit">Add</button>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default AddClients;
