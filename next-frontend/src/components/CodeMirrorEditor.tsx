'use client';

import React from 'react';
import CodeMirror, { ViewUpdate } from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import axios from 'axios';

export default function Editor() {
  const [code, setCode] = React.useState<string>('print("Hello, Datacurve!")');

  const onChange = React.useCallback((input: string, viewUpdate: ViewUpdate) => {
    setCode(input);
  }, []);

  async function runCode(code: string): Promise<string | undefined> {
    try {
        const response = await axios.post<{ output: string }>('http://localhost:8000/runcode/', { code });
        console.log(response.data.output);
        return response.data.output;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error:', error.response?.data);
            return error.response?.data;
        } else {
            console.error('Unknown error:', error);
            return undefined;
        }
    }
  }

  return (
    <div className='flex-col'>
      <CodeMirror value={code} theme="dark" width="500px" height="500px" onChange={onChange} extensions={[python()]}/>
      <button className='bg-slate-500 p-4 mt-4 rounded-md' onClick={() => {runCode(code)}}>Test</button>
    </div>
  );
}
