const yup = require("yup");
const { required, email, uniqueEmail } = require("./message");
const userService = require("../services/user.service");

const validateEmailUnique = async (email) => {
  const user = await userService.emailExist(email);
  return !user;
};
const schemaUser = yup.object({
  firstname: yup.string().required(required).trim(),
  lastname: yup.string().required(required).trim(),
  email: yup
    .string()
    .email(email)
    .required(required)
    .test("unique", uniqueEmail, validateEmailUnique),
});

module.exports = schemaUser;
