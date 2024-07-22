'use client'
import React, { useState } from 'react';
import { readPic } from '../api/readPic';

interface QuestionFormProps {
  onSubmit: (question: string, image: File | null) => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ onSubmit }) => {
  const [question, setQuestion] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const onQuestionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(event.target.value);
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files.length > 0 ? event.target.files[0] : null;
    setImageFile(file);

    if (file) {
      try {
        const recognizedText = await readPic(file);
        setQuestion(recognizedText); // Update the question state with the recognized text
      } catch (error) {
        console.error("Error recognizing text from image:", error);
        // Optionally, handle the error (e.g., show an error message to the user)
      }
    } else {
      console.error("No image file selected.");
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (question.trim() !== '') { // Ensure question is not just whitespace
      onSubmit(question, imageFile);
      setQuestion(''); // Clear form after submit
      setImageFile(null);
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
      <div className="flex items-center space-x-2">
        <label htmlFor="imageFile" className="text-gray-500">
          Upload image (optional):
        </label>
        <input
          id="imageFile"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:ring-opacity-50"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
      >
        Ask Your Question
      </button>
    </form>
  );
};

export default QuestionForm;