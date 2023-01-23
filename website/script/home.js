let menu = document.getElementById('popup');
let yearList = document.getElementById('yearList');
let folder = document.getElementById('folder');

for (n=23;n>=0;n--){
    let j='';
    if(n>9){
        j=n.toString();
    }else{
        j="0"+n.toString();
    }

    let img = document.createElement("img");
    img.setAttribute("src",`source/years/${j}.webp`);
    img.setAttribute("alt",`20${j}`);
    img.setAttribute("onclick",`showList('20${j}')`);
    yearList.appendChild(img);
    let div = document.createElement("div");
    let i = document.createElement("i");
    let innerDiv = document.createElement("div");
    // let h1 = document.createElement("h1");
    div.setAttribute("class","moreOptions");
    div.setAttribute("id",`20${j}`);
    i.setAttribute("class","bx bx-x");
    i.setAttribute("onclick",`showList('20${j}')`);
    innerDiv.setAttribute("class","container scrolling");
    // h1.innerText=`20${j}`;
    // innerDiv.appendChild(h1)
    div.appendChild(i);
    div.appendChild(innerDiv);
    folder.appendChild(div);    
}

function showOptions() {
    menu.classList.toggle('moreOptionsActive');
}

function showList(e){
    document.getElementById(e).classList.toggle('moreOptionsActive');
}

var xhReq = new XMLHttpRequest();
xhReq.open("GET", '/script/data.json', false);
xhReq.send(null);

var jsonObject = JSON.parse(xhReq.responseText);
 

let people = {
    data : jsonObject
}


for (let i of people.data){
    let card =  document.createElement("div");
    card.classList.add("card");
    let imgB =  document.createElement("div");
    imgB.classList.add("imgBx");
    let img = document.createElement("img");
    img.setAttribute("src",`/uploads//${i.Avtar}`);
    img.setAttribute("alt",`${i.F_NAME}`);
    let contentDiv = document.createElement("div");
    contentDiv.classList.add("content");
    if (i.paid){
        contentDiv.classList.add("paid");
    }
    let detailDiv = document.createElement("div");
    detailDiv.classList.add("details");
    let h2 = document.createElement("h2");
    h2.innerText = `${i.title} ${i.F_NAME} ${i.L_NAME}\n`;
    let span = document.createElement("span");
    span.innerText = `${i.Designation}`
    h2.appendChild(span);
    let dataDiv = document.createElement("div");
    dataDiv.classList.add("data");
    let para = document.createElement("p");
    para.innerText = `${i.about}`;
    dataDiv.appendChild(para);
    detailDiv.appendChild(h2);
    detailDiv.appendChild(dataDiv);
    contentDiv.appendChild(detailDiv);
    imgB.appendChild(img);
    card.appendChild(imgB);
    card.appendChild(contentDiv);

    document.getElementById(i.Attending).children[1].appendChild(card);


}