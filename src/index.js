import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { schema, resolvers } from './graphql';
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const app = express();

app.use(cors());

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

var firebaseConfig = {
  apiKey: "AIzaSyDyhc5laV1rfcMV526XpdEsQ6dKIkzOYjQ",
  authDomain: "metric-f1cb5.firebaseapp.com",
  databaseURL: "https://metric-f1cb5.firebaseio.com/",
};

// Initialize Firebase
const firebaseObj = firebase.initializeApp(firebaseConfig);

server.applyMiddleware({ app, path: '/graphql' });
app.listen({ port: 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
});

export default firebaseObj;