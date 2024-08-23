const User = require('../models/userSchema');

// Existing functions...

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    return res.status(200).json({ msg: "user found", user });
  } catch (error) {
    res.status(500).json({ msg: 'Server error occurred' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { firstName, lastName },
      { new: true }
    );
    return res.status(200).json({ msg: "Profile Updated", user });
  } catch (error) {
    res.status(500).json({ msg: 'Server error occurred' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const userList = await User.find({role:"user"});
    return res.status(200).json({ msg: "Users fetched successfully", userList });
  } catch (error) {
    res.status(500).json({ msg: 'Server error occurred' });
  }
};

// New functions to block and unblock users
exports.blockUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndUpdate(userId, { isBlocked: true });
    return res.status(200).json({ msg: "User blocked successfully" });
  } catch (error) {
    res.status(500).json({ msg: 'Server error occurred' });
  }
};

exports.unblockUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndUpdate(userId, { isBlocked: false });
    return res.status(200).json({ msg: "User unblocked successfully" });
  } catch (error) {
    res.status(500).json({ msg: 'Server error occurred' });
  }
};
