import { checker } from '@/lib';
import React, { FC } from 'react';

import type { AppContextType, Answer as AnswerType } from 'types';

interface AnswerPropsType {
  app: AppContextType;
  answer: AnswerType;
  i: number;
}

const Answer: FC<AnswerPropsType> = ({ app, answer, i }) => {
  return (
    <div
      id={`answer-${i}`}
      onClick={(e) => checker(e, app)}
      className={`answer text-[#6066D0CC] 1xl:text-lg pn:text-base text-sm font-medium hover 1xl:mb-6 1xl:py-[14px] 1xl:px-[18px] pn:mb-5  pn:py-3 pn:px-4 mb-4 py-2 px-3 rounded-lg ring-1 ring-[#6066D0CC] cursor-pointer`}
    >
      {answer.name.split('(')[0]}
    </div>
  );
};

export default Answer;
