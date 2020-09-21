if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
}
else {
    ready()
}

function ready() {
    const form = document.getElementById('form')


    form.addEventListener('submit', (e) => {
        var condition = checkInput()
        if (condition) {
            alert('Feedback sent successfully')
        }
        else {
            e.preventDefault();
            checkInput()
        }
    })

}


function checkInput() {

    const name = document.getElementById('name')
    const phone = document.getElementById('phone')
    const email = document.getElementById('email')
    const feedback = document.getElementById('feedback')

    const nameValue = name.value
    const phoneValue = phone.value
    const emailValue = email.value
    const feedbackValue = feedback.value

    if (nameValue == '') {
        setErrorFor(name, "Name cannot be empty")
    } 
    else {
        setSuccessFor(name)
    }

    if (phoneValue == '') {
        setErrorFor(phone, "Phone cannot be empty")
    }
    else if (isNaN(phoneValue) || phoneValue.length != 10) {
        setErrorFor(phone, "Please enter a valid number")
    } 
    else {
        setSuccessFor(phone)
    }

    if (emailValue == '') {
        setErrorFor(email, "Email cannot be empty.")
    }
    else if (!isEmail(emailValue)) {
        setErrorFor(email, "Please enter a valid mail id.")
    }
    else {
        setSuccessFor(email)
    }

    if (feedbackValue == '') {
        setErrorFor(feedback, "This cannot be empty")
    } 
    else {
        setSuccessFor(feedback)
    }

    if (name.parentElement.className == 'form-group row success' && phone.parentElement.className == 'form-group row success' && email.parentElement.className == 'form-group row success' && feedback.parentElement.className == 'form-group row success') {
        return true
    } 
    else {
        return false
    }

    function setErrorFor(input, message) {
        const formGroup = input.parentElement
        const small = formGroup.querySelector('small');

        small.innerText = message

        formGroup.className = 'form-group row error'
    }

    function setSuccessFor(input) {
        const formGroup = input.parentElement
        formGroup.className = 'form-group row success'
    }

    function isEmail(email) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
    }

}


