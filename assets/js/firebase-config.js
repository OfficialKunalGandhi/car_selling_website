// Firebase Configuration
// Replace these values with your actual Firebase project configuration
// You can find these values in your Firebase Console > Project Settings > General > Your apps

const firebaseConfig = {
 apiKey: "AIzaSyDlRSQJzFqrL-QENTJruiUltcdscOCdGNw",
  authDomain: "gym-app-bd9c1.firebaseapp.com",
  projectId: "gym-app-bd9c1",
  storageBucket: "gym-app-bd9c1.firebasestorage.app",
  messagingSenderId: "417740582785",
  appId: "1:417740582785:web:79815f97de1bda79454280",
  measurementId: "G-T4YJQDXL08"
};

// Firestore Collections Structure:
// 
// Collection: 'team'
// Document structure:
// {
//   name: string (required)
//   position: string (required)
//   email: string (required)
//   phone: string (optional)
//   photo: string (URL, optional)
//   experience: number (years, optional)
//   bio: string (optional)
//   order: number (for display ordering, required)
// }

// How to set up Firebase:
// 1. Go to https://console.firebase.google.com/
// 2. Create a new project or select existing one
// 3. Go to "Firestore Database" and create database
// 4. Set up security rules (for development, you can use test mode)
// 5. Go to Project Settings > General > Your apps
// 6. Add a web app and copy the configuration
// 7. Replace the firebaseConfig above with your actual values
// 8. Update the same configuration in both index.html and admin.html

// Security Rules for Firestore (for development):
// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /{document=**} {
//       allow read, write: if true;
//     }
//   }
// }

// For production, consider implementing proper authentication and more restrictive rules:
// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /team/{teamId} {
//       allow read: if true;
//       allow write: if request.auth != null;
//     }
//   }
// }

export default firebaseConfig;
