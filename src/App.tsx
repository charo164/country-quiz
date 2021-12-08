import './App.css';

import Loader from '@/components/loader';
import Question from '@/components/quiz';
import Results from '@/components/results';
import Layout from '@/layouts';
import { fetchCountries, selectCountries } from '@/lib';
import { AppContext } from '@/reducer/provider';
import React, { useContext, useEffect, useState } from 'react';
import topbar from 'topbar';

const App: React.FC = () => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);
  const app = useContext(AppContext);
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    fetchCountries()
      .then((data) => {
        app?.dispatch({ type: 'setCountries', value: data });
        if (app) selectCountries(data, app);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setHasError(true);
        setIsLoading(false);
        topbar.hide();
      });
    app?.state.positiveSound?.load();
    app?.state.negativeSound?.load();
    app?.state.winSound?.load();
  }, [refresh]);

  return (
    <Layout>
      {isLoading && <Loader />}
      {hasError && (
        <div className="flex flex-col items-center">
          <h2 className="text-5xl text-center text-red-400 font-bold mb-16">😅 Oops error!</h2>
          <button
            className="text-lg font-medium py-[18px] px-[68px] transition-all duration-150 rounded-xl ring-1  bg-[#1D355D] text-white"
            onClick={() => {
              setRefresh(refresh + 1);
            }}
          >
            Try again
          </button>
        </div>
      )}
      {!isLoading && !hasError && (
        <>
          {app?.state.page === 'result' && <Results />}
          {app?.state.page === 'quiz' && <Question />}
        </>
      )}
    </Layout>
  );
};

export default App;
