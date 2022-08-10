import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import Loading from '../components/Loading';

import { fetchUser, fetchRepos } from '../utils/fetch';
import { repoIcon, getLangIcon } from '../utils/icons';

import '../css/Profile.css';

function Profile() {
  const [data, setData] = useState({
    repos: {},
    username: {},
  });
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useParams();

  const fetchData = async () => {
    const username = await fetchUser(user);
    const repos = await fetchRepos(user);

    if (username.login) {
      await setData({ username, repos });
      return setIsLoading(false);
    }
    return window.location.href = '/user-not-found';
  };

  const getDate = (date) => {
    const d = new Date(date);
    const day = d.getDate();
    const monthShort = d.toLocaleString('en-US', { month: 'short' });
    const monthLong = d.toLocaleString('en-US', { month: 'long' });

    return { day, monthLong, monthShort };
  };

  const profile = () => (
    <div className='left-div'>
      <div className='profile-div'>
        <img
          src={data.username.avatar_url}
          alt={`Imagem de perfil de ${data.username.name}`}
          className='avatar-img'
        />
        <div className='profile-info'>
          <h2>{data.username.name}</h2>
          <span className='grey-font'>{data.username.bio}</span>
          <Button
            variant='dark'
            className='follow-btn'
            href={data.username.html_url}
          >
            Follow
          </Button>
          <span className='profile-login'>{`@${data.username.login}`}</span>
          <span className='followers'>{data.username.followers}</span>
          <span className='grey-font'> followers </span>
          <span className='followers'>{data.username.following}</span>
          <span className='grey-font'> following</span>
          <p>{data.username.email}</p>
          <hr className='featurette-divider feat-divider' />
        </div>
      </div>
    </div>
  );

  const repositories = () => (
    <div className='repos-div'>
      <h6 className='repo-header'>
        {repoIcon}
        {` Repositories `}
        <div className='repo-counter'>{data.username.public_repos}</div>
      </h6>
      {data.repos.map((r, i) => {
        const { day, monthShort } = getDate(r.updated_at);
        const icon = getLangIcon(r.language);

        return (
          <div key={i} className='repo-card'>
            <h5 className='repo-name'><a href={r.clone_url}>{r.name}</a></h5>
            <p className='repo-description grey-font'>{r.description}</p>
            {icon}
            {
              r.language ?
                <span className='grey-font'>{` ${r.language}`}</span> :
                <span className='grey-font'>No language</span>
            }
            <span className='grey-font'> • </span>
            <span className='grey-font'>{` Updated on ${day} ${monthShort}`}</span>
            <hr className='featurette-divider feat-divider repo-divider' />
          </div>
        );
      })}
    </div>
  );

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? <Loading /> : (
    <div>
      <hr className='featurette-divider feat-divider header-divider' />
      <div className='main-profile'>
        {profile()}
        {repositories()}
      </div>
    </div>
  );
}

export default Profile;
