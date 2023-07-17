const ClientInfo = ({ client }) => {
  return (
    <>
      <div className="client_info">
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
