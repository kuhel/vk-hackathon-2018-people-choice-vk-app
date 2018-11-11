import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { View } from '@vkontakte/vkui';
import SelectTeam from './Components/Select';
import Voted from './Components/Voted';
import Start from './Components/Start';
import Finish from './Components/Finish';
import Loading from './Components/Loading';
import Error from './Components/Error';
import { ROUTES } from './config';
import '@vkontakte/vkui/dist/vkui.css';

const location = window.location.hash.substr(1);

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activePanel: ~ROUTES.indexOf(location) ? location : 'home',
			submitedTeams: [],
			// deleteEnabled: true,
			// isVoteStarted: false,
			// isVoteFinished: false,
		};
	}

	componentDidMount() {
		connect.subscribe((e) => {
			if (e.detail.hasOwnProperty('type')) {
				switch (e.detail.type) {
					case 'VKWebAppAccessTokenReceived':
						this.setState({
							token: e.detail.data.access_token
						});
						this.getTeams();
						break;
					case 'VKWebAppCallAPIMethodResult':
						if (e.detail.data.error || (e.detail.data.hasOwnProperty('error') && e.detail.data.response.error)) {
							this.setState({error: e.detail.data.error})
						}
						if (e.detail.data.request_id === '34bc') {
							let state = {};
							if (e.detail.data.response.hasOwnProperty('is_voted')) {
								state.isVoted = e.detail.data.response.is_voted;
							}
							if (e.detail.data.response.hasOwnProperty('is_vote_start')) {
								state.isVoteStarted = e.detail.data.response.is_vote_start;
							}
							if (e.detail.data.response.hasOwnProperty('is_delete_enabled')) {
								state.deleteEnabled = e.detail.data.response.is_delete_enabled;
							}
							if (e.detail.data.response.hasOwnProperty('is_vote_start')) {
								state.isVoteStarted = e.detail.data.response.is_vote_start;
							}
							if (e.detail.data.response.hasOwnProperty('is_vote_finish')) {
								state.isVoteFinished = e.detail.data.response.is_vote_finish;
							}
							if (e.detail.data.response.items.length > 0) {
								state.teams = e.detail.data.response.items;
							}
							this.setState({
								...state,
							});
						}
						if (e.detail.data.request_id === '777c') {
							if (e.detail.data.response) {
								this.setState({
									isVoted: true,
								});
							}
							
						}
						if (e.detail.data.request_id === '999a') {
							if (e.detail.data.response) {
								this.setState({
									isVoted: false,
								});
							}
						}
						break;
					default:
						break;
				}
			}
			// let teams = [
			// 	{
			// 		id: 22,
			// 		name: 'Lol'
			// 	},
			// 	{
			// 		id: 44,
			// 		name: 'Lucky boys'
			// 	},
			// 	{
			// 		id: 25,
			// 		name: 'LAL'
			// 	},
			// 	{
			// 		id: 43,
			// 		name: 'MUN'
			// 	}
			// ]
			// this.setState({ teams });
		});
		connect.send('VKWebAppGetUserInfo', {});
		this.getToken();
	}

	getToken = () => {
		connect.send("VKWebAppGetAuthToken", {"app_id": 6748508, "scope": ""});
	}

	getTeams() {
		connect.send("VKWebAppCallAPIMethod", {
			'method': "hackathon.getTeamsFinalVote",
			'request_id': '34bc',
			'params': {
				'access_token': this.state.token,
				'v': '5.87',
			}
		});
	}

	submitVote = (team) => {
		connect.send("VKWebAppCallAPIMethod", {
			'method': "hackathon.addMarkFinalVote",
			'request_id': '777c',
			'params': {
				'access_token': this.state.token,
				'v': '5.87',
				team_id: team,
				marks: JSON.stringify(team.marks),
			}
		});
	}

	deleteVote = (team) => {
		connect.send("VKWebAppCallAPIMethod", {
			'method': "hackathon.delMarkFinalVote",
			'request_id': '999a',
			'params': {
				'access_token': this.state.token,
				'v': '5.87',
			}
		});
	}


	setLocation = (route) => {
		if (route !== 'home') {
			connect.send('VKWebAppSetLocation', { location: route });
		} else {
			connect.send('VKWebAppSetLocation', { location: '' });
		}
	}

	go = (e) => {
		const route = e.currentTarget.dataset.to;
		this.setState({ activePanel: route })
		this.setLocation(route)
	};

	render() {
		if (this.state.error) {
			return <Error />
		} else if (this.state.isVoted) {
			return <Voted deleteEnabled={this.state.deleteEnabled} deleteVote={this.deleteVote}/>
		} else if (this.state.isVoteFinished) {
			return <Finish />
		} else if (this.state.isVoteStarted === false) {
			return <Start />
		} else {
			return (
				this.state.teams ? <SelectTeam teams={this.state.teams} deleteEnabled={this.state.deleteEnabled} submitVote={this.submitVote} deleteVote={this.deleteVote}/> : <Loading />
			);
		}
	}		
}

export default App;
