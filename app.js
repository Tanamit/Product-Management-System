const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const products = [
    {
      id: 1,
      name: 'Product 1',
      category: 'Category A',
      price: 19.99,
      stock: 50,
    },
    {
      id: 2,
      name: 'Product 2',
      category: 'Category B',
      price: 29.99,
      stock: 30,
    },
  ];
  

// Add new product 
app.post('/products', (req, res) => {
    const { name, category, price, stock } = req.body;
    if (!name || !category || !price || !stock) {
      return res.status(400).json({ error: 'Please make suer that the data is complete.' });
    }
    const product = { id: products.length +1 , name, category, price, stock };
    products.push(product);  
    res.status(201).json(product);
  });

// View products
  app.get('/products', (req, res) => {
    res.json(products);
  });

// Edit product
app.put('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const { name, category, price, stock } = req.body;
    const product = products.find((p) => p.id == productId);
    
    if (!product) {
        return res.status(404).json({ error: 'Product not found!' });
    }

    if (name !== undefined) {
        product.name = name;
    }
    if (category !== undefined) {
        product.category = category;
    }
    if (price !== undefined) {
        product.price = price;
    }
    if (stock !== undefined) {
        product.stock = stock;
    }

    res.json(product);
});


// Delete product
app.delete('/products/:id', (req, res) => {
    const index = products.findIndex(
        product => product.id === parseInt(req.params.id));
    if(index === -1) {
        return res.status(404).json({ error: 'Product not found!'});
    }
    products.splice(index, 1);
    res.status(204).send();
});

app.listen(port, () => {
    console.log('Server listening on port: ' + port);
})