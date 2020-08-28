/* variables */

// api url
const apiURL = "https://api.github.com/users/";

/* arrays */
const imageURLs = [];
const names = [];
const followers = [];
const following = [];
const repos = [];
const stars = [];
const url = [];

// points
let firstUserPoints = 0,
  secondUserPoints = 0;

/* event listeners */

// looking for click on compare button
document.querySelector("#compare").addEventListener("click", () => {
  /// variable to get first user and the second user
  let firstUser = document.querySelector(".first-name").value;
  let secondUser = document.querySelector(".second-name").value;

  if (firstUser.trim() && secondUser.trim()) {
    // fetching the api with given names
    getUsers(apiURL, firstUser, secondUser);
  } else {
    alert("Please fill in both the fields");
  }
});

// making the reset button functional
document.querySelector("#reset").addEventListener("click", () => {
  document.querySelector("#compare-results").innerHTML = "";
});

// function to display the content
function displayContent() {
  document.querySelector("#compare-results").innerHTML = `<div id="profile1">
  <img src="assets/crown.png" class="crown crownOne" />
  <img
    src=${imageURLs[0]}
    alt="user profile"
    class="display-profile"
  />
  <span class="name">${names[0]}</span>
  <span class="followers followersOne">${followers[0]}</span>
  <span class="following followingOne">${following[0]}</span>
  <span class="repos reposOne">${repos[0]}</span>
  <span class="stars starsOne">${stars[0]}</span>
  <hr />
  <span class="url">${url[0]}</span>
</div>
<div id="comparison-content">
  <img class="crown" src="assets/crown.png" />
  <div id="text-container">
    <h2 class="text">VS</h2>
  </div>
  <span class="name-heading">-Name-</span>
  <span class="followers-heading">-Followers-</span>
  <span class="following-heading">-Following-</span>
  <span class="repos-heading">-Repos-</span>
  <span class="grade-heading">-Stars-</span>
  <hr />
  <span class="url">-URL-</span>
</div>
<div id="profile2">
  <img src="assets/crown.png" alt="crown" class="crown crownTwo" />
  <img
    src=${imageURLs[1]}
    alt="user profile"
    class="display-profile"
  />
  <span class="name">${names[1]}</span>
  <span class="followers followersTwo">${followers[1]}</span>
  <span class="following followingTwo">${following[1]}</span>
  <span class="repos reposTwo">${repos[1]}</span>
  <span class="stars starsTwo">${stars[1]}</span>
  <hr />
  <span class="url">${url[1]}</span>
</div>`;

  // getting all the points
  if (followers[0] > following[1]) {
    document.querySelector(".followersOne").style.color = "rgb(39, 199, 39)";
    document.querySelector(".followersTwo").style.color = "rgb(255, 53, 53)";
    ++firstUserPoints;
  } else if (followers[1] > followers[0]) {
    document.querySelector(".followersTwo").style.color = "rgb(39, 199, 39)";
    document.querySelector(".followersOne").style.color = "rgb(255, 53, 53)";
    ++secondUserPoints;
  } else {
    document.querySelector(".followersTwo").style.color = "rgb(39, 199, 39)";
    document.querySelector(".followersOne").style.color = "rgb(39, 199, 39)";
  }
  if (following[0] > following[1]) {
    document.querySelector(".followingOne").style.color = "rgb(39, 199, 39)";
    document.querySelector(".followingTwo").style.color = "rgb(255, 53, 53)";
    ++firstUserPoints;
  } else if (following[1] > following[0]) {
    document.querySelector(".followingTwo").style.color = "rgb(39, 199, 39)";
    document.querySelector(".followingOne").style.color = "rgb(255, 53, 53)";
    ++secondUserPoints;
  } else {
    document.querySelector(".followingTwo").style.color = "rgb(39, 199, 39)";
    document.querySelector(".followingOne").style.color = "rgb(39, 199, 39)";
  }
  if (repos[0] > repos[1]) {
    document.querySelector(".reposOne").style.color = "rgb(39, 199, 39)";
    document.querySelector(".reposTwo").style.color = "rgb(255, 53, 53)";
    ++firstUserPoints;
  } else if (repos[1] > repos[0]) {
    document.querySelector(".reposTwo").style.color = "rgb(39, 199, 39)";
    document.querySelector(".reposOne").style.color = "rgb(255, 53, 53)";
    ++secondUserPoints;
  } else {
    document.querySelector(".reposTwo").style.color = "rgb(39, 199, 39)";
    document.querySelector(".reposOne").style.color = "rgb(39, 199, 39)";
  }
  if (stars[0] > stars[1]) {
    document.querySelector(".starsOne").style.color = "rgb(39, 199, 39)";
    document.querySelector(".starsTwo").style.color = "rgb(255, 53, 53)";
    ++firstUserPoints;
  } else if (stars[1] > stars[0]) {
    document.querySelector(".starsTwo").style.color = "rgb(39, 199, 39)";
    document.querySelector(".starsOne").style.color = "rgb(255, 53, 53)";
    ++secondUserPoints;
  } else {
    document.querySelector(".starsTwo").style.color = "rgb(39, 199, 39)";
    document.querySelector(".starsOne").style.color = "rgb(39, 199, 39)";
  }

  // making the crown visible according to the results
  if (firstUserPoints > secondUserPoints) {
    document.querySelector(".crownOne").style.visibility = "visible";
  } else if (secondUserPoints > firstUserPoints) {
    document.querySelector(".crownTwo").style.visibility = "visible";
  } else {
    document.querySelector(".crownOne").style.visibility = "visible";
    document.querySelector(".crownTwo").style.visibility = "visible";
  }

  // making the values 0 for the next use
  firstUserPoints = 0;
  secondUserPoints = 0;
}

