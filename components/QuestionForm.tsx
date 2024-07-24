'use client'
import React, { useState } from 'react';
import { Buffer } from "buffer";
globalThis.Buffer = Buffer;

interface QuestionFormProps {
  onSubmit: (question: string, image: File | null) => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ onSubmit }) => {
  const [question, setQuestion] = useState('');
  const [imageFile, setImageFile] = useState();
  const [src, setSrc] = useState("");

  const onQuestionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(event.target.value);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
			let file = e.target.files[0]

			if (!file) {
				return
			}

			// check if the uploaded file is an image
      if (!(file.type.startsWith('image/'))) {
        e.target.value = ''
        return
      }

      // const formData = new FormData();
      // formData.append('image', file);
      // readPic(file);
      const reader = new FileReader();  
      reader.onload = function (upload: ProgressEvent<FileReader>) {
        setSrc(upload?.target?.result as string);
      };
      reader.readAsDataURL(file);
      console.log('src: '+src)
      readPicture(src) ;
		}
  };

  const readPic = async (file: any) => {
    try {
      const response = await fetch('/api/process', {
        method: 'POST',
        body: file,
      });
      const result = await response.json();
      setQuestion(result)
      console.log(result);
    } catch (error) {
      console.log('Error', error);
    }
  }

  const readPicture = async (image: string) => {
    // convert image to byte Uint8Array base 64
    const blob = Buffer.from(image.split(',')[1], 'base64');
    console.log('blob: '+blob);
    let response = await fetch('/api/process', {
      method: 'POST',
      body: blob,
    })
    
    if(response.ok) {
      let data = await response.json();
      console.log(data);
      setQuestion(data.Blocks);
    } else {
      console.log('Error');
    }

  } 

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