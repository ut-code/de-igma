document.getElementById("fetch-button").onclick = async () => {
  const response = await fetch("/data");
  const hirabun = await response.text();
  alert(hirabun);
};
