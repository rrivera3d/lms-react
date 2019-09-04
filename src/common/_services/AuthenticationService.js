/**
 * Authentication Service
 */

'use strict';

class AuthService {

  /**
   * Creates an Authetication Service
   * @param {*} name 
   * @param {*} options 
   */
  constructor(name, options) {
    this.name = name;
    this.options = options;
  }

  logIn() {
    console.log(`Logging into ${this.name} service...`);
    return Promise;    
  }

  logOut() {
    return Promise;
  }
}

 export default AuthService;

