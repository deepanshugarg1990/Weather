import {Alert, Linking, NetInfo, Platform} from "react-native";
import DeviceSettings from "react-native-device-settings";

export async function getNetInfo() {
    if (Platform.OS === "ios") {
        try {
            const res = await fetch("https://www.google.com");
            if (res.status === 200) {
                return true;
            }
        } catch (e) {
            return false;
        }
        return false;
    } else {
        return NetInfo.isConnected.fetch().then(
            (isConnected) => {
                return isConnected;
            });
    }
}



export function showNoInternetDialog() {
    Alert.alert("No Internet", "This feature requires internet connection. Please check your internet settings and try again.", [
        {
            text: 'Settings',
            onPress: () => {
                openSettings();
            }
        }, {
            text: 'OK',
            onPress: () => {
            }
        }
    ], {cancelable: true});
}

export function openSettings() {
    if (Platform.OS === 'ios') {
        Linking.canOpenURL('app-settings:').then(supported => {
            if (!supported) {
                console.warn('Can\'t handle settings url');
            } else {
                return Linking.openURL('app-settings:');
            }
        }).catch(err => console.warn('An error occurred', err));
    } else {
        DeviceSettings.open();
    }
}
