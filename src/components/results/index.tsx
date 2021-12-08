import UndrawWinners from '@/components/svg/UndrawWinners';
import { tryAgain } from '@/lib';
import { AppContext } from '@/reducer/provider';
import React, { useContext } from 'react';

const Results: React.FC = () => {
  const app = useContext(AppContext);
  return (
    <div className="flex flex-col items-center">
      <span className="pn:mb-[72px] mb-16">
        <UndrawWinners className="" />
      </span>
      <h2 className="pn:text-5xl text-2xl text-[#1D355D]">Results</h2>
      <p className="text-lg text-[#1D355D] font-normal pb:mb-[71px] mb-16">
        You got <b className="pn:text-4xl text-3xl pn:leading-[54px] leading-10 text-[#60bf88]"> {app?.state.correctAnswer} </b> correct answers
      </p>
      <button
        className="text-[#1D355D] pn:text-lg text-base font-medium pn:py-[18px] pn:px-[68px] py-4 px-16 transition-all duration-150 rounded-xl ring-1 ring-[#1D355D] hover:bg-[#1D355D] hover:text-white"
        onClick={() => {
          if (app) tryAgain(app);
        }}
      >
        Try again
      </button>
    </div>
  );
};

export default Results;
