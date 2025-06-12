#!/bin/bash

echo "🔍 SeaFable Quick Authentication Check"
echo "======================================"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Not in project root directory"
    exit 1
fi

echo "📁 Checking critical files..."

# Critical auth files
files=(
    "lib/supabase.ts"
    "components/auth-provider.tsx"
    "app/login/page.tsx"
    "app/api/auth/login/route.ts"
    ".env.local"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file missing"
    fi
done

echo ""
echo "🔧 Checking environment variables..."

# Check environment variables
env_vars=(
    "NEXT_PUBLIC_SUPABASE_URL"
    "NEXT_PUBLIC_SUPABASE_ANON_KEY"
    "SUPABASE_SERVICE_ROLE_KEY"
)

for var in "${env_vars[@]}"; do
    if [ -n "${!var}" ]; then
        if [[ "${!var}" == *"temp"* ]] || [[ "${!var}" == *"placeholder"* ]]; then
            echo "⚠️  $var has placeholder value"
        else
            echo "✅ $var is set"
        fi
    else
        echo "❌ $var is missing"
    fi
done

echo ""
echo "🚀 Checking if server can start..."

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "⚠️  node_modules missing - run 'pnpm install'"
else
    echo "✅ Dependencies installed"
fi

# Check TypeScript compilation
echo "🔍 Checking TypeScript..."
if command -v pnpm &> /dev/null; then
    if pnpm run type-check &> /dev/null; then
        echo "✅ TypeScript compilation passes"
    else
        echo "❌ TypeScript compilation fails"
        echo "   Run 'pnpm run type-check' for details"
    fi
else
    echo "⚠️  pnpm not found - cannot check TypeScript"
fi

echo ""
echo "📊 Quick Check Complete!"
echo "Run 'node scripts/auth-diagnostic.ts' for detailed analysis"
