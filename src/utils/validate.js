export const checkValidData = (email, password, username = "", confirmPassword = "") => {
    const emailRegEx = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    const nameRegEx = /^[A-Za-z][A-Za-z0-9_]{7,29}$/;
  
    // Validate email
    if (!emailRegEx.test(email)) {
      return "Email is not valid";
    }
  
    // Validate password
    if (!passwordRegEx.test(password)) {
      return "Invalid password. It must be at least 8 characters long and include uppercase, lowercase, and numbers.";
    }
    
    
    // Validate username if provided
    if (username && !nameRegEx.test(username)) {
      return "Invalid username. It must be 8-30 characters long, starting with a letter.";
    }
  
    // Validate confirmPassword if provided
    if (confirmPassword && password !== confirmPassword) {
      return "Passwords do not match.";
    }
  
    return null; // No errors
  };
  