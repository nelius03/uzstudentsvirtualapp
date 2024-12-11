const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors'); // For handling CORS

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));



// Middleware
app.use(bodyParser.json()); // For parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // Enable CORS
app.use(session({
    secret: 'my123455_secret_key',
    resave: false,
    saveUninitialized: true,
}));

// MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'virtualapp'
});

// Connect to MySQL
connection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

/*db.connect((err) => {
    if (err) throw err;
    console.log('MySQL connected...');
});*/


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/reg', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

// API Routes

app.post('/register', (req, res) => {
    const { username, email, regnumber, password } = req.body;

    // Check if the user already exists
    const checkUserQuery = 'SELECT * FROM users WHERE username = ?';
    connection.query(checkUserQuery, [username], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length > 0) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Insert new user
        const query = 'INSERT INTO users (username, email, regnumber, password) VALUES (?, ?, ?, ?)';
        connection.query(query, [username, email, regnumber, password], (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ username, email, regnumber });
        });
    });
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Query to find user
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    connection.query(query, [username, password], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        req.session.user = username;
        // Successful login
        res.json({ message: 'Login successful' });
    });
    
});

// Logout
app.get('/api/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ error: 'Error logging out.' });
        }
        res.status(200).json({ message: 'Logged out successfully!' });
    });
});

// Endpoint to handle bot responses
app.post('/api/bot', (req, res) => {
    const userText = req.body.message; // Assuming you're sending the message in the body
    const normalizedText = userText.toLowerCase();

    // Define responses for specific queries
    const responses = {
        menu: "Here are your options:<br>1. Faculty Chairpersons<br>2. Events<br>3. Directions<br>4. Missing Results<br>5. Fees",
        events: "You selected Events. Check our events page for more details.",
        directions: "You selected Directions. Please visit our 'Contact Us' page.",
        missingResults: "You selected Missing Results. Your request has been forwarded.",
        fees: "You selected Fees. The current fees can be found on our website."
    };

    if (normalizedText.includes('menu')) {
        return res.json({ response: responses.menu });
    } else if (normalizedText.includes('faculties') || normalizedText.includes('chairpersons')) {
        connection.query('SELECT name, email, faculty FROM faculty_chairpersons', (err, results) => {
            if (err) {
                console.error(err);
                return res.json({ response: "Sorry, I couldn't fetch the faculty chairpersons at the moment." });
            }

            if (results.length === 0) {
                return res.json({ response: "No faculty chairpersons found." });
            }

            let facultyList = '<strong>Faculties and Chairpersons:</strong><div class="faculty-list">';
            results.forEach(row => {
                facultyList += `<div class="faculty-item">${row.name} - <a href="mailto:${row.email}">${row.email}</a> (${row.faculty})</div>`;
            });
            facultyList += '</div>';

            return res.json({ response: facultyList });
        });
    } else if (normalizedText.includes('events')) {
        return res.json({ response: responses.events });
    } else if (normalizedText.includes('directions')) {
        return res.json({ response: responses.directions });
    } else if (normalizedText.includes('missing results')) {
        return res.json({ response: responses.missingResults });
    } else if (normalizedText.includes('fees')) {
        return res.json({ response: responses.fees });
    } else {
        // Handle numeric selection
        const numericSelection = parseInt(userText, 10);
        if (!isNaN(numericSelection) && numericSelection > 0 && numericSelection <= 5) {
            switch (numericSelection) {
                case 1:
                    connection.query('SELECT name, email, faculty FROM faculty_chairpersons', (err, results) => {
                        if (err) {
                            console.error(err);
                            return res.json({ response: "Sorry, I couldn't fetch the faculty chairpersons at the moment." });
                        }

                        if (results.length === 0) {
                            return res.json({ response: "No faculty chairpersons found." });
                        }

                        let facultyList = '<strong>Faculties and Chairpersons:</strong><div class="faculty-list">';
                        results.forEach(row => {
                            facultyList += `<div class="faculty-item">${row.name} - <a href="mailto:${row.email}">${row.email}</a> (${row.faculty})</div>`;
                        });
                        facultyList += '</div>';

                        return res.json({ response: facultyList });
                    });
                    break;
                case 2:
                    return res.json({ response: responses.events });
                case 3:
                    return res.json({ response: responses.directions });
                case 4:
                    return res.json({ response: responses.missingResults });
                case 5:
                    return res.json({ response: responses.fees });
                default:
                    return res.json({ response: "I didn't understand that selection." });
            }
        } else {
            return res.json({ response: "I'm here to help! Can you please specify your question or type 'menu' for options?" });
        }
    }
});

app.get('/virtualassist', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'virtualassist.html'));
});



// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});