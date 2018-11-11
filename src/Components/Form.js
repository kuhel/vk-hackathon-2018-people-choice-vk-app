import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Group, List, ListItem, Avatar, PanelHeader, Button, Div, Radio, FormLayout, Slider } from '@vkontakte/vkui';

class Form extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visibility: {},
			deleteEnabled: false,
		};
	}

	componentDidMount() {
		this.setState({
			visibility: this.props.visibility,
			deleteEnabled: this.props.deleteEnabled,
		})
	}

	getTeamMark(id) {
		return [...this.props.marks].filter(mark => mark.id === id)[0].marks;
	}

	onClick = (team) => {
		// let vis = this.state.visibility;
		// vis[team.id] = !vis[team.id];
	}

	render() {
		const props = this.props;
		return (
			<Div>
				{props.teams && props.teams.map((team, teamIndex) => 
					<Group key={teamIndex} className={team.isSubmited ? 'disabled--opacity' : ''}>
						<List>
							<ListItem>
								<header onClick={() => this.onClick(team)} className='Team__header'>
									<h3>#{team.id} {team.name}</h3>
									<Button className={this.state.visibility[team.id] ? '' : 'disabled'} size='l' onClick={() => props.submitMarks(team.id)}>Голосовать</Button>
									{this.state.deleteEnabled && <Button size='l' onClick={() => props.deleteMarks(team.id)} level='outline'>Удалить</Button>}
								</header>
								{this.state.visibility[team.id] ? <FormLayout className={team.isSubmited ? 'disabled' : ''}>
								</FormLayout> : null}
							</ListItem>
						</List>
					</Group>)
				}
			</Div>
		);
	}
}

export default Form;
