var form = document.getElementById('sheetdb-form');
let courses = document.getElementById('crs');
let submit = document.getElementById('subBtn');
let CouDiv = document.getElementById('crsdiv');
let crsLbl = document.createElement("label");
let inputP = document.createElement("p");
let inputText = document.createElement("input");


courses.addEventListener('change', function () {
  crsLbl.setAttribute("for","more");
  inputText.setAttribute("type", "text", "name", "Courses");
  inputText.setAttribute("name", "Courses");
  inputText.setAttribute("id", "more");
  inputText.required = true;
  inputP.innerHTML = "Enter courses <span style='color: red'>*</span>";
  crsLbl.appendChild(inputP);
  crsLbl.appendChild(inputText);
  if (courses.value == 'multi') {
    CouDiv.appendChild(crsLbl);
  } else {
    CouDiv.removeChild(crsLbl);
  }
})

function validateImg(){
  let img = document.forms['regForm']['uploaded_file'];
  let filename = document.forms['regForm']['uploaded_file'].value;
  let ext = filename.substr(filename.lastIndexOf(".")+1, filename.length).toLowerCase();
  if((ext == 'jpg') || (ext == 'png') || (ext == 'jpeg')){
    console.log(img.files[0].size/1024);
    if(img.files[0].size > 100 * 1024){ //checking size of the image
      alert("too large file")
      img.value = "";
    }
  }else{
    alert('select a image file only')
    img.value = "";
  }

}

function validate(){
  var validation = true;

  let num = document.forms['regForm']['Mobile'].value;
  let digit = Number(num);
  let password = document.getElementById('passwd').value;
  let cnfpassword = document.getElementById('cnfpasswd').value;
  if (!(num.length==10)){
    if((isNaN(digit))){
      alert("Not a number")
      validation = false;
    }else{
      alert(`enter ${num.length}/10 digit mobile number`)
    }
    validation = false;
  }

  if(password.length<6){
    alert('Password too short');
    validation = false;
  }

  if(password!=cnfpassword){
    alert('password Not match');
    validation = false;
  }
  // confirm("")
  return validation;
}

function showPass(d,e){
  document.getElementById(d).classList.toggle('bx-hide');
  document.getElementById(d).classList.toggle('bx-show');
  if(document.getElementById(e).type == 'text'){
    document.getElementById(e).type = 'password';
  }else{
    document.getElementById(e).type = 'text';

  }
}