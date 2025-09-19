const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',         // update as per my MySQL config
  password: 'satyam125',         // update as per my MySQL config
  database: 'invoice_demo'
});

app.post('/api/create-invoice', async (req, res) => {
  const { customerName, invoiceType, companyName, gstNumber, products } = req.body;

  let customerId;
  try {
    // Save customer
    const customer = await db.query(
      'INSERT INTO customers (name, company_name, gst_number) VALUES (?, ?, ?)',
      [customerName, invoiceType === 'tax' ? companyName : null, invoiceType === 'tax' ? gstNumber : null]
    );
    customerId = customer[0].insertId;

    // Calculate subtotal, GST, total
    let subtotal = products.reduce((acc, p) => acc + (p.quantity * p.price), 0);
    const gst = invoiceType === 'tax' ? subtotal * 0.18 : 0;
    const total = subtotal + gst;

    // Save invoice
    const invoice = await db.query(
      'INSERT INTO invoices (customer_id, invoice_type, subtotal, gst, total) VALUES (?, ?, ?, ?, ?)',
      [customerId, invoiceType, subtotal, gst, total]
    );
    const invoiceId = invoice[0].insertId;

    // Save products
    for (const prod of products) {
      await db.query(
        'INSERT INTO products (invoice_id, name, quantity, price) VALUES (?, ?, ?, ?)',
        [invoiceId, prod.name, prod.quantity, prod.price]
      );
    }

    res.json({ message: 'Invoice created', invoiceId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(4000, () => console.log('Server started on port 4000'));
