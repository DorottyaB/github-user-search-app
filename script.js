const loader = document.querySelector('.loader-container');
const themeToggler = document.querySelector('input[type="checkbox"]');
const cardSuccess = document.getElementById('cardSuccess');
const cardError = document.getElementById('cardError');
const form = document.querySelector('form');
const searchInput = document.getElementById('user-search');

loader.classList.add('visible');

let query = 'octocat';

const toggleTheme = () => {
  const body = document.querySelector('body');
  const themeLabel = document.getElementById('themeText');
  const themeIcon = document.getElementById('themeIcon');
  body.classList.toggle('light-mode');
  if (themeToggler.checked) {
    themeLabel.textContent = 'dark';
    themeIcon.src = './assets/moon-fill.svg';
  } else {
    themeLabel.textContent = 'light';
    themeIcon.src = './assets/sun-fill.svg';
  }
};

const getUser = async username => {
  const avatar = document.getElementById('userAvatar');
  const userName = document.getElementById('userName');
  const userLogin = document.getElementById('userLogin');
  const userJoined = document.getElementById('userJoined');
  const userBio = document.getElementById('userBio');
  const userRepos = document.getElementById('repos');
  const userFollowers = document.getElementById('followers');
  const userFollowing = document.getElementById('following');
  const userLocation = document.getElementById('userLocation');
  const userBlog = document.getElementById('userBlog');
  const userTwitter = document.getElementById('userTwitter');
  const userCompany = document.getElementById('userCompany');

  const array = [userBio, userLocation, userBlog, userTwitter, userCompany];
  array.map(item => item.classList.remove('disabled'));

  try {
    const res = await axios.get(`https://api.github.com/users/${username}`);
    const {
      avatar_url,
      name,
      login,
      html_url,
      created_at,
      bio,
      public_repos,
      followers,
      following,
      location,
      blog,
      twitter_username,
      company,
    } = res.data;
    cardSuccess.style.display = 'block';
    loader.classList.remove('visible');
    const joined = new Date(created_at).toDateString().split(' ');
    avatar.src = avatar_url;
    userName.textContent = name;
    userLogin.textContent = `@${login}`;
    userLogin.href = html_url;
    userJoined.textContent = `Joined ${joined[2]} ${joined[1]} ${joined[3]}`;
    userBio.textContent = bio || 'This profile has no bio';
    if (!bio) {
      userBio.classList.add('disabled');
    }
    userRepos.textContent = public_repos;
    userFollowers.textContent = followers;
    userFollowing.textContent = following;
    userLocation.querySelector('p').textContent = location || 'Not Available';
    if (!location) {
      userLocation.classList.add('disabled');
    }
    userBlog.querySelector('a').textContent = blog || 'Not Available';
    userBlog.querySelector('a').href = blog || '';
    if (!blog) {
      userBlog.classList.add('disabled');
    }
    userTwitter.querySelector('p').textContent = twitter_username || 'Not Available';
    if (!twitter_username) {
      userTwitter.classList.add('disabled');
    }
    userCompany.querySelector('p').textContent = company || 'Not Available';
    if (!company) {
      userCompany.classList.add('disabled');
    }
    searchInput.value = '';
  } catch (error) {
    loader.classList.remove('visible');
    cardError.style.display = 'flex';
    console.log(error.response.data.message);
  }
};

themeToggler.addEventListener('change', toggleTheme);

searchInput.addEventListener('change', e => {
  query = e.target.value;
});

form.addEventListener('submit', e => {
  e.preventDefault();
  cardSuccess.style.display = 'none';
  cardError.style.display = 'none';
  loader.classList.add('visible');
  getUser(query);
});

// On load
getUser(query);
