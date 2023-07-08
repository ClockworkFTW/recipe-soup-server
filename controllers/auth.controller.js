async function register(req, res) {
  res.send({ message: "register" });
}

async function login(req, res) {
  res.send({ message: "login" });
}

async function logout(req, res) {
  res.send({ message: "logout" });
}

export default {
  register,
  login,
  logout,
};
