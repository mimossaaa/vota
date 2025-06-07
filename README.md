# Streamer Activity Ranker

This is a single page React web application that allows users to suggest and upvote activity ideas for a streamer. The site features a clean, modern design with real-time updates and responsive UI.

## ✨ Features

*   **Submit new activity ideas:** Users can propose activities.
*   **View submitted activities:** A dynamic list displays all ideas.
*   **Upvote existing activities:** Users can upvote ideas, with a limitation to prevent multiple votes per user per activity.
*   **Real-time sorting:** Activities are automatically sorted by vote count in descending order.
*   **Responsive UI:** Built with Tailwind CSS for a mobile-friendly experience.

## 🛠️ Technologies Used

*   **Frontend:** React (functional components, hooks)
*   **Styling:** Tailwind CSS
*   **Backend:** Supabase (PostgreSQL database, API, Realtime)
*   **Deployment:** Vercel/Netlify (Frontend)

## 🚀 Getting Started

Follow these steps to set up the project locally and deploy it.

### 1. Supabase Backend Setup

1.  **Create a Supabase Project:**
    *   Go to [Supabase](https://app.supabase.com/) and sign up or log in.
    *   Click "New project".
    *   Choose an organization, give your project a name (e.g., `streamer-activities`), and set a strong database password.
    *   Choose a region close to your users.
    *   Click "Create new project".

2.  **Get Your Supabase API Keys:**
    *   Once your project is created, navigate to "Project Settings" (gear icon) > "API".
    *   Note down your `Project URL` and `anon public` key. You will need these for your frontend application.

3.  **Set Up Database Schema:**
    *   In your Supabase project dashboard, go to "Table Editor" (spreadsheet icon).
    *   Click `+ Create new table`.
    *   Configure the table as follows:
        *   **Name:** `activities`
        *   **Enable Row Level Security (RLS):** Keep this **OFF** for simplicity in this project (as per requirements, no user login).
        *   **Columns:**
            *   `id`: `uuid` (Primary Key, Default Value: `gen_random_uuid()`, Not Null)
            *   `created_at`: `timestampz` (Default Value: `now()`, Not Null)
            *   `title`: `text` (Not Null)
            *   `votes`: `integer` (Default Value: `0`, Not Null)
    *   Click "Save".

4.  **Create a Policy for `activities` table (Optional but Recommended for Production):**
    *   Even without RLS enabled, it's good practice to understand policies. For this simple app, we'll rely on the `RLS OFF` setting.
    *   *Self-correction*: Since RLS is off, policies aren't strictly necessary for read/write access for *anon* users. But for a real-world scenario, you'd enable RLS and create policies like:
        *   **SELECT policy:** `PERMISSIVE` for `users` role, `true` expression.
        *   **INSERT policy:** `PERMISSIVE` for `users` role, `true` expression (or specific conditions if needed).
        *   **UPDATE policy:** `PERMISSIVE` for `users` role, `true` expression (or specific conditions).

### 2. Frontend Application Setup (React & Tailwind CSS)

1.  **Clone this Repository:**
    ```bash
    git clone <your-repo-url>
    cd streamer-activity-ranker
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Configure Environment Variables:**
    *   Create a `.env` file in the root of the project (where `package.json` is located).
    *   Add your Supabase project URL and anon key:
        ```
        VITE_SUPABASE_URL="YOUR_SUPABASE_PROJECT_URL"
        VITE_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
        ```
    *   **Important:** Replace `"YOUR_SUPABASE_PROJECT_URL"` and `"YOUR_SUPABASE_ANON_KEY"` with the actual values you obtained from your Supabase project settings. Ensure these values are enclosed in double quotes.
    *   **Note:** For local development, `VITE_` prefix is crucial for Vite to expose these variables to the client-side code.

4.  **Run the Application Locally:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The application will typically run on `http://localhost:5173` (or another port if 5173 is in use).

### 3. Deployment Instructions

#### Deploying the Frontend (Vercel or Netlify)

Both Vercel and Netlify offer free tiers suitable for this project. The process is similar:

1.  **Push to GitHub:** Ensure your project is pushed to a GitHub repository.

2.  **Connect to Vercel/Netlify:**
    *   Go to [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/) and sign up/log in.
    *   Import your Git repository (select the `streamer-activity-ranker` repository).

3.  **Configure Build Settings:**
    *   **Framework Preset:** Vercel/Netlify usually auto-detects Vite/React. If not, select "Vite" or "Create React App".
    *   **Build Command:** `npm run build` (or `yarn build`)
    *   **Output Directory:** `dist` (for Vite) or `build` (for Create React App)

4.  **Set Environment Variables:**
    *   This is crucial for connecting to Supabase.
    *   In the project settings on Vercel/Netlify, go to "Environment Variables".
    *   Add the following:
        *   `Name: VITE_SUPABASE_URL`, `Value: YOUR_SUPABASE_PROJECT_URL`
        *   `Name: VITE_SUPABASE_ANON_KEY`, `Value: YOUR_SUPABASE_ANON_KEY`
    *   Make sure these are available during the build and runtime phases.

5.  **Deploy:** Click "Deploy" (or "Deploy site"). Your application will be live shortly!

## 📄 Code Structure

*   `src/App.jsx`: Main application component, handles routing and state management.
*   `src/index.css`: Tailwind CSS directives.
*   `src/main.jsx`: React entry point.
*   `src/components/`: Contains individual React components.
    *   `ActivityForm.jsx`: Component for submitting new activity ideas.
    *   `ActivityItem.jsx`: Component for displaying a single activity with vote count and upvote button.
    *   `ActivityList.jsx`: Component to render the list of activities.
    *   `Header.jsx`: Site header component.
*   `src/supabaseClient.js`: Configures the Supabase client and handles database interactions.

## ✅ Usage

1.  Enter an activity idea in the submission form and click "Suggest Activity".
2.  The new activity will appear in the list.
3.  Click the "Upvote" button next to an activity to increase its vote count.
4.  The list will automatically re-sort based on vote count. Your votes are tracked locally to prevent duplicate votes on the same activity.

## 📝 Notes

*   This project uses `localStorage` to track user votes. This is a client-side mechanism and can be cleared by the user. For more robust vote limiting, a backend authentication system would be required.
*   Supabase Realtime subscriptions are used to ensure the activity list updates automatically without manual refreshing.

Enjoy building and deploying your streamer activity ranker! 
