import axios from 'axios';
import * as Utility from "../Utility/Utils";

let FETCH_TIMEOUT = 60000;

export function apiRequest(url, showDialog,
                           callback,
                           params,
                           callbackFailure) {
    Utility.getNetInfo().then(isConnected => {
        if (!isConnected) {
            if (showDialog) {
                Utility.showNoInternetDialog();
            }
            callbackFailure && callbackFailure();
            return;
        }
        axios({
            method: 'GET',
            url: url,
            params: params,
            timeout: FETCH_TIMEOUT,
        }).then(function (response) {
            console.log("apiRequest :", response);
            if (response.status === 200) {
                callback(response);
            } else {
                callbackFailure && callbackFailure(response);
            }
        })
            .catch(function (error) {
                callbackFailure && callbackFailure(error);
            });
    });
}


export function callWeatherData(zipData, callbackSuccess, callbackFailure) {
    let data = {
        "zip": zipData,
        "appid": "b6907d289e10d714a6e88b30761fae22"
    };
    apiRequest("https://samples.openweathermap.org/data/2.5/forecast",
        true, (response) => {
            callbackSuccess(response)
        }, data, callbackFailure
    );
}
