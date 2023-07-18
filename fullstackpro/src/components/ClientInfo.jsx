import "./Pages/Project.css";

const ClientInfo = ({ client }) => {
  return (
    <>
      <div className="client_info">
        <h4>Client Details</h4>
        <ul>
          <li>{client.name}</li>
          <li> {client.email}</li>
          <li>{client.phone}</li>
        </ul>
      </div>
    </>
  );
};
export default ClientInfo;
