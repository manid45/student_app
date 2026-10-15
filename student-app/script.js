  // ---- Helper functions to read/write users in Local Storage ----
  function getUsers() {
    try {
      // Users are saved as a list (array) under the key "students"
      return JSON.parse(localStorage.getItem("students")) || [];
    } catch (e) {
      return [];
    }
  }

  function saveUsers(users) {
    try {
      localStorage.setItem("students", JSON.stringify(users));
      return true;
    } catch (e) {
      return false;
    }
  }

  // Show a success (ok) or error (err) message inside a box
  function showMessage(id, text, type) {
    var box = document.getElementById(id);
    box.textContent = text;
    box.className = "msg " + type;
  }

  // ---- Switching between screens ----
  function showLogin() {
    document.getElementById("signupBox").classList.add("hidden");
    document.getElementById("welcomeBox").classList.add("hidden");
    document.getElementById("loginBox").classList.remove("hidden");
  }
  function showSignup() {
    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("welcomeBox").classList.add("hidden");
    document.getElementById("signupBox").classList.remove("hidden");
  }

  // ---- REGISTER ----
  function registerUser() {
    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim().toLowerCase();
    var password = document.getElementById("password").value;
    var confirm = document.getElementById("confirm").value;

    // 1. All fields are required
    if (name === "" || email === "" || password === "" || confirm === "") {
      showMessage("signupMsg", "Please fill in all the fields.", "err");
      return;
    }
    // 2. Email must look valid
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showMessage("signupMsg", "Please enter a valid email address.", "err");
      return;
    }
    // 3. Password length
    if (password.length < 6) {
      showMessage("signupMsg", "Password must be at least 6 characters.", "err");
      return;
    }
    // 4. Password and confirm password must match
    if (password !== confirm) {
      showMessage("signupMsg", "Passwords do not match.", "err");
      return;
    }
    // 5. Email must not already be registered
    var users = getUsers();
    for (var i = 0; i < users.length; i++) {
      if (users[i].email === email) {
        showMessage("signupMsg", "This email is already registered. Please login.", "err");
        return;
      }
    }

    // Everything is fine: save the new student
    users.push({ name: name, email: email, password: password });
    if (!saveUsers(users)) {
      showMessage("signupMsg", "Could not save your details. Please try again.", "err");
      return;
    }

    showMessage("signupMsg", "Registration successful! You can login now.", "ok");
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("confirm").value = "";
  }

  // ---- LOGIN ----
  function loginUser() {
    var email = document.getElementById("loginEmail").value.trim().toLowerCase();
    var password = document.getElementById("loginPassword").value;

    if (email === "" || password === "") {
      showMessage("loginMsg", "Please enter email and password.", "err");
      return;
    }

    // Check the entered details against the users saved in Local Storage
    var users = getUsers();
    var found = null;
    for (var i = 0; i < users.length; i++) {
      if (users[i].email === email && users[i].password === password) {
        found = users[i];
        break;
      }
    }

    if (found) {
      showMessage("loginMsg", "Login successful!", "ok");
      document.getElementById("welcomeText").textContent = "Welcome, " + found.name + "!";
      document.getElementById("loginBox").classList.add("hidden");
      document.getElementById("welcomeBox").classList.remove("hidden");
    } else {
      showMessage("loginMsg", "Invalid email or password.", "err");
    }
  }

  // ---- LOGOUT ----
  function logout() {
    document.getElementById("loginEmail").value = "";
    document.getElementById("loginPassword").value = "";
    document.getElementById("loginMsg").className = "msg";
    showLogin();
  }
