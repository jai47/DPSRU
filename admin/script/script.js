var xhReq = new XMLHttpRequest();
xhReq.open("GET", '/admin/script/aprvData.json', false);
xhReq.send(null);

var jsonObject = JSON.parse(xhReq.responseText);


let requests = {
    data: jsonObject
}

let n = 1;
let j = '';
for (let i of requests.data) {
    if (n % 2 == 0) {
        j = 'white';
    } else {
        j = 'grey';
    }
    n++;
    let row = document.createElement('div');
    let imgBx = document.createElement('div');
    let img = document.createElement('img');
    let name = document.createElement('div');
    let title = document.createElement('span');
    let fname = document.createElement('span');
    let lname = document.createElement('span')
    let dob = document.createElement('div');
    let dobspan = document.createElement('span');
    let academic = document.createElement('div');
    let course = document.createElement('p');
    let designation = document.createElement('p');
    let company = document.createElement('p');
    let detail = document.createElement('p');
    let attending = document.createElement('div');
    let attend = document.createElement('span');
    let contact = document.createElement('div');
    let email = document.createElement('p');
    let phone = document.createElement('p');
    let button = document.createElement('div');
    let check = document.createElement('i');
    let x = document.createElement('i');
    row.classList.add('row', j);
    imgBx.classList.add('imgBx');
    name.classList.add('name');
    dob.classList.add('dob');
    academic.classList.add('academics');
    detail.classList.add('about');
    contact.classList.add('contacts');
    attending.classList.add('attending');
    button.classList.add('buttons');
    check.classList.add('bx', 'bxs-user-check');
    check.setAttribute("onclick", `approve('${i._id}')`)
    x.classList.add('bx', 'bxs-user-x');
    x.setAttribute("onclick", `reject('${i._id}')`)
    img.setAttribute('src', `/uploads//${i.Avtar}`);
    title.innerText = `${i.title}`;
    fname.innerText = `${i.F_NAME}`;
    lname.innerText = `${i.L_NAME}`;
    dobspan.innerText = `${i.DOB}`;
    course.innerText = `${i.Courses}`;
    designation.innerText = `${i.Designation}`;
    company.innerText = `${i.Company}`;
    detail.innerText = `${i.about}`;
    attend.innerText = `${i.Attending}`;
    email.innerText = `${i.Email}`;
    phone.innerText = `${i.Mobile}`;
    button.appendChild(check);
    button.appendChild(x);
    contact.appendChild(email);
    contact.appendChild(phone);
    attending.appendChild(attend);
    academic.appendChild(course);
    academic.appendChild(designation);
    academic.appendChild(company);
    academic.appendChild(detail);
    dob.appendChild(dobspan);
    name.appendChild(title);
    name.appendChild(fname);
    name.appendChild(lname);
    imgBx.appendChild(img);
    row.appendChild(imgBx);
    row.appendChild(name);
    row.appendChild(dob);
    row.appendChild(academic);
    row.appendChild(attending);
    row.appendChild(contact);
    row.appendChild(button);
    document.getElementById('folder').appendChild(row);
}

function approve(e) {
    if (e !== undefined) {
        fetch(`/approve?variable=${e}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
        setTimeout(
            location.reload(),5000
        )
    } else {
        console.log("Variable does not exist");
    }
    
}

function reject(e) {
    if (e !== undefined) {
        fetch(`/reject?variable=${e}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
        setTimeout(
            location.reload(),5000
        )
    } else {
        console.log("Variable does not exist");
    }
}