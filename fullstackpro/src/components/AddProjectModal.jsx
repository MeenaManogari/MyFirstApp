import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { BiSolidLayerPlus } from "react-icons/bi";
import { ADD_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECTS } from "../queries/projectQueries";
import { GET_CLIENTS } from "../queries/clientQueries";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "./modal.css";

const AddProjects = () => {
  const [projectPopup, setProjectPopup] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("new");
  const [clientId, setClientID] = useState("");

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, clientId, status },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });

  //Get clients for select
  const { loading, error, data } = useQuery(GET_CLIENTS);

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(name, email, phone);
    if (name === "" || description === "" || status === "") {
      return alert("please fill in all fields");
    }

    addProject(name, description, clientId, status);

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
          <div className="project_form_main">
            <button className="add_project" onClick={handleClickOpen}>
              <BiSolidLayerPlus> </BiSolidLayerPlus>New Project
            </button>

            {projectPopup ? (
              <div className="form_bg">
                <div className="project_form">
                  <div className="project-header">
                    <h3>ADD Project</h3>
                    <button className="close_btn" onClick={handleClickClose}>
                      <AiOutlineCloseCircle />
                    </button>
                  </div>

                  <div className="project_entry">
                    <form onSubmit={onSubmit}>
                      <div className="project_fields">
                        <label>Name</label>
                        <input
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="project_fields">
                        <label>Description</label>
                        <textarea
                          id="description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                      </div>
                      <div className="project_fields">
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
                      <div className="project_id">
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
