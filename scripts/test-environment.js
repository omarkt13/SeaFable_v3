console.log("Hello from the Node.js environment!")
try {
  const os = require("os")
  console.log(`OS Type: ${os.type()}`)
} catch (e) {
  console.log(`Error loading 'os' module: ${e.message}`)
}
