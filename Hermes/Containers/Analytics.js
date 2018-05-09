import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Header, Card, ListItem, Button, List } from 'react-native-elements';
import PubNubReact from 'pubnub-react';

import Map from '../Components/Map';

export default class Analytics extends React.Component {

    constructor(props) {
        super(props);
        this.pubnub = new PubNubReact({
            publishKey: 'pub-c-7805ed36-f5af-48a4-9574-224a779d3416',
            subscribeKey: 'sub-c-2583d912-4f1e-11e8-9796-063929a21258'
        });
        this.pubnub.init(this);
        this.state = {
            data: {}
        }
    }

    componentWillMount() {
        const { channel } = this.props.navigation.state.params;
        this.pubnub.subscribe({
            channels: channel,
            withPresence: true
        });

        this.pubnub.addListener({
            status: function(statusEvent) {
            },
            message: function(message) {
                console.log(message);
                this.setState({ 
                    data: message 
                  });
            },
            presence: function(presenceEvent) {
            }
        })
    }

    render() {
        const { channel } = this.props.navigation.state.params;
        console.log(channel);
        return (
            <Text> 
                { this.channel }    
             </Text> 
        );
    }
}



