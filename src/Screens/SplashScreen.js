import React, {Component} from 'react';
import {FlatList, Image, ImageBackground, StyleSheet, Text, View} from 'react-native';

export default class SplashScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            weatherData: []
        };
    }

    componentDidMount() {
        this.shortAccordingToDate();
    }

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

                    <FlatList
                        data={this.state.weatherData}
                        extraData={this.state}
                        keyExtractor={(item, index) => item.key}
                        renderItem={({item}) => this.renderItem(item)}
                    />
                </View>
            </View>
        );
    }

    renderItem = (item) => {
        console.log("ITEM" + JSON.stringify(item));
        return (<View>

        </View>)
    };


    shortAccordingToDate = async () => {
        const json = require('../test.json');
        let grouping = [];
        let array = [];
        for (let i = 0; i < json.list.length; i++) {
            if (i !== json.list.length - 1) {
                if (json.list[i].dt_txt.slice(0, 10) === json.list[i + 1].dt_txt.slice(0, 10)) {
                    let data = {
                        "main": json.list[i].main,
                        "weather": json.list[i].weather,
                        "clouds": json.list[i].clouds,
                        "wind": json.list[i].wind,
                        "rain": json.list[i].rain,
                        "date": json.list[i].dt_txt,
                    };
                    array.push(data);
                } else {
                    if (grouping.length === 0) {
                        let data = {
                            "main": json.list[i].main,
                            "weather": json.list[i].weather,
                            "clouds": json.list[i].clouds,
                            "wind": json.list[i].wind,
                            "rain": json.list[i].rain,
                            "date": json.list[i].dt_txt,
                        };
                        array.push(data);
                        let obj = {
                            "shortedData": array
                        };
                        grouping.push(obj);
                        array = [];
                    } else {
                        let data = {
                            "main": json.list[i].main,
                            "weather": json.list[i].weather,
                            "clouds": json.list[i].clouds,
                            "wind": json.list[i].wind,
                            "rain": json.list[i].rain,
                            "date": json.list[i].dt_txt,
                        };
                        array.push(data);
                        let obj = {
                            "shortedData": array
                        };
                        grouping.push(obj);
                        array = [];
                    }
                }
            } else {
                if (json.list[i - 1].dt_txt.slice(0, 10) === json.list[i].dt_txt.slice(0, 10)) {
                    let data = {
                        "main": json.list[i].main,
                        "weather": json.list[i].weather,
                        "clouds": json.list[i].clouds,
                        "wind": json.list[i].wind,
                        "rain": json.list[i].rain,
                        "date": json.list[i].dt_txt,
                    };
                    array.push(data);
                    let obj = {
                        "shortedData": array
                    };
                    grouping.push(obj);
                } else {
                    array = [];
                    let data = {
                        "main": json.list[i].main,
                        "weather": json.list[i].weather,
                        "clouds": json.list[i].clouds,
                        "wind": json.list[i].wind,
                        "rain": json.list[i].rain,
                        "date": json.list[i].dt_txt,
                    };
                    array.push(data);
                }

            }
        }
        await this.setState({weatherData: grouping})
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
