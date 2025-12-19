# 🎬 Movie Discovery App

A modern, responsive movie search and discovery application built with React, Vite, and integrated with The Movie Database (TMDB) API and Appwrite backend services.

---

## 📋 Table of Contents

- [Features](#features)
- [What I Built - Step by Step](#what-i-built---step-by-step)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [API Integration](#api-integration)
- [Components Overview](#components-overview)

---

## ✨ Features

- **Real-time Movie Search** - Search through thousands of movies with debounced input
- **Trending Movies** - Display most searched movies tracked via Appwrite database
- **Movie Cards** - Beautiful cards showing poster, title, rating, language, and release year
- **Responsive Design** - Fully responsive UI with modern CSS styling
- **Loading States** - Spinner component for better UX during API calls
- **Error Handling** - Comprehensive error messages for failed requests
- **Search Analytics** - Track search terms and popular movies using Appwrite

---

## 🛠️ What I Built - Step by Step

### 1. **Project Setup & Configuration**
   - Initialized React + Vite project for fast development and HMR (Hot Module Replacement)
   - Configured ESLint for code quality and consistency
   - Set up environment variables for secure API key management
   - Created project structure with organized component folders

### 2. **TMDB API Integration**
   - Integrated [The Movie Database API](https://www.themoviedb.org/) for fetching movie data
   - Implemented two main endpoints:
     - **Search Movies**: `/search/movie` - Search movies by query
     - **Discover Movies**: `/discover/movie` - Get popular movies sorted by popularity
   - Set up authentication headers with Bearer token
   - Created reusable API configuration object for consistent requests

### 3. **Appwrite Backend Integration**
   - Set up Appwrite Cloud project for backend services
   - Created database and collection for storing search analytics
   - Implemented search count tracking system:
     - Checks if a search term already exists in database
     - Updates count if term exists, creates new entry if not
     - Stores movie metadata (ID, poster URL, title) for trending feature
   - Built `getTrendingMovies()` function to fetch most searched movies
   - Handled Appwrite SDK version compatibility (using `'unique()'` for document IDs)

### 4. **State Management with React Hooks**
   - **useState** - Managing multiple state variables:
     - `searchTerm` - User input for search
     - `movieList` - Array of fetched movies
     - `isLoading` - Loading state for API calls
     - `errorMessage` - Error messages from API
     - `trendingMovies` - Most searched movies from Appwrite
     - `debouncedSearchTerm` - Debounced search to optimize API calls
   
   - **useEffect** - Side effects handling:
     - Fetch movies when debounced search term changes
     - Load trending movies on initial mount
   
   - **useDebounce** (from react-use) - Delays search execution by 500ms to reduce API calls while user is typing

### 5. **Component Architecture**

   #### **App.jsx - Main Component**
   - Central hub managing all state and logic
   - Orchestrates API calls to TMDB and Appwrite
   - Renders header, search, trending section, and movie grid
   - Implements error boundaries and loading states

   #### **Search Component** (`components/Search.jsx`)
   - Controlled input component with search icon
   - Real-time input handling with `onChange` event
   - Styled with transparent background and bottom border
   - Placeholder text for better UX
   - Props: `searchTerm`, `setSearchTerm`

   #### **MovieCard Component** (`components/MovieCard.jsx`)
   - Displays individual movie information in a card layout
   - Shows:
     - Movie poster (with fallback for missing images)
     - Title
     - Rating with star icon (formatted to 1 decimal)
     - Original language (uppercase)
     - Release year (extracted from date)
   - Props: destructured `movie` object with all movie data
   - Handles missing data with fallbacks ("N/A")

   #### **Spinner Component** (`components/Spinner.jsx`)
   - Loading indicator shown during API requests
   - Improves UX by providing visual feedback
   - Displayed conditionally based on `isLoading` state

### 6. **Search Functionality with Debouncing**
   - Implemented debounced search to prevent excessive API calls
   - 500ms delay after user stops typing before triggering search
   - Automatically searches as user types (no submit button needed)
   - Updates URL with encoded query parameters for special characters

### 7. **Movie Display Logic**
   - **Trending Section**:
     - Shows numbered list of most searched movies
     - Displays movie posters from Appwrite database
     - Only renders when trending movies exist
   
   - **All Movies Section**:
     - Grid layout showing all search results
     - Maps through `movieList` array
     - Each movie rendered as `MovieCard` component
     - Shows spinner during loading
     - Displays error message if fetch fails

### 8. **Error Handling & Edge Cases**
   - Try-catch blocks around all async operations
   - HTTP status code checking (throws error if `!response.ok`)
   - Fallback images for movies without posters
   - "N/A" text for missing data (rating, release date)
   - Console error logging for debugging
   - User-friendly error messages in UI

### 9. **Styling & Design**
   - Modern gradient text effects
   - Pattern overlay background for visual depth
   - Card-based layout for movies
   - Responsive grid system
   - Tailwind-like utility classes (text-white, my-6, etc.)
   - Custom CSS in `App.css` and `index.css`
   - Hover effects and transitions for better interactivity

### 10. **Performance Optimizations**
   - Debounced search input (reduces API calls by ~80%)
   - Conditional rendering to avoid unnecessary DOM updates
   - Key props on list items for efficient React reconciliation
   - Lazy loading potential (can be added for images)
   - Memoization opportunities identified (useCallback, useMemo)

### 11. **Data Flow Architecture**
   ```
   User Input (Search.jsx)
        ↓
   searchTerm state (App.jsx)
        ↓
   useDebounce (500ms delay)
        ↓
   debouncedSearchTerm state
        ↓
   useEffect triggers
        ↓
   fetchMovies() API call
        ↓
   TMDB API Response
        ↓
   updateSearchCount() → Appwrite
        ↓
   setMovieList() updates state
        ↓
   Re-render with MovieCard components
   ```

### 12. **Environment Configuration**
   - Created `.env.local` file for sensitive data
   - Three environment variables:
     - `VITE_TMDB_API_KEY` - TMDB authentication token
     - `VITE_APPWRITE_PROJECT_ID` - Appwrite project identifier
     - `VITE_APPWRITE_DATABASE_ID` - Database ID
     - `VITE_APPWRITE_COLLECTION_ID` - Collection ID for search tracking
   - Used `import.meta.env` for Vite environment variable access

---

## 🚀 Tech Stack

- **Frontend Framework**: React 18+
- **Build Tool**: Vite (for lightning-fast development)
- **Styling**: CSS3 with custom styles
- **API**: The Movie Database (TMDB) REST API
- **Backend/Database**: Appwrite Cloud
- **Utilities**: 
  - `react-use` (for useDebounce hook)
  - `appwrite` SDK for backend integration

---

## 📁 Project Structure

```
movie-app/
├── public/
│   ├── hero.png          # Header hero image
│   ├── search.svg        # Search icon
│   ├── star.svg          # Rating star icon
│   └── no-movie.png      # Fallback poster image
├── src/
│   ├── components/
│   │   ├── MovieCard.jsx    # Individual movie card
│   │   ├── Search.jsx       # Search input component
│   │   └── Spinner.jsx      # Loading spinner
│   ├── assets/              # Static assets
│   ├── App.jsx              # Main app component
│   ├── App.css              # App-specific styles
│   ├── appwrite.js          # Appwrite configuration & functions
│   ├── index.css            # Global styles
│   └── main.jsx             # App entry point
├── .env.local               # Environment variables (not in git)
├── .gitignore               # Git ignore rules
├── eslint.config.js         # ESLint configuration
├── index.html               # HTML entry point
├── package.json             # Dependencies & scripts
├── vite.config.js           # Vite configuration
└── README.md                # This file
```

---

## 📦 Setup & Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- TMDB API Key ([Get one here](https://www.themoviedb.org/settings/api))
- Appwrite Project ([Create one](https://cloud.appwrite.io/))

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd movie-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   VITE_TMDB_API_KEY=your_tmdb_bearer_token_here
   VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
   VITE_APPWRITE_DATABASE_ID=your_database_id
   VITE_APPWRITE_COLLECTION_ID=your_collection_id
   ```

4. **Set up Appwrite Database**
   
   In your Appwrite console, create:
   - A new database
   - A collection with these attributes:
     - `searchTerm` (string)
     - `count` (integer)
     - `movie_id` (integer)
     - `poster_url` (string)
     - `title` (string)

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Build for production**
   ```bash
   npm run build
   ```

---

## 🔐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_TMDB_API_KEY` | TMDB API Bearer Token | `eyJhbGc...` |
| `VITE_APPWRITE_PROJECT_ID` | Appwrite Project ID | `69456ba70016...` |
| `VITE_APPWRITE_DATABASE_ID` | Appwrite Database ID | `69456c700006...` |
| `VITE_APPWRITE_COLLECTION_ID` | Appwrite Collection ID | `69456ccd000c...` |

---

## 🌐 API Integration

### TMDB API Endpoints Used

1. **Search Movies**
   ```
   GET https://api.themoviedb.org/3/search/movie?query={searchTerm}
   ```

2. **Discover Movies**
   ```
   GET https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc
   ```

### Appwrite Functions

- `updateSearchCount(searchTerm, movie)` - Tracks search analytics
- `getTrendingMovies()` - Retrieves most searched movies

---

## 🧩 Components Overview

### App.jsx
Main application component managing state, API calls, and rendering child components.

### Search.jsx
Search input with icon, handles user input and passes search term to parent.

### MovieCard.jsx
Displays movie information in a card format with poster, title, rating, language, and year.

### Spinner.jsx
Loading indicator component shown during API requests.

---

## 🎯 Future Enhancements

- Add movie details modal on card click
- Implement pagination for search results
- Add filters (genre, year, rating)
- Favorites/Watchlist functionality
- User authentication with Appwrite
- Movie trailers integration
- Dark/Light theme toggle
- Advanced search options

---

## 📝 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Author

Built with ❤️ using React, Vite, TMDB API, and Appwrite
