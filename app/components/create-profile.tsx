import { useState } from 'react';
import logo from '../assets/images/logo.png';
import { Card } from '@chakra-ui/react';

const CreateProfile = () => {
  const [state, setState] = useState({
    region: 'us',
    usServerList: [],
    euServerList: [],
    characterName: '',
    serverName: '',
    submissionError: '',
    loading: false,
  });

  const handleSubmit = (event) => {
    console.log('submitting');
  };

  const handleFlagChange = (event, region) => {
    console.log('flag change');
  };

  const handleCharacterNameChange = (event) => {
    console.log('character name change');
  };

  const handleServerNameChange = (event) => {
    console.log('server name change');
  };

  return (
    <div className="container-fluid home">
      <div className="container">
        <div className="logo">
          <img src={logo} />
        </div>
        <div className="site-description">
          {/* <p>
            Masked Armory has been around since 2007 and has become the most
            well-known anonymous armory profile source for World of Warcraft. We
            aim to keep things simple and just ask for your character&#39;s
            region, server, and name and we do the rest of the heavy lifting.
            Our aim is to provide you a profile link that will keep you
            protected when you are attempting to buy, sell, or trade your World
            of Wacraft account.
          </p> */}
        </div>

        <Card>Hello World</Card>

        {/* <div className="select"> Select Your Region</div> */}

        {/* <div className="form-group">
          <form>
            <input
              value={state.serverName}
              className="form-control"
              id="usServers"
              onChange={(event) => handleServerNameChange(event)}
              placeholder="Server Name"
            />
            <input
              type="text"
              className="form-control"
              placeholder="Character Name"
              onChange={(event) => handleCharacterNameChange(event)}
            />
            <button
              id="usSubmit"
              className="select"
              type="submit"
              style={{ marginTop: '10px' }}
              onClick={(event) => handleSubmit(event)}
            >
              Create Armory Profile
            </button>
          </form> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default CreateProfile;
