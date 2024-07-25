'use client'
import React, { useState } from 'react';
import { FiSend } from "react-icons/fi";

interface QuestionFormProps {
  onSubmit: (question: string, image: File | null) => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ onSubmit }) => {
  const [question, setQuestion] = useState('');

  const onQuestionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (question.trim() !== '') { // Ensure question is not just whitespace
      setQuestion(''); // Clear form after submit
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <textarea
        className="p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:ring-opacity-50 resize-none"
        placeholder="Type your question here"
        value={question}
        onChange={onQuestionChange} // Fixed missing onChange handler for question
        rows={4} // Specify rows to control the height of the textarea
      />

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
      >
        <FiSend className="inline-block" />
      </button>

    </form>
  );
};

export default QuestionForm;