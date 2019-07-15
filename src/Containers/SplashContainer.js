import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {SplashScreen} from "../Screens/index";

export default class SplashContainer extends Component {
    render() {
        return (
            <SplashScreen
                onSubmitEditing={this.onSubmitEditing}
            />
        );
    }


    onSubmitEditing = (text) => {

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
