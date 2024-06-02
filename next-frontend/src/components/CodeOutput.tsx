'use client';

import React from 'react';
import {
  runCode,
  submitCode,
  fetchSubmissions,
  formatDateString,
} from '@/utils';
import { Modal, Alert } from 'antd';

interface Submission {
  id: number;
  code: string;
  created_at: string;
  output_code: string;
}

interface CodeOutputProps {
  code: string;
  output: string;
  onCodeOutput: (output: string) => void;
}

const CodeOutput: React.FC<CodeOutputProps> = ({
  code,
  output,
  onCodeOutput,
}) => {
  const [successMessage, setSuccessMessage] = React.useState<string | null>(
    null
  ); // Success message
  const [error, setError] = React.useState<string | null>(null); // Error with outputing code
  const [modalVisible, setModalVisible] = React.useState(false); // Modal for past submissions
  const [submissions, setSubmissions] = React.useState<Submission[]>([]);

  const handleTestCode = async () => {
    setSuccessMessage(null);
    setError(null);

    try {
      const output = await runCode(code);
      if (typeof output === 'string') {
        onCodeOutput(output);
        return true; // Indicate success
      } else {
        setError('There was an error testing your code.');
        return false; // Indicate failure
      }
    } catch (error) {
      setError('There was an error testing your code.');
      return false; // Indicate failure
    }
  };

  const handleSubmitCode = async () => {
    try {
      setError(null); // Reset error state

      const testSuccess = await handleTestCode();
      if (!testSuccess) {
        return;
      }

      setSuccessMessage(null);
      const output = await submitCode(code);
      setTimeout(() => setSuccessMessage('Code submitted successfully!'), 300);
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (error: any) {
      setError(
        error.response?.data?.detail ||
          'There was an error submitting your code.'
      );
    }
  };

  const handleFetchSubmissions = async () => {
    const submissions = await fetchSubmissions();
    if (submissions) {
      setSubmissions(submissions);
      setModalVisible(true);
      console.log('in');
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="bg-gray-100 border rounded-md">
      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          closable
          onClose={() => setError(null)}
        />
      )}
      {successMessage && (
        <Alert
          message={successMessage}
          type="success"
          showIcon
          closable
          onClose={() => setSuccessMessage(null)}
        />
      )}
      <div className="p-4 flex justify-between items-center">
        <div>
          <button
            className="px-9 py-4 rounded-md border border-gray-500  hover:bg-slate-200"
            onClick={handleFetchSubmissions}
          >
            Submissions
          </button>
          <Modal
            title="Past Submissions"
            open={modalVisible}
            onCancel={closeModal}
            footer={null}
          >
            <div className="h-96 overflow-y-auto flex-col-reverse">
              {submissions.map((submission) => (
                <div
                  key={submission.id}
                  className="mt-2 p-2 border-b border-gray-300 flex items-center justify-between"
                >
                  <div className="flex-col w-full">
                    <div className="flex justify-between">
                      <div className="w-5/6 overflow-x-auto p-2">
                        <h4 className="font-bold">Code:</h4>
                        <pre className="text-sm">{submission.code}</pre>
                      </div>
                      <div className="ml-5">
                        <span>{formatDateString(submission.created_at)}</span>
                      </div>
                    </div>
                    <div className="w-1/2 overflow-x-auto p-2">
                      <h4 className="font-bold">Output:</h4>
                      <pre className="text-sm">{submission.output_code}</pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Modal>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-slate-300 px-7 py-4 mr-6 rounded-md hover:bg-slate-400"
            onClick={handleTestCode}
          >
            Test Code
          </button>
          <button
            className="bg-slate-500 px-9 py-4 rounded-md hover:bg-slate-600"
            onClick={handleSubmitCode}
          >
            Submit
          </button>
        </div>
      </div>
      {output !== '' && (
        <pre className={'rounded-b-md p-4 whitespace-pre-wrap bg-white'}>
          <h2>
            <b>Output:</b>
          </h2>
          <br />
          {output}
        </pre>
      )}
    </div>
  );
};

export default CodeOutput;
