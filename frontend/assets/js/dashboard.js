$(document).ready(() => {
    $('#addPostBtn').on('click', async (e) => {
        e.preventDefault()

        const postTextVal = $('#postText').val()
        await fetch('/dashboard/post', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                postText: postTextVal
            })
        })
    })
})