import ApolloClient, { createNetworkInterface } from 'apollo-client';

const uri = "http://127.0.0.1";
const port = "9000";

export const client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: uri+":"+port+"/api" })
});