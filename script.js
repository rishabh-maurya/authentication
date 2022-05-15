
let isDataValid = { firstName: false, lastName: false, email: false, password: false, isChecked: false };
let userData = { firstName: '', lastName: '', email: '', password: '', isTermsAccepted: false };
let localStorageData = localStorage.getItem('usersData');
let usersData = localStorageData == null ? [] : JSON.parse(localStorage.getItem('usersData'));

// Data for Password Encryption and Decryption ---------------------------------------------->
const password_encryption_decryption_data = {
    A: '@', B: '5', C: 'i', D: '&', E: '1', F: 'u', G: 'z',
    H: '3', I: '>', J: 'l', K: '7', L: '@', M: 'c', N: 'o',
    O: '*', P: 'g', Q: '4', R: '[', S: 'a', T: '^', U: '~',
    V: '9', W: '?', X: '8', Y: 's', Z: 'f',
    a: ')', b: '!', c: 'Z', d: '%', e: '6', f: 'Q', g: 'Y',
    h: 'R', i: 'D', j: 'L', k: '2', l: 'O', m: 'A', n: 'I',
    o: 'K', p: 'W', q: '#', r: ']', s: '(', t: '0', u: 'S',
    v: '<', w: 'T', x: 'M', y: 'B', z: 'C',
    0: 'E', 1: 'H', 2: 'J', 3: 'F', 4: 'P', 5: 'U', 6: 'X',
    7: 'Z', 8: 'G', 9: 'V',
}

const password_encryption_decryption_keys = Object.keys(password_encryption_decryption_data);
const password_encryption_decryption_values = Object.values(password_encryption_decryption_data);

// password encryption method
const encryptPassword = (userPassword) => {
    const encryptPassword = userPassword.split('').map((letter) => password_encryption_decryption_values[password_encryption_decryption_keys.indexOf(letter)]).join('');
    return encryptPassword;
}

// password decryption method
const decryptPassword = (userEncryptPassword) => {
    const decryptedPassword = userEncryptPassword.split('').map((letter) => password_encryption_decryption_keys[password_encryption_decryption_values.indexOf(letter)]).join('');
    return decryptedPassword;
}

// --------------------------------------------------------------------------------------------->

