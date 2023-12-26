const userModel = require('../models/userModel');

//add new user to the database
const addUser = async (req, res) => {
  try {
    let usersToAdd = req.body;

    // If it's a single user, convert it to an array for uniform handling
    if (!Array.isArray(usersToAdd)) {
      usersToAdd = [usersToAdd];
    }

    // Insert users into the database
    const insertedUsers = await userModel.insertMany(usersToAdd);

    res.json(insertedUsers);
  } catch (error) {
    console.error('Error adding user(s):', error.message);
    res.status(500).json({ error: error.message });
  }
};

//Fetch list of all users from database
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await userModel.find();
    res.json(allUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Check if user has already paid
const checkPaymentStatus = async (req, res) => {
  try {
    const { mobile } = req.body;
    const user = await userModel.findOne({ mobile });

    if (user) {
      res.json({ hasPaid: true, paymentDate: user.createdAt });
    } else {
      res.json({ hasPaid: false, paymentDate: null });
    }
  } catch (error) {
    console.error('Error checking payment status:', error.message);
    res.status(500).json({ error: error.message });
  }
};

//Fetch payment details of a user from database
const getReceiptDetails = async (req, res) => {
  try {
    const { mobile } = req.params;
    const receiptDetails = await userModel.findOne({ mobile });

    if (receiptDetails) {
      res.json(receiptDetails);
    } else {
      res.status(404).json({ error: 'Receipt details not found for the provided mobile number.' });
    }
  } catch (error) {
    console.error('Error fetching receipt details:', error.message);
    res.status(500).json({ error: error.message });
  }
};

//Update user
const editUser = async (req, res) => {
  try {
      const { _id } = req.body;
      const updatedUser = await userModel.findByIdAndUpdate(_id, req.body, { new: true });
      res.json(updatedUser);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

//Delete users
const deleteUsers = async (req, res) => {
  try {
    const { ids } = req.body;
    let query;

    console.log(ids.length);

    // Check how the query is constructed based on the length of ids
    (ids.length > 1 ? query = { _id: { $in: ids } } : query = { _id: ids });
    console.log('Query:', query);

    const deletedUsers = await userModel.deleteMany(query);
    res.json(deletedUsers);
  } catch (error) {
    console.error('Error deleting user(s):', error);
    res.status(500).json({ error: error.message });
  }
}



module.exports = {
  addUser,
  getAllUsers,
  editUser,
  deleteUsers,
  checkPaymentStatus,
  getReceiptDetails
}