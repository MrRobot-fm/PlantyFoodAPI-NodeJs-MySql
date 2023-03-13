const Product = require('../models/product');
const Order = require('../models/order');

// Get All Products
const product_get_all = async (req, res) => {
  try {
    const product = await Product.findAll();

    if (!product || product.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'All the products', products: product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get Product By ID
const product_by_id_get = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.productId
      }
    });

    if (!product || product.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product by ID', product: product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get Product By Product Name
const product_by_name_get = async (req, res) => {
  try {
    const product = await Product.findAll({
      where: {
        product: req.query.name
      }
    });

    if (!product || product.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product by name', products: product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create New Product
const create_product_post = async (req, res) => {
  try {
    const product = await Product.create({
      product: req.body.product
    });

    res.status(201).json({ message: 'Product created!', newOrder: product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Product & Order Information
const product_update_patch = async (req, res) => {
  try {
    const findProduct = await Product.findOne({
      where: {
        id: req.params.productId
      }
    });

    if (!findProduct || findProduct.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const updateProduct = await findProduct.update({
      product: req.body.productUpdated
    });

    const findOrder = await Order.findOne({
      product_name: findProduct.dataValues.id
    });

    if (!findOrder || findOrder.length === 0) {
      return res
        .status(404)
        .json({ message: 'Order not found, only product updated' });
    }
    const updateOrder = await findOrder.update({
      product_name: req.body.productUpdated
    });

    res
      .status(200)
      .json({ message: 'Product updated!', productUpdated: updateProduct });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Product & Order
const product_delete = async (req, res) => {
  try {
    const findProduct = await Product.findOne({
      where: {
        id: req.params.productId
      }
    });

    if (!findProduct || findProduct.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const deleteProduct = await findProduct.destroy();

    res
      .status(202)
      .json({ message: 'Product deleted!', deletedProduct: deleteProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  product_get_all,
  product_by_id_get,
  product_by_name_get,
  create_product_post,
  product_update_patch,
  product_delete
};
