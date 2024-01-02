const newUrl = new URLSearchParams(window.location.search).get("id"),
  form = document.querySelector(".navbar__form"),
  createForm = document.querySelector(".create__form-varAbout"),
  searchForm = document.querySelector(".main__container-search"),
  searchJson = document.querySelector("#search__selection"),
  searchBtn = document.querySelector(".searchBtn"),
  navbarBtn = document.querySelector(".navbar__btn"),
  navbarSelects = document.querySelector(".navbar__selects"),
  mainContainerSelect = document.querySelector(".main__container-selections"),
  mainCarts = document.querySelector(".main__carts"),
  theme = document.querySelectorAll(".options__list"),
  widthLists = document.querySelectorAll(".width-list"),
  navbarTheme = document.querySelector(".navbar__options-theme"),
  navbarWidth = document.querySelector(".navbar__options-width"),
  optionsTheme = document.querySelector(".options--theme"),
  optionsWith = document.querySelector(".options--width"),
  container = document.querySelectorAll(".container"),
  root = document.querySelector(":root"),
  body = document.querySelector("body"),
  customSelects = document.querySelectorAll(".create__custom-select"),
  downIcon = document.querySelector(".fa-angle-right"),
  variableSelection = document.querySelector(".form__variable-selections"),
  variableSelections = document.querySelectorAll(
    ".form__variable-selections span"
  ),
  createBtn = document.querySelector(".create__form-btn"),
  mainDetails = document.querySelector(".main--details");

let check = false,
  allData = [],
  selected = [],
  urlPathName = window.location.pathname.split("/").pop();


  if (urlPathName === "index.html") {
    getData();
    sendPost();
    formSubmit();
    changeContent();
    changeModes();
    changeWidth();
  } else if (urlPathName === "create.html") {
    createVarAbout();
    sendCreateData();
  }
  else if(urlPathName === "details.html"){
    infoVariable();
    changeContent();
    changeModes();
    changeWidth();
    formSubmit();
  }

function createVarAbout() {
  downIcon.addEventListener("click", function () {
    variableSelection.classList.toggle("display");
    downIcon.classList.toggle("rotate");
  });

  variableSelections.forEach((selects) => {
    selects.addEventListener("click", function () {
      selects.classList.toggle("select");
      if (selects.classList.contains("select")) {
        selected.push(selects.textContent);
        if (selected.length > 3) {
          selects.classList.remove("select");
          selected.pop();
        }
      } else {
        let selectedIndex = selected.indexOf(selects.textContent);
        selected.splice(selectedIndex, 1);
        if (!selected.slice(selectedIndex, 1)) {
          selected.push(selects.textContent);
        }
      }
    });
  });
}

function sendCreateData(){
  let count = 0;
  
  createBtn.addEventListener("click",async function(e){
    e.preventDefault();
    const createData = {
      title: createForm.title.value,
      info: createForm.subtitle.value,
      targets: selected,
      date: new Date(),
    }

    // const createVariable = {
    //   name: selected,
    //   count: count + 1,
    // }

    await fetch("http://localhost:3000/variableAbout",{
      method: "POST",
      body: JSON.stringify(createData),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    });

    await fetch("http://localhost:3000/variable",{
      method: "POST",
      body:JSON.stringify(createVariable),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    });

    window.location.href = "/index.html"

  })
}

function formSubmit() {
  form.addEventListener("submit", SignUp);
  searchBtn.addEventListener("click", SignUp);
  navbarTheme.addEventListener("click", (e) => {
    optionsTheme.classList.toggle("scroll");
  });
  navbarWidth.addEventListener("click", (e) => {
    optionsWith.classList.toggle("scrollX");
  });
}

function SignUp(e) {
  e.preventDefault();
  regexTest();
  if (!check) {
    alert("this is wrong, please write again");
  } else {
    form.style.display = "none";
  }
}

function regexTest() {
  const regexName = /^[a-z\d]{5,12}$/i;
  const regexEmail = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
  if (regexName.test(form.text.value) && regexEmail.test(form.email.value)) {
    check = true;
  }
}

function changeContent() {
  navbarBtn.addEventListener("click", (e) => {
    navbarBtn.classList.toggle("active");
  });
}

function changeModes() {
  theme[0].addEventListener("click", (e) => {
    root.style.setProperty("--very-dark", "#161A1D");
    root.style.setProperty("--very-light", "#ffffff");
    root.style.setProperty("--light-bg", "hsl(200, 100%, 30%)");
    root.style.setProperty("--dark-bg", "hsl(200, 100%, 75%)");
    root.style.setProperty("--cart-info", "#E5E7E5");
    root.style.setProperty("--select-bg", "#3B3B3B");
    root.style.setProperty("--mode-bg", "#374151");
  });

  theme[1].addEventListener("click", (e) => {
    root.style.setProperty("--very-dark", "#ffffff");
    root.style.setProperty("--very-light", "#161A1D");
    root.style.setProperty("--light-bg", "hsl(200, 100%, 75%)");
    root.style.setProperty("--dark-bg", "hsl(200, 100%, 30%)");
    root.style.setProperty("--cart-info", "#4B5563");
    root.style.setProperty("--select-bg", "#ffffff");
    root.style.setProperty("--mode-bg", "#E5E7EB");
  });
}

function changeWidth() {
  widthLists[0].addEventListener("click", (e) => {
    container.forEach((item) => {
      item.style.width = "40%";
    });

    navbarSelects.classList.add("narrow");
    navbarSelects.classList.remove("wide");
  });
  widthLists[1].addEventListener("click", (e) => {
    container.forEach((item) => {
      item.style.width = "50%";
    });

    navbarSelects.classList.remove("narrow");
    navbarSelects.classList.remove("wide");
  });
  widthLists[2].addEventListener("click", (e) => {
    container.forEach((item) => {
      item.style.width = "60%";
    });

    navbarSelects.classList.remove("narrow");
    navbarSelects.classList.add("wide");
  });
}

async function getData() {
  const res = await fetch("http://localhost:3000/variable");
  const posts = await res.json();
  sendData(posts);
}

async function sendPost() {
  const res = await fetch("http://localhost:3000/variableAbout");
  const data = await res.json();
  getPost(data);
}

function sendData(data) {
  data.map((item) => {
    let { name, count } = item;
    mainContainerSelect.innerHTML += `
    <button class="main__select">
    <span class="main__option" onclick= "clickTarget(this)">${name.find(items => {
      return items;
    })}</span>
    <div class="main__index">${count}</div>
    </button>
    `;
  });
}

function getPost(post) {
  allData = post;
  let mainHtml = "";
  post.map((values) => {
    let { id, title, targets, info, date } = values;
    mainHtml += `
      <div class="main__cart">
      <a href="/details.html?id=${id}" class="main__cart-title">${title}
      </a>
      <span class="main__cart-date">${new Date(date).toLocaleString("en-US", {
        day: "2-digit",
        month: "long",
        year: "2-digit",
      })}</span>
      <div class="main__cart-names">
      ${targets.map((item,index) => {
          return `
          <span class="main__cart-name">${item}</span>
          `;
        }).join(" ")}
        </div>
        <p class="main__cart-info">${info}
        </p>
        <a href="#" class="main__cart-btn">Read More</a>
        </div>
        `;
    mainCarts.innerHTML = mainHtml;
  });
}

async function infoVariable(){
  const response = await fetch("http://localhost:3000/variableAbout/" + newUrl);
  const data = await response.json();
  console.log(data);
}

function clickTarget(e) {
  e.classList.toggle("bg");
}


