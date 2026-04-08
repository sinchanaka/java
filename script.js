// ===========================
// script.js - User Registration Form Logic
// ===========================

// This function runs when the user clicks "Register"
function submitForm() {

  // ---- Step 1: Clear all previous error messages ----
  clearErrors();

  // ---- Step 2: Read values from all input fields ----
  const userId      = document.getElementById('userId').value.trim();
  const username    = document.getElementById('username').value.trim();
  const password    = document.getElementById('password').value.trim();
  const name        = document.getElementById('name').value.trim();
  const city        = document.getElementById('city').value.trim();
  const dateOfBirth = document.getElementById('dateOfBirth').value;

  // ---- Step 3: Validate the fields ----
  let hasError = false;

  if (!userId) {
    showError('userIdError', 'User ID is required.');
    hasError = true;
  }

  if (!username) {
    showError('usernameError', 'Username is required.');
    hasError = true;
  }

  if (!password) {
    showError('passwordError', 'Password is required.');
    hasError = true;
  } else if (password.length < 6) {
    showError('passwordError', 'Password must be at least 6 characters.');
    hasError = true;
  }

  if (!name) {
    showError('nameError', 'Full name is required.');
    hasError = true;
  }

  if (!city) {
    showError('cityError', 'City is required.');
    hasError = true;
  }

  if (!dateOfBirth) {
    showError('dateOfBirthError', 'Date of Birth is required.');
    hasError = true;
  }

  // Stop if any validation failed
  if (hasError) return;

  // ---- Step 4: Build JSON object to send to backend ----
  const userData = {
    userId:      userId,
    username:    username,
    password:    password,
    name:        name,
    city:        city,
    dateOfBirth: dateOfBirth   // format: "YYYY-MM-DD"
  };

  // ---- Step 5: Disable button and show loading state ----
  const btn = document.getElementById('submitBtn');
  btn.disabled = true;
  btn.textContent = 'Registering...';

  // ---- Step 6: Send POST request to Spring Boot backend ----
  // The backend runs on port 8080 on the same machine (localhost)
  fetch('http://localhost:8080/api/users', {
    method: 'POST',                          // HTTP POST
    headers: {
      'Content-Type': 'application/json'     // Tell backend we're sending JSON
    },
    body: JSON.stringify(userData)           // Convert JS object to JSON string
  })

  // ---- Step 7: Handle the response from backend ----
  .then(function(response) {
    // response.ok is true for HTTP status codes 200-299
    if (response.ok) {
      return response.json(); // parse the JSON response body
    } else {
      // Server returned an error status (e.g. 400, 500)
      throw new Error('Server returned status: ' + response.status);
    }
  })

  // ---- Step 8: Show success message ----
  .then(function(data) {
    showMessage('✅ Registration successful! Welcome, ' + data.name + '!', 'success');
    clearForm(); // Reset the form fields
  })

  // ---- Step 9: Handle any network or server errors ----
  .catch(function(error) {
    console.error('Error:', error);
    showMessage('❌ Registration failed. Please make sure the backend server is running.', 'error-msg');
  })

  // ---- Step 10: Re-enable the button regardless of result ----
  .finally(function() {
    btn.disabled = false;
    btn.textContent = 'Register';
  });
}

// ---- Helper: Show an error message under a specific field ----
function showError(elementId, message) {
  document.getElementById(elementId).textContent = message;
}

// ---- Helper: Clear all error messages ----
function clearErrors() {
  const errorIds = ['userIdError', 'usernameError', 'passwordError', 'nameError', 'cityError', 'dateOfBirthError'];
  errorIds.forEach(function(id) {
    document.getElementById(id).textContent = '';
  });
  // Also hide the message box
  const box = document.getElementById('messageBox');
  box.className = 'message-box hidden';
  box.textContent = '';
}

// ---- Helper: Show success or error message at bottom ----
function showMessage(message, type) {
  const box = document.getElementById('messageBox');
  box.textContent = message;
  box.className = 'message-box ' + type; // 'success' or 'error-msg'
}

// ---- Helper: Clear all input fields after successful submission ----
function clearForm() {
  document.getElementById('userId').value = '';
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';
  document.getElementById('name').value = '';
  document.getElementById('city').value = '';
  document.getElementById('dateOfBirth').value = '';
}
