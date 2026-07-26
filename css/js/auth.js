/* ===================================
   AgroSense Authentication
=================================== */

// Password Visibility Toggle
document.querySelectorAll(".toggle-password").forEach(toggle => {

    toggle.addEventListener("click", function () {

        const input = this.previousElementSibling;

        if (!input) return;

        if (input.type === "password") {
            input.type = "text";
            this.classList.remove("fa-eye");
            this.classList.add("fa-eye-slash");
        } else {
            input.type = "password";
            this.classList.remove("fa-eye-slash");
            this.classList.add("fa-eye");
        }

    });

});

// ================================
// Register
// ================================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim().toLowerCase();
        const password = document.getElementById("password").value;

        if (!name || !email || !password) {
            alert("Please fill all fields.");
            return;
        }

        if (password.length < 6) {
            alert("Password should contain at least 6 characters.");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        const exists = users.find(user => user.email === email);

        if (exists) {
            alert("This email is already registered.");
            return;
        }

        users.push({
            name,
            email,
            password
        });

        localStorage.setItem("users", JSON.stringify(users));

        alert("Registration Successful!");

        window.location.href = "login.html";

    });

}

// ================================
// Login
// ================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const email = document.getElementById("email").value.trim().toLowerCase();
        const password = document.getElementById("password").value;

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(u =>
            u.email === email &&
            u.password === password
        );

        if (!user) {
            alert("Invalid email or password.");
            return;
        }

        localStorage.setItem("loggedInUser", JSON.stringify(user));

        alert("Welcome " + user.name + "!");

        window.location.href = "dashboard.html";

    });

}

// ================================
// Logout
// ================================

function logout() {

    localStorage.removeItem("loggedInUser");

    window.location.href = "login.html";

}

// ================================
// Session Check
// ================================

(function () {

    const protectedPages = [
        "dashboard.html",
        "crops.html",
        "weather.html",
        "irrigation.html",
        "disease.html",
        "paddy.html",
        "tomato.html",
        "sugarcane.html",
        "chilli.html",
        "about.html",
        "contact.html"
    ];

    const currentPage = window.location.pathname.split("/").pop();

    if (protectedPages.includes(currentPage)) {

        const user = localStorage.getItem("loggedInUser");

        if (!user) {

            window.location.href = "login.html";

        }

    }

})();

// ================================
// Password Strength Indicator
// ================================

const passwordInput = document.getElementById("password");
const strength = document.getElementById("strength");

if (passwordInput && strength) {

    passwordInput.addEventListener("input", function () {

        const value = this.value;

        if (value.length < 6) {
            strength.innerHTML = "Weak";
            strength.style.color = "red";
        } else if (value.length < 10) {
            strength.innerHTML = "Medium";
            strength.style.color = "orange";
        } else {
            strength.innerHTML = "Strong";
            strength.style.color = "#00ff66";
        }

    });

}
