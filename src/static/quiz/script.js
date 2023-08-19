document.getElementById("fetch-button").onclick = async () => {
  document.getElementById("currentHirabun").innerHTML = "";
  const response = await fetch("/data");
  const hirabunArray = await response.json();
  const ul = document.createElement("ul");
  for (const dataRow of hirabunArray) {
    const li = document.createElement("li");
    li.innerHTML = dataRow.EnglishSentences;
    ul.appendChild(li);
  }
  document.getElementById("currentHirabun").appendChild(ul);
};

const addHirabunButton = document.getElementById("addButton");
addHirabunButton.onclick = async () => {
  const hirabunInput = document.getElementById("add").value;
  if (hirabunInput !== "") {
    const body = new URLSearchParams({ hirabun: hirabunInput });
    const response = await fetch("/addHirabun", { method: "post", body: body });
  }
};
