let btnMyPosts = document.querySelector("#btn-my-posts");
let btnFavPosts = document.querySelector("#btn-fav-posts");
let MyPostsDiv = document.querySelector(".profile__my-posts");
let MyFavPostsDiv = document.querySelector(".profile__fav-posts");

btnMyPosts.addEventListener("click", () => {
  MyPostsDiv.style.display = "block";
  MyFavPostsDiv.style.display = "none";
  btnMyPosts.classList.remove("not-selected");
  btnMyPosts.classList.add("selected");
  btnFavPosts.classList.remove("selected");
  btnFavPosts.classList.add("not-selected");
});


btnFavPosts.addEventListener("click", () => {
  MyPostsDiv.style.display = "none";
  MyFavPostsDiv.style.display = "block";
  btnFavPosts.classList.remove("not-selected");
  btnFavPosts.classList.add("selected");
  btnMyPosts.classList.remove("selected");
  btnMyPosts.classList.add("not-selected");
});
