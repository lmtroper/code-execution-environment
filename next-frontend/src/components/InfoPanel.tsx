// components/InfoPanel.tsx
import React from 'react';

const Explanation: React.FC = () => {
  return (
    <div className="p-4 max-w-sm">
      <h2 className="text-2xl font-bold mb-4">Welcome to my Code Execution Environment</h2>
      <p className="mb-2">
        This website allows you to write and execute Python code directly in the browser.
      </p>
      <p className="mb-2">
        Use the editor on the right to write your Python code. You can test your code by clicking the "Test Code" button.
      </p>
      <p>
        When you are ready, you can submit your code, and it will be validated and saved. Enjoy coding!
      </p>
    </div>
  );
};

export default Explanation;
