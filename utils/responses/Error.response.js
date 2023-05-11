class ErrorResponse {
  constructor(message, err = null, code = 400) {
    this.errors = {
      message,
      err,
    };
    this.statusCode = code;
  }
}

class ErrorValidator {
  constructor({ value, inner } = err, code = 403) {
    this.errors = {
      value,
      inner: inner.reduce(
        (acc, current) => {
          return (acc = {
            value: current.value,
            path: current.path,
            type: current.type,
            name: current.name,
            message: current.message,
          });
        },
        {
          value: "",
          path: "",
          type: "",
          name: "",
          message: "",
        }
      ),
    };
    this.statusCode = code;
  }
}
class ErrorUniqueValidator {
  constructor({ errors } = err, code = 403) {
    console.log(errors);
    this.errors = {
      inner: errors.reduce(
        (acc, current) => {
          return (acc = {
            value: current.value,
            path: current.path,
            type: current.type,
            name: current.name,
            message: current.message,
          });
        },
        {
          value: "",
          path: "",
          type: "",
          name: "",
          message: "",
        }
      ),
    };
    this.statusCode = code;
  }
}
module.exports = { ErrorResponse, ErrorValidator, ErrorUniqueValidator };
