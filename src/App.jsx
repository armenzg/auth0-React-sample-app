import { hot } from 'react-hot-loader';
import React from 'react';
import Auth0Login from './views/Auth0Login';
import './App.css';

const App = () => (<Auth0Login />);

export default hot(module)(App);
