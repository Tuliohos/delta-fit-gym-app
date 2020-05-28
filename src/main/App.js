import React from 'react';

import AuthenticationProvider from './authenticationProvider'
import Routes from './routes'


import 'toastr/build/toastr.min.js'

import 'bootswatch/dist/superhero/bootstrap.css'
import '../custom.css'
import 'toastr/build/toastr.css'

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

class App extends React.Component{
 
  render (){
    return (
      <AuthenticationProvider>
        <div className="container">
          <Routes  />
        </div>
      </AuthenticationProvider>
    )
    
  }
}

export default App;