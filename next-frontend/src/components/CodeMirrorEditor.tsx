'use client';

import React from 'react';
import CodeMirror, { ViewUpdate } from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';

export default function Editor() {
  const [value, setValue] = React.useState<string>('print("Hello, Datacurve!")');

  const onChange = React.useCallback((input: string, viewUpdate: ViewUpdate) => {
    setValue(input);
  }, []);

  const testCode = () => {
    console.log(value);
  }

  return (
    <div className='flex-col'>
      <CodeMirror value={value} theme="dark" width="500px" height="500px" onChange={onChange} extensions={[python()]}/>
      <button className='bg-slate-500 p-4 mt-4 rounded-md' onClick={testCode}>Test</button>
    </div>
  );
}
