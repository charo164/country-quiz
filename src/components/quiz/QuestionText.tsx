import React, { FC } from 'react';
import { AppContextType } from 'types/index';

const QuestionText: FC<{ app: AppContextType }> = ({ app }) => {
  const load = () => {
    app.dispatch({ type: 'setLoadImg', value: false });
  };
  const isLoadImg = app.state.question.img && app.state.loadImg;

  return (
    <h2 className="relative 1xl:text-2xl text-xl text-[#2F527B] font-bold 1xl:mb-9 mb-5 mt-2">
      {app?.state.question.img && (
        <div
          key={app?.state.question.img}
          style={{ backgroundColor: isLoadImg ? '#2F527B' : '' }}
          className={`absolute 1xl:w-[74px] w-16 h-8 ${isLoadImg ? 'animate-pulse' : ''} top-0 left-0 transform translate-y-[-110%]`}
        >
          <img onLoad={load} src={app.state.question.img} className="text-xs overflow-hidden 1xl:w-[74px] w-16 h-8" alt="country-flag" />
        </div>
      )}
      <div>{app?.state.question.text}</div>
    </h2>
  );
};

export default QuestionText;
