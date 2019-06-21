import React, { Component } from "react";
import { connect } from "react-redux";
import { Edit } from "grommet-icons";

import { Box, Button, Grommet, Calendar, FormField, TextInput, Select } from "grommet";
import { createProject } from "../../store/actions/projectActions";
import firebase from 'firebase/app';


import { compose } from 'redux'
import { withFirebase, isLoaded, isEmpty } from 'react-redux-firebase'

import { signIn } from '../../store/actions/authActions'

import { UserNew, Google, Login } from "grommet-icons";

import { actions as ModalActions } from 'react-redux-modal-flex';
import Modal from "react-redux-modal-flex/lib/Modal";
import ExampleComponent from "react-rounded-image";



    function AdderModal({ firebase, auth }) {
        function loginWithGoogle() {
            return firebase.login({ provider: 'google', type: 'popup' })
        }

        function logout() {
            return firebase.logout()
        }

        function Example() {
            const [value, setValue] = React.useState('medium');
            return (
                <Select
                    options={['small', 'medium', 'large']}
                    value={value}
                    onChange={({ option }) => setValue(option)}
                    dropTarget="Box"
                />
            );
        }


 
        console.log(auth)
        return (

            <Box width="large"
                // elevation="small"
                height="small"
                round="small"
                background="white"
                align="center"
                flex="false"
                justify="center">

                <Box direction="row" gap="medium">
                <Box direction="column" >
                    
                   <Example></Example>
                    <FormField >
                        <TextInput placeholder="type field 3" />
                    </FormField>
                   
                    </Box>

                    <Calendar
                        size="small"
                        date={(new Date()).toISOString()}
                        onSelect={(date) => { }}
                    />
                </Box>
              
            </Box>
        );
    }








export default compose(
    withFirebase,
    connect(({ firebase: { auth } }) => ({ auth }))
)(AdderModal)