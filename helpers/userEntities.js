const omit = require("lodash/omit");

module.exports = {
  cleanUserObject: ({ user }) => {
    const fieldsToOmit = ["_id", "__v", "password", "createdAt", "updatedAt"];
    return omit({
      id: user.id,
      ...omit(user.toJSON(), fieldsToOmit),
    });
  },
  cleanUsersObjectArray: ({ users }) => {
    const fieldsToOmit = ["_id", "__v", "password", "createdAt", "updatedAt"];
    let cleanUsersObjectArray = [];
    users.map((user) => {
      cleanUsersObjectArray.push(
        omit({
          id: user.id,
          ...omit(user.toJSON(), fieldsToOmit),
        })
      );
    });
    return cleanUsersObjectArray;
  },
};
