#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "$DIR"

echo "=========================================================="
echo "  Starting Sky Global HR Consultancy Local Portal...      "
echo "=========================================================="
echo "Opening in browser..."

# Open browser once server is responsive
(sleep 1.5 && open "http://localhost:5173") &

# Start dev server
npm run dev
