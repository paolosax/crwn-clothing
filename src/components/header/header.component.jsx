import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { ReactComponent as Logo } from '../../assets/icons/crown.svg';

import './header.styles.scss';

import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

const Header = ({ currentUser }) => (
  <div className='header'>
    <Link className='logo-container' to='/'>
      <Logo className='logo' />
    </Link>
    <div className='options'>
      <Link className='option' to='/shop'>
        SHOP
      </Link>
      <Link className='option' to='/shop'>
        CONTACT
      </Link>
      {currentUser ? (
        <div className='option' onClick={() => auth.signOut()}>
          SIGNOUT
        </div>
      ) : (
        <Link className='option' to='/signin'>
          SIGNIN
        </Link>
      )}
      <CartIcon />
    </div>
    <CartDropdown />
  </div>
);

const mapStateToProps = (state) => ({
  // "state" è il root-reducer
  // gli passiamo la prop currentUser con il valore currentUser proveniente dal reducer user
  // quindi passiamo currentUser alla funzione Header (vedi sopra), mentre in App.js
  // eliminiamo la prop currentUser dal component <Header /> con il valore provientiente dallo state di app (perché adesso usiamo Redux)
  // (per cui in app.js elimineremo anche il constructor con dentro l'oggetto state)
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Header);
