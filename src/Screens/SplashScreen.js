import React, {Component} from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';

export default class SplashScreen extends Component {
    render() {
        return (
            <View>
                <ImageBackground source={require('../assets/pic.jpeg')}
                                 style={styles.backGroundStyle}/>
                <View style={styles.outerComponentStyle}>
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <Image
                            style={{width: 25, height: 25, marginTop: 5}}
                            source={require('../assets/pin.png')}/>
                        <Text style={{fontSize: 20, marginTop: 4, fontWeight: '500'}}>Hello</Text>
                    </View>
                </View>
            </View>
        );
    }
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
