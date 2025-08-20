document.getElementById("regForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const dob = new Date(document.getElementById("dob").value);
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  let valid = true;

  // Age Validation
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  if (age < 18 || age > 55) {
    document.getElementById("dobError").innerText = "Age must be between 18 and 55.";
    valid = false;
  } else {
    document.getElementById("dobError").innerText = "";
  }

  // Password match validation
  if (password !== confirmPassword) {
    document.getElementById("passError").innerText = "Passwords do not match.";
    valid = false;
  } else {
    document.getElementById("passError").innerText = "";
  }

  if (valid) {
    // Save data to localStorage
    const userData = { name, email, dob: dob.toISOString().split("T")[0] };
    localStorage.setItem("userData", JSON.stringify(userData));

    alert("Registration successful!");
    document.getElementById("regForm").reset();
  }
});

// Load saved data if available
window.onload = function() {
  const savedData = localStorage.getItem("userData");
  if (savedData) {
    const user = JSON.parse(savedData);
    document.getElementById("name").value = user.name;
    document.getElementById("email").value = user.email;
    document.getElementById("dob").value = user.dob;
  }
};
