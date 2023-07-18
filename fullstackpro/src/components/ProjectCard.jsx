import "./ProjectCard.css";

const ProjectCard = ({ project }) => {
  return (
    <>
      <div className="project_details">
        <div className="project_card">
          <div className="project_list">
            <h4>{project.name}</h4>
          </div>
          <div className="project_status">
            <p>
              Status:<strong>{project.status}</strong>
            </p>
          </div>
        </div>
        <a href={`/projects/${project.id}`}>view</a>
      </div>
    </>
  );
};
export default ProjectCard;
