import React from "react";
import { Routes, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Pages/Home";
import Project from "./components/Pages/Project";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        Clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        Projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache,
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <div className="parent">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:id" element={<Project />} />
          </Routes>
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
