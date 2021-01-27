$(document).ready(() => {
    $('#myRegForm').submit(async (e) => {
        e.preventDefault() //Prevent From Reloading Page
        try {
            /**
             * Get Input Value
             */
            const regEmailVal = $('#regEmail').val();
            const regPassVal = $('#regPass').val();
            const response = await fetch('/register', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    email: regEmailVal,
                    password: regPassVal
                })
            });
            const data = await response.json()
            const { isError } = data
            if (isError) {
                validationForm('alert-danger p-2', `${isError}`)
                $('#regEmail').val('')
                $('#regPass').val('');
            } else {
                window.location.replace('/')
            }

        } catch (error) {
            console.log("Creating User Error", error)
        }
    })
})

function validationForm(classname, message) {
    const errMessageContainer = document.createElement('div');
    const regForm = document.getElementById('myRegForm');
    const regContainer = document.getElementById('regContainer')

    errMessageContainer.className = `${classname}`
    errMessageContainer.appendChild(document.createTextNode(message))

    /**
     * Insert the error message
     */
    regContainer.insertBefore(errMessageContainer, regForm);
    /**
     * Remove the error message after 2seconds
     */
    setTimeout(() => {
        errMessageContainer.remove();
    }, 2000)
}

