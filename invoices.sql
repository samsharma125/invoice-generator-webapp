-- invoices.sql
CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    company_name VARCHAR(255),
    gst_number VARCHAR(64)
);

CREATE TABLE invoices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    invoice_type ENUM('tax', 'commercial'),
    subtotal FLOAT,
    gst FLOAT,
    total FLOAT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    invoice_id INT,
    name VARCHAR(255),
    quantity INT,
    price FLOAT,
    FOREIGN KEY (invoice_id) REFERENCES invoices(id)
);
