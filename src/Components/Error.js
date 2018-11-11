import React from 'react';
import { Panel, Group, List, Root, View, PanelHeader, SelectMimicry, Cell, Button, FormLayout, Div } from '@vkontakte/vkui';

class Finish extends React.Component {

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
                 Ошибочка вышла 🤔
              </PanelHeader>
            </Panel>
          </View>
        </Root>
      )
    }
}

export default Finish;