// function to get the repo count
async function findAndPushReposCount(firstName, secondName) {
  const firstResponse = await fetch(
    `https://api.github.com/users/${firstName}/repos`
  );
  const firstData = await firstResponse.json();

  const secondResponse = await fetch(
    `https://api.github.com/users/${secondName}/repos`
  );
  const secondData = await secondResponse.json();

  repos.push(firstData.length, secondData.length);

  // getting the stars
  getStars(firstName, secondName, firstData.length, secondData.length);
}

// function to get the stars
async function getStars(
  firstName,
  secondName,
  firstRepoLength,
  secondRepoLength
) {
  // getting first user details
  const firstResponse = await fetch(
    `https://api.github.com/users/${firstName}/repos`
  );
  const firstData = await firstResponse.json();

  // getting second user details
  const secondResponse = await fetch(
    `https://api.github.com/users/${secondName}/repos`
  );
  const secondData = await secondResponse.json();

  // stars initial variable
  let firstStarCount = 0,
    secondStarCount = 0;

  // counting stars from each repo of first user
  for (let i = 0; i < firstRepoLength; i++) {
    firstStarCount += firstData[i].watchers_count;
  }

  // counting stars from each repo of second user
  for (let i = 0; i < secondRepoLength; i++) {
    secondStarCount += secondData[i].watchers_count;
  }

  // pushing the star counts of both the users
  stars.push(firstStarCount, secondStarCount);

  // display content
  displayContent();
}

// function to fetch the users
async function getUsers(apiURL, firstName, secondName) {
  // getting first name details
  const firstResponse = await fetch(`${apiURL}${firstName}`);
  const firstData = await firstResponse.json();

  // getting second name details
  const secondResponse = await fetch(`${apiURL}${secondName}`);
  const secondData = await secondResponse.json();

  // pushing the images urls of both the users
  imageURLs.push(firstData.avatar_url, secondData.avatar_url);

  // pushing the names of the users
  names.push(firstData.name, secondData.name);

  // pushing the followers count
  followers.push(firstData.followers, secondData.followers);

  // pushing the profile urls
  url.push(firstData.html_url, secondData.html_url);

  // pushing the following count
  following.push(firstData.following, secondData.following);

  // getting and pushing the repos count, getting the stars count on the same function
  findAndPushReposCount(firstName, secondName);
}
