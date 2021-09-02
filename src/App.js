import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import PropertysList from "./components/PropertysList";
import EditProperty from "./components/EditProperty";
import CreateProperty from "./components/CreateProperty";
import CreateUser from "./components/CreateUser";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <br />
      <Route exact path="/" component={PropertysList} />
      <Route path="/edit/:id" component={EditProperty} />
      <Route path="/create" component={CreateProperty} />
      <Route path="/user" component={CreateUser} />
    </BrowserRouter>
  );
}

export default App;
