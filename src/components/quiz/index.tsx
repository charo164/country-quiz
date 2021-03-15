import React, { useContext, useEffect } from "react";
import { AppContext } from "../../reducer/provider";
import Results from "../results";
import Question from "../question";

const Quiz: React.FC = () => {
  const app = useContext(AppContext);
  useEffect(() => {
    app?.state.positiveSound?.load();
    app?.state.negativeSound?.load();
    app?.state.winSound?.load();
    // eslint-disable-next-line
  }, []);

  return app?.state.end ? <Results /> : <Question />;
};

export default Quiz;
