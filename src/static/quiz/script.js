document.getElementById("fetch-button").onclick = async () => {
  const response = await fetch("/data");
  const hirabunArray = await response.json();
  const ul = document.createElement("ul")
  for (const dataRow of hirabunArray) {
    const li = document.createElement("li");
    li.innerHTML = dataRow.EnglishSentences;
    ul.appendChild(li);
  } 
  document.body.appendChild(ul);
};
