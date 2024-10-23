



### Backend README.md

```markdown
# Health Chatbot - Backend

This is the backend part of the Health Chatbot application, built with Node.js and Express. It provides the API for processing user inputs and classifying uploaded images.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [How It Works](#how-it-works)
- [Contributing](#contributing)
- [License](#license)

## Features

- RESTful API for generating responses to health-related questions.
- Image classification for diagnosing skin conditions.

## Technologies Used

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express**: Web framework for Node.js, used for creating APIs.
- **Multer**: Middleware for handling multipart/form-data (used for file uploads).
- **TensorFlow.js** (or your chosen library): For image classification (if applicable).

## Installation

### Prerequisites

Make sure you have the following installed:

- Node.js (version 14 or above)
- npm (Node Package Manager)

### Clone the Repository

```bash
git clone <https://github.com/AayushKarwa/Health_chatbot>
cd health-chatbot/backend
```

### Install Dependencies

```bash
npm install
```

## Running the Application

To start the backend server, run:

```bash
node server.js
```

The API will be available at `http://localhost:3001`.

## Usage

The backend handles requests from the frontend and processes user inputs. It provides responses for both text prompts and image uploads.

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

## How It Works

1. **Request Handling**: The server listens for incoming requests at defined endpoints.
2. **Text Processing**: For text prompts, the server uses AI logic (e.g., a trained model) to generate responses.
3. **Image Classification**: For image uploads, the server processes the image, classifies it, and responds with relevant information about the condition.
4. **Response Sending**: The server sends the processed data back to the frontend for display.

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



