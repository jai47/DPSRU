var form = document.getElementById('sheetdb-form');
let courses = document.getElementById('crs');
let submit = document.getElementById('subBtn');
let CouDiv = document.getElementById('crsdiv');
let inputP = document.createElement("p")
let inputText = document.createElement("input")
inputText.setAttribute("type", "text", "name", "Courses");
inputText.setAttribute("name", "Courses");
inputText.required = true;
inputP.innerHTML = "Enter all values";

courses.addEventListener('change', function () {
  if (courses.value == 'multi') {
    CouDiv.appendChild(inputP)
    CouDiv.appendChild(inputText)
  } else {
    CouDiv.removeChild(inputP)
    CouDiv.removeChild(inputText)
  }
})

form.addEventListener("submit", function (e) {
  e.preventDefault();
  fetch(form.action, {
    method: "POST",
    body: new FormData(document.getElementById("sheetdb-form")),
  }).then(
    response => response.json(),
    form.reset()
  ).then((html) => {
    alert("registered!")
    window.open('../index.html',"_self");
  });

});