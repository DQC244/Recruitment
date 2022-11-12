class Account {
  name?: string;
  address?: string;
  email?: string;

  constructor(attributes: IAccountProperties = {}) {
    for (const key in attributes) {
      this[key as keyof IAccountProperties] = attributes[key as keyof IAccountProperties];
    }
  }
}

export interface IAccountProperties {
  name?: string;
  address?: string;
  email?: string;
}

export default Account;
