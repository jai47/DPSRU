var form = document.getElementById('sheetdb-form');
let courses = document.getElementById('crs');
let submit = document.getElementById('subBtn');
let CouDiv = document.getElementById('crsdiv');
let crsLbl = document.createElement("label");
let inputP = document.createElement("p");
let inputText = document.createElement("input");

crsLbl.setAttribute("for","more");
inputText.setAttribute("type", "text", "name", "Courses");
inputText.setAttribute("name", "Courses");
inputText.setAttribute("id", "more");
inputText.required = true;
inputP.innerHTML = "Enter courses <span style='color: red;'>*</span>";
crsLbl.appendChild(inputP);
crsLbl.appendChild(inputText);


courses.addEventListener('change', function () {
  if (courses.value == 'multi') {
    CouDiv.appendChild(crsLbl)
  } else {
    CouDiv.removeChild(crsLbl)
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