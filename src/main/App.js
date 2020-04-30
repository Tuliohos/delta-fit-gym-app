import React from 'react';

import Routes from './routes'

import 'toastr/build/toastr.min.js'

import 'bootswatch/dist/superhero/bootstrap.css'
import '../custom.css'
import 'toastr/build/toastr.css'
import 'toastr/build/toastr.min.js'

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

class App extends React.Component{
 
  render (){
    return (
        <div className="container">
          <Routes  />
        </div>
    )
    
  }
}

export default App;