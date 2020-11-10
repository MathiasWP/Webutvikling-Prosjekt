import React, { useEffect, useState } from 'react';

import './Loading.scss';

type LoadingProps = {label?: string }


function Loading({label}:LoadingProps) {

  return (
      <div id="loading-wrapper">
          {label && <h5>{label}</h5>}
          <div id="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
      </div>
  );
}

export default Loading;
