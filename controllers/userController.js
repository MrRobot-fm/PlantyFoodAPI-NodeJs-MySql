const User = require('../models/user');
const Order = require('../models/order');

// Helper function
const updateOrderByUser = async (req, res) => {
  const find = await Order.findOne({
    where: {
      UserId: req.params.userId
    }
  });

  if (!find || find.length === 0) {
    return res.status(404).json({ message: 'Order not found' });
  }

  const updateOrder = await find.update({
    user_name: req.body.firstName
  });
};

// Get All Users

const user_get_all = async (req, res) => {
  try {
    const usersList = await User.findAll();
    res.status(200).json({ message: 'All the users', users: usersList });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get User By Id

const user_by_id_get = async (req, res) => {
  try {
    const usersList = await User.findOne({
      where: {
        id: req.params.userId
      }
    });

    if (!usersList || usersList.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User by ID', user: usersList });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get User By firstName
const user_by_name_get = async (req, res) => {
  try {
    const user = await User.findAll({
      where: {
        firstName: req.query.name
      }
    });

    if (!user || user.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'Users by name', users: user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get User By lastName
const user_by_lastname_get = async (req, res) => {
  try {
    const user = await User.findAll({
      where: {
        lastName: req.query.lastname
      }
    });

    if (!user || user.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Users by lastname', users: user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get User By Email
const user_by_email_get = async (req, res) => {
  try {
    const user = await User.findAll({
      where: {
        email: req.query.address
      }
    });

    if (!user || user.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'Users by email', users: user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create New User
const user_create_post = async (req, res) => {
  try {
    const user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    });

    res.status(201).json({ message: 'User created!', userCreated: user });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const user_update_patch = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.userId
      }
    });

    if (!user || user.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (req.body.firstName && req.body.lastName && req.body.email) {
      const update = await user.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
      });

      updateOrderByUser(req, res);

      return res.status(200).json({
        message: 'User firstname, lastname and email updated!',
        userUpdated: update
      });
    }

    if (req.body.firstName && !req.body.lastName && !req.body.email) {
      const update = await user.update({
        firstName: req.body.firstName
      });

      updateOrderByUser(req, res);

      return res
        .status(200)
        .json({ message: 'User firstname updated!', userUpdated: update });
    }

    if (!req.body.firstName && req.body.lastName && !req.body.email) {
      const update = await user.update({
        lastName: req.body.lastName
      });

      return res
        .status(200)
        .json({ message: 'User lastname updated!', userUpdated: update });
    }

    if (!req.body.firstName && !req.body.lastName && req.body.email) {
      const update = await user.update({
        email: req.body.email
      });
      return res
        .status(200)
        .json({ message: 'User email updated!', userUpdated: update });
    }

    if (req.body.firstName && req.body.lastName && !req.body.email) {
      const update = await user.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName
      });

      updateOrderByUser(req, res);

      return res.status(200).json({
        message: 'User firstname and lastname updated!',
        userUpdated: update
      });
    }

    if (req.body.firstName && !req.body.lastName && req.body.email) {
      const update = await user.update({
        firstName: req.body.firstName,
        email: req.body.email
      });

      updateOrderByUser(req, res);

      return res.status(200).json({
        message: 'User firstname adn email updated!',
        userUpdated: update
      });
    }

    if (!req.body.firstName && req.body.lastName && req.body.email) {
      const update = await user.update({
        lastName: req.body.lastName,
        email: req.body.email
      });

      return res.status(200).json({
        message: 'User lastname and email updated!',
        userUpdated: update
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const user_delete = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.userId
      }
    });

    if (!user || user.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const deleteUser = await user.destroy({ truncate: { cascade: true } });

    res.status(202).json({ message: 'User deleted!', userDeleted: deleteUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  user_get_all,
  user_by_id_get,
  user_by_name_get,
  user_by_lastname_get,
  user_by_email_get,
  user_create_post,
  user_update_patch,
  user_delete
};
