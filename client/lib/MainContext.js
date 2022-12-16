import React from 'react';

const UserContext = React.createContext();

const UserProvider = UserContext.Provider;
const UserConsumer = UserContext.Consumer;

const AuthContext = React.createContext();

const AuthProvider = AuthContext.Provider;
// const AuthConsumer = AuthContext.Consumer;

export { UserProvider, UserConsumer, UserContext, AuthContext, AuthProvider };
