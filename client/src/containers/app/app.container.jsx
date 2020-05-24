import React, { Suspense, lazy, useEffect } from 'react';
import { PropTypes } from 'prop-types';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from 'redux/auth/auth.selectors';
import { logoutUser } from 'redux/auth/auth.actions';
import { clearCurrentProfile } from 'redux/profile/profile.actions';
import { setAuthToken } from 'redux/auth/auth.utils';

import { Switch, Route } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import Navbar from 'components/navbar/navbar.component';
import Footer from 'components/footer/footer.component';
import Loader from 'components/loader/loader.component';
import PrivateRoute from 'components/private-route/private-route.component';

import { Container, Body } from './app.styles';

/* -------------------------------------------------------------------------- */

const Landing = lazy(() => import('pages/landing/landing.page'));
const Register = lazy(() => import('pages/register/register.page'));
const Login = lazy(() => import('pages/login/login.page'));
const Profiles = lazy(() => import('pages/profiles/profiles.page'));
const Profile = lazy(() => import('pages/profile/profile.page'));
const Dashboard = lazy(() => import('pages/dashboard/dashboard.page'));
const Posts = lazy(() => import('pages/posts/posts.page'));
const Post = lazy(() => import('pages/post/post.page'));
const CreateProfile = lazy(() => import('pages/create-profile/create-profile.page'));
const EditProfile = lazy(() => import('pages/edit-profile/edit-profile.page'));
const AddExperience = lazy(() => import('pages/add-experience/add-experience.page'));
const AddEducation = lazy(() => import('pages/add-education/add-education.page'));
const NotFound = lazy(() => import('pages/not-found/not-found.page'));

const mapStateToProps = createStructuredSelector({
  user: selectUser,
});

const App = ({ user, logoutUser, clearCurrentProfile }) => {
  const history = useHistory();

  useEffect(() => {
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);
    }

    const { exp } = user;
    const currentTime = Date.now() / 1000;

    if (exp && exp < currentTime) {
      clearCurrentProfile();
      logoutUser();
      history.push('/');
    }
  });

  return (
    <Container>
      <Navbar />

      <Body>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profiles" component={Profiles} />
            <Route exact path="/profile/:handle" component={Profile} />
            <Route exact path="/not-found" component={NotFound} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/create-profile" component={CreateProfile} />
            <PrivateRoute exact path="/edit-profile" component={EditProfile} />
            <PrivateRoute exact path="/add-experience" component={AddExperience} />
            <PrivateRoute exact path="/add-education" component={AddEducation} />
            <PrivateRoute exact path="/feed" component={Posts} />
            <PrivateRoute exact path="/post/:id" component={Post} />
          </Switch>
        </Suspense>
      </Body>

      <Footer />
    </Container>
  );
};

/* -------------------------------------------------------------------------- */

App.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(App);
