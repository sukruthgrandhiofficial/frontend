let signUpBtn = document.querySelector('.signUpBtn');
let signInBtn = document.querySelector('.signInBtn');
let nameField = document.querySelector('.namefield');
let title = document.querySelector('.signup');
let underline = document.querySelector('.underline');

EnableSignIn();

signInBtn.addEventListener('mouseover', ()=>{
    console.log("mouseover signin");
    EnableSignIn();
})

signUpBtn.addEventListener('mouseover', ()=>{
    console.log("mouseover signup");
    EnableSignUp();
})

signInBtn.addEventListener('click', ()=>{

    const emailStr = document.getElementById('email').value;
    const passwordStr = document.getElementById('password').value;
    console.log(email);
    console.log(password);
    const data = {
        email: emailStr,
        password: passwordStr
    };

    fetch(`${__env.backendBaseURL}user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        loginContainerBtn.innerHTML = 'Logout';
        setAccessTokenCookie(data.access_token);
        closeLoginContainer();
    })
    .catch(error => {
        console.error('Error:', error);
    });

    console.log("Sign In Button clicked");
})

signUpBtn.addEventListener('click', ()=>{
    console.log("Sign up Button clicked");
})

function EnableSignUp() {
    nameField.style.maxHeight = '60px';
    title.innerHTML = "Sign Up";
    signUpBtn.classList.remove('disable');
    signInBtn.classList.add('disable');
    underline.style.transform = 'translateX(35px)';
}

function EnableSignIn() {
    nameField.style.maxHeight = '0';
    title.innerHTML = "Sign In";
    signUpBtn.classList.add('disable');
    signInBtn.classList.remove('disable');
    underline.style.transform = 'translateX(0)'
}

function setAccessTokenCookie(token) {
    // Set expiration time for the cookie (in milliseconds)
    const expirationTime = 3600 * 1000; // 1 hour
    const expiryDate = new Date(Date.now() + expirationTime);
  
    // Construct the cookie string
    document.cookie = `access_token=${token}; expires=${expiryDate.toUTCString()}; path=/;`;
  }

  // Function to get the value of a cookie by its name
function getCookie(name) {
    const cookieString = document.cookie;
    const cookies = cookieString.split(';');
    
    // Loop through each cookie to find the one with the specified name
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Check if this cookie has the specified name
      if (cookie.startsWith(name + '=')) {
        // Return the value of the cookie
        return cookie.substring(name.length + 1);
      }
    }
    // Return null if the cookie with the specified name is not found
    return null;
  }
  
 
  function callProtected() {
    fetch(`${__env.backendBaseURL}test_authentication`, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getCookie('access_token')}`
    }
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
  }