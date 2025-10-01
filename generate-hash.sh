#!/bin/bash

# Secure Password Hash Generator for Wedding Website
# Usage: ./generate-hash.sh "YourPasswordHere"

if [ $# -eq 0 ]; then
    echo "🔐 Wedding Website Password Hash Generator"
    echo ""
    echo "Usage: $0 \"YourPasswordHere\""
    echo ""
    echo "This generates a SHA-256 hash for your password that can be safely"
    echo "stored in GitHub Secrets and deployed without exposing the actual password."
    echo ""
    echo "Example:"
    echo "  $0 \"MySecretWeddingPassword2026\""
    echo ""
    exit 1
fi

PASSWORD="$1"
HASH=$(echo -n "$PASSWORD" | sha256sum | cut -d' ' -f1)

echo "🔐 Password Hash Generated Successfully!"
echo ""
echo "Password: $PASSWORD"
echo "SHA-256 Hash: $HASH"
echo ""
echo "📋 Next Steps:"
echo "1. Copy the hash above"
echo "2. Go to GitHub → Repository → Settings → Secrets and variables → Actions"
echo "3. Update WEDDING_PASSWORD secret with: $HASH"
echo "4. Deploy - the hash will be injected securely during build"
echo ""
echo "✅ Your password is now secure - only the hash is stored in code!"