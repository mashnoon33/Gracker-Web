import React, { Component } from "react";
import { connect } from "react-redux";
import { Edit } from "grommet-icons";

import { Box, Button, Grommet, Image } from "grommet";
import { createProject } from "../../store/actions/projectActions";
import firebase from 'firebase/app';


import { compose } from 'redux'
import { withFirebase, isLoaded, isEmpty } from 'react-redux-firebase'

import { signIn } from '../../store/actions/authActions'

import { UserNew, Google, Login } from "grommet-icons";

import { actions as ModalActions } from 'react-redux-modal-flex';
import Modal from "react-redux-modal-flex/lib/Modal";
import ExampleComponent from "react-rounded-image";



    function LoginModal({ firebase, auth }) {
        function loginWithGoogle() {
            return firebase.login({ provider: 'google', type: 'popup' })
        }

        function logout() {
            return firebase.logout()
        }


 
        console.log(auth)
        return (

            <Box height="medium"
                // elevation="small"
                round="small"
                background="white"
                align="center"
                flex="false"
                justify="center">

                {
                    !isLoaded(auth)
                        ? <span>Loading...</span>
                        : isEmpty(auth)
                            // <GoogleButton/> button can be used instead
                            ? <Button
                                icon={<Google />}
                                label="Login"
                                onClick={loginWithGoogle}

            />
                            : <Box>

                                    <ExampleComponent
                                        image={auth.photoURL}
                                        roundedSize="0"
                                        imageWidth="110"
                                        imageHeight="110"
                                    />

                                <Button onClick={logout} label="logout"/>

                            </Box>
                }
              
            </Box>
        );
    }








export default compose(
    withFirebase,
    connect(({ firebase: { auth } }) => ({ auth }))
)(LoginModal)