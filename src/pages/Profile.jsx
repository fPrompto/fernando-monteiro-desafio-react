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
          <h6 className='repo-header'>Repositories</h6>
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