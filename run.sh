#!/bin/bash

# Exit on error
set -e

# Create and activate virtual environment if it doesn't exist
if [ ! -d ".venv" ]; then
    python -m venv .venv
fi
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Set environment variables
export FLASK_APP=app
export FLASK_DEBUG=1

# Create uploads directory if it doesn't exist
mkdir -p app/static/uploads

# Start Flask development server
flask run