import React, { useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState(``);
  const [userDetails, setUserDetails] = useState(null);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(``);

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSearch = async () => {
    try {
      setError(``);
      const userResponse = await fetch(
        `https://api.github.com/users/${username}`
      );
      if (!userResponse.ok) {
        throw new Error(`Invalid User`);
      }
      const userData = await userResponse.json();

      const reposResponse = await fetch(
        `https://api.github.com/users/${username}/repos`
      );
      const reposData = await reposResponse.json();

      setUserDetails(userData);
      setRepos(reposData);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleReset = () => {
    setUsername(``);
    setUserDetails(null);
    setRepos([]);
    setError(``);
  };

  return (
    <div>
      <h1>User Info</h1>
      <div>
        <input
          type="text"
          value={username}
          onChange={handleInputChange}
          placeholder="Enter username"
        />
        <button onClick={handleSearch}>SEARCH</button>
      </div>
      {error && <p>{error}</p>}
      {userDetails && (
        <div>
          <img src={userDetails.avatar_url} alt="avatar" width="120" />
          <h2>{userDetails.name}</h2>
          <p>{userDetails.location}</p>
          <p>{userDetails.bio}</p>
          <h3>Repositories</h3>
          <ul>
            {repos.map((repo) => (
              <li key={repo.id}>{repo.name}</li>
            ))}
          </ul>
          <button onClick={handleReset}>RESET</button>
        </div>
      )}
    </div>
  );
}

export default App;
