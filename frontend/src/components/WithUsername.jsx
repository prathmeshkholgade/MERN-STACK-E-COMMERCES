import React from "react";

// Higher-order component to inject username
const withUsername = (Component, username) => {
  return function WrappedComponent(props) {
    return <Component {...props} username={username} />;
  };
};

export default withUsername;
