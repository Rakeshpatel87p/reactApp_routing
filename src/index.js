import React from 'react';
import ReactDOM from 'react-dom';
import ModalGallery from './config/routes';
import './App.css';
import viceLogo from '../public/images/vice_new.ico';
import ViceHeaderLogo from '../public/images/vice_header_logo.png';


const TopViceHeader = React.createClass({
  render(){    
    return (
      console.log(this.props),
            <div>
              <img alt="topViceHeader" src={ViceHeaderLogo} />
              <h1>Shows</h1>
            </div>
      )
  }
})

ReactDOM.render(
  <ModalGallery />,
  document.getElementById('app')
);

ReactDOM.render(
	<TopViceHeader />, document.getElementById('topHeader')
);