import React from 'react';

interface TextCompProps {
    answer: string;
}

const AnsweUI: React.FC<TextCompProps> = ({answer }) => {
    return (
        <div className="border-gray-300 rounded-lg border-2 h-2/5 my-4">
            <div className=" items-center mx-1 h-[66%] pr-2 w-full overflow-auto rounded-lg">
                <div className='pb-4'>
                    {answer}
                </div>
            </div>
        </div>
    );
};

export default AnsweUI;