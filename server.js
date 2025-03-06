const express = require('express');
const path = require('path');
const fs = require('fs'); // Import the 'fs' module

const app = express();
const port = 3000;
const logFilePath = path.join(__dirname, 'requests.log'); // Path to the log file

// Middleware to log all requests
app.use((req, res, next) => {
    const requestData = {
        timestamp: new Date().toISOString(),
        method: req.method,
        url: req.url,
        headers: req.headers,
        ip: req.ip || req.socket.remoteAddress,
    };

    if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
        let bodyContent = '';
        req.on('data', (chunk) => {
            bodyContent += chunk;
        });
        req.on('end', () => {
            requestData.body = bodyContent;
            const logMessage = `--- Request Log Start ---\n${JSON.stringify(requestData, null, 2)}\n--- Request Log End ---\n`;

            // Log to console
            console.log(logMessage);

            // Log to file
            fs.appendFile(logFilePath, logMessage, (err) => {
                if (err) {
                    console.error('Error writing to log file:', err); // Log file writing errors to console
                }
            });
            next();
        });
    } else {
        const logMessage = `--- Request Log Start ---\n${JSON.stringify(requestData, null, 2)}\n--- Request Log End ---\n`;

        // Log to console
        console.log(logMessage);

        // Log to file
        fs.appendFile(logFilePath, logMessage, (err) => {
            if (err) {
                console.error('Error writing to log file:', err); // Log file writing errors to console
            }
        });
        next();
    }
});

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
    console.log(`Logs will be written to: ${logFilePath}`); // Inform user about log file
});