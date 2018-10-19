export function UserIdException(value) {
  this.value = value;
  this.message = ' is not a number';
  this.name = 'UserIdException';
  this.toString = () => this.value + this.message;
}

export function UserIdException2(value) {
  this.value = value;
  this.message = ' is not a number';
  this.name = 'UserIdException';
  this.toString = () => this.value + this.message;
}
