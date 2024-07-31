import React from 'react';

interface TextCompProps {
    text: string;
}

const TextComp: React.FC<TextCompProps> = ({text }) => {
    return (
        <div className=" items-center mx-1 h-[66%] pr-2 w-full overflow-auto rounded-lg">
            <div className='pb-4'>
                {text}
            </div>
        </div>
    );
};

export default TextComp;