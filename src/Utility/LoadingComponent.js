import React, {Component} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';

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
                backgroundColor: this.props.backgroundColor || '#00000000',
                top: 0,
                right: 0,
                left: 0,
                elevation: this.props.elevation || 0
            }}>
                <ActivityIndicator size="large" color={'#DC592B'}/>
                {this.props.msg ? <Text style={{
                    color: Colors.white,
                    fontSize: 16,
                    textAlign: 'center',
                    padding: 12,
                }}>{this.props.msg}</Text> : null}
            </View>
        );
    }
}

export default LoadingComponent;