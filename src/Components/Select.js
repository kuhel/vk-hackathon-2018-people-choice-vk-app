import React from 'react';
import { Panel, Group, List, Root, View, PanelHeader, SelectMimicry, Cell, Button, FormLayout, Div } from '@vkontakte/vkui';
import Icon24Done from '@vkontakte/icons/dist/24/done';

class SelectTeam extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
		value: '',
		team: '',
		teamId: null,
        activeView: 'profile'
      }
    }

    render () {
      return (
        <Root activeView={this.state.activeView}>
          <View activePanel="profile" id="profile">
            <Panel id="profile" theme="white">
              <PanelHeader>
                Голосование
              </PanelHeader>
              <FormLayout>
                <SelectMimicry
                  top="Выберите команду"
                  placeholder="Не выбрана"
                  onClick={() => this.setState({ activeView: 'teams' })}
                >{this.state.value}</SelectMimicry>
				{this.state.teamId && <Div className='buttons'>
					<Button size='l'  stretched onClick={() => this.props.submitVote(this.state.teamId)}>Голосовать</Button>
				</Div>}
              </FormLayout>
            </Panel>
          </View>
          <View activePanel="teams" id="teams">
            <Panel id="teams">
              <PanelHeader>
                Выбор команды
              </PanelHeader>
			  
              <Group>
                <List>					
                  {this.props.teams.map(team => 
					<Cell
						onClick={() => this.setState({ value: `${team.id} — ${team.name}`, team: team.name, teamId: team.id, activeView: 'profile' })}
						asideContent={this.state.team === team.name ? <Icon24Done fill={{color: "blue"}} /> : null}
					>
						{`${team.id} — ${team.name}`}
					</Cell>)
				}
                </List>
              </Group>
            </Panel>
          </View>
        </Root>
      )
    }
}

export default SelectTeam;