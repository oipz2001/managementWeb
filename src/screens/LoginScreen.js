import React from 'react'
import firebase  from '../config/firebaseConfig'


var provider = new firebase.auth.OAuthProvider('microsoft.com');

class LoginForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      currentUser: null,
      message: '',
      displayName:'',
      givenName:'',
      id:'',
      jobTitle:'',
      mail:'',
      surname:''
    }
  }

  onSubmit = e => {
    e.preventDefault()

    const { email, password } = this.state
    // TODO: implement signInWithEmailAndPassword()
    
  }

  onChange = e => {
    const { name, value } = e.target
   
    this.setState({
      [name]: value
    })
    

    
    
  }

  SignIn = () => {

    firebase.auth().signInWithPopup(provider)
    .then( result => {
    
      // console.log(result.additionalUserInfo);
     
    
    this.setState({
      displayName : result.additionalUserInfo.profile.displayName,
      givenName:result.additionalUserInfo.profile.givenName,
      surname:result.additionalUserInfo.profile.surname,
      id:result.additionalUserInfo.profile.id,
      mail:result.additionalUserInfo.profile.mail,
      jobTitle:result.additionalUserInfo.profile.jobTitle
      
    })
    
    
    

   
    
    // User is signed in.
    // IdP data available in result.additionalUserInfo.profile.
    // OAuth access token can also be retrieved:
    // result.credential.accessToken
    // OAuth ID token can also be retrieved:
    // result.credential.idToken
  })
  .catch(function(error) {
    // Handle error.
  });

  
  }

 

 

 



  render() {
    return (
      <div >
        <div className="App" >
                  <button className="button is-link" onClick={this.SignIn}>Sign In</button>
                  {/* <button className="button is-link" onClick={this.SignOut}>Sign Out</button> */}
                  
          </div>
          <div>
            <h2>Name: {this.state.displayName  }</h2>
            <h2>Status: {this.state.jobTitle}</h2>
            <h2>Mail: {this.state.mail }</h2>
            <h2>ID: {this.state.id} </h2>
          </div>
        </div>
    )
  }
}

export default LoginForm