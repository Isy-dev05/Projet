// RÉCUPÉRATION DES ÉLÉMENTS HTML
// Je suis epuiséeeeeeeeeeeeeeeeeee!! dsl du retard(snif snif)
const form = document.getElementById("connectForm");

const email = document.getElementById("email");
const password = document.getElementById("password");
const remember = document.getElementById("remember");

const loginButton = document.getElementById("connectButton");
const emailError = document.getElementById("Erreurmail");
const passwordError = document.getElementById("passwordErreur");

const message = document.getElementById("message");

const forgotPassword = document.getElementById("oubliePassword");
const googleButton = document.getElementById("googleButton");
const registerLink = document.getElementById("inscription");

const eleve = document.getElementById("eleve");
const prof = document.getElementById("prof");

// SELECTION ROLE!!

let selectedRole = "eleve/etudiant";

const savedEmail = localStorage.getItem("novaLearnEmail");

if (savedEmail) {
    email.value = savedEmail;
    remember.checked = true;
}



//  MESSAGE

function showMessage(text, type) {

    message.textContent = text;

    message.classList.remove("hidden");

    // Supprimer les anciennes couleurs
    message.classList.remove( "bg-red-100", "text-red-600", "bg-green-100", "text-green-600");

    if (type === "error") {

        message.classList.add( "bg-red-100", "text-red-600");

    } else {

        message.classList.add( "bg-green-100", "text-green-600");
    }
}


function clearErrors() {

    emailError.classList.add("hidden");
    passwordError.classList.add("hidden");

    email.classList.remove("border-red-500");
    password.classList.remove("border-red-500");
}

// VÉRIFICATION EMAIL

function validateEmail(emailValue) {

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(emailValue);
}

// CONNEXION

form.addEventListener("submit", function (event) {

    // Empêche la page de se recharger
    event.preventDefault();


    // Enlever les anciennes erreurs
    clearErrors();

    // Cacher l'ancien message
    message.classList.add("hidden");


    // Récupérer les valeurs
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();


    // On considèrons le formulaire correct
    let isValid = true;

    // VÉRIFICATION DE L'EMAIL

    if (emailValue === "") {

        emailError.textContent ="Veuillez entrer votre adresse e-mail.";

        emailError.classList.remove("hidden");

        email.classList.add("border-red-500");

        isValid = false;

    }

    else if (!validateEmail(emailValue)) {

        emailError.textContent = "Veuillez entrer une adresse e-mail valide.";

        emailError.classList.remove("hidden");

        email.classList.add("border-red-500");

        isValid = false;
    }

    // VÉRIFICATION DU MOT DE PASSE

    if (passwordValue === "") {

        passwordError.textContent = "Veuillez entrer votre mot de passe.";

        passwordError.classList.remove("hidden");

        password.classList.add("border-red-500");

        isValid = false;

    }

    else if (passwordValue.length < 6) {

        passwordError.textContent ="Le mot de passe doit contenir au moins 6 caractères.";

        passwordError.classList.remove("hidden");

        password.classList.add("border-red-500");

        isValid = false;
    }


    if (!isValid) {

        return;
    }

    // SE SOUVENIR DE MOUA

    if (remember.checked) {

        localStorage.setItem("novaLearnEmail", emailValue );

    } else {

        localStorage.removeItem( "novaLearnEmail");
    }

    // BOUTON DE CONNEXION

    loginButton.disabled = true;

    loginButton.textContent = "Connexion...";


    setTimeout(function () {

        loginButton.disabled = false;

        loginButton.textContent = "Se connecter";


        // Afficher le message de réussite
        showMessage( "Connexion réussie ! Bienvenue sur NovaLearn.", "success");


        // Afficher les informations dans la console
        console.log("Email :", emailValue);
        console.log("Rôle :", selectedRole);

    }, 1500);

});


// ONGLET ÉLÈVE / ÉTUDIANT

eleve.addEventListener("click", function () {

    // Changer le rôle
    selectedRole = "eleve";


    // Activer l'onglet élève
    eleve.classList.add( "bg-white", "text-[#4771e8]","font-medium");

    eleve.classList.remove( "text-[#748098]");


    // Désactiver l'onglet formateur
    prof.classList.remove("bg-white","text-[#4771e8]","font-medium");

    prof.classList.add( "text-[#748098]");

});


// ONGLET FORMATEUR / ENSEIGNANT

prof.addEventListener("click", function () {

    // Changer le rôle
    selectedRole = "FORMATEUR / ENSEIGNANT";


    prof.classList.add("bg-white","text-[#4771e8]","font-medium");

    prof.classList.remove( "text-[#748098]");


    eleve.classList.remove( "bg-white", "text-[#4771e8]", "font-medium");

    eleve.classList.add( "text-[#748098]");

});


// MOT DE PASSE OUBLIÉ

forgotPassword.addEventListener("click", function (event) {

    event.preventDefault();

    const emailValue = email.value.trim();

    if (emailValue === "") {

        showMessage( "Entrez votre adresse e-mail pour récupérer votre mot de passe.", "error");

        email.focus();

    }

    else if (!validateEmail(emailValue)) {

        showMessage("Veuillez entrer une adresse e-mail valide.", "error");

        email.focus();

    }

    else {

        showMessage("Un lien de récupération sera envoyé à " + emailValue,"success");
    }

});


// CONNEXION AVEC GOOGLE

googleButton.addEventListener("click", function () {
 //permettre à un utilisateur de se connecter avec son compte Google
    showMessage("La connexion avec Google doit être configurée avec Google OAuth.", "error" );

});


// INSCRIPTION

registerLink.addEventListener("click", function (event) {

    // Empêche le lien de changer de page
    event.preventDefault();


    showMessage( "La page d'inscription sera bientôt disponible.", "success");

});

email.addEventListener("input", function () {

    emailError.classList.add("hidden");

    email.classList.remove("border-red-500");

});

password.addEventListener("input", function () {

    passwordError.classList.add("hidden");

    password.classList.remove("border-red-500");

});