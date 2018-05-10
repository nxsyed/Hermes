import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Header, Card, ListItem, Button, List } from 'react-native-elements';
import PubNubReact from 'pubnub-react';

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.pubnub = new PubNubReact({
        publishKey: 'pub-c-7805ed36-f5af-48a4-9574-224a779d3416',
        subscribeKey: 'sub-c-2583d912-4f1e-11e8-9796-063929a21258'
    });

    this.state = {
      channels: []
    }
    this.pubnub.init(this);
}

componentWillMount() {
    this.pubnub.subscribe({
        channel_group: 'parcel',
        withPresence: true
    });

    this.pubnub.channelGroups.listChannels(
      {
          channelGroup: "parcel"
      }, 
      (status, response) => {
          if (status.error) {
              console.log("error:", status);
              return;
          }
          response.channels.forEach( (channel) => {
              this.setState({ 
                channels: [...this.state.channels, channel] 
              });
          })
      }
  );
}

  componentWillUnmount() {
      this.pubnub.unsubscribe({
          channel_group: 'parcel'
      });
  }

  onViewMore = (channel) => {
    this.props.navigation.navigate('Analytics', channel)
  }

  render() {
    return (
      <View style={{flex:1}}>
        <ScrollView
        style={{backgroundColor:'#fff'}}>
          <List containerStyle={{marginBottom: 20}}>
            {
              this.state.channels.map((channel, i) => (
                <Card
                  key={i}
                  title={channel}
                  image={require('../images/pi.png')}>
                  <Text style={{marginBottom: 10}}>
                    Click the View More button to see realtime analytics for your IoT device!
                  </Text>
                  <Button
                    onPress={ () => this.props.navigation.navigate('Analytics', channel) }
                    icon={{name: 'code'}}
                    backgroundColor='#D32F2F'
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                    title='View More' />
              </Card>
              ))
            }
          </List>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});