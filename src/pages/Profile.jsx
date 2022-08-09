import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Loading from '../components/Loading';

import { fetchUser, fetchRepos } from '../utils/fetch';

function Profile() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useParams();

  const fetchData = async () => {
    const username = await fetchUser(user);
    const repos = await fetchRepos(user);

    setData({username, repos});

    setIsLoading(false);
    console.log('data =>', data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? <Loading /> : (
    <div>
      <h1>User</h1>
      <div>
        <span>Repos</span>
        {data.repos.map((r, i) => (
          <div key={i}>{r.name}</div>
        ))}
      </div>
    </div>
  );
}

export default Profile;