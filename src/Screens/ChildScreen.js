import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View} from "react-native";

export default class ChildScreen extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View>
                <Text style={{marginTop: 10, marginLeft: 10}}>{this.props.date}</Text>
                <View style={{flexDirection: 'row'}}>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}>
                        {this.renderView()}
                    </ScrollView>
                </View>
            </View>
        )
    }


    renderView = () => {
        return (this.props.item.map((item, index) => {
                return (
                    <View style={styles.mainContainerStyle} key={index}>
                        <Text>{" Temperature : " + item.main.temp}</Text>
                        <Text>{" MIN : " + item.main.temp_min}</Text>
                        <Text>{" MAX : " + item.main.temp_max}</Text>
                        <Text>{" Humidity : " + item.main.humidity}</Text>
                        <Text>{" Description : " + item.weather[0].description}</Text>
                    </View>
                )
            })
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: 100, height: 100,
    },
    innerStyle: {
        margin: 8
    },
    mainContainerStyle: {
        marginTop: 7,
        borderRadius: 5,
        elevation: 2,
        backgroundColor: '#fefefe',
        padding: 10,
        marginLeft: 10, marginRight: 10,
        flexDirection: 'column',
    }

});
