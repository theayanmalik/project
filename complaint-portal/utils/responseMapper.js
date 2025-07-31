
const mapUserResponse = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
});

module.exports = {
  mapUserResponse,
};
