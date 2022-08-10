import React from 'react';

import '../css/Loading.css';

function Loading() {
  return (
    <div>
      <div
        className="spinner-border loading"
        role="status"
        data-testid="loading-spinner"
      />
    </div>
  );
}

export default Loading;
