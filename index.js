let movies = document.getElementById("movies");
let search = document.getElementById("search");
let bgImage = document.querySelector("body>img");
let personInfo = document.getElementById("personInfo");
personInfo.style.visibility = "hidden";
let id;

async function getData() {
  let name = document.querySelector("#name").value;
  if (name === "") {
    movies.style.visibility = "hidden";
    search.style.borderBottomLeftRadius = "20px";
    search.style.borderBottomRightRadius = "20px";
    return;
  }
  let url = `https://swapi.dev/api/people/?search=${name}`;
  let res = await fetch(url);
  let data = await res.json();
  console.log(data.results);
  if (name !== "" && data.count === 0) {
    movies.innerHTML = null;
    let result = document.createElement("h4");
    result.innerText = "No results found. Try again...";
    let div = document.createElement("div");
    div.append(result);
    movies.style.height = "80px";
    search.style.borderBottomLeftRadius = "0px";
    search.style.borderBottomRightRadius = "0px";
    movies.append(div);
  } else displayData(data.results);
}

function displayData(data) {
  movies.innerHTML = null;
  data.forEach(function (el) {
    let name = document.createElement("h4");
    name.innerText = el.name;
    name.addEventListener("click", function () {
      movies.style.visibility = "hidden";
      search.style.visibility = "hidden";
      bgImage.style.visibility = "hidden";
      personInfo.style.visibility = "visible";
      let Personname = document.createElement("h1");
      Personname.innerText = el.name;

      let info = document.createElement("h2");
      info.innerText = "Personal Info";
      let PersonbirthYear = document.createElement("h3");
      PersonbirthYear.innerText = `Birth Year : ${el.birth_year}`;
      let Persongender = document.createElement("h3");
      Persongender.innerText = `Gender : ${el.gender}`;
      let Personheight = document.createElement("h3");
      Personheight.innerText = `Height : ${el.height}`;
      let div1 = document.createElement("div");
      div1.append(info, PersonbirthYear, Persongender, Personheight);

      let anatomy = document.createElement("h2");
      anatomy.innerText = "Anatomy";
      let Personeye = document.createElement("h3");
      Personeye.innerText = `Eye Colour : ${el.eye_color}`;
      let Personmass = document.createElement("h3");
      Personmass.innerText = `Mass : ${el.mass}`;
      let Personhair = document.createElement("h3");
      Personhair.innerText = `Hair Colour : ${el.hair_color}`;
      let div2 = document.createElement("div");
      div2.append(anatomy, Personeye, Personmass, Personhair);

      let div3 = document.createElement("div");
      div3.append(div1, div2);
      div3.setAttribute("id", "info");

      let button = document.createElement("button");
      button.innerText = "Go Back";
      button.addEventListener("click", function () {
        movies.style.visibility = "visible";
        search.style.visibility = "visible";
        bgImage.style.visibility = "visible";
        bgImage.style.marginTop = "-7%";
        personInfo.innerHTML = null;
        personInfo.style.visibility = "hidden";
      });

      let div4 = document.createElement("div");
      div4.append(Personname, div3, button);

      personInfo.append(div4);
    });

    let birthYear = document.createElement("h5");
    birthYear.innerText = el.birth_year;
    let smallDiv = document.createElement("div");
    smallDiv.append(name, birthYear);
    let gender = document.createElement("h5");
    gender.innerText = el.gender;
    let div = document.createElement("div");
    div.append(smallDiv, gender);
    movies.style.height = "300px";
    search.style.borderBottomLeftRadius = "0px";
    search.style.borderBottomRightRadius = "0px";
    movies.style.visibility = "visible";
    movies.append(div);
  });
}

async function debouncing(func, delay) {
  if (id) clearTimeout(id);
  id = setTimeout(function () {
    func();
  }, delay);
}
