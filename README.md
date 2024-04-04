# SecurePass Webapp

SecurePass Webapp is the frontend (Angular) application for SecurePass, a password management system. This application provides a user-friendly interface for managing passwords securely.

## Summary

SecurePass is designed to help users securely store and manage their passwords. It offers features such as:

- **Secure Password Storage**: Safely store passwords for various accounts and services.
- **User Authentication**: Authenticate users securely to access their password vault.
- **Password Generation**: Generate strong, randomized passwords for improved security.
- **Password Sharing**: Share passwords securely with trusted individuals or team members.
- **Password Revocation**: Revoke access to shared passwords when necessary.
- **Intuitive User Interface**: User-friendly interface for easy navigation and usage.

## Demo
https://github.com/ddas09/secure-pass-webapp/assets/75975903/9b1933a9-b269-4dfa-a876-2f41cec722f1

## Getting Started

These instructions will get you a copy of the frontend project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ddas09/secure-pass-webapp.git
   ```

2. Navigate to the project directory:

   ```bash
   cd secure-pass-webapp
   ```

3. Install dependencies (including Angular):

   ```bash
   npm install
   ```

4. Clone the backend repository [SecurePass Backend](https://github.com/ddas09/secure-pass.git) and follow the instructions to set it up.

### Running the Frontend

To run the frontend locally:

1. Start the development server:

   ```bash
   ng serve
   ```

2. Open your web browser and navigate to [http://localhost:4200](http://localhost:4200) to access the SecurePass web app.

The frontend will be running at `http://localhost:4200` by default.

### Building the Frontend

To build the frontend for production:

```bash
ng build --prod
```
