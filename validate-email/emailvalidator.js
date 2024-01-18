// function ValidateEmail(mail) {
//     return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
// }
// console.log(ValidateEmail('test@test.com'))

let validator = require("email-validator");
console.log(validator.validate("test@test.com"));


