# Hack4Good-2025

# Muhammadiyah Welfare Home System

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Clone the Repository](#clone-the-repository)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Development Workflow](#development-workflow)
- [Key Features](#key-features)

## Overview

This project is designed to enhance the operational efficiency and user experience for the Muhammadiyah Welfare Home. It consists of two main components: a **Backend** for managing data and a **Frontend** for user interaction.

- Frontend: The user interface, developed using React, where users can interact with the application.
- Backend: A Express.js-based server that handles business logic, data storage, and communication with the frontend.

## Prerequisites

Before setting up the application locally, ensure that the following tools are installed:

- Node.js: A JavaScript runtime required to run both the frontend and backend. Download and install it from [here](https://nodejs.org/en).
- Git: A version control system to clone the repository. Download and install it from [here](https://git-scm.com).

  ## Getting Started

Follow these steps to set up the project on your local machine.

### Clone the Repository

Start by cloning the repository to your local device:

`git clone <repository-url>`

Replace <repository-url> with the URL of your Git repository.

### Frontend Setup

1. Navigate to the frontend directory:

`cd frontend`

2. Install the required dependencies:

`npm install`

3. Build the frontend project:

`npm run build`

4. Start the frontend development server:

`npm run`

Your frontend should now be running. The application will usually be accessible at [http://localhost:5173](http://localhost:5173) by default.

### Backend Setup

1. Navigate to the backend directory:

`cd backend`

2. Install the required backend dependencies:

`npm install`

3. Build the backend project:

`npm run build`

4. Start the backend server:

`npm run`

The backend server should now be running, typically accessible at [http://localhost:8080](http://localhost:8080) (depending on your configuration).

## Development Workflow

Once both frontend and backend servers are running, you can interact with the Scheduler Web Application via your browser.

- Frontend URL: Open [http://localhost:5173](http://localhost:5173) to access the user interface.
- Backend URL: The backend will be running on [http://localhost:8080](http://localhost:8080) (or the port you configured).

You can now begin working on the application, adding features, fixing bugs, or adjusting the user interface.

## Key Features

### For Residents:

- **User-Friendly Dashboard**: View voucher balances, transaction history, and available products.
- **Item Requests**: Easily request items from the minimart or place preorders for out-of-stock products.
- **Secure Login System**: Login with an optional mobile-based password reset feature.

### For Admins:

- **User Management**: Add, suspend, and reset passwords for residents.
- **Task Approval**: Approve or reject voucher tasks and product requests with detailed tracking.
- **Inventory Management**: Maintain and update inventory with audit logs for accountability.
- **Reporting**: Generate comprehensive reports, such as weekly requests and inventory summaries.
