import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from "../containers/Login/Login"
import Dashboard from '../containers/Dashboard/Dashboard';
import { getLocalStorageValue } from '../config/localstorage-helper';
import Toast from '../containers/Items/Toast';
import SignUp from '../containers/Login/SignUp';
import Welcome from '../containers/Login/Welcome';

const PrivateRoute = ({ children, redirectTo }) => {
  const auth = getLocalStorageValue("token")
  return auth ? children : <Navigate to={redirectTo} />
}

const Routing = () => (
  <Router>
    <Toast />
    <Routes>
      <Route path="/" caseSensitive={false} element={<Login />} />
      <Route path="/confirm/:confirmationCode" caseSensitive={false} element={< Welcome />} />
      <Route path="/login" caseSensitive={false} element={<SignUp />} />
      <Route path="/dashboard" element={
        <PrivateRoute redirectTo="/login">
          <Dashboard />
        </PrivateRoute>}
      />
      {/* <Route path="/checkout" element={
        <PrivateRoute redirectTo="/login">
          <Checkout />
        </PrivateRoute>}
      /> */}
      {/* <PrivateRoute
        exact
        path="/employer-list"
        component={(props) => <EmployerList {...props} />}
      /> */}
      {/* <Route
        exact
        path="/upload"
        component={(props) => <UploadFromExcel {...props} />}
      /> */}
    </Routes>
  </Router>
);

export default Routing;
