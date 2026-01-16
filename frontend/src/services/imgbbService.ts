import axios from 'axios';

const IMGBB_API_KEY = '92c4f48b8520017aa469eba82303d7c3';
const IMGBB_UPLOAD_URL = 'https://api.imgbb.com/1/upload';

export interface ImgBBResponse {
    data: {
        id: string;
        url: string;
        display_url: string;
        delete_url: string;
    };
    success: boolean;
}

/**
 * Upload an image to ImgBB
 * @param file - The image file to upload
 * @returns Promise with the uploaded image URL
 */
export async function uploadToImgBB(file: File): Promise<string> {
    try {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('key', IMGBB_API_KEY);

        const response = await axios.post<ImgBBResponse>(IMGBB_UPLOAD_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response.data.success) {
            return response.data.data.display_url;
        } else {
            throw new Error('Failed to upload image to ImgBB');
        }
    } catch (error) {
        console.error('ImgBB upload error:', error);
        throw new Error('Failed to upload image. Please try again.');
    }
}

/**
 * Upload multiple images to ImgBB
 * @param files - Array of image files to upload
 * @returns Promise with array of uploaded image URLs
 */
export async function uploadMultipleToImgBB(files: File[]): Promise<string[]> {
    try {
        const uploadPromises = files.map(file => uploadToImgBB(file));
        return await Promise.all(uploadPromises);
    } catch (error) {
        console.error('Multiple upload error:', error);
        throw new Error('Failed to upload one or more images.');
    }
}
