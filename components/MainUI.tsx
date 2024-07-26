'use client'
import React, { useState } from 'react';
import QuestionForm from './QuestionUI/QuestionForm';
import PicUI from './PicUi/PicUI';
import TextComp from './PicUi/textComponent';

export default function MainUI() {
  const [textImg, setTextImg] = useState('');
  const [answer, setAnswer] = useState('');

  return (
    <div className="bg-white p-4 rounded-md mx-5 w-screen h-full flex flex-col justify-between">
        <PicUI textImg={textImg} setTextImg={setTextImg}/>
        
        <div className="border-gray-300 border-2 h-2/5 my-4">
            <TextComp text={answer}/>
        </div>

        <QuestionForm textImg={textImg} setAnswer={setAnswer}/>
    </div>

  );
}