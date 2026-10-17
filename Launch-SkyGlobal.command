#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "$DIR"

echo "=========================================================="
echo "  Starting Sky Global HR Consultancy Local Portal...      "
echo "  - Local MongoDB API Server (Port 5001)                 "
echo "  - Vite React Frontend (Port 5173)                      "
echo "=========================================================="
echo "Opening in browser..."

# Open browser once server is responsive
(sleep 2 && open "http://localhost:5173") &

# Start both backend database server & frontend
npm run dev:all
