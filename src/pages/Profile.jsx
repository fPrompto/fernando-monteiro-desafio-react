import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import Loading from '../components/Loading';

import { fetchUser, fetchRepos } from '../utils/fetch';

import '../css/Profile.css';

function Profile() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useParams();

  const fetchData = async () => {
    const username = await fetchUser(user);
    const repos = await fetchRepos(user);

    setData({ username, repos });

    setIsLoading(false);
    console.log('data =>', data);
  };

  const getDate = (date) => {
    const d = new Date(date);
    // const dateMonth = d.toLocaleString('pt-BR', { month: 'long' });
    const day = d.getDate();
    const monthShort = d.toLocaleString('en-US', { month: 'short' });
    const monthLong = d.toLocaleString('en-US', { month: 'long' });


    return { day, monthLong, monthShort };
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? <Loading /> : (
    <div>
      <hr className='featurette-divider feat-divider header-divider' />
      <div className='main-profile'>
        <div className='left-div'>
          <div className='profile-div'>
            <img
              src={data.username.avatar_url}
              alt={`Imagem de perfil de ${data.username.name}`}
              className='avatar-img'
            />
            <div className='profile-info'>
              <h2>{data.username.name}</h2>
              <span>{data.username.bio}</span>
              <Button
                variant='dark'
                className='follow-btn'
              >
                Follow
              </Button>
              <span className='profile-login'>{`@${data.username.login}`}</span>
              {/* <p>{data.username.location}</p> */}
              {/* <p>{data.username.company}</p> */}
              {/* <p>{data.username.blog}</p> */}
              {/* <p>{data.username.public_repos}</p> */}
              {/* <p>{data.username.public_gists}</p> */}
              <span>{`${data.username.followers} followers `}</span>
              <span>{`${data.username.following} following`}</span>
              <p>{data.username.email}</p>
              {/* <p>{data.username.created_at}</p> */}
              <hr className='featurette-divider feat-divider' />
            </div>
          </div>
        </div>
        <div className='repos-div'>
          <h6 className='repo-header'>
            <svg
              aria-hidden='true'
              height='16'
              viewBox='0 0 16 16'
              version='1.1'
              width='16'
            >
              <path
                fillRule='evenodd'
                d='M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z'
              />
            </svg>
            {` Repositories `}
            <div className='repo-counter'>{data.repos.length}</div>
          </h6>
          {data.repos.map((r, i) => {
            const { day, monthShort } = getDate(r.updated_at);

            return (
              <div key={i} className='repo-card'>
                <h5>{r.name}</h5>
                <span>{r.description}</span>
                <span>{r.language}</span>
                {/* <span>{`${r.updated_at}`}</span> */}
                <span>{` Updated on ${day} ${monthShort}`}</span>
                <hr className='featurette-divider feat-divider repo-divider' />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Profile;