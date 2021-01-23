import React from "react";
import "./loader.scss";

export default function Loader() {
  return (
    <>
      <section className="fake">
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </section>
    </>
  );
}
