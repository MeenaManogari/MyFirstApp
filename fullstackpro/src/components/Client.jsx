import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../queries/clientQueries";
import ClientRow from "./ClientRow";

const Clients = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong!</p>;

  return (
    <>
      <div className="client_main">
        {!loading && !error && (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.clients.map((client) => (
                <ClientRow key={client.id} client={client} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};
export default Clients;
