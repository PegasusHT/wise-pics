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
        <div className= 'my-2'>
            <div className="flex items-center space-x-2">
                <input
                id="imageFile"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:ring-opacity-50"
                />
            </div>

            <button
                onClick={() => readPic(src, setQuestion)}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none mt-2 focus:ring-blue-600"
                >
                Generate Text inside Image
            </button>

        </div>
    )
}

export default UploadImage;