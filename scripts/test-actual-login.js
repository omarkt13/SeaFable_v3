// =====================================================
// Test Actual Login - Using Real Supabase Users
// =====================================================

console.log("🧪 Testing login with actual Supabase users...")

// Test credentials
const TEST_CREDENTIALS = {
  customer: {
    email: "customer1@seafable.com",
    password: "password123",
  },
  business: {
    email: "business1@seafable.com",
    password: "password123",
  },
}

async function testCustomerLogin() {
  console.log("\n🔐 Testing Customer Login...")
  console.log(`📧 Email: ${TEST_CREDENTIALS.customer.email}`)

  try {
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: TEST_CREDENTIALS.customer.email,
        password: TEST_CREDENTIALS.customer.password,
      }),
    })

    const result = await response.json()

    console.log("📊 Customer Login Results:")
    console.log(`   Status: ${response.status}`)
    console.log(`   Success: ${result.success}`)

    if (result.success) {
      console.log("✅ CUSTOMER LOGIN SUCCESSFUL!")
      console.log(`   User ID: ${result.user?.id}`)
      console.log(`   Email: ${result.user?.email}`)
      console.log(`   Name: ${result.user?.firstName} ${result.user?.lastName}`)
      console.log(`   Role: ${result.user?.role}`)
      console.log(`   Has Session: ${!!result.session}`)
    } else {
      console.log("❌ CUSTOMER LOGIN FAILED!")
      console.log(`   Error: ${result.error}`)
    }

    return result.success
  } catch (error) {
    console.error("💥 Customer login test error:", error.message)
    return false
  }
}

async function testBusinessLogin() {
  console.log("\n🏢 Testing Business Login...")
  console.log(`📧 Email: ${TEST_CREDENTIALS.business.email}`)

  try {
    const response = await fetch("http://localhost:3000/api/business/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: TEST_CREDENTIALS.business.email,
        password: TEST_CREDENTIALS.business.password,
      }),
    })

    const result = await response.json()

    console.log("📊 Business Login Results:")
    console.log(`   Status: ${response.status}`)
    console.log(`   Success: ${result.success}`)

    if (result.success) {
      console.log("✅ BUSINESS LOGIN SUCCESSFUL!")
      console.log(`   User ID: ${result.user?.id}`)
      console.log(`   Email: ${result.user?.email}`)
      console.log(`   Business Name: ${result.user?.businessName}`)
      console.log(`   Contact Name: ${result.user?.contactName}`)
      console.log(`   Role: ${result.user?.role}`)
      console.log(`   Has Session: ${!!result.session}`)
      if (result.warning) {
        console.log(`   ⚠️  Warning: ${result.warning}`)
      }
    } else {
      console.log("❌ BUSINESS LOGIN FAILED!")
      console.log(`   Error: ${result.error}`)
    }

    return result.success
  } catch (error) {
    console.error("💥 Business login test error:", error.message)
    return false
  }
}

async function testInvalidCredentials() {
  console.log("\n🚫 Testing Invalid Credentials...")

  try {
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "nonexistent@seafable.com",
        password: "wrongpassword",
      }),
    })

    const result = await response.json()

    console.log("📊 Invalid Credentials Test:")
    console.log(`   Status: ${response.status}`)
    console.log(`   Success: ${result.success}`)

    if (!result.success) {
      console.log("✅ INVALID CREDENTIALS PROPERLY REJECTED!")
      console.log(`   Error Message: ${result.error}`)
    } else {
      console.log("❌ SECURITY ISSUE: Invalid credentials were accepted!")
    }

    return !result.success // Should return true if login failed (which is correct)
  } catch (error) {
    console.error("💥 Invalid credentials test error:", error.message)
    return false
  }
}

async function testInputValidation() {
  console.log("\n📝 Testing Input Validation...")

  const testCases = [
    {
      name: "Empty email",
      data: { email: "", password: "password123" },
    },
    {
      name: "Invalid email format",
      data: { email: "notanemail", password: "password123" },
    },
    {
      name: "Empty password",
      data: { email: "test@seafable.com", password: "" },
    },
    {
      name: "Missing email field",
      data: { password: "password123" },
    },
  ]

  let validationPassed = 0

  for (const testCase of testCases) {
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testCase.data),
      })

      const result = await response.json()

      if (!result.success && response.status === 400) {
        console.log(`   ✅ ${testCase.name}: Properly rejected`)
        validationPassed++
      } else {
        console.log(`   ❌ ${testCase.name}: Should have been rejected`)
      }
    } catch (error) {
      console.log(`   ❌ ${testCase.name}: Test error - ${error.message}`)
    }
  }

  console.log(`📊 Validation Tests: ${validationPassed}/${testCases.length} passed`)
  return validationPassed === testCases.length
}

async function runAllLoginTests() {
  console.log("🚀 Starting Comprehensive Login Tests")
  console.log("=".repeat(50))

  const results = {
    customerLogin: false,
    businessLogin: false,
    invalidCredentials: false,
    inputValidation: false,
  }

  // Test customer login
  results.customerLogin = await testCustomerLogin()

  // Test business login
  results.businessLogin = await testBusinessLogin()

  // Test invalid credentials
  results.invalidCredentials = await testInvalidCredentials()

  // Test input validation
  results.inputValidation = await testInputValidation()

  // Summary
  console.log("\n" + "=".repeat(50))
  console.log("📋 TEST SUMMARY")
  console.log("=".repeat(50))

  const tests = [
    { name: "Customer Login", passed: results.customerLogin },
    { name: "Business Login", passed: results.businessLogin },
    { name: "Invalid Credentials Rejection", passed: results.invalidCredentials },
    { name: "Input Validation", passed: results.inputValidation },
  ]

  tests.forEach((test) => {
    const status = test.passed ? "✅ PASS" : "❌ FAIL"
    console.log(`   ${status} - ${test.name}`)
  })

  const totalPassed = tests.filter((t) => t.passed).length
  const totalTests = tests.length

  console.log("\n📊 OVERALL RESULTS:")
  console.log(`   Tests Passed: ${totalPassed}/${totalTests}`)
  console.log(`   Success Rate: ${Math.round((totalPassed / totalTests) * 100)}%`)

  if (totalPassed === totalTests) {
    console.log("\n🎉 ALL TESTS PASSED! Authentication system is working correctly!")
  } else {
    console.log("\n⚠️  Some tests failed. Please review the issues above.")
  }

  return {
    passed: totalPassed,
    total: totalTests,
    results: results,
  }
}

// Run all tests automatically
runAllLoginTests()
  .then((summary) => {
    console.log("\n🏁 Testing completed!")

    // Make functions available globally for manual testing
    if (typeof window !== "undefined") {
      window.testCustomerLogin = testCustomerLogin
      window.testBusinessLogin = testBusinessLogin
      window.testInvalidCredentials = testInvalidCredentials
      window.runAllLoginTests = runAllLoginTests

      console.log("\n🔧 Manual test functions available:")
      console.log("   window.testCustomerLogin()")
      console.log("   window.testBusinessLogin()")
      console.log("   window.testInvalidCredentials()")
      console.log("   window.runAllLoginTests()")
    }
  })
  .catch((error) => {
    console.error("💥 Test suite error:", error)
  })
