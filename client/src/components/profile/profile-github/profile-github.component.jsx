import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

/* -------------------------------------------------------------------------- */

const ProfileGithub = ({ username }) => {
  const [github, setGithub] = useState({
    count: 5,
    sort: 'created: asc',
    repos: [],
  });

  const { count, sort, repos } = github;
  const isMountedRef = useRef(null);

  useEffect(() => {
    isMountedRef.current = true;

    fetch(`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}`)
      .then(res => res.json())
      .then(data => {
        if (isMountedRef.current) {
          setGithub({ ...github, repos: data });
        }
        // setGithub({ ...github, repos: data });
      })
      .catch(() => setGithub({ ...github, repos: [] }));

    return () => (isMountedRef.current = false);
    // eslint-disable-next-line
  }, []);

  const repoItems = repos.map(repo => (
    <div key={repo.id} className="card card-body mb-2">
      <div className="row">
        <div className="col-md-6">
          <h4>
            <Link to={repo.html_url} className="text-info" target="_blank">
              {repo.name}
            </Link>
          </h4>
          <p>{repo.description}</p>
        </div>
        <div className="col-md-6">
          <span className="badge badge-info mr-1">Stars: {repo.stargazers_count}</span>
          <span className="badge badge-secondary mr-1">Watchers: {repo.watchers_count}</span>
          <span className="badge badge-success">Forks: {repo.forks_count}</span>
        </div>
      </div>
    </div>
  ));

  return (
    <div>
      <hr />
      <h3 className="mb-4">Latest Github Repos</h3>
      {repoItems}
    </div>
  );
};

/* -------------------------------------------------------------------------- */

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired,
};

export default ProfileGithub;
