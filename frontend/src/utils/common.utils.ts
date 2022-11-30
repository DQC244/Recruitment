/**
 * Check if a value is greater than or equal 0
 *
 * @param {number | string} value - Value to check
 *
 * @return {boolean} Return true if value is number >= 0, false otherwise
 */
export const isGreaterThanOrEqualZero = (...args: (number | string)[]): boolean => {
  if (args.length) {
    return args.every((value) => {
      const valueAsInt = typeof value === "string" ? parseInt(value) : value;
      return valueAsInt >= 0;
    });
  } else {
    return false;
  }
};

/**
 * Check if a value is not a number
 *
 * @param {number | string} value - Value to check
 *
 * @return {boolean} Return true if value is not a number, false if value is a number
 */
export const isNotNumber = (...args: (number | string)[]): boolean => {
  return (
    (args || []).filter((value: number | string) => !isGreaterThanOrEqualZero(value)).length > 0
  );
};

/**
 * Convert snake string into camel string
 *
 * @param  {string} str  - Snake string
 *
 * @returns {string} Camel string
 */
export const snakeToCamelCase = (str: string): string => {
  if (str.includes("_") || str.includes("-"))
    return str
      .toLowerCase()
      .replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace("-", "").replace("_", ""));

  return str;
};

/**
 * Check format password
 *
 * @param {string} password  - password
 *
 * @returns {boolean}  Return true if password is correct format, false remaining case
 */
export const checkPasswordFormat = (password: string): boolean => {
  const regexPassword = /^[\x21-\x7E]*$/;
  const minCharacter = 8;
  const maxCharacter = 50;
  if (
    (password.length && password.length < minCharacter) ||
    password.length > maxCharacter ||
    !regexPassword.test(password)
  )
    return false;
  else return true;
};

/**
 * Check format email
 *
 * @param {string} email  - email
 *
 * @returns {boolean}  Return true if email is correct format, false remaining case
 */
export const checkEmailFormat = (email: string): boolean => {
  const regexEmail =
    /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.length && !regexEmail.test(email)) return false;
  else return true;
};

/**
 * remove space
 *
 * @param {string} str - string to remove
 *
 * @return {string} string without space
 *
 */
export const removeUnnecessarySpace = (str: string): string => {
  return (str || "").replace(/\s+/g, "").trim();
};

/**
 * Determine if a variable is 'undefined' or 'null'
 */
export const isUndefinedOrNull = (value: number) => {
  return value === null || value === undefined;
};
