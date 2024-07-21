const api = "http://api.github.com/users/";
const main = document.querySelector("#main");
const searchBox = document.querySelector("#search");

const getUser = async (username) => {
  const response = await fetch(api + username);
  const data = await response.json();
  const card = `<div class="card bg-purple-700 rounded-lg p-6 shadow-md flex flex-col items-center w-full md:flex-row md:items-start">
        <div class="md:w-1/4 flex justify-center">
          <img class="avatar w-24 h-24 mb-6 rounded-full border-4 border-white object-cover md:w-[80%] md:h-[80%]" src="${data.avatar_url}" alt="Profile Pic" />
        </div>
        <div class="user-info ml-8 text-center md:text-left md:w-3/4">
          <h2 class="text-2xl font-bold mb-2 w-full text-white">${data.name}</h2>
          <p class="text-gray-200 text-base w-full">${data.bio}</p>

          <ul class="info list-none flex gap-4 my-4">
            <li class="text-white">${data.followers}<strong> Followers</strong></li>
            <li class="text-white">${data.following}<strong> Following</strong></li>
            <li class="text-white">${data.public_repos}<strong> Repositories</strong></li>
          </ul>

          <div id="repos" class="flex flex-wrap gap-2">
            
          </div>
        </div>
      </div>`;
  main.innerHTML = card;
  getRepos(username);
};

const getRepos = async (username) => {
  const reposContainer = document.getElementById("repos");
  const api = "https://api.github.com/users/";

  try {
    const response = await fetch(api + username + "/repos");
    const data = await response.json();

    data.forEach((item) => {
      const repo = document.createElement("a");
      repo.classList.add("repo");
      repo.href = item.html_url;
      repo.innerText = item.name;
      repo.target = "_blank";
      reposContainer.appendChild(repo);
    });
  } catch (error) {
    console.error("Error fetching repositories:", error);
  }
};

const formSubmit = () => {
  if (searchBox.value != "") {
    getUser(searchBox.value);
    searchBox.value = "";
  }
  return false;
};

searchBox.addEventListener("focusout", () => {
  formSubmit();
});
