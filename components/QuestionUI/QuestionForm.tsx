'use client'
import React, { useState } from 'react';
import { FiSend } from "react-icons/fi";

interface QuestionFormProps {
  textImg: string;
  setAnswer: (answer: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  isQuestionFocused: boolean;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ textImg, setAnswer, onFocus, onBlur, isQuestionFocused }) => {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);

  const onQuestionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(event.target.value);
  };

  const onSubmit = async (question: string) => {
    try {
      const response = await fetch('/api/askgpt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question, textImg }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      const result = data.answer;
  
      if (result !== null) {
        setAnswer(result);
      } else {
        console.log('chatgpt: ' + result);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    await onSubmit(question); 
    setQuestion(''); 
    onBlur();
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col space-y-2 transition-all duration-500 
      ${isQuestionFocused ? 'h-2/5' : 'h-1/5'}`}
     onFocus={onFocus} onBlur={onBlur}>
      <textarea
        className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:ring-opacity-50 resize-none h-4/5"
        placeholder="Type your question here"
        value={question}
        onChange={onQuestionChange} 
        rows={4}
      />

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 "
      >
        <div className="space-x-2 flex items-center justify-center">
          Submit question 
          <FiSend className="inline-block ml-2 mt-[2px]" />
          {loading && (
            <div className="flex justify-center items-center mt-2">
              <div className="text-white loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-4 w-4 mt-[-5px]"></div>
            </div>
          )}
        </div>
 
      </button>
    </form>
  ); 
};

export default QuestionForm;