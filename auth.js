import { auth } from "./firebaseConfig";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.jsh";



const registerUser = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, "test@example.com", "password123");
    console.log("User registered: ", userCredential.user);
  } catch (error) {
    console.error("Error: ", error.message);
  }
};


//submit button
const submit = document.getElementById('submit');
submit.addEventListener("click", function (event) {
  event.preventDefault()

  //inputs
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("Creating Account...")
      window.location.href = "HomePage.jsx";
    })
    .catch((error) => {
      const errorcode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
    });
})
