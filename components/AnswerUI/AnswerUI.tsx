import React from 'react';

interface TextCompProps {
    answer: string;
    isQuestionFocused: boolean;
}

const AnsweUI: React.FC<TextCompProps> = ({answer, isQuestionFocused }) => {
    return (
        <div className={`border-gray-300 rounded-lg border-2 my-4 transition-all duration-500 ${isQuestionFocused ? 'h-1/5' : 'h-2/5'}`}>
            <div className="items-center mx-1 h-[66%] pr-2 w-full overflow-auto rounded-lg">
            <div className='pb-4'>
                {answer}
            </div>
            </div>
        </div>
    );
};

export default AnsweUI;