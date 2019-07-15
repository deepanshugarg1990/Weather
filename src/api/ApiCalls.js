import axios from 'axios';
import * as Utility from "../Utility/Utils";

let FETCH_TIMEOUT = 60000;

export function apiRequest(url, showDialog,
                           callback,
                           params,
                           callbackFailure) {


    console.log("url : " + url);
    console.log("DATA PARAM : " + params);
    let query = '';
    query = paramsToUrlQueryParams(params);

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
            params: query,
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
                console.log("error :");
                console.log(error);
                callbackFailure && callbackFailure(error);
            });
    });
}


function paramsToUrlQueryParams(params) {
    let esc = encodeURIComponent;
    let query = "";
    if (params) {
        query = '?';
        query += Object.keys(params).map(k => esc(k) + '=' + esc(params[k])).join('&');
    }
    return query;
}


export function callWeatherData(zipData, callbackSuccess, callbackFailure) {
    let data = {
        "zip": "122001",
        "appid": "b6907d289e10d714a6e88b30761fae22"
    };
    apiRequest("https://samples.openweathermap.org/data/2.5/forecast",
        true, (response) => {
            callbackSuccess(response)
        }, data, callbackFailure
    );
}
