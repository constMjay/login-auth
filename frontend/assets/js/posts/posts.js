import { postedDate } from '../validation.js';
$(document).ready(async (e) => {
    /**
     * Fetch all the Post and Display
     */
    let showLikeBtn = "";
    let hideUnlikeBtn = 'd-none';
    fetchAllPosts(showLikeBtn, hideUnlikeBtn);

    /**
     * Like post
     */
    $('#allPosts').click(async (e) => {
        const targetId = e.target.parentElement.parentElement.parentElement.id;
        const btnLike = e.target
        if (btnLike.classList.contains('btnLike')) {

            const response = await fetch('/dashboard/postLike', {
                method: "PUT",
                body: JSON.stringify({
                    id: targetId
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            await response.json();
            /**
             * Remove Button Like then Replace by Button unlike
             */
            showLikeBtn = "d-none";
            hideUnlikeBtn = "";
            fetchAllPosts(showLikeBtn, hideUnlikeBtn)
        } else {
            const response = await fetch('/dashboard/postUnlike', {
                method: "PUT",
                body: JSON.stringify({
                    id: targetId
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            await response.json();

            /**
             * Remove Button Like then Replace by Button unlike
             */
            showLikeBtn = "";
            hideUnlikeBtn = "d-none";
            fetchAllPosts(showLikeBtn, hideUnlikeBtn)
        }
    })
    /**
     * Delete post
     */
    $('#allPosts').click(async (e) => {
        const targetId = e.target.parentElement.parentElement.parentElement.id;
        const btnLike = e.target
        if (btnLike.classList.contains('btnDelete')) {
            const response = await fetch('/dashboard/postDelete', {
                method: "DELETE",
                body: JSON.stringify({
                    id: targetId
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            await response.json();


            fetchAllPosts(showLikeBtn, hideUnlikeBtn)
        }
    })
})
async function fetchAllPosts(showLikeBtn, hideUnlikeBtn) {
    const response = await fetch('/dashboard/allpost');
    const { posts } = await response.json();

    let postOutput = "";
    posts.forEach((post) => {
        postOutput +=
            `
        <div class="col-xl-4">
            <div class="card mt-2 mb-3" id="${post._id}">
                <div class="card-header">
                    <h4 class="m-0">${post.title}</h4>
                    </div>
                    <div class="card-body">
                    <img
                        src="../../${post.articleImage}"
                        alt="../../${post.articleImage}"
                        class="img-fluid"
                    />
                    <p class="m-0">${post.text}</p>
                </div>
                <div class="card-footer">
                    <div class="mb-2">
                        <label class="m-0">
                            <strong class="text-muted">Posted On: ${postedDate(post.dateCreated)}</strong>/ 
                            <strong class="text-muted">Likes: ${post.likes.length}</strong>/ 
                            <strong class="text-muted">Posted By: ${post.postedBy.email}</strong>
                        </label>
                    </div>
                    <div>
                        <a
                        href="/dashboard/post/${post.slug}"
                        class="btn btn-success btn-sm"
                        >View</a
                        >
                        <button class="btn btn-primary btn-sm btnLike ${showLikeBtn}">Like</button>
                        <button class="btn btn-primary btn-sm btnUnlike ${hideUnlikeBtn}">Unlike</button>
                        <button class="btn btn-danger btn-sm btnDelete">Delete</button>
                    </div>
                </div>
            </div>
        </div>
        `
        return postOutput
    });
    $('#allPosts').html(postOutput)
    postedDate()
}