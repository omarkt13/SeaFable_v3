// =====================================================
// Direct Supabase User Creation (Alternative Approach)
// =====================================================

console.log("🚀 Creating users directly via Supabase...")

// Since we can't easily call our API endpoints from this environment,
// let's create a manual approach that you can run in the browser console
// on your actual application pages

const userCreationInstructions = `
🎯 MANUAL USER CREATION INSTRUCTIONS:

Since the script environment has URL resolution issues, please follow these steps:

1. 📱 CUSTOMER USER CREATION:
   - Go to: http://localhost:3000/register
   - Fill in the form:
     * Email: test.customer@seafable.com
     * Password: TestPassword123!
     * First Name: Test
     * Last Name: Customer
   - Click "Sign Up"

2. 🏢 BUSINESS USER CREATION:
   - Go to: http://localhost:3000/business/register (if this route exists)
   - OR use the browser console on any page:
   
   fetch('/api/business/auth/register', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
       email: 'test.business@seafable.com',
       password: 'TestPassword123!',
       businessName: 'Test Ocean Adventures',
       phoneNumber: '+1-555-0123'
     })
   }).then(r => r.json()).then(console.log)

3. 🧪 TEST THE LOGINS:
   - Customer: http://localhost:3000/login
   - Business: http://localhost:3000/business/login

4. 🔍 VERIFY IN BROWSER CONSOLE:
   Run this on any page to test login:
   
   // Test customer login
   fetch('/api/auth/login', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
       email: 'test.customer@seafable.com',
       password: 'TestPassword123!'
     })
   }).then(r => r.json()).then(console.log)
   
   // Test business login
   fetch('/api/business/auth/login', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
       email: 'test.business@seafable.com',
       password: 'TestPassword123!'
     })
   }).then(r => r.json()).then(console.log)
`

console.log(userCreationInstructions)

// Create browser console helpers
const browserConsoleHelpers = `
// 🔧 BROWSER CONSOLE HELPERS
// Copy and paste these into your browser console:

// Create customer user
window.createCustomerUser = async () => {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'test.customer@seafable.com',
      password: 'TestPassword123!',
      firstName: 'Test',
      lastName: 'Customer'
    })
  })
  const result = await response.json()
  console.log('Customer creation result:', result)
  return result
}

// Create business user
window.createBusinessUser = async () => {
  const response = await fetch('/api/business/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'test.business@seafable.com',
      password: 'TestPassword123!',
      businessName: 'Test Ocean Adventures',
      phoneNumber: '+1-555-0123'
    })
  })
  const result = await response.json()
  console.log('Business creation result:', result)
  return result
}

// Test customer login
window.testCustomerLogin = async () => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'test.customer@seafable.com',
      password: 'TestPassword123!'
    })
  })
  const result = await response.json()
  console.log('Customer login result:', result)
  return result
}

// Test business login
window.testBusinessLogin = async () => {
  const response = await fetch('/api/business/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'test.business@seafable.com',
      password: 'TestPassword123!'
    })
  })
  const result = await response.json()
  console.log('Business login result:', result)
  return result
}

// Run all tests
window.runAllAuthTests = async () => {
  console.log('🚀 Running all auth tests...')
  
  console.log('1. Creating customer user...')
  await window.createCustomerUser()
  
  console.log('2. Creating business user...')
  await window.createBusinessUser()
  
  console.log('3. Testing customer login...')
  await window.testCustomerLogin()
  
  console.log('4. Testing business login...')
  await window.testBusinessLogin()
  
  console.log('✅ All tests complete!')
}

// Usage:
// window.createCustomerUser()
// window.createBusinessUser()
// window.testCustomerLogin()
// window.testBusinessLogin()
// window.runAllAuthTests()
`

console.log("\n" + browserConsoleHelpers)

console.log("\n🎯 NEXT STEPS:")
console.log("1. Copy the browser console helpers above")
console.log("2. Go to your app in the browser (http://localhost:3000)")
console.log("3. Open browser console (F12)")
console.log("4. Paste the helpers and run: window.runAllAuthTests()")
