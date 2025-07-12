import multer from 'multer';
import supabase from '../SupabaseClient/client.js';
import { userOperations } from '../SupabaseClient/operations.js';

// Configure multer for memory storage
export const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        // Only allow image files
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

// Upload avatar to Supabase Storage and update database
export const uploadAvatar = async (userId, file) => {
    try {
        if (!file) {
            throw new Error('No file provided');
        }

        // Create a unique filename
        const filename = `${userId}_${Date.now()}_${file.originalname}`;
        const filePath = `avatars/${filename}`;

        // Upload the file to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(filePath, file.buffer, {
                contentType: file.mimetype,
                upsert: false
            });

        if (uploadError) {
            throw uploadError;
        }

        // Get the public URL
        const { data: urlData } = supabase.storage
            .from('avatars')
            .getPublicUrl(filePath);

        const avatarUrl = urlData.publicUrl;

        // Update the user's avatar in the database
        const updatedUser = await userOperations.updateUser(userId, { avatar: avatarUrl });

        if (!updatedUser) {
            throw new Error('User not found');
        }

        return {
            success: true,
            avatarUrl: avatarUrl,
            user: updatedUser
        };

    } catch (error) {
        console.error('Error uploading avatar:', error);
        throw error;
    }
};

// Delete old avatar from Supabase Storage (optional cleanup)
export const deleteAvatar = async (avatarUrl) => {
    try {
        if (!avatarUrl || !avatarUrl.includes('supabase')) {
            return;
        }

        // Extract the file path from the Supabase URL
        const urlParts = avatarUrl.split('/');
        const fileName = urlParts[urlParts.length - 1];
        const filePath = `avatars/${fileName}`;

        // Delete from Supabase Storage
        const { error } = await supabase.storage
            .from('avatars')
            .remove([filePath]);

        if (error) {
            console.error('Error deleting avatar from storage:', error);
        }
    } catch (error) {
        console.error('Error deleting old avatar:', error);
        // Don't throw error for cleanup operations
    }
};
