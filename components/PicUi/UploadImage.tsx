import React, { useState } from 'react';
import readPic from './readPic';

interface UploadImageProps {
    setQuestion: (question: string) => void;
}

export const UploadImage: React.FC<UploadImageProps> = ({setQuestion}) => {
    const [src, setSrc] = useState("");
    const [loading, setLoading] = useState(false);

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

    const handleButtonClick = async () => {
        setLoading(true);
        await readPic(src, setQuestion);
        setLoading(false);
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
                    className="p-1 w-full border border-gray-300 border-l-0 rounded-md focus:outline-none focus:ring-blue-500 focus:ring-opacity-50"
                    />
                </div>

                <div className="flex items-center space-x-2">
                    <button
                        onClick={handleButtonClick}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none mt-2 focus:ring-blue-600"
                        >
                        Get Text inside Image
                    </button>
                    {loading && (
                        <div className="flex justify-center items-center mt-2">
                            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6"></div>
                        </div>
                    )}
                </div>
             
            </div>

            <div className='w-[42%] border border-gray-300 border-r-0 rounded-md'>
                {src && <img src={src} alt="Uploaded Preview" className="h-full object-contain mx-auto my-auto" />}
            </div>

        </div>
    )
}

export default UploadImage;