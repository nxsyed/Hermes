import React from 'react';
import PubNubReact from 'pubnub-react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';

export default class Analytics extends React.Component {

    constructor(props) {
        super(props);
        this.pubnub = new PubNubReact({
            publishKey: 'pub-c-7805ed36-f5af-48a4-9574-224a779d3416',
            subscribeKey: 'sub-c-2583d912-4f1e-11e8-9796-063929a21258'
        });
        this.pubnub.init(this);
        this.data = {};
    }

    componentWillMount() {
        this.pubnub.subscribe({
            channels: [this.props.navigation.state.params],
            withPresence: true
        });
        this.pubnub.addListener({
            status: function(statusEvent) {
            },
            message: (message) => {
                if(message.message != this.data){
                    this.data = message.message;
                    this.forceUpdate();
                }
            },
            presence: function(presenceEvent) {
            }
        })
    }

    componentWillUnmount() {
        this.pubnub.unsubscribe({
            channels: [this.props.navigation.state.params]
        })
    }

    render() {
        const { Temperature } = this.data
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor:  Temperature ? `rgb(255, 87,${Math.floor(Temperature/3) * 34})` : 'rgb(255, 87, 34)'
              }}> 
                <Text style={{color: '#FFFFFF'}} h2>Temperature (C)</Text>
                <Text style={{color: '#FFFFFF'}} h3>{Temperature}</Text>
            </View>  
        );
    }
}



