import React, { Component } from "react";
import { connect } from "react-redux";
import { Edit } from "grommet-icons";
import { Offline, Online } from "react-detect-offline";

import { Box, Button, Grid, Text, DropButton } from "grommet";
import { toggle } from "../../store/actions/darkModeActions";
import firebase from "firebase/app";

import { compose } from "redux";
import { withFirebase, isLoaded, isEmpty } from "react-redux-firebase";

import { Logout, Google, Toast, Actions } from "grommet-icons";

import { actions as ModalActions } from "react-redux-modal-flex";
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
					<Button
						icon={<Google />}
						label='Login'
						onClick={this.loginWithGoogle}
					/>
				) : (
					<Grid
						columns={["flex", "xxsmall"]}
						rows={["xxsmall"]}
						fill='horizontal'
						gap='small'
						areas={[
							{ name: "nav", start: [0, 0], end: [0, 0] },
							{ name: "main", start: [1, 0], end: [1, 0] },
						]}
					>
						<Box gridArea='nav' align='center' direction='row'>
							{" "}
							<h3>Gracker</h3>
							<Offline>
								<Box
									width='xxsmall'
									round='xsmall'
									height='20px'
									margin='xsmall'
									background={this.props.dark ? "#A2423D" : "status-error"}
									justify='center'
									align='center'
								>
									<Text size='small' weight='bold' color='white'>
										Offline
									</Text>
								</Box>
							</Offline>
						</Box>
						<Box gridArea='main' justify='center'>
							<DropButton
								icon={
									<ExampleComponent
										image={auth.photoURL}
										roundedSize='0'
										imageWidth='30'
										imageHeight='30'
									/>
								}
								dropAlign={{ top: "bottom", left: "left" }}
								dropContent={
									<Box
										direction='column'
										align='start'
										justify='start'
										background={this.props.dark ? "#29324D" : "white"}
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
											<Text size='smal'>{auth.displayName}</Text>
										</Box>

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
						</Box>
					</Grid>
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
