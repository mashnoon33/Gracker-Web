import React, { Component } from "react";
import { connect } from "react-redux";
import { Expand } from "grommet-icons";

import { Box, Button, Grommet, TextInput, Grid } from "grommet";
import { createProject } from "../../store/actions/projectActions";
import firebase from 'firebase/app';


import { compose } from 'redux'
import { withFirebase, isLoaded, isEmpty } from 'react-redux-firebase'

import { signIn } from '../../store/actions/authActions'

import { UserNew, Google, Login } from "grommet-icons";

import { actions as ModalActions } from 'react-redux-modal-flex';
import Modal from "react-redux-modal-flex/lib/Modal";
import LoginModal from "./loginModal"
import ExampleComponent from "react-rounded-image";



function Auth({ firebase, auth, toggleModal }) {

    return (
            
            <Box direction="row" align="center"
                flex="false"
                justify="center"
                // gap="10px"
                // background="red"
                width="large"
                // margin={{ left: "0px", top: "0px", bottom: "30px" }}

                
        >
            <Button fill="horizontal" margin="small" hoverIndicator="true" 
            
                onClick={() => {

                    toggleModal({

                        component: LoginModal,
                        ok: {
                            text: '',

                            action: () => alert('submit form'),
                        },
                    })
                }
                }
            
            >
                <Grid
                    columns={['xxsmall', 'flex', 'xxsmall']}
                    rows={['xxsmall']}
                    fill="horizontal"



                    // gap="small"
                    areas={[
                        { name: 'header', start: [0, 0], end: [0, 0] },
                        { name: 'nav', start: [1, 0], end: [1, 0] },
                        { name: 'main', start: [2, 0], end: [2, 0] },
                    ]}
                >
                    <Box gridArea="header" justify="center"
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
                        <Expand />

                       </Box>
                </Grid>
              </Button>
             
            </Box>
        );
    }




export default compose(
    withFirebase,
    connect(({ firebase: { auth } }) => ({ auth }), { toggleModal: ModalActions.toggleModal }), 
)(Auth)
