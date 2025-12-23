# **App Name**: SwiftConvert

## Core Features:

- File Conversion: Convert files between various formats, including JPG to PDF, PDF to JPG, PDF to Word, Word to PDF, Excel to PDF, PDF to Excel, PNG to PDF, and PDF to PNG.
- PDF Manipulation: Merge, split, and compress PDF files to optimize document management. These operations may incorporate a tool where the system will analyze document properties to ensure best output.
- URL to PDF Conversion: Convert web pages into PDF documents by inputting URLs.
- File Upload: Enable users to upload files via drag and drop or browse functionality, with clear display of file size limits.
- Conversion History: Allow logged-in users to view their conversion history, which can aid them in tracking past activities. Requires Firestore to manage the conversion log per user.
- User Authentication: Implement optional user login/signup functionality to allow for conversion history and increased file size limits.
- Admin Panel: Provide an admin panel to enable/disable tools, set file size limits, view total conversions, and manage users.

## Style Guidelines:

- Primary color: Dark purple (#6246EA) to evoke a sense of professionalism, combined with modernity.
- Background color: Light gray (#E8E8F0), visibly purple but extremely desaturated, offering a neutral backdrop.
- Accent color: Lavender (#B19CD9), an analogous color to the primary purple, with higher brightness for interactive elements.
- Body and headline font: 'Inter' for a modern, machined aesthetic.  
- Grid-style tool selection on the home page, similar to iLovePDF, for intuitive navigation.
- Use clean and recognizable icons for each tool to enhance usability.
- Subtle progress loader animations during file conversion to provide user feedback.