import React, { FC } from 'react';

const Layout: FC = ({ children }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen p-2 bg-[#6066D0B2]">
      <div className="flex flex-col flex-auto justify-center w-full 1xl:max-w-[464px] max-w-md">
        <h1 className="1xl:text-4xl pn:text-3xl text-2xl text-white font-bold mb-3">COUNTRY QUIZ</h1>
        <div className="relative 1xl:px-8 1xl:pb-10 1xl:pt-16 px-6 pb-8 pt-14 bg-white rounded-3xl">{children}</div>
      </div>
      <div className="text-white pn:text-sm text-xs font-normal py-6 items-end">
        created by{' '}
        <a rel="noreferrer" className="font-bold capitalize" href="https://github.com/charo164" target="_blank">
          charo164
        </a>{' '}
        -{' '}
        <a href="https://DevChallenges.io" target="_blank" rel="noopener noreferrer">
          DevChallenges.io
        </a>
      </div>
    </div>
  );
};

export default Layout;
