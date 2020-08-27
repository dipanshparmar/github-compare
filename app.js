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
const grade = [];
const url = [];

/* event listeners */

// looking for click on compare button
document.querySelector("#compare").addEventListener("click", () => {
  /// variable to get first user and the second user
  let firstUser = document.querySelector(".first-name").value;
  let secondUser = document.querySelector(".second-name").value;

  if (firstUser && secondUser) {
    // fetching the api with given names
    getUsers(apiURL, firstUser, secondUser);
  } else {
    alert("Please fill in both the fields");
  }
});

// function to display the content
function displayContent() {
  
}

// function to get the repo count
async function findAndPushReposCount(name) {
  const response = await fetch(`https://api.github.com/users/${name}/repos`);
  const data = await response.json();

  repos.push(data.length);

  // getting the stars
  getStars(name, data.length);
}


// function to get the stars
async function getStars(name, repoLength) {
  const response = await fetch(`https://api.github.com/users/${name}/repos`);
  const data = await response.json();

  // stars initial variable
  let starCount = 0;

  // counting stars from each repo
  for(let i = 0; i < repoLength; i++) {
    starCount += data[i].watchers_count;
  }
  
  // pushing the star count
  stars.push(starCount);

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

  // pushing the following count
  following.push(firstData.following, secondData.following);

  // getting and pushing the repos count, getting the stars count on the same function
  findAndPushReposCount(firstName);
  findAndPushReposCount(secondName);
}