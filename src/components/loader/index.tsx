import React from 'react';

const Loader = () => {
  return (
    <div>
      <div className="pn:mb-8 pn:h-8 mb-5 h-6 rounded bg-[#6066D0B2] animate-pulse"></div>
      <div>
        {Array.from({ length: 4 }).map((a, i) => {
          return <div key={`answer-${i}`} className="pn:mb-6 pn:h-14 mb-4 h-9 rounded-lg bg-[#6066D0B2] animate-pulse"></div>;
        })}
      </div>
      <div className="flex justify-end">
        <div className="pn:w-28 w-20 pn:h-14 h-9 rounded-lg bg-[#6066D0B2] animate-pulse"></div>
      </div>
    </div>
  );
};

export default Loader;
