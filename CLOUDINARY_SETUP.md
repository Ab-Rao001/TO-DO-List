# Cloudinary Integration Setup Guide

## 🎯 What's Been Added to Your Task Board

### 1. **Profile Section** 👤
- User profile with avatar, name, email, and bio
- Edit profile with image upload
- Profile information displays on task cards
- Profile data persists in localStorage

### 2. **Task Images** 📷
- Upload images when creating tasks
- Images display on task cards
- Cloudinary-powered image optimization
- Remove image capability

### 3. **Cloudinary Configuration**
- Cloud Name: `dgsmr8olx`
- API Key: `545341736783529`
- Upload Preset: `task_upload` (needs to be created)

## ⚙️ Initial Setup Steps

### Step 1: Create Cloudinary Upload Preset
1. Go to https://cloudinary.com/console/settings/upload
2. Scroll to "Upload presets"
3. Click "Create unsigned upload preset"
4. Name it: `task_upload`
5. Mode: Unsigned
6. Save

### Step 2: Add API Secret (Optional)
For server-side operations, add your API secret to `src/utils/cloudinaryConfig.js`:

```javascript
api_secret: 'your_api_secret_here'
```

⚠️ **WARNING**: Never commit your API secret to version control!

## 📁 New Files Created

- `src/context/ProfileContext.jsx` - Profile state management
- `src/components/Profile.jsx` - Profile display and editing component
- `src/utils/cloudinaryConfig.js` - Cloudinary configuration
- `src/styles/Profile.css` - Profile styling

## 🔧 Updated Files

- `src/App.jsx` - Added Profile provider and profile toggle button
- `src/components/TaskCard.jsx` - Added profile and image display
- `src/components/AddTask.jsx` - Added image upload functionality
- `src/index.css` - Added styles for image upload and profile on cards
- `src/main.jsx` - Imported Profile CSS

## 🚀 How to Use

### Creating a Task with Image
1. Click "Add Task Image" button
2. Select an image file
3. Wait for upload confirmation (✓ Image Selected)
4. Fill in task details
5. Click "Add Task"

### Editing Profile
1. Click "👤 Profile" button in header
2. Click "Edit Profile"
3. Upload a new avatar or modify details
4. Click "Save Profile"

### Features
- **Responsive Design**: Works on all screen sizes
- **Dark Mode Support**: Automatically adapts to theme
- **Image Optimization**: Cloudinary handles format and quality
- **Local Storage**: Profile data persists between sessions

## 📝 Cloudinary API

### Upload Image
```javascript
const response = await fetch(
  `https://api.cloudinary.com/v1_1/dgsmr8olx/image/upload`,
  {
    method: 'POST',
    body: formData,
  }
);
const data = await response.json();
console.log(data.secure_url); // Get optimized image URL
```

### Transform Images
```javascript
// Add ?w=300&h=300&c=fill to URL for thumbnail
https://res.cloudinary.com/dgsmr8olx/image/upload/w_300,h_300,c_fill/public_id
```

## ✅ Verification Checklist

- [ ] npm install completed successfully
- [ ] Cloudinary upload preset created
- [ ] App loads without errors
- [ ] Can add tasks with images
- [ ] Profile can be edited
- [ ] Images appear on task cards
- [ ] Profile info displays on cards

## 🐛 Troubleshooting

### Images not uploading
- Check upload preset is named `task_upload`
- Verify cloud name is `dgsmr8olx`
- Check browser console for error messages

### Profile not showing
- Clear browser cache
- Check localStorage is enabled
- Verify ProfileProvider wraps components

### Styling issues
- Hard refresh browser (Ctrl+Shift+R)
- Check that Profile.css is imported
- Verify theme is properly set

---

**Enjoy your enhanced task board! 🎉**
