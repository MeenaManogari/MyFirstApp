import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../../queries/projectQueries";
import ClientInfo from "../ClientInfo";
import DeleteProject from "../DeleteProject";
import EditProject from "../EditProjectForm";
import { FaBackward } from "react-icons/fa";
import "./Project.css";

const Project = () => {
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_PROJECT, { variables: { id } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong!</p>;

  return (
    <>
      {!loading && !error && (
        <div className="project_page">
          <div className="Single_Project">
            <div className="project_title">
              <h3>{data.project.name}</h3>
              <Link to="/">
                <FaBackward />
              </Link>
            </div>
            <div className="project_info">
              <p>{data.project.description}</p>

              <h5>Project Status:</h5>
              <p>{data.project.status}</p>
            </div>

            <ClientInfo client={data.project.client} />

            <EditProject project={data.project} />

            <DeleteProject projectId={data.project.id} />
          </div>
        </div>
      )}
    </>
  );
};
export default Project;
