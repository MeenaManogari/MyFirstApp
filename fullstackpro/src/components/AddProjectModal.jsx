import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import e from "cors";
import { GET_CLIENTS } from "../queries/clientQueries";

const AddProjects = () => {
  const [projectPopup, setProjectPopup] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("new");
  const [clientId, setClientID] = useState("");

  //Get clients for select
  const { loading, error, data } = useQuery(GET_CLIENTS);

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(name, email, phone);
    if (name === "" || description === "" || status === "") {
      return alert("please fill in all fields");
    }
    addClient(name, email, phone);
    setName("");
    setDescription("");
    setStatus("new");
    setClientID("");
  };

  const handleClickOpen = () => {
    setProjectPopup(!projectPopup);
  };

  const handleClickClose = () => {
    setProjectPopup(false);
  };

  if (loading) return null;
  if (error) return "something went wrong!";

  return (
    <>
      {!loading && !error && (
        <>
          <div className="client_form_main">
            <button className="add_clients" onClick={handleClickOpen}>
              New Project
            </button>

            {projectPopup ? (
              <div className="client_form">
                <div className="client-header">
                  <h3>ADD Project</h3>
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
                      <label>Description</label>
                      <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="client_fields">
                      <label>Status</label>
                      <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="new">Not Started</option>
                        <option value="progress">In Progress</option>
                        <option value="completion">Completed</option>
                      </select>
                    </div>
                    <div className="client_id">
                      <label>ClientID</label>
                      <select
                        id="clientId"
                        value={clientId}
                        onChange={(e) => setClientID(e.target.value)}
                      >
                        <option value="">Select Client</option>
                        {data.clients.map((client) => (
                          <option key={client.id} value={client.id}>
                            {client.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button type="submit">Add</button>
                  </form>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </>
      )}
    </>
  );
};
export default AddProjects;
