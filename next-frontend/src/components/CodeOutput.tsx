import React from 'react';
import { runCode } from '@/utils';

interface CodeOutputProps {
  code: string;
  output: string;
  onCodeOutput: (output: string) => void;
}

const CodeOutput: React.FC<CodeOutputProps> = ({ code, output, onCodeOutput }) => {

  const handleTestCode = async () => {
    const output = await runCode(code);
    if (output) {
      onCodeOutput(output);
    }
  };

  const handleSubmitCode = async () => {
    const output = await runCode(code);
    if (output) {
      onCodeOutput(output);
    }
  };

  return (
    <div className="bg-gray-100 border rounded-md">
      <div className='p-4 flex justify-between items-center'>
        <div>
          <h2 className="text-xl font-bold">Code Output</h2>
        </div>
        <div className='flex justify-end'>
          <button className='bg-slate-500 px-7 py-4 mt-4 mr-6 rounded-md' onClick={handleTestCode}>Test Code</button>
          <button className='bg-slate-500 px-9 py-4 mt-4 rounded-md' onClick={handleSubmitCode}>Submit</button>
        </div>
      </div>
      <pre className="rounded-b-md p-4 whitespace-pre-wrap bg-white">{output}</pre>
    </div>
  );
}

export default CodeOutput;
