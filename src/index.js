import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./components/App";
import { ApolloClient } from "apollo-boost";
import { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { AUTH_TOKEN } from "./constants";

const httplink = createHttpLink({
  uri: "http://localhost:4000"
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    header: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httplink),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
