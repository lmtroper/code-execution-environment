"use client"

import React, { useState } from 'react';
import CodeMirrorEditor from '@/components/CodeMirrorEditor';
import InfoPanel from '@/components/InfoPanel';
import CodeOutput from '@/components/CodeOutput';

export default function Home() {
  const [code, setCode] = useState<string>('print("Hello, Datacurve!")');
  const [output, setOutput] = useState<string>('');

  const handleCodeOutput = (output: string) => {
    setOutput(output);
  };

  return (
    <main className="flex min-h-screen justify-evenly p-24">
      <div className="flex w-full">
        <div className="w-1/3">
          <InfoPanel />
        </div>
        <div className="w-2/3">
          <CodeMirrorEditor onCodeChange={setCode} />
          <CodeOutput code={code} output={output} onCodeOutput={handleCodeOutput} />
        </div>
      </div>
    </main>
  );
}
