# Project Management Tool using Next JS

## Overview

The goal of the project management tool is to organise projects and handle tasks more effectively. This platform provides a comprehensive feature set designed to satisfy the ever-changing needs of contemporary project contexts, enabling teams to work together harmoniously and produce outstanding outcomes. Develop a user-friendly interface for creating and managing projects and tasks. Foster collaboration and communication among team members. Offer robust reporting and analytics capabilities for tracking project progress and performance.

## Getting Started

Follow these steps to run the application locally:

1. Clone the repository: `git clone https://github.com/RehanRanav/Project-Management-Tool.git`
2. Install dependencies: `npm install`
3. **Add Google Client Id:**
   - Obtain a Google Client Id by creating a project on the [Google Cloud Console](https://console.cloud.google.com/).
   - Configure the OAuth consent screen with the necessary information.
   - Create credentials and copy the Client Id.
   - In the project, create a `.env` file at the root and add `REACT_APP_GOOGLE_CLIENT_ID=YOUR_CLIENT_ID`.
4.3. **Add Firebase:**
   - Obtain a Firestore Credentials from the FireBase
   - In the project, create a `firebase.config.ts` file at the root and add your Firbase configuration. 
5. Run the application: `npm start`
6. Open your browser and visit `http://localhost:3000`.
