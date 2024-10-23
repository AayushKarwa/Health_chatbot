


# Health Chatbot

Health Chatbot is a web application designed to provide users with information related to health issues through an interactive chatbot interface. Users can ask health-related questions or upload images of skin conditions for diagnosis and treatment suggestions.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [How It Works](#how-it-works)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Features

- Interactive chatbot for health-related queries.
- Image upload functionality for diagnosing skin diseases.
- Dark mode toggle for better user experience.
- Memory of previous conversations for continuity.

## Technologies Used

- **Frontend**: React, Axios, React Icons
- **Backend**: Node.js, Express


## Installation

### Prerequisites

Ensure you have the following installed:

- Node.js (version 14 or above)
- npm (Node Package Manager)

### Clone the Repository

```bash
git clone <https://github.com/AayushKarwa/Health_chatbot>
cd health-chatbot
```

### Frontend Setup

Navigate to the `frontend` directory and install dependencies:

```bash
cd frontend
npm install
```

### Backend Setup

Navigate to the `backend` directory and install dependencies:

```bash
cd backend
npm install
```

### Running the Application

1. Start the backend server:

   ```bash
   cd backend
   node server.js
   ```

2. Start the frontend development server:

   ```bash
   cd frontend
   npm start
   ```

The application will be available at `http://localhost:3000` (for the frontend) and `http://localhost:3001` (for the backend).

## Usage

1. Open the application in your browser.
2. Ask health-related questions using the text input.
3. Upload images of skin conditions using the file input.
4. Toggle dark mode using the dark mode icon for a better viewing experience.

## How It Works

1. **User Interaction**:
   - Users can input their health-related questions in a text field or upload images of skin conditions.

2. **Text Prompt Handling**:
   - When a user submits a text prompt, the application sends a request to the backend endpoint `/generate-response`, where the AI processes the input and returns a relevant response. This response is then displayed in the chat interface.

3. **Image Upload Handling**:
   - When a user uploads an image, the application prepares the image and accompanying text prompt into a `FormData` object.
   - This data is sent to the backend endpoint `/classify-image` for processing. 

4. **Image Processing**:
   - The backend receives the image and processes it using a pre-trained model to identify any skin conditions.
   - The model analyzes the image and returns:
     - **Disease**: The identified condition.
     - **Description**: A brief overview of the condition.
     - **Symptoms**: Common signs associated with the condition.
     - **Causes**: Possible reasons for the condition.
     - **Treatment**: Recommended actions or treatments.
   - The results are sent back to the frontend and displayed in the chat interface.

## API Endpoints

### `POST /generate-response`

- **Description**: Generates a response based on the user's text prompt.
- **Request Body**:
  ```json
  {
      "prompt": "Your health-related question"
  }
  ```
- **Response**:
  ```json
  {
      "aiResponse": "Response from the AI"
  }
  ```

### `POST /classify-image`

- **Description**: Classifies the uploaded image and provides information about the condition.
- **Request Body**: `multipart/form-data` containing:
  - `image`: The uploaded image file.
  - `prompt`: Optional text prompt related to the image.
- **Response**:
  ```json
  {
      "disease": "Name of the disease",
      "description": "Description of the disease",
      "symptoms": "Symptoms of the disease",
      "causes": "Causes of the disease",
      "treatment": "Recommended treatment",
      "aiResponse": "AI response regarding the condition"
  }
  ```

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/) - JavaScript library for building user interfaces.
- [Node.js](https://nodejs.org/) - JavaScript runtime built on Chrome's V8 engine.
- [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js.
- [Axios](https://axios-http.com/) - Promise-based HTTP client for the browser and Node.js.

```



