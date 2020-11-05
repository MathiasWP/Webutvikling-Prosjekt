import React, { useEffect, useState } from 'react';

import './Loading.scss';

function Loading() {

  return (
      <div id="loading-wrapper">
          <div id="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
      </div>
  );
}

export default Loading;
