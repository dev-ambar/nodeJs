const jwt = require('jsonwebtoken');
const SECRET = "$uperMan@!@#$%^&*";


function generateToken(user)
{
  const payload = {
    id: user._id,
    email:user.email,
    name: user.fullName,
    role: user.role,
  };

  const token = jwt.sign(payload,SECRET);
  return token;
}

function validateToken(token)
{
  const playload =  jwt.verify(token,SECRET)
  return playload;
}

module.exports = {generateToken,validateToken};