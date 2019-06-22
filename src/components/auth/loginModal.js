import React, { Component } from "react";
import { connect } from "react-redux";
import { Edit } from "grommet-icons";

import { Box, Button, Grid, Image } from "grommet";
import { createProject } from "../../store/actions/projectActions";
import firebase from 'firebase/app';


import { compose } from 'redux'
import { withFirebase, isLoaded, isEmpty } from 'react-redux-firebase'

import { signIn } from '../../store/actions/authActions'

import { Logout, Google, Login } from "grommet-icons";

import { actions as ModalActions } from 'react-redux-modal-flex';
import ExampleComponent from "react-rounded-image";

    function LoginModal({ firebase, auth }) {
        function loginWithGoogle() {
            return firebase.login({ provider: 'google', type: 'popup' })
        }

        function logout() {
            return firebase.logout()
        }


 
        // console.log(auth)
        return (

            <Box
                // elevation="small"
                // round="small"
                width="large"
                // background="white"
                align="center"
                flex="false"
                justify="center"
            >
               
                
                

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
                            :
                            <Grid
                                columns={['xxsmall', 'flex', 'xxsmall']}
                                rows={['xxsmall']}
                                fill="horizontal"



                                gap="small"
                                areas={[
                                    { name: 'header', start: [0, 0], end: [0, 0] },
                                    { name: 'nav', start: [1, 0], end: [1, 0] },
                                    { name: 'main', start: [2, 0], end: [2, 0] },
                                ]}
                            >
                                <Box gridArea="header" justify="center" align='center'
                                >
                                    <ExampleComponent
                                        image={auth.photoURL}
                                        roundedSize="0"
                                        imageWidth="30"
                                        imageHeight="30"
                                    />
                                </Box>
                                <Box gridArea="nav" justify="center"
                                >                 <h3>{auth.displayName}</h3>
                                </Box>
                                <Box gridArea="main" justify="center"
                                >
                                    <Button onClick={logout} icon={<Logout />}
                                    />

                                </Box>
                            </Grid>
                            
                            
                            
                            
                            
                   
                }
              
            </Box>
        );
    }








export default compose(
    withFirebase,
    connect(({ firebase: { auth } }) => ({ auth }))
)(LoginModal)