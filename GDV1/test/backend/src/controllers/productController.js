const sequelize = require('../sequelize');
const Product = sequelize.models.Product;

// exports.createProduct = async (req, res) => {
//   console.log("Request headers:", req.headers);
//   console.log("Request file:", req.file);
//   const { productName, productPrice, productDes, productSKU, productCategory } = req.body;

//   // Get the image path from the uploaded file
//   const productImage = req.file ? req.file.path : null;

//   try {
//     const product = await Product.create({
//       productName,
//       productPrice,
//       productImage,
//       productDes,
//       productSKU,
//       productCategory,
//     });

//     res.status(201).json({ message: 'Product created successfully', product });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

exports.createProduct = async (req, res) => {
    try {
      const { name, category, description, price } = req.body;
  
      // Create a new product without the productSKU
      const product = await Product.create({
        productName: name,
        productCategory: category,
        productDes: description,
        productPrice: price,
        productImage: req.file.path,
      });
  
      // Generate the productSKU using the product id and category
      const productSKU = category + String(product.id).padStart(3, '0');
  
      // Update the product with the generated productSKU
      const updatedProduct = await product.update({ productSKU });
  
      // Send the updated product as a response
      console.log('Received request body:', req.body);

      res.status(201).json(updatedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

exports.updateProduct = async (req, res) => {
  console.log("Request headers:", req.headers);
  console.log('Request body:', req.body);
  const { id } = req.params;
  const { productName, productPrice, productDes, productSKU, productCategory } = req.body;

  // Get the image path from the uploaded file (if any)
  const productImage = req.file ? req.file.path : null;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.productName = productName;
    product.productPrice = productPrice;
    product.productDes = productDes;
    product.productSKU = productSKU;
    product.productCategory = productCategory;

    // Update the image path only if a new file is uploaded
    if (productImage) {
      product.productImage = productImage;
    }

    await product.save();

    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product retrieved successfully', product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();

    res.status(200).json({ message: 'Products retrieved successfully', products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// get products by ID

exports.getProductById = async (req, res) => {
    try {
      const id = req.params.id;
      const product = await Product.findByPk(id);
  
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching product" });
    }
  };
  