const favForms = document.querySelectorAll(".fav-form");

// POST create new like

favForms.forEach(form => {
  form.addEventListener("click", e => {
    // prevent the form reloading the page
    e.preventDefault();

    const favBtn = form.querySelector("#fav-btn");
    const favId = form.querySelector("input").value;

    axios
      .get(`/messages/fav?_id=${favId}`)
      .then(response => {
        const { statusText } = response.data;
        if (statusText === "fav") {
          favBtn.innerHTML = '<img src="/images/add-fav.png" style="width:30px"alt="">';
          //   favBtn.innerHTML = '<i class="fa fa-star style"color:yellow" ></i>';
        } else if (statusText === "unfav") {
          favBtn.innerHTML = '<img src="/images/remove-fav.png" style="width:30px" alt="">';
          //   favBtn.innerHTML = '<i class="fa fa-star "></i>';
        }
      })
      .catch(err => console.log(err));
  });
});
