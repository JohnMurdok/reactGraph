# React-GraphQL

This is a technical test project with NodeJS Express as server / GraphQL / Mongo and ReactJS / ApolloClient as client.
Enter a link and you can vote/add fav for it 

### Installation

React-GraphQL requires [Node.js](https://nodejs.org/) v6+ to run and MongoDB
Then clone the repository into your computer.

```sh
$ git clone https://github.com/JohnMurdok/reactGraph.git
```
Install the dependencies and devDependencies.

```sh
$ cd reactGraph
//will install both client and server
$ npm run firstInstall 
```

### Start with the application

On reactGraphQL directory:

```sh
$ npm run start
```
Both mongodb, server and client will be launched concurrently.
MongoDB listens port 27017
The server listens port 9000
The client listens port 3000 (for BrowserSync 3001 too)
