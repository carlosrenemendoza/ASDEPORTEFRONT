import React, { Component } from 'react';
import axios from 'axios';
// import environment from './config/environment';


/*=============================================
=            Oauth Section To Verificate      =
=============================================*/

const Oauth = {
  authenticate(token, cb) {
    localStorage.setItem('_si_access_tkn', token );
    cb();
  },
  getAuthentication(cb){
    console.log('In The Autentication');
    let __redirect = { action: false, user_data: undefined};
    let _access = localStorage.getItem('_si_access_tkn');
    cb(__redirect);

  },
  signout(cb) {

    cb();
  }
};
export default Oauth;