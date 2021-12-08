import UndrawAdventure from '@/components/svg/UndrawAdventure';
import { next } from '@/lib';
import { AppContext } from '@/reducer/provider';
import React, { Fragment, useContext } from 'react';

import Answer from './Answer';
import QuestionText from './QuestionText';

const Question: React.FC = () => {
  const app = useContext(AppContext);

  const fourCountries = app?.state?.fourCountries;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (app) next(app);
  };

  return (
    <Fragment>
      <UndrawAdventure className="absolute top-0 right-0 transform -translate-y-2/3" />
      <form className="question flex flex-col" onSubmit={handleSubmit}>
        {app && (
          <div className="flex-auto">
            <QuestionText app={app} />
            {fourCountries?.map((a, i) => {
              return <Answer app={app} answer={a} i={i} key={`answer-${i}`} />;
            })}
          </div>
        )}
        <div className="flex justify-end">
          <button
            disabled={!app?.state.checked}
            type="submit"
            className="next text-white 1xl:text-lg pn:text-base text-sm font-bold 1xl:px-[37px] 1xl:py-[15px] pn:py-3 pn:px-8 py-2 px-6 rounded-xl bg-[#F9A826] disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default Question;
