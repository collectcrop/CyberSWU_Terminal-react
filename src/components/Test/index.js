import React from 'react';

const Test = () => {
return (
<div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-10 rounded-lg shadow-lg w-80">
        <h1 className="text-3xl font-bold text-center text-blue-500">Tailwind CSS Test</h1>
        <p className="mt-4 text-gray-700">
          This is a test to verify if Tailwind CSS is correctly installed and working.
        </p>
        <button className="mt-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700">
          Click Me
        </button>
        <button title="test"
        className="justify-start text-black bg-blue-500 font-normal w-full overflow-hidden rounded-lg hover:bg-customed-bg-color" >
        test
        </button>
      </div>
    </div>
);
};

export default Test;