$(document).ready(() => {
    $('#myForm').submit(async (e) => {
        e.preventDefault(); //Prevent from Loading page
        /**
         * Get Input Value
         */
        const logEmailVal = $('#logEmail').val()
        const logPassVal = $('#logPass').val()

        try {
            const response = await fetch('/login', {
                method: "POST",
                body: JSON.stringify({
                    email: logEmailVal,
                    password: logPassVal
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();
            const { isError, user } = data
            if (isError) {
                validationForm('alert-danger p-2', `${isError}`)
                $('#logEmail').val('')
                $('#logPass').val('');
            }
            if (user) window.location.replace('/dashboard')
        } catch (error) {
            console.log('Error while loggin in:', error)
        }
    })

});

function validationForm(classname, message) {
    const errMessageContainer = document.createElement('div');
    const regForm = document.getElementById('myForm');
    const regContainer = document.getElementById('logContainer')

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

