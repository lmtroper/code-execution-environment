use db;

CREATE TABLE submissions(
    id INT AUTO_INCREMENT PRIMARY KEY,
    code TEXT NOT NULL,
    output_code TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
