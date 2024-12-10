const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

// ใช้ middleware
app.use(cors({
  origin: 'http://localhost:4200', // URL ของ Angular app
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());

// ตั้งค่าการเชื่อมต่อฐานข้อมูล
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',           // เปลี่ยนเป็น username ของคุณ
  password: 'P@ssw0rd',           // เปลี่ยนเป็น password ของคุณ
  database: 'Projectcs' // เปลี่ยนเป็นชื่อฐานข้อมูล
});

// เชื่อมต่อฐานข้อมูล
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to the database');
});

// API: ดึงข้อมูลพนักงานทั้งหมด
app.get('/employees', (req, res) => {
  const query = 'SELECT * FROM Employees';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching employees');
    } else {
      res.json(results);
    }
  });
});

// API: เพิ่มข้อมูลพนักงานใหม่
app.post('/api/employees', (req, res) => {
  const { employee_id, first_name, last_name, position, hire_date, salary, factory_id } = req.body;
  const query = `INSERT INTO Employees (employee_id, first_name, last_name, position, hire_date, salary, factory_id)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.query(query, [employee_id, first_name, last_name, position, hire_date, salary, factory_id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error adding employee');
    } else {
      res.status(201).send('Employee added successfully');
    }
  });
});
// API: ลบข้อมูลพนักงาน
app.delete('/api/employees/:id', (req, res) => {
  const employeeId = req.params.id;
  const query = 'DELETE FROM Employees WHERE employee_id = ?';

  db.query(query, [employeeId], (err, result) => {
    if (err) {
      console.error('Error deleting employee:', err);
      res.status(500).json({ error: 'Failed to delete employee' });
    } else {
      console.log('Employee deleted:', result);
      res.status(200).json({ message: 'Employee deleted successfully' });
    }
  });
});
app.put('/api/employees/:id', (req, res) => {
  const employeeId = req.params.id;
  const { first_name, last_name, position, hire_date, salary, factory_id } = req.body;

  const query = `
    UPDATE Employees
    SET first_name = ?, last_name = ?, position = ?, hire_date = ?, salary = ?, factory_id = ?
    WHERE employee_id = ?
  `;

  db.query(query, [first_name, last_name, position, hire_date, salary, factory_id, employeeId], (err, result) => {
    if (err) {
      console.error('Error updating employee:', err);
      res.status(500).send('Error updating employee');
    } else {
      console.log('Employee updated successfully');
      res.status(200).send('Employee updated successfully');
    }
  });
});
// เริ่มเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

//database factory
// API: ดึงข้อมูลพนักงานทั้งหมด
app.get('/factories', (req, res) => {
  const query = 'SELECT * FROM Factories';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching Factories');
    } else {
      res.json(results);
    }
  });
});

// API: เพิ่มข้อมูลพนักงานใหม่
app.put('/api/factories/:id', (req, res) => {
  const factoryId = req.params.id; // factory_id ที่ใช้ใน WHERE
  const { factory_name, location, established_year, contact_number, email } = req.body;

  const query = `
    UPDATE Factories
    SET factory_name = ?, location = ?, established_year = ?, contact_number = ?, email = ?
    WHERE factory_id = ?
  `;

  // พารามิเตอร์ต้องเรียงลำดับให้ตรงกับคำสั่ง SQL
  db.query(query, [factory_name, location, established_year, contact_number, email, factoryId], (err, result) => {
    if (err) {
      console.error('Error updating factories:', err);
      res.status(500).send('Error updating factories');
    } else {
      console.log('Factories updated successfully');
      res.status(200).send('Factories updated successfully');
    }
  });
});

// API: ลบข้อมูลพนักงาน
app.delete('/api/factories/:id', (req, res) => {
  const factoryId = req.params.id;
  const query = 'DELETE FROM Factories WHERE factory_id = ?';

  db.query(query, [factoryId], (err, result) => {
    if (err) {
      console.error('Error deleting factories:', err);
      res.status(500).json({ error: 'Failed to delete factories' });
    } else {
      console.log('Factories deleted:', result);
      res.status(200).json({ message: 'Factories deleted successfully' });
    }
  });
});
app.put('/api/factories/:id', (req, res) => {
  const factoryId = req.params.id;
  const { factory_name, location, established_year, contact_number, email } = req.body;

  const query = `
    UPDATE Factories
    SET factory_id = ?,factory_name = ?, location = ?, established_year = ?, contact_number = ?, email = ?
    WHERE factory_id = ?
  `;

  db.query(query, [factoryId, factory_name, location, established_year, contact_number, email], (err, result) => {
    if (err) {
      console.error('Error updating factories:', err);
      res.status(500).send('Error updating factories');
    } else {
      console.log('Factories updated successfully');
      res.status(200).send('Factories updated successfully');
    }
  });
});

//database product
app.get('/product', (req, res) => {
  const sql = 'SELECT * FROM product';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// API สำหรับเพิ่มสินค้า
app.post('/api/product', (req, res) => {
  const { product_id,product_name, category, price, quantity_in_stock, factory_id } = req.body;
  const sql = `INSERT INTO product (product_id,product_name, category, price, quantity_in_stock, factory_id)
               VALUES (?,?, ?, ?, ?, ?)`;
  db.query(sql, [product_id,product_name, category, price, quantity_in_stock, factory_id], (err, result) => {
    if (err) {
        console.error(err);
        res.status(500).send(err);
    }
    res.json({ message: 'product added successfully', productId: result.insertId });
  });
});

// API สำหรับแก้ไขสินค้า
app.put('/api/product/:id', (req, res) => {
  const { id } = req.params;
  const { product_id,product_name, category, price, quantity_in_stock, factory_id } = req.body;
  const sql = `UPDATE product 
               SET product_id = ?,product_name = ?, category = ?, price = ?, quantity_in_stock = ?, factory_id = ?
               WHERE product_id = ?`;
  db.query(sql, [product_id,product_name, category, price, quantity_in_stock, factory_id, id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ message: 'Product updated successfully' });
  });
});

// API สำหรับลบสินค้า
app.delete('/api/product/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM product WHERE product_id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ message: 'Product deleted successfully' });
  });
});


//database company
app.get('/companies', (req, res) => {
  const sql = 'SELECT * FROM companies';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// API สำหรับเพิ่มสินค้า
app.post('/api/companies', (req, res) => {
  const { company_id,company_name, address, contact_number, email, website } = req.body;
  const sql = `INSERT INTO companies (company_id,company_name, address, contact_number, email, website)
               VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(sql, [company_id,company_name, address, contact_number, email, website], (err, result) => {
    if (err) {
        console.error(err);
        res.status(500).send(err);
    }
    res.json({ message: 'company added successfully', companyId: result.insertId });
  });
});

// API สำหรับแก้ไขสินค้า
app.put('/api/companies/:id', (req, res) => {
  const { companyid } = req.params;
  const { company_id,company_name, address, contact_number, email, website } = req.body;
  const sql = `UPDATE companies 
               SET company_id = ?,company_name = ?, address = ?, contact_number = ?, email = ?, website = ?
               WHERE company_id = ?`;
  db.query(sql, [companyid,company_name, address, contact_number, email, website], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ message: 'Company updated successfully' });
  });
});

// API สำหรับลบสินค้า
app.delete('/api/companies/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM companies WHERE company_id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ message: 'company deleted successfully' });
  });
});
