export default function validate(inputType: string, value: string) {
  let errorMessage: string = '';

  switch (inputType) {
    case 'email': {
      if (!value) {
        errorMessage = 'Enter email';
      } else if (!/^\S(?:.*\S)?$/.test(value)) {
        errorMessage = 'Email must not contain leading or trailing whitespace';
      } else if (!/@/.test(value)) {
        errorMessage = 'Email must contain an "@" symbol';
      } else if (
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
      ) {
        errorMessage = 'Email must contain a domain name';
      } else if (
        !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value)
      ) {
        errorMessage = 'Enter a properly formatted email address';
      }

      break;
    }
    case 'password': {
      if (!value) {
        errorMessage = 'Enter password';
      } else if (!/[A-Z]/.test(value)) {
        errorMessage = 'Password must contain at least one uppercase letter';
      } else if (!/[a-z]/.test(value)) {
        errorMessage = 'Password must contain at least one lowercase letter';
      } else if (!/[0-9]/.test(value)) {
        errorMessage = 'Password must contain at least one digit';
      } else if (!/[!@#$%^&*]/.test(value)) {
        errorMessage = 'Password must contain at least one special character';
      } else if (!/^\S(?:.*\S)?$/.test(value)) {
        errorMessage = 'Password must not contain leading or trailing whitespace';
      } else if (!/.{8,}/.test(value)) {
        errorMessage = 'Password must be at least 8 characters long';
      }

      break;
    }
    case 'city': {
      if (!value) {
        errorMessage = 'Enter city name';
      } else if (!/^[a-zA-Z]+$/.test(value)) {
        errorMessage = "City name mustn't contain special characters or numbers";
      }

      break;
    }
    case 'street': {
      if (!value) {
        errorMessage = 'Enter street name';
      } else if (!/^[a-zA-Z0-9]+$/.test(value)) {
        errorMessage = "Street name mustn't contain special characters";
      }

      break;
    }
    case 'name': {
      if (!value) {
        errorMessage = 'Enter your Name';
      } else if (!/^[a-zA-Z]+$/.test(value)) {
        errorMessage = 'No special characters or numbers';
      }

      break;
    }
    case 'lastName': {
      if (!value) {
        errorMessage = 'Enter your Last Name';
      } else if (!/^[a-zA-Z]+$/.test(value)) {
        errorMessage = 'No special characters or numbers';
      }

      break;
    }

    default: {
      errorMessage = '';
      break;
    }
  }

  return errorMessage;
}
