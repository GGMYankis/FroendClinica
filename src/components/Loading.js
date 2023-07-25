import React from "react";
import { Spinner } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

import { BallTriangle, Circles } from "react-loader-spinner";

export function Loading() {
  return (
    <div className="divPadre">
      <div className="divHijo">
        <Spinner color="#0b2f57" />
      </div>
    </div>
  );
}

export function LoaLogin() {
  return <div className="divPadre"></div>;
}

export function LoaAll() {
  return (
    <div className="divPadreAll">
      <div className="divHijo">
        <BallTriangle
          height="100"
          width="100"
          color="orange"
          ariaLabel="Loading"
        />
      </div>
    </div>
  );
}
