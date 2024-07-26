'use client'
import React, { useState } from 'react';
import { FiSend } from "react-icons/fi";
import OpenAI from "openai";

const key= process.env.NEXT_PUBLIC_CHAT_GPT_KEY || '';
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_CHAT_GPT_KEY, 
  dangerouslyAllowBrowser: true 
});

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
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: question }],
      model: "gpt-3.5-turbo-0125",
    });
    
    const result = completion.choices[0].message.content;
    if (result !== null) {
      setAnswer(result);
    } else {
      console.log('chatgpt: '+ result)
    }
  }  

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (question.trim() !== '') { // Ensure question is not just whitespace
      const questionText = 'Based on the text inside the image: ' + textImg + '\n' + question;
      onSubmit(questionText); 
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
        Submit question
        <FiSend className="inline-block" />
      </button>

    </form>
  ); 
};

export default QuestionForm;