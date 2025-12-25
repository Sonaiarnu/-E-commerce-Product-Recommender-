# E-commerce Product Recommender

This project implements a full-stack product recommendation system with AI-powered explanations, enabling users to understand *why* a specific product was recommended to them.

## Features
- **Backend API**: Node.js/Express server that manages user contexts and products.
- **Database**: SQLite integration for persistent storage of product catalogs and user interaction history.
- **Recommendation Logic**: Heuristic-based engine (extensible to LLM) that generates natural language explanations.
- **Frontend Dashboard**: A professional React interface to visualize recommendations and explanations.

## Application Structure
- `server.js`: Backend API entry point.
- `src/`: React frontend source code.
  - `components/`: UI components (UserProfile, ProductCard, ExplanationModal).
  - `ruleBasedEngine.js`: Logic capabilities for generating explanations.
- `db/`: Database initialization scripts.

## Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Installation
1.  **Install Dependencies**:
    ```bash
    npm install
    ```
2.  **Initialize Database**:
    ```bash
    node db/init.js
    ```

### Running the Application
You need to run the backend and frontend simultaneously. Open two terminal windows:

**Terminal 1 (Backend API):**
```bash
node server.js
```
*Run on http://localhost:3000*

**Terminal 2 (Frontend Interface):**
```bash
npm run dev
```
*Access via the local URL provided (e.g., http://localhost:5173)*

## API Endpoints
- `GET /api/user`: Retrieve current user context and behavior history.
- `GET /api/products`: Retrieve product recommendations.
- `POST /api/explain`: Generate an explanation for a specific product recommendation.

## Prompt Engineering
The system uses a structured prompt design to ensure high-quality explanations:
- **Input**: Product attributes (category, ID) + User History (purchases, views).
- **Constraints**: 2-3 sentences, non-technical language, no hallucinations.
