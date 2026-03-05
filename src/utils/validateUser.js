function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}


module.exports = {
  validateEmail,
};


// Valid input
// {
//   "name": "Ayachi Oumaima",
//   "email": "ayachi@example.com",
//   "phone": "+12345678901",
//   "password": "mypassword123"
// }
// email: valid format
// phone: 10 digits with optional +countrycode
// password: at least 6 characters
// This should pass all validations.


// Invalid phone
// {
//   "name": "Ayachi Oumaima",
//   "email": "ayachi@example.com",
//   "phone": "12345",
//   "password": "mypassword123"
// }
// Response:
// {
//   "message": "Invalid phone number!"
// }


// ❌ Invalid email
// {
//   "name": "Ayachi Oumaima",
//   "email": "ayachiexample.com",
//   "phone": "+12345678901",
//   "password": "mypassword123"
// }
// Response:
// {
//   "message": "Invalid email!"
// }


// ❌ Invalid password
// {
//   "name": "Ayachi Oumaima",
//   "email": "ayachi@example.com",
//   "phone": "+12345678901",
//   "password": "123"
// }
// Response:
// {
//   "message": "Password must be at least 6 characters!"
// }