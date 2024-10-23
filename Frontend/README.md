### Frontend README.md

```markdown
# Health Chatbot - Frontend

This is the frontend part of the Health Chatbot application, built with React. It provides an interactive user interface for users to ask health-related questions and upload images of skin conditions.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [How It Works](#how-it-works)
- [Contributing](#contributing)
- [License](#license)

## Features

- Interactive chatbot interface for health-related queries.
- Ability to upload images for diagnosis.
- Dark mode for improved user experience.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Axios**: Promise-based HTTP client for making requests to the backend.
- **React Icons**: Library for including icons in the application.

## Installation

### Prerequisites

Make sure you have the following installed:

- Node.js (version 14 or above)
- npm (Node Package Manager)

### Clone the Repository

```bash
git clone <your-repository-url>
cd health-chatbot/frontend
```

### Install Dependencies

```bash
npm install
```

## Running the Application

To start the frontend development server, run:

```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Usage

1. Open the application in your browser.
2. Enter health-related questions in the text input.
3. Upload images of skin conditions using the file input.
4. Toggle dark mode for better visibility.

## How It Works

1. **User Input**: Users can type their health-related questions or upload images.
2. **Text Prompt Handling**: When a question is submitted, a POST request is sent to the backend API endpoint `/generate-response`.
3. **Image Upload Handling**: When an image is uploaded, the application sends it along with any accompanying text to the backend endpoint `/classify-image`.
4. **Display Responses**: The responses from the backend, including diagnosis and treatment options, are displayed in the chat interface.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```