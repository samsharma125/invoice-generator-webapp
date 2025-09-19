Invoice Generator Web Application
Project Overview
Invoice Generator is a full-stack web application that allows users to create and manage customer invoices with dynamic input. It features both Tax and Commercial invoice types with conditional fields and GST calculation logic handled on the backend. The app persists invoice data in a MySQL database through a Node.js API.

Features
Customer and Invoice Details:
Includes customer name input and an invoice type selection between Tax Invoice and Commercial Invoice.

Conditional Input Fields:
Displays Company Name and GST Number fields only when Tax Invoice is selected.

Dynamic Product Entry:
Users can add or remove multiple product entries, each with Product Name, Quantity, and Price.

GST Calculation:
Backend calculates GST at 18% for Tax Invoices and zero GST for Commercial Invoices.

Database Persistence:
Saves all invoice, customer, and product data securely in a MySQL database.

API Design:
RESTful Node.js backend handles business logic and database operations.

Technology Stack
Frontend:
HTML, CSS, Vanilla JavaScript for a responsive dynamic invoice form.

Backend:
Node.js with Express.js REST API for handling requests and business rules.

Database:
MySQL for persistent storage of customers, invoices, and products.

Installation and Setup
Prerequisites
Node.js installed (version 14+ recommended)

MySQL server installed with a database created for the app

