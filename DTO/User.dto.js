class UserDTO {
  constructor({ id, firstname, lastname, email }) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
  }
}
class UsersDTO extends UserDTO {
  constructor(users, link = "test") {
    super(users);

    this.link = link;
  }
}

module.exports = { UserDTO, UsersDTO };
