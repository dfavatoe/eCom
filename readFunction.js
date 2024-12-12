function readFunction() {
    const dummy = document.getElementById("dummy");
    const moreText = document.getElementById("more");
    const btnText = document.getElementById("readBtn");

    if (dummy.style.display === "none") {
        dummy.style.display = "block";
        btnText.innerHTML = "Read More";
        moreText.style.display = "none";
    } else {
        dummy.style.display = "none";
        btnText.innerHTML = "Read Less";
        moreText.style.display = "block";
    }
}

