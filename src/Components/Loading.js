import React from 'react';
import { Panel, Spinner, Root, View, PanelHeader } from '@vkontakte/vkui';

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
                 Загрузка 💨
              </PanelHeader>
              <div style={{ height: 100 }}>
                <Spinner />
              </div>
            </Panel>
          </View>
        </Root>
      )
    }
}

export default Finish;