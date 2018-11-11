import React from 'react';
import { Panel, Group, List, Root, View, PanelHeader, SelectMimicry, Cell, Button, FormLayout, Div } from '@vkontakte/vkui';

class Voted extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        activeView: 'profile'
      }
    }

    render () {
      return (
        <Root activeView={this.state.activeView}>
          <View activePanel="profile" id="profile">
            <Panel id="profile" theme="white">
              <PanelHeader>
                 Спасибо за ваш голос 👌🏽
              </PanelHeader>
              <Div className='buttons'>
                {this.props.deleteEnabled && <Button size='l' stretched onClick={() => this.props.deleteVote()} level='outline'>Удалить</Button>}
              </Div>
            </Panel>
          </View>
        </Root>
      )
    }
}

export default Voted;