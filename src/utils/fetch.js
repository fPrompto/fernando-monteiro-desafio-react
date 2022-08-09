import axios from 'axios';

const fetch = async (url) => {
  try {
    const response = await axios({
      method: 'GET',
      url,
    });

    return response.data;
  } catch (_e) {
    return {};
  }
};

const fetchUser = async (user) => {
  const response = await fetch(`https://api.github.com/users/${user}`);

  return response;
};

const fetchRepos = async (user) => {
  const response = await fetch(`https://api.github.com/users/${user}/repos`);

  return response;
};

export { fetchUser, fetchRepos };
