import React, {Component} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import * as Colors from './Colors';

class LoadingComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                bottom: 0,
                backgroundColor: this.props.backgroundColor || Colors.TRANSPARENT,
                top: 0,
                right: 0,
                left: 0,
                elevation: this.props.elevation || 0
            }}>
                <ActivityIndicator size="large" color={Colors.COLOR_PRIMARY}/>
                {this.props.msg ? <Text style={{
                    color: Colors.WHITE,
                    fontSize: 16,
                    textAlign: 'center',
                    padding: 12,
                }}>{this.props.msg}</Text> : null}
            </View>
        );
    }
}

export default LoadingComponent;