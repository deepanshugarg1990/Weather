import React, {Component} from 'react';
import {Dimensions, FlatList, Image, ImageBackground, StyleSheet, Text, TextInput, View} from 'react-native';
import ChildScreen from "./ChildScreen";
import LoadingComponent from "../Utility/LoadingComponent";
import * as Strings from '../Utility/Strings'

export default class SplashScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            weatherData: [],
            city: '',
            inputText: ''
        };
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <ImageBackground source={require('../assets/pic.jpeg')}
                                 style={styles.backGroundStyle}/>
                <View style={styles.outerComponentStyle}>
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <Image
                            style={{width: 25, height: 25, marginTop: 5}}
                            source={require('../assets/pin.png')}/>
                        <Text style={{fontSize: 20, marginTop: 4, fontWeight: '500'}}>{this.state.city}</Text>
                    </View>
                    <View
                        style={styles.viewStyle}>
                        <TextInput
                            multiline={false}
                            editable={true}
                            maxLength={10}
                            underlineColorAndroid="transparent"
                            autoCorrect={false}
                            returnKeyType='search'
                            placeholder={Strings.ZIP_CODE}
                            autoCapitalize="characters"
                            blurOnSubmit={true}
                            onChangeText={(text) => this.onChangeText(text)}
                            onSubmitEditing={() => this.props.onSubmitEditing(this.state.inputText)}
                        />
                    </View>
                    {this.props.data && <FlatList
                        data={this.state.weatherData}
                        extraData={this.state}
                        keyExtractor={(item, index) => item.key}
                        renderItem={({item}) => this.renderItem(item)}
                    />}
                    {!this.props.data &&
                    <View style={styles.progressbarStyle}>
                        <Text>No data found</Text>
                    </View>}
                    {this.props.loading && <LoadingComponent/>}
                </View>
            </View>
        );
    }

    componentWillReceiveProps(nextProps) {
        this.shortAccordingToDate(nextProps.data);
    }


    onChangeText = (text) => {
        this.setState({inputText: text});
    };

    renderItem = (item) => {
        return (
            <ChildScreen
                item={item.shortedData}
                date={item.date}
            />
        );
    };


    shortAccordingToDate = (json) => {
        let grouping = [];
        let array = [];
        if (json) {
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
                                "shortedData": array,
                                "date": json.list[i].dt_txt.slice(0, 10)

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
                                "shortedData": array,
                                "date": json.list[i].dt_txt.slice(0, 10)
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
                            "shortedData": array,
                            "date": json.list[i].dt_txt.slice(0, 10)
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
            this.setState({weatherData: grouping, city: json.city.name})
        }
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
        flex: 1,
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    },
    progressbarStyle: {
        alignSelf: 'center',
        marginTop: Math.round(Dimensions.get('window').height) / 2
    },
    viewStyle: {
        backgroundColor: '#fefefe',
        marginLeft: 10,
        marginRight: 10
    }

});
