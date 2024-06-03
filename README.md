# My Personal Blog

Welcome to my personal blog project! This blog is built using **React** and **Next.js**, with **Material-UI** for a responsive and visually appealing design. The blog provides a seamless user experience, both for authenticated and unauthenticated users.

## Key Features

- **Responsive Navigation Bar:** The navigation bar adjusts to different screen sizes and includes:
  - **Home link**
  - **Menu Items:** About Me, Projects, Resume, and Review
  - **Sign In/Sign Out** button with icons
  - **Social Media Links:** GitHub and LinkedIn profiles

- **Authentication:** User authentication is managed using next-auth:
  - **Sign In:** Users can sign in to access additional features
  - **Sign Out:** Authenticated users can sign out

## Menu Items

The navigation menu includes the following items:
- **About Me:** A page introducing myself
- **Projects:** A list of projects I have worked on
- **Resume:** A link to my resume file
- **Review:** A section for reviews and feedback

## Social Media Integration

The app bar includes links to my social media profiles:
- **GitHub:** [My GitHub Profile](https://github.com/GeorgeMocanu23)
- **LinkedIn:** [My LinkedIn Profile](https://www.linkedin.com/in/george-mocanu-766b3b160)

## Technologies Used

- **React:** For building the user interface
- **Next.js:** For server-side rendering and static site generation
- **Material-UI:** For designing responsive and consistent UI components
- **next-auth:** For managing user authentication

## Project Structure

The main component of the project is the ResponsiveAppBar, which handles the navigation and user authentication states.

## Components

- **ResponsiveAppBar:** The main app bar component that includes navigation, authentication buttons, and social media links.
- **AboutMe:** A page component that displays information about me.
- **ProjectsList:** A page component that lists the projects I have worked on.
- **Resume:** A page component that provides a link to my resume file.
- **Review:** A page component that displays reviews and feedback.
