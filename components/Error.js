import React from 'react';

export default function Error() {
  return (
    <div
      className="alert alert-danger d-flex justify-content-center mt-4"
      role="alert"
    >
      Server currently is not responding, please try to connect later
    </div>
  );
}
