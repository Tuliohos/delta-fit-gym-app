import React from 'react';

import AuthenticationProvider from './authenticationProvider'
import Routes from './routes'
import Navbar from '../components/navbar'

import 'bootswatch/dist/superhero/bootstrap.css'
import '../custom.css'
import 'toastr/build/toastr.css'

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

class App extends React.Component{
 
  render (){
    return (
      <AuthenticationProvider>
        <Navbar />
        <div className="container">
          <Routes  />
        </div>
      </AuthenticationProvider>
    )
    
  }
}

export default App;