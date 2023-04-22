/* eslint-disable prettier/prettier */
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ element, isLoggedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      element={
        isLoggedIn ? (
          element
        ) : (
          <Navigate to="/login" replace state={{ from: rest.path }} />
        )
      }
    />
  );
};

ProtectedRoute.propTypes = {
  element: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  isLoggedIn: PropTypes.bool,
};

ProtectedRoute.defaultProps = {
  element: null,
  isLoggedIn: false,
};

export default ProtectedRoute;
