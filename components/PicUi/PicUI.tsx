import React, { useState } from 'react';
import UploadImage from './UploadImage';
import TextComp from './textComponent';

export const PicUI: React.FC = () => {
    const [text, setText] = useState("");

    return(
        <div className='border-gray-300 border-2 h-2/5'>
            <TextComp text={text}/>
            <UploadImage setQuestion={setText}/>
        </div>
    )
}

export default PicUI;