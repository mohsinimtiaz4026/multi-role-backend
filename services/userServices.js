// models
const User = require("../models/User");
// mongoose
const mongoose = require("mongoose");
// utils
const { passwordUtils } = require("../utils");
// helpers
const { userEntities } = require("../helpers");

module.exports = {
  createUser: async ({ body: { fullname, email, password } }) => {
    try {
      const hashedPassword = await passwordUtils.saltHashPassword(password);
      const user = await User.create({
        fullname,
        email,
        password: hashedPassword,
      });
      await user.save();
      if (user) {
        return {
          success: true,
          user: userEntities.cleanUserObject({ user }),
        };
      } else {
        return {
          success: false,
          user,
        };
      }
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  },
  getUserByEmail: async ({ body: { email } }) => {
    try {
      const user = await User.findOne({
        email,
      });
      if (user) {
        return {
          success: true,
          user,
        };
      } else {
        return {
          success: false,
          user: userEntities.cleanUserObject({ user }),
        };
      }
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  },
  loginUserByEmailAndPassword: async ({ body: { email, password } }) => {
    try {
      const user = await User.findOne({
        email,
      });
      const comparePassword = await passwordUtils.comparePassword(
        password,
        user.password
      );
      if (comparePassword) {
        return {
          success: true,
          user: userEntities.cleanUserObject({ user }),
        };
      } else {
        return {
          success: false,
          user,
        };
      }
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  },
  updateUserById: async ({ body: { id, fullname, email } }) => {
    try {
      let condition = {
        _id: id,
      };
      const user = await User.findOneAndUpdate(
        condition,
        {
          fullname,
          email,
        },
        { new: true }
      );
      if (user) {
        return {
          success: true,
          user: userEntities.cleanUserObject({ user }),
        };
      } else {
        return {
          success: false,
          user,
        };
      }
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  },
  deleteUserById: async ({ body: { id } }) => {
    try {
      const user = await User.findOneAndDelete(id);
      if (user) {
        return {
          success: true,
          user,
        };
      } else {
        return {
          success: false,
          user,
        };
      }
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  },
  getUsers: async () => {
    try {
      const allUsers = await User.find({});
      if (allUsers) {
        return {
          success: true,
          user: userEntities.cleanUsersObjectArray({ users: allUsers }),
        };
      } else {
        return {
          success: false,
          users: [],
        };
      }
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  },
};
