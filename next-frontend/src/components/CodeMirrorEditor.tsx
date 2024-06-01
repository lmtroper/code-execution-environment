'use client';

import React from 'react';
import CodeMirror, { ViewUpdate } from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';

interface EditorProps {
  onCodeChange: (code: string) => void;
}

const CodeMirrorEditor: React.FC<EditorProps> = ({ onCodeChange }) => {
  const [code, setCode] = React.useState<string>('print("Hello, Datacurve!")');

  const onChange = React.useCallback((input: string, viewUpdate: ViewUpdate) => {
    setCode(input);
    onCodeChange(input);
  }, [onCodeChange]);

  return (
    <div className='flex-col'>
      <CodeMirror value={code} theme="dark" height="500px" onChange={onChange} extensions={[python()]} />
    </div>
  );
}

export default CodeMirrorEditor;
