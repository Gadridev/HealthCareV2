let getData = JSON.parse(localStorage.getItem("healthData"));
let search = document.getElementById("search");
const motifFilter = document.getElementById("motifFilter");
let filterData = [...getData];
let itemsPerPage = 5;
let currentPage = 1;
let totalItems = getData.length;
let totalPages = Math.ceil(totalItems / itemsPerPage);
function getperPage(page) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filterData.slice(startIndex, endIndex);
}
const toggle = document.getElementById("toggle");
const html = document.documentElement;

if (localStorage.getItem("theme") === "dark") {
  html.classList.add("dark");
  toggle.textContent = "☀️ Light";
}

toggle.addEventListener("click", () => {
  html.classList.toggle("dark");

  const isDark = html.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  toggle.textContent = isDark ? "☀️ Light" : "🌙 Dark";
});
function createPagination() {
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";
  totalPages = Math.ceil(filterData.length / itemsPerPage);
  if (currentPage > 1) {
    const prevBtn = document.createElement("button");
    prevBtn.textContent = "previous";
    prevBtn.className = "border border-black px-4 rounded-[20px]";
    prevBtn.onclick = () => changePage(currentPage - 1);
    paginationContainer.appendChild(prevBtn);
  }
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.textContent = i;
    pageButton.className = currentPage === i ? "active " : "";
    pageButton.onclick = () => changePage(i);
    paginationContainer.appendChild(pageButton);
  }
  if (currentPage < totalPages) {
    const nextbtn = document.createElement("button");
    nextbtn.textContent = "next";
    nextbtn.className = "border border-black px-4 rounded-[20px]";
    nextbtn.onclick = () => changePage(currentPage + 1);
    paginationContainer.appendChild(nextbtn);
  }
}
function changePage(page) {
  if (page < 1 || page > totalItems) return;
  currentPage = page;
  showData();
  createPagination();
}
function showData() {
  const container = document.querySelector("tbody");
  container.innerHTML = "";
  const pageData = getperPage(currentPage);
  console.log(filterData);
  pageData.forEach((item) => {
    const tr = document.createElement("tr");
    const index = getData.indexOf(item);

    tr.className = "bg-white border-b hover:bg-gray-50";
    tr.innerHTML = `
      <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        ${item.nom}
      </th>
      <td class="px-6 py-4">${item.prenom}</td>
      <td class="px-6 py-4">${item.email}</td>
      <td class="px-6 py-4">${item.motif}</td>
      <td class="px-6 py-4">${item.date}</td>
      <td class="px-6 py-4 text-right">
        <button
          class="bg-blue-50 p-3 rounded-[15px] font-medium text-red-600 hover:underline"
          onclick="deleteItem(${index})">
          Delete
        </button>
      </td>
    `;
    container.appendChild(tr);
  });
}
function searchInput(event) {
  let value = event.toLowerCase();
  filterData = getData.filter((item) => {
    return (
      item.nom.toLowerCase().includes(value) ||
      item.prenom.toLowerCase().includes(value) ||
      item.email.toLowerCase().includes(value)
    );
  });
  showData();
}
function deleteItem(index) {
  getData.splice(index, 1);
  localStorage.setItem("data", JSON.stringify(getData));
  filterData = [...getData];
  createPagination();
  showData();
}
function applyFilters() {
  const searchValue = search.value.toLowerCase();
  const motifValue = motifFilter.value;

  filterData = getData.filter((item) => {
    const matchSearch =
      item.nom.toLowerCase().includes(searchValue) ||
      item.prenom.toLowerCase().includes(searchValue) ||
      item.email.toLowerCase().includes(searchValue);

    const matchMotif =
      motifValue === "all" ||
      item.motif.toLowerCase() === motifValue;

    return matchSearch && matchMotif;
  });
  currentPage = 1;
  showData();
  createPagination();
}

search.addEventListener("input", (e) => {
  applyFilters()
});
motifFilter.addEventListener("change", () => {
  applyFilters();
});
function initTable() {
  showData();
  createPagination();
}
document.addEventListener("DOMContentLoaded", initTable);
