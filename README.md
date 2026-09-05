🎲 RollDice - Online Multiplayer Dice Game
RollDice is an interactive, real-time online dice game built with React and Node.js. Players can create custom rooms, configure game parameters, and compete against friends in real time.

🚀 Features
Room Management: Create private game rooms with custom round limits and dice counts.

Real-Time Gameplay: Instant dice rolls, score synchronization, and player tracking powered by WebSocket architecture.

Form Validation: Client-side validation with dynamic error handling for input edge cases.

Responsive UI: Clean, modern, and accessible user interface components.

Testing Coverage: Unit tests built with Jest and React Testing Library.

🛠️ Tech Stack
Frontend (Client)

React (Hooks, State Management)

React Testing Library & Jest (Unit Testing)

CSS3 (Custom Styles)

Backend (Server)

Node.js & Express

Socket.IO (Real-Time Bidirectional Communication)

GitHub Repository: online-dice-game-server

💻 Installation & Setup
Follow these steps to run the application locally:

1. Server Setup
   Bash
# Clone the server repository
git clone https://github.com/oruchankural/online-dice-game-server.git
cd online-dice-game-server

# Install dependencies
npm install

# Start the server
npm start
The server will run on http://localhost:5000 (or your configured port).

2. Client Setup
   Bash
# Clone the client repository
git clone https://github.com/YOUR_USERNAME/rolldice-client.git
cd rolldice-client/my-app

# Install dependencies
npm install

# Start the application
npm start
The React app will open at http://localhost:3000.

🧪 Running Tests
To run the client-side test suite using Jest and React Testing Library:

Bash
npm test
To run tests with detailed output:

Bash
npm test -- --verbose
📁 Project Structure (Client)
Plaintext
src/
├── components/
│   ├── Button.jsx                  # Reusable button component
│   ├── CreateRoomForm.jsx          # Room creation form & logic
│   └── CreateRoomForm.test.jsx     # Unit tests for form component
├── App.js                          # Main application entry component
└── index.js                        # DOM rendering entry point
🤝 Contributing
Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request