import React, { useState } from 'react';
import UploadImage from './UploadImage';
import TextComp from './textComponent';

interface PicUIProps {
    textImg: string;
    setTextImg: (text: string) => void;
}

export const PicUI: React.FC<PicUIProps> = (data) => {
    const {textImg, setTextImg} = data;

    return(
        <div className='border-gray-300 border-2 rounded-lg h-2/5'>
            <TextComp text={textImg}/>
            <UploadImage setQuestion={setTextImg}/>
        </div>
    )
}

export default PicUI;