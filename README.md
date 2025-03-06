# Simple Node.js SSRF Request Logger

This is a simple Node.js project that serves an `index.html` file and logs all incoming HTTP requests. It is designed to be used as a tool for testing Server-Side Request Forgery (SSRF) vulnerabilities.

## Features

* Serves a basic `index.html` page.
* Logs all incoming requests to the console and to a `requests.log` file.
* Logs detailed request information including:
    * Timestamp
    * HTTP Method
    * Requested URL
    * Request Headers
    * Client IP Address
    * Request Body (for POST, PUT, PATCH requests)

## Setup

1. **Clone the repository:**
```bash
   git clone https://github.com/MuzamilSheikh09/ssrf-logger-node.git
   ```
3. **Install dependencies:**
```bash
npm install
```
3. **Run the server:**
```bash
node server.js
```
 The server will start listening on http://localhost:3000. Logs will be written to the console and to requests.log in the project directory.

## Usage for SSRF Testing

   - Identify potential SSRF points in the application you are testing.
   - You can use Cloudflare Tunnels to test in Public internet
   - Inject the URL of this logger server (e.g., http://your-server-ip:3000 or http://localhost:3000 if testing locally).
   - Observe the logs in your server's console or the requests.log file. If you see a log entry corresponding to a request from the application you are testing, it confirms an SSRF vulnerability.

## Example

You can send a POST request to the logger using curl:
Bash
```bash
curl -X POST -H "Content-Type: application/json" -d '{"test": "data"}' http://localhost:3000/test-post
```
Check the requests.log file to see the details of this request logged.

## Disclaimer

Use this tool for ethical and authorized penetration testing purposes only. Misuse for malicious activities is prohibited.
