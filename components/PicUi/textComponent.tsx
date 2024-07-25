import React from 'react';

interface TextCompProps {
    text: string;
}

const TextComp: React.FC<TextCompProps> = ({text }) => {
    return (
        <div className=" items-center mx-1 h-full w-full overflow-scroll">
            <div className='pb-4'>
                {text}
            </div>
        </div>
    );
};

export default TextComp;