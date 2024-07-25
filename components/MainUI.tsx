'use client'
import React, { useState } from 'react';
import QuestionForm from './QuestionForm';
import PicUI from './PicUi/PicUI';

export default function MainUI() {
  const [question, setQuestion] = useState('');
  const [image, setImage] = useState<File | null>(null);

  return (
    <div className="bg-white p-4 rounded-md mx-5 w-screen h-full flex flex-col justify-between">
        <PicUI />
        <QuestionForm onSubmit={(question, image) => {}} />
    </div>

  );
}