var password = $('#password');
var password2 = $('#password2');

function validatePassword() {
    if (password.val() != password2.val()) {
        password2.setCustomValidity("Passwords Don't match");
    } else {
        password2.setCustomValidity('');
    }
}

password.on('keyup', () => {
    console.log($(this).value);
    validatePassword();
});
password2.on('keyup', () => {
    console.log($(this).value);
    validatePassword();
});



// var password = document.getElementById("password"),
//     confirm_password = document.getElementById("password2"),
//     conPwDiv = document.getElementById("confirmPassword");


// function validatePassword() {
//     if (password.value != confirm_password.value) {
//         confirm_password.setCustomValidity("Passwords Don't Match");
//         conPwDiv.style.color = 'red';
//     } else {
//         confirm_password.setCustomValidity('');
//         conPwDiv.style.color = 'none';
//     }
// }

// password.onchange = validatePassword;
// confirm_password.onkeyup = validatePassword;