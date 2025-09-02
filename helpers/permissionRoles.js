const roles = {
    admin: ["readAny","createAny","updateAny","deleteAny"],
    editor: ["readAny","createAny","updateAny"],
    user: ["readAny","createAny","updateAny","deleteAny"],
};
module.exports = roles;