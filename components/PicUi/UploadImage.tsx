import React, { useState } from 'react';
import readPic from './readPic';

interface UploadImageProps {
    setQuestion: (question: string) => void;
}

export const UploadImage: React.FC<UploadImageProps> = ({setQuestion}) => {
    const [src, setSrc] = useState("");

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            let file = e.target.files[0]

            if (!file) return
    
            if (!(file.type.startsWith('image/'))) {
                e.target.value = ''
                return
            }

            const reader = new FileReader();  
            reader.onload = function (upload: ProgressEvent<FileReader>) {
                setSrc(upload?.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return(
        <div className= 'flex flex-row gap-2 h-[33%]'>
            <div className='w-[57%]'>
                <div className="flex items-center space-x-2">
                    <input
                    id="imageFile"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="p-1 border border-gray-300 border-l-0 border-t-0 rounded-md focus:outline-none focus:ring-blue-500 focus:ring-opacity-50"
                    />
                </div>

                <button
                    onClick={() => readPic(src, setQuestion)}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none mt-2 mb-1 focus:ring-blue-600"
                    >
                    Get Text inside Image
                </button>
            </div>

            <div className='w-[42%] border border-gray-300 border-r-0 border-t-0 rounded-md'>
                {src && <img src={src} alt="Uploaded Preview" className="h-full object-contain mx-auto my-auto" />}
            </div>

        </div>
    )
}

export default UploadImage;