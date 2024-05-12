// Import necessary modules and controllers
import express from 'express';
import { 
    getUserDetailsByUsername,
    updateUserByUsername,
    deleteUserByUsername, 
    getAllUsersWithDetails,  
    deleteVideoByTitle, 
    updateVideoByTitle, 
    updateBlogByTitle, 
    deleteBlogByTitle, 
    updatePasswordByUsername, 
    updateAdminPasswordByUsername,
    getAllVideos,
    getAllBlogs,
    updateAdminPasswordByName,
    updateUserPasswordByUsername,
    getAllMusic,
    deleteMusicBySongName
} from '../controllers/admin.js';
// import { getUserDetailsByUsername } from '../controllers/adminController.js';

// Create a router instance
const router = express.Router();


// Define route to get user details by username
router.get('/admin/users/:username', getUserDetailsByUsername);

// Define route to update user data by username
router.put('/admin/users/:username', updateUserByUsername);

// Define route to delete user data by username
router.delete('/admin/users/:username', deleteUserByUsername);

// Define route to get all users with related data
router.get('/admin/users', getAllUsersWithDetails);



// // Define route to update user password by username
// router.put('/admin/usersname/:username', updatePasswordByUsername);

// Define route to update user data by username
router.put('/usersname/:username', updatePasswordByUsername);

// Define route to get all videos
router.get('/videos', getAllVideos);

// Define route to get all blogs
router.get('/blogs', getAllBlogs);

// Define route to get all blogs
router.get('/musics', getAllMusic);


//updates videos
// Define route to update a video by its title
router.put('/admin/videos/:title', updateVideoByTitle);

//delete videos in admin parts
// Define route to delete a video by ID
router.delete('/admin/videos/:title', deleteVideoByTitle);


// Define route to update a blog by its title
router.put('/admin/blogs/:title', updateBlogByTitle);

// Define route to delete a blog by its title
router.delete('/admin/blogs/:title', deleteBlogByTitle);

//delete music using music songs
router.delete('/admin/music/:songsname', deleteMusicBySongName);


//admin change password
router.put('/admin/usersname/:username', updateAdminPasswordByUsername);


// Route to update admin password by name
router.put('/:name/update-password', updateAdminPasswordByName);

// Route to update user password by username
router.put('/update-user-password', updateUserPasswordByUsername);


// Export the router
export default router;


