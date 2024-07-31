'use client'
import React, { useState } from 'react';
import QuestionForm from './QuestionUI/QuestionForm';
import PicUI from './PicUi/PicUI';
import AnswerUI from './AnswerUI/AnswerUI';

export default function MainUI() {
  const [textImg, setTextImg] = useState('');
  const [answer, setAnswer] = useState('');

  return (
    <div className="bg-white p-3 mx-2 w-screen lg:w-[60rem] h-full flex flex-col justify-center">
        <PicUI textImg={textImg} setTextImg={setTextImg}/>
        
        <AnswerUI answer={answer}/>

        <QuestionForm textImg={textImg} setAnswer={setAnswer}/>
    </div>

  );
}