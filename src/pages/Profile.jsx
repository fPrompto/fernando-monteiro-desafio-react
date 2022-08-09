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
      <div>
        <img src={data.username.avatar_url} alt={`Imagem de`} />
        <h2>{data.username.name}</h2>
        <p>{data.username.bio}</p>
        <p>{`@${data.username.login}`}</p>
        {/* <p>{data.username.location}</p> */}
        {/* <p>{data.username.company}</p> */}
        {/* <p>{data.username.blog}</p> */}
        {/* <p>{data.username.public_repos}</p> */}
        {/* <p>{data.username.public_gists}</p> */}
        <p>{`${data.username.followers} followers`}</p>
        <p>{`${data.username.following} following`}</p>
        <p>{data.username.email}</p>
        {/* <p>{data.username.created_at}</p> */}
      </div>
      <div>
        {data.repos.map((r, i) => (
          <div key={i}>{r.name}</div>
        ))}
      </div>
    </div>
  );
}

export default Profile;