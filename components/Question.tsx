'use client'
import React, { useState } from 'react';
import QuestionForm from './QuestionForm';

export default function Question() {
  const [question, setQuestion] = useState('');
  const [image, setImage] = useState<File | null>(null);

  return (

    <div className="bg-white p-4 rounded-md w-96">
        <QuestionForm onSubmit={(question, image) => {}} />
    </div>

  );
}