const checkValidation = () => {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const isTermAccepted = document.getElementById('checkBox').checked;

    userData.firstName = firstName.trim();
    userData.lastName = lastName.trim();
    userData.email = email.trim();
    userdataPassword = password.trim();
    userData.isTermsAccepted = isTermAccepted;

    // validation on firstName
    if (firstName.length !== 0) {
        document.getElementById('valid-firstName').style.display = 'block';
        document.getElementById('invalid-firstName').style.display = 'none';
        isDataValid.firstName = true;
    } else {
        document.getElementById('valid-firstName').style.display = 'none';
        document.getElementById('invalid-firstName').style.display = 'block';
        isDataValid.firstName = false;
    }

    // validation on lastName
    if (lastName.length !== 0) {
        document.getElementById('valid-lastName').style.display = 'block';
        document.getElementById('invalid-lastName').style.display = 'none';
        isDataValid.lastName = true;
    } else {
        document.getElementById('valid-lastName').style.display = 'none';
        document.getElementById('invalid-lastName').style.display = 'block';
        isDataValid.lastName = false;
    }

    // validation on email
    if (email.length !== 0 && email.includes('@') && email.slice(email.indexOf('.')).length - 1 >= 2) {
        document.getElementById('valid-email').style.display = 'block';
        document.getElementById('invalid-email').style.display = 'none';
        document.getElementById('already-exist-email').style.display = 'none';
        isDataValid.email = true;
    } else {
        document.getElementById('valid-email').style.display = 'none';
        document.getElementById('invalid-email').style.display = 'block';
        document.getElementById('already-exist-email').style.display = 'none';
        isDataValid.email = false;
    }

    // validation on password
    if (password.length >= 8 && password.match(/[a-z]/g) && password.match(/[A-Z]/g) && password.match(/[0-9]/g) && password.match(/[!@#$%&*]/g)) {
        document.getElementById('strong-password').style.display = 'block';
        document.getElementById('average-password').style.display = 'none';
        document.getElementById('weak-password').style.display = 'none';
        document.getElementById('empty-password').style.display = 'none';
        isDataValid.password = true;
    } else if (password.length >= 4 && password.match(/[a-z]/g) && password.match(/[A-Z]/g) && password.match(/[0-9]/g) && password.match(/[!@#$%&*]/g)) {
        document.getElementById('strong-password').style.display = 'none';
        document.getElementById('average-password').style.display = 'block';
        document.getElementById('weak-password').style.display = 'none';
        document.getElementById('empty-password').style.display = 'none';
        isDataValid.password = true;
    } else if (password.length === 0) {
        document.getElementById('strong-password').style.display = 'none';
        document.getElementById('average-password').style.display = 'none';
        document.getElementById('weak-password').style.display = 'none';
        document.getElementById('empty-password').style.display = 'block';
        isDataValid.password = false;
    } else {
        document.getElementById('strong-password').style.display = 'none';
        document.getElementById('average-password').style.display = 'none';
        document.getElementById('weak-password').style.display = 'block';
        document.getElementById('empty-password').style.display = 'none';
        isDataValid.password = true;
    }

    // validation on checkbox
    if (!isTermAccepted) {
        document.getElementById('acceptTerm').style.display = 'block';
        isDataValid.isChecked = false;
    } else {
        document.getElementById('acceptTerm').style.display = 'none';
        isDataValid.isChecked = true;
    }
}

const signUp = () => {
    const closeSignUpFormButton = document.getElementById('closeSignUpForm');
    const isValid = Object.values(isDataValid).every((data) => data);

    if (isValid) {

        // check user already exist or not
        const isUserExist = usersData.some((data) => data.email === userData.email);
        if (!isUserExist) {
            document.getElementById('successfully-signup').style.display = 'block';
            document.getElementById('already-exist-email').style.display = 'none';

            // encrypt userPassword
            userdataPassword = encryptPassword(userdataPassword);

            // sending data to server
            usersData.push(userData);
            localStorage.setItem('usersData', JSON.stringify(usersData));

            // closing signup form
            closeSignUpFormButton.click();
        } else {
            document.getElementById('already-exist-email').style.display = 'block';
            document.getElementById('valid-email').style.display = 'none';
        }

    }
}

const signIn = () => {
    const closeSignInFormButton = document.getElementById('closeSignInForm');
    const signInEmail = document.getElementById('signInEmail').value;
    const signInPassword = document.getElementById('signInPassword').value;

    if (usersData.length !== 0) {
        usersData.forEach((data) => {
            dataPassword = decryptPassword(data.password);
            // console.log(dataPassword)

            if (data.email === signInEmail && dataPassword === signInPassword) {
                document.getElementById('successfully-login').style.display = 'block';
                document.getElementById('successfully-signup').style.display = 'none';
                closeSignInFormButton.click();
            } else if (data.email !== signInEmail && dataPassword === signInPassword) {
                document.getElementById('signIn__invalidEmail').style.display = 'block';
                document.getElementById('signIn__invalidPassword').style.display = 'none';
            } else if (data.email === signInEmail && dataPassword !== signInPassword) {
                document.getElementById('signIn__invalidEmail').style.display = 'none';
                document.getElementById('signIn__invalidPassword').style.display = 'block';
                return;
            } else if (data.email !== signInEmail && dataPassword !== signInPassword) {
                document.getElementById('signIn__invalidEmail').style.display = 'block';
                document.getElementById('signIn__invalidPassword').style.display = 'block';
            }
        })
    } else {
        document.getElementById('signIn__invalidEmail').style.display = 'block';
        document.getElementById('signIn__invalidPassword').style.display = 'block';
    }
}
