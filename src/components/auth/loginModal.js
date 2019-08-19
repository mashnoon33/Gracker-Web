import React, { Component } from "react";
import { connect } from "react-redux";
import { Edit } from "grommet-icons";
import { Offline, Online } from "react-detect-offline";

import { Box, Button, Grid, Text, DropButton } from "grommet";
import { toggle } from "../../store/actions/darkModeActions";
import firebase from "firebase/app";

import { compose } from "redux";
import { withFirebase, isLoaded, isEmpty } from "react-redux-firebase";

import { Logout, Google, StatusPlaceholder, Actions } from "grommet-icons";

import ExampleComponent from "react-rounded-image";

class LoginModal extends React.Component {
	loginWithGoogle() {
		return firebase.login({ provider: "google", type: "popup" });
	}

	logout() {
		return firebase.logout();
	}

	// console.log(auth)
	render() {
		const { auth } = this.props;

		return (
			<Box
				// elevation="small"
				// round="small"
				// background="white"
				fill='horizontal'
				align='center'
				flex='false'
				justify='center'
			>
				{!isLoaded(auth) ? (
					<span>Loading...</span>
				) : isEmpty(auth) ? (
					// <GoogleButton/> button can be used instead
					<Box
						gridArea='main'
						justify='start'
						round='small'
						fill='horizontal'
						direction='row'
						align='center'
						background={this.props.dark ? "#2F3852" : "light-4"}
						elevation='xsmall'
						gap='small'
						pad='small'
					>
						<Button
							icon={<Google />}
							label='Sign In'
							onClick={this.loginWithGoogle}
							plain
						/>
					</Box>
				) : (
					<DropButton
						dropAlign={{ top: "bottom", left: "left" }}
						fill='horizontal'
						icon={
							<Box
								gridArea='main'
								justify='start'
								round='small'
								fill='horizontal'
								direction='row'
								align='center'
								// background={this.props.dark ? "#2F3852" : "light-4"}
								// elevation='xsmall'
								gap='small'
								pad='xsmall'
							>
								<ExampleComponent
									image={auth.photoURL}
									roundedSize='0'
									imageWidth='30'
									imageHeight='30'
								/>
								<Text size='16px' weight='500' color='status-ok'>
									{auth.displayName}
								</Text>
							</Box>
						}
						dropContent={
							<Box
								direction='column'
								align='start'
								justify='start'
								background={this.props.dark ? "#29324D" : "white"}
							>
								<Button
									pad='small'
									fill='horizontal'
									hoverIndicator
									onClick={() => {
										console.log("atleast this one fired");
										this.props.toggle(this.props.dark ? false : true);
									}}
								>
									<Box
										pad={{ left: "10px", right: "10px" }}
										gap='xsmall'
										height='35px'
										// width="350px"
										fill='horizontal'
										// background= {this.props.dark ? '#4D4B5C' : 'brand'}

										align='center'
										flex='false'
										justify='start'
										direction='row'
									>
										<Actions />
										<Text>
											{!this.props.dark
												? " enable darkmode"
												: " disable darkmode"}
										</Text>
									</Box>
								</Button>
								<Button
									fill='horizontal'
									pad='small'
									hoverIndicator
									onClick={this.logout}
								>
									<Box
										pad={{ left: "10px", right: "10px" }}
										gap='xsmall'
										height='35px'
										// width="350px"
										fill='horizontal'
										// background= {this.props.dark ? '#4D4B5C' : 'brand'}

										align='center'
										flex='false'
										justify='start'
										direction='row'
									>
										<Logout />
										<Text>logout</Text>
									</Box>
								</Button>
							</Box>
						}
					/>
				)}
			</Box>
		);
	}
}

const mapStateToProps = state => {
	return {
		dark: state.darkMode,
		auth: state.firebase.auth,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		toggle: boolean => dispatch(toggle(boolean)),
	};
};

export default compose(
	withFirebase,
	connect(
		mapStateToProps,
		mapDispatchToProps
	)
)(LoginModal);
