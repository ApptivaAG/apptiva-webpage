#!/usr/bin/env bash
set -e

echo "🐳 Docker Local Test Script"
echo "=========================="
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
  echo "❌ Error: .env.local file not found"
  echo "Please create .env.local with your environment variables"
  exit 1
fi

# Load environment variables
set -a
source .env.local
set +a

echo "📦 Building Docker image..."
docker build \
  --build-arg NEXT_PUBLIC_SANITY_PROJECT_ID="${NEXT_PUBLIC_SANITY_PROJECT_ID}" \
  --build-arg NEXT_PUBLIC_SANITY_DATASET="${NEXT_PUBLIC_SANITY_DATASET}" \
  --build-arg NEXT_PUBLIC_SANITY_API_READ_TOKEN="${NEXT_PUBLIC_SANITY_API_READ_TOKEN}" \
  --build-arg NEXT_PUBLIC_GTAG_ID="${NEXT_PUBLIC_GTAG_ID}" \
  --build-arg GOOGLE_REVIEWS_API_KEY="${GOOGLE_REVIEWS_API_KEY}" \
  --build-arg GOOGLE_REVIEWS_PLACE_ID="${GOOGLE_REVIEWS_PLACE_ID}" \
  -t apptiva-webpage:test \
  .

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Build successful!"
  echo ""
  
  # Show image size
  echo "📊 Image size:"
  docker images apptiva-webpage:test --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}"
  echo ""
  
  echo "🚀 Starting container on port 3000..."
  echo "Press Ctrl+C to stop"
  echo ""
  echo "🌐 Open http://localhost:3000 in your browser"
  echo ""
  
  docker run -p 3000:3000 \
    -e GOOGLE_REVIEWS_API_KEY="${GOOGLE_REVIEWS_API_KEY}" \
    -e GOOGLE_REVIEWS_PLACE_ID="${GOOGLE_REVIEWS_PLACE_ID}" \
    -e RESEND_API_KEY="${RESEND_API_KEY}" \
    -e NOTION_API_TOKEN="${NOTION_API_TOKEN}" \
    -e NOTION_DB_ID="${NOTION_DB_ID}" \
    --rm \
    apptiva-webpage:test
else
  echo ""
  echo "❌ Build failed!"
  exit 1
fi
