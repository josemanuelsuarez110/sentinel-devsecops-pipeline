const express = require('express')
const app = express()
const port = process.env.PORT || 3000

// Security header middleware (basic implementation)
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('X-XSS-Protection', '1; mode=block')
  next()
})

app.get('/', (req, res) => {
  res.send('<h1>Secure Node.js App</h1><p>Status: Online</p>')
})

// Vulnerable route example for DAST (optional, for demo)
app.get('/vulnerable', (req, res) => {
  const name = req.query.name || 'Guest'
  res.send(`<h1>Hello, ${name}</h1>`) // Potential XSS if not careful, good for ZAP detection demo
})

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`)
})
