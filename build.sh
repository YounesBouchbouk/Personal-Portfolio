#!/bin/bash
# Check if Node.js version is less than 18
if [ $(node -v | cut -d. -f1 | tr -d 'v') -lt 18 ]; then
  echo "Warning: Node.js version is less than 18.x. Some features may not work properly."
fi

# Run the build command
npm run build