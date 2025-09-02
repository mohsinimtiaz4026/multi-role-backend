// services
const { userServices } = require("../services");
// schemas
const { userSchema } = require("../schemas");
// utils
const { jwtUtils } = require("../utils");

module.exports = {
  registerUser: async (req, res) => {
    try {
      const { body } = req;
      const { error } = await userSchema.validateCreateRequest({ body });
      if (error) {
        return res.status(404).send("Please fill all fields");
      } else {
        const { success } = await userServices.getUserByEmail({ body });
        if (success) {
          return res.status(200).send("User Already Exist!");
        } else {
          const {
            success: createSuccess,
            error,
            user,
          } = await userServices.createUser({
            body,
          });
          if (createSuccess) {
            const token = jwtUtils.signToken({
              userId: user.id,
            });
            res.cookie("token", token, {
              httpOnly: true,
              secure: false,
              maxAge: 259200000,
            });
            return res
              .status(201)
              .send({ message: "Register Successfully", user, token });
          } else {
            return res.status(400).send(error);
          }
        }
      }
    } catch (error) {
      return res.status(500).send("internal server error");
    }
  },
  loginUser: async (req, res) => {
    try {
      const { body } = req;
      const { error } = await userSchema.validateLoginRequest({ body });
      if (error) {
        return res.status(404).send("Please fill all fields");
      } else {
        const { success, user } =
          await userServices.loginUserByEmailAndPassword({ body });
        if (user.blocked) {
          return res.status(200).send({ message: "User is block by admin" });
        } else {
          if (success) {
            return res
              .status(200)
              .send({ message: "Login Successfully!", user });
          } else {
            return res.status(404).send({ message: "Wrong Credentials" });
          }
        }
      }
    } catch (error) {
      return res.status(500).send("internal server error");
    }
  },
  updateUserRequest: async (req, res) => {
    try {
      const { body } = req;
      const { error } = await userSchema.validateUpdateRequest({ body });
      if (error) {
        return res.status(404).send({ message: "Please fill all fields" });
      } else {
        const { success, user } = await userServices.updateUserById({ body });
        if (success) {
          return res
            .status(200)
            .send({ message: "Update Profile Successfully", user });
        } else {
          return res.status(404).send({ message: "No User Found!" });
        }
      }
    } catch (error) {
      return res.status(500).send({ message: "internal server error" });
    }
  },
  deleteUserRequest: async (req, res) => {
    try {
      const { body } = req;
      const { error } = await userSchema.validateDeleteRequest({ body });
      if (error) {
        return res.status(404).send({ message: "Please fill all fields" });
      } else {
        const { success } = await userServices.deleteUserById({ body });
        if (success) {
          return res.status(404).send({ message: "User Deleted Successfully" });
        } else {
          return res.status(404).send({ message: "No User Found!" });
        }
      }
    } catch (error) {
      return res.status(500).send({ message: "internal server error" });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const { success, user } = await userServices.getUsers();
      if (success) {
        return res
          .status(200)
          .send({ message: "Users Fetched Successfully!", user });
      } else {
        return res.status(404).send({ message: "No Users Found!" });
      }
    } catch (error) {
      return res.status(500).send({ message: "internal server error" });
    }
  },
};
