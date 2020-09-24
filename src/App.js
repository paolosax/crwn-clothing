import React from 'react';
import { Switch, Route } from 'react-router-dom'

import './App.css';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    // se un utente si iscrive...
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // verifichiamo se effettivamente si sta iscrivendo (if(userAuth)...)
      if(userAuth) {
        // se c'è, prendo lo userRef dal metodo createUserProfileDocument dello user
        // dall'oggetto userAuth che gli passo sopra 
        // se non è presente alcun doc, creiamo un nuovo userRef
        // tramite metodo createUserProfileDocument in firebase.utils
        // per restituire comunque uno userRef
        const userRef = await createUserProfileDocument(userAuth);

        // quindi facciamo il subscribe, 
        // ovvero andiamo a rilevare qualsiasi modifica a quei dati
        // ma prendiamo anche il primo stato di quei dati
        // quindi facciamo il setState della nostra app in js
        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
        });
      } else {
        // se l'utente fa logout, impostiamo il currentUser su null
        // che riceviamo dalla library auth
        this.setState({currentUser: userAuth});
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div className="App">
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUp} />
        </Switch>
      </div>
    );
  }
}

export default App;
