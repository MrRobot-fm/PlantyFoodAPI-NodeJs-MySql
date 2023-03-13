const User = require('../models/user');
const Product = require('../models/product');
const Order = require('../models/order');

// Get All Orders
const orders_get_all = async (req, res) => {
  try {
    const orderList = await Order.findAll();

    if (!orderList || orderList.length === 0) {
      return res.status(404).send('Orders not found');
    }

    res.status(200).json({ message: 'All the orders', orders: orderList });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Order By Id
const orders_by_id_get = async (req, res) => {
  try {
    const find = await Order.findOne({
      where: {
        orderId: req.params.orderId
      }
    });

    if (!find || find.length === 0) {
      return res.status(404).send('Order not found');
    }

    res.status(200).json({ message: 'Order by id', order: find });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Orders by Date
const orders_by_date_get = async (req, res) => {
  try {
    const find = await Order.findAll({
      where: {
        createdAt: req.query.date
      }
    });

    if (!find || find.length === 0) {
      return res.status(404).json({ message: 'Orders not found' });
    }

    res.status(200).json({ message: 'Orders by date', orders: find });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Orders by Product
const orders_by_product_get = async (req, res) => {
  try {
    const find = await Order.findAll({
      where: {
        product_name: req.query.product
      }
    });

    if (!find || find.length === 0) {
      return res.status(404).json({ message: 'Orders not found' });
    }

    res.status(200).json({ message: 'Orders by product', orders: find });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Orders by User
const orders_by_user_get = async (req, res) => {
  try {
    const find = await Order.findAll({
      where: {
        user_name: req.query.user
      }
    });

    if (!find || find.length === 0) {
      return res.status(404).json({ message: 'Orders not found' });
    }

    res.status(200).json({ message: 'Orders by user', orders: find });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Orders by ProductId
const orders_by_product_id_get = async (req, res) => {
  try {
    const find = await Order.findAll({
      where: {
        ProductId: req.params.productId
      }
    });

    if (!find || find.length === 0) {
      return res.status(404).json({ message: 'Orders not found' });
    }

    res.status(200).json({ message: 'Orders by product ID', orders: find });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Orders by UserId
const orders_by_user_id_get = async (req, res) => {
  try {
    const find = await Order.findAll({
      where: {
        UserId: req.params.userId
      }
    });

    if (!find || find.length === 0) {
      return res.status(404).json({ message: 'Orders not found' });
    }

    res.status(200).json({ message: 'Orders by user ID', orders: find });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create New Order
const create_order_post = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        firstName: req.body.orderUserName
      }
    });

    if (!user || user.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const product = await Product.findOne({
      where: {
        product: req.body.orderProduct
      }
    });

    if (!product || product.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const orderCreated = await Order.create({
      product_name: product.dataValues.product,
      user_name: user.dataValues.firstName,
      UserId: user.dataValues.id,
      ProductId: product.dataValues.id
    });

    res
      .status(201)
      .json({ message: 'Order created!', orderCreated: orderCreated });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }

  // await user.addProduct(product);
};

// Create New Order without an existing user and product
const order_create_userAndProduct_post = async (req, res) => {
  try {
    const orderCreate = await Order.create({
      user_name: req.body.userName,
      product_name: req.body.productName
    });
    const order = await Order.findOne({
      where: {
        user_name: req.body.userName,
        product_name: req.body.productName
      }
    });

    if (!order || order.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const createUser = await order.createUser({
      firstName: req.body.userName,
      lastName: req.body.lastName,
      email: req.body.email
    });

    const createProduct = await order.createProduct({
      product: req.body.productName
    });

    res.status(201).json({
      message: 'Order, user and product created!',
      orderCreated: orderCreate
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Order Information
const order_update_patch = async (req, res) => {
  try {
    const order = await Order.findOne({
      where: {
        orderId: req.params.orderId
      }
    });

    if (!order || order.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (req.body.userUpdated && !req.body.productUpdated) {
      const updateOrder = await order.update({
        user_name: req.body.userUpdated
      });

      const findUser = await User.findOne({
        where: {
          id: order.dataValues.UserId
        }
      });

      if (!findUser || findUser.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      const updateUser = await findUser.update({
        firstName: req.body.userUpdated,
        lastName: req.body.lastNameUpdated,
        email: req.body.emailUpdated
      });

      return res
        .status(201)
        .json({ message: 'Order updated!', orderUpdated: updateOrder });
    }

    if (!req.body.userUpdated && req.body.productUpdated) {
      const updateOrder = await order.update({
        product_name: req.body.productUpdated
      });

      const findProduct = await Product.findOne({
        where: {
          id: order.dataValues.ProductId
        }
      });

      if (!findProduct || findProduct.length === 0) {
        return res.status(404).json({ message: 'Product not found' });
      }

      const updateProduct = await findProduct.update({
        product: req.body.productUpdated
      });

      return res
        .status(201)
        .json({ message: 'Order updated!', updatedOrder: updateOrder });
    }

    if (req.body.userUpdated && req.body.productUpdated) {
      const updateOrder = await order.update({
        user_name: req.body.userUpdated,
        product_name: req.body.productUpdated
      });

      const findUser = await User.findOne({
        where: {
          id: order.dataValues.UserId
        }
      });

      if (!findUser || findUser.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      const updateUser = await findUser.update({
        firstName: req.body.userUpdated,
        lastName: req.body.lastNameUpdated,
        email: req.body.emailUpdated
      });

      const findProduct = await Product.findOne({
        where: {
          id: order.dataValues.ProductId
        }
      });

      if (!findProduct || findProduct.length === 0) {
        return res.status(404).json({ message: 'Product not found' });
      }

      const updateProduct = await findProduct.update({
        product: req.body.productUpdated
      });

      return res.status(201).json({
        message: 'Order updated!',
        orderUpdated: updateOrder
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Order
const order_delete = async (req, res) => {
  try {
    const order = await Order.findOne({
      where: {
        orderId: req.params.orderId
      }
    });

    const deletedOrder = await order.destroy();

    res.status(202).json({
      message: 'Order successfully deleted',
      orderDeleted: deletedOrder
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  orders_get_all,
  orders_by_id_get,
  create_order_post,
  orders_by_date_get,
  orders_by_product_get,
  orders_by_user_get,
  orders_by_user_id_get,
  orders_by_product_id_get,
  order_create_userAndProduct_post,
  order_update_patch,
  order_delete
};
