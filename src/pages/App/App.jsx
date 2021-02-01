import { useState } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import { Container, AppBar} from '@material-ui/core';
import AuthPage from '../AuthPage/AuthPage';
import OrderPage from '../OrderPage/OrderPage';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import HomePage from '../HomePage/HomePage';
import ConfirmationPage from '../ConfirmationPage/ConfirmationPage'

import useStyles from "./styles";

export default function App() {

  const [user, setUser] = useState(getUser());
  const [pickUp, setPickUp] = useState(true);

  const classes = useStyles();
  const histroy = useHistory();

  async function handlePickUp() {
    setPickUp(true);
    histroy.push('/order')
  }

  async function handleDelivery() {
    setPickUp(false);
    histroy.push('/order')
  }

  

  return (
    <Container className="App" className={classes.app} >
      <AppBar item className={classes.appBar} color="inherit" position="sticky">
        <NavBar user={user} setUser={setUser} />
      </AppBar>
      <Container className={classes.mainContainer}>
        <Switch>
          <Route path="/log-in">
            <AuthPage setUser={setUser}/>
          </Route>
          <Route path="/order">
            <OrderPage 
              user={user}
              pickUp={pickUp}
              handlePickUp={handlePickUp}
              handleDelivery={handleDelivery}
            />
          </Route>
          <Route path="/confirmation">
            <ConfirmationPage user={user} />
          </Route>
          <Route path="/">
            <HomePage
              pickUp={pickUp}
              handlePickUp={handlePickUp}
              handleDelivery={handleDelivery}
            />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Container>
          <Footer />
    </Container>
  );
}
