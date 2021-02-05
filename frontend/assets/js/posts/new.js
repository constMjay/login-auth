const formData = document.getElementById('formPostArticle');
$(document).ready(() => {
    $('#formPostArticle').submit(async (e) => {
        e.preventDefault();

        const response = await fetch('/dashboard/post/new', {
            method: "POST",
            body: new FormData(formData)
        });

        const result = await response.json();

        if (result) window.location.replace(`/dashboard/post/${result.slug}`)
    })
})