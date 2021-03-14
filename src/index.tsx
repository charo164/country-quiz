import React from "react";
import topbar from "topbar";
import ReactDOM from "react-dom";
import App from "./App";

topbar.config({
  autoRun: true,
  barThickness: 3,
  barColors: {
    0: "#f9a826",
  },
  shadowBlur: 10,
  shadowColor: "rgba(0,   0,   0,   .6)",
});

ReactDOM.render(<App />, document.getElementById("root"));
