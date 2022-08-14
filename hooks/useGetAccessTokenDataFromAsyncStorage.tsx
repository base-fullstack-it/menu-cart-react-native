import {useCallback, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useDispatchUserAuth from "./useDispatchUserAuth";
import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();
export default () => {

    const handleDispatchUserAuth = useDispatchUserAuth();

    useEffect(() => {
        (async () => {

            const access_token = await AsyncStorage.getItem("token")
            const token_type = await AsyncStorage.getItem("token_type")
            await handleDispatchUserAuth({access_token,token_type});
            await SplashScreen.hideAsync();
            // i think it might be okay to wait 1500ms to ensure token storage was pulled from?
        })()
    },[]);

}