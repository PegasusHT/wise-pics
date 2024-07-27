'use client'
import React, { useState } from 'react';
import { FiSend } from "react-icons/fi";

interface QuestionFormProps {
  textImg: string;
  setAnswer: (answer: string) => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ textImg, setAnswer }) => {
  const [question, setQuestion] = useState('');

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (question.trim() !== '') { 
      const questionText = 'Based on the text inside the image: ' + textImg + '\n' + question;
      onSubmit(questionText); 
      setQuestion(''); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <textarea
        className="p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:ring-opacity-50 resize-none"
        placeholder="Type your question here"
        value={question}
        onChange={onQuestionChange} 
        rows={4}
      />

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
      >
        Submit question
        <FiSend className="inline-block" />
      </button>

    </form>
  ); 
};

export default QuestionForm;