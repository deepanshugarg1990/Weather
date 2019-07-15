import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {SplashScreen} from "../Screens/index";
import * as ApiCalls from "../api/ApiCalls"

export default class SplashContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: undefined,
            loading: false
        }
    }

    render() {
        return (
            <SplashScreen
                data={this.state.data}
                onSubmitEditing={this.onSubmitEditing}
                loading={this.state.loading}
            />
        );
    }


    onSubmitEditing = (text) => {
        this.setState({data: undefined, loading: true});
        ApiCalls.callWeatherData(text, (response) => {
            this.setState({data: response.data, loading: false});
        }, (failureResponse) => {
            this.setState({data: undefined, loading: false});
        })
    };
}

const styles = StyleSheet.create({
    backGroundStyle: {
        width: '100%',
        height: '100%',
        opacity: .1
    },
    outerComponentStyle: {
        position: 'absolute',
        alignSelf: 'center',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    },
});
