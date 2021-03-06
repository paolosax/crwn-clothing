import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';

import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    // se un utente si iscrive...
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // verifichiamo se effettivamente si sta iscrivendo (if(userAuth)...)
      if (userAuth) {
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
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      } else {
        // se l'utente fa logout, impostiamo il currentUser su null
        // che riceviamo dalla library auth
        setCurrentUser(userAuth);
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route exact path="/signin" render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUp />)} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
