# Auto Emporium - Car Dealership Website

## Project Structure

This project is organized into separate folders for better maintainability and organization:

```
car_website/
├── index.html                 # Main landing page
├── admin/                     # Admin panel files
│   ├── admin.html            # Team management
│   ├── vehicles-admin.html   # Vehicle inventory management
│   └── slides-admin.html     # Homepage slider management
├── user/                      # User-facing pages
│   ├── vehicle-details.html  # Vehicle catalog and search
│   ├── privacy-policy.html   # Privacy policy page
│   └── terms-of-service.html # Terms of service page
├── assets/                    # Static assets
│   ├── css/                  # Stylesheets (future use)
│   ├── js/                   # JavaScript files
│   │   ├── firebase-config.js
│   │   └── temp_script.js
│   ├── images/               # Image assets (future use)
│   └── firestore-rules.txt   # Firebase security rules
└── README.md                 # This file
```

## Pages Overview

### Main Page
- **index.html** - Homepage with hero slider, featured vehicles, team section, and company information

### Admin Panel (`/admin/`)
- **admin.html** - Team member management (CRUD operations)
- **vehicles-admin.html** - Vehicle inventory management with dashboard statistics
- **slides-admin.html** - Homepage slider content management

### User Pages (`/user/`)
- **vehicle-details.html** - Vehicle catalog with search, filtering, and detailed views
- **privacy-policy.html** - Company privacy policy
- **terms-of-service.html** - Terms and conditions

### Assets (`/assets/`)
- **js/firebase-config.js** - Firebase configuration
- **js/temp_script.js** - Utility scripts
- **firestore-rules.txt** - Firebase Firestore security rules

## Features

### Frontend Features
- ✅ Responsive design with Tailwind CSS
- ✅ Dynamic content loading with Firebase Firestore
- ✅ Interactive hero slider with admin management
- ✅ Vehicle search and filtering system
- ✅ Real-time dashboard statistics
- ✅ Form handling for contact and test drives
- ✅ SEO optimization with meta tags and structured data

### Admin Features
- ✅ Team member management (Add, Edit, Delete)
- ✅ Vehicle inventory management with rich details
- ✅ Slider content management with preview
- ✅ Real-time statistics dashboard
- ✅ Cross-admin panel navigation
- ✅ Firebase connection status monitoring

### Technical Features
- ✅ Firebase Firestore integration
- ✅ Comprehensive error handling
- ✅ Fallback systems for offline functionality
- ✅ Real-time data synchronization
- ✅ Responsive and mobile-friendly design

## Access URLs

### Public Pages
- Homepage: `/index.html`
- Vehicle Catalog: `/user/vehicle-details.html`
- Privacy Policy: `/user/privacy-policy.html`
- Terms of Service: `/user/terms-of-service.html`

### Admin Panel
- Team Management: `/admin/admin.html`
- Vehicle Management: `/admin/vehicles-admin.html`
- Slider Management: `/admin/slides-admin.html`

## Firebase Configuration

The project uses Firebase Firestore for data management with the following collections:
- `vehicles` - Vehicle inventory data
- `team` - Team member information
- `slides` - Homepage slider content

## Development Notes

- All file paths have been updated to work with the new folder structure
- Cross-references between files use relative paths (../ for parent directory)
- Firebase configuration is centralized in `/assets/js/firebase-config.js`
- Admin panels include connection status indicators and error handling
- The system works both online (with Firebase) and has fallback functionality

## Getting Started

1. Open `index.html` in a web browser to view the main website
2. Navigate to `/admin/` folder to access admin panels
3. Use the "Initialize Sample Data" buttons to populate with demo content
4. Customize Firebase configuration in `/assets/js/firebase-config.js` if needed

## File Organization Benefits

- **Separation of Concerns**: Admin and user interfaces are clearly separated
- **Maintainability**: Easier to locate and modify specific functionality
- **Scalability**: New features can be easily added to appropriate folders
- **Security**: Admin files are in a separate directory for better access control
- **Asset Management**: Static files are organized in a dedicated assets folder
