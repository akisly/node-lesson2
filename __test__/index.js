// ***************************
// * CHECK ALL FILES IS EXISTS
// ***************************
require("./tests/ExistsFiles.test");

// **********
// * SERVICES
// **********
require("./tests/AuthService.test.js");
require("./tests/UserService.test.js");

// **************************
// * CONTROLLERS (ROUTES)
// **************************
require("./tests/Auth.test");
require("./tests/User.test");
