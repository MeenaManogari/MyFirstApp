import Clients from "../../components/Client";
import AddClients from "../../components/AddClientModal";
import Projects from "../../components/Projects";
import AddProjects from "../AddProjectModal";
const Home = () => {
  return (
    <>
      <div className="add_datas">
        <AddClients />
        <AddProjects />
      </div>
      <Projects />
      <Clients />
    </>
  );
};
export default Home;
