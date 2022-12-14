import {LoginFormValuesInterface} from "../feature/auth/page/LoginFormik";
import {ACCESS_TOKEN_TYPES, setUser} from "../feature/auth/slice/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useLoginUserMutation} from "../services/authApiSlice";
import useDispatchUserAuth from "./useDispatchUserAuth";
import {useEffect} from "react";
import Toast from "react-native-toast-message";
import {useNavigation} from "@react-navigation/native";

export default ():{ isLoading: any; isLoginSuccess: any; handleLogin: (values: LoginFormValuesInterface) => Promise<void> } => {
    const dispatchUserAuth = useDispatchUserAuth();
    const navigation = useNavigation();
    //todo need some sort of useActivityLoader that uses with context
    const [
        loginUser,
        {
            isLoading,
            data: loginData,
            isSuccess: isLoginSuccess,
            isError: isLoginError,
            error: loginError,
        },
    ] = useLoginUserMutation();

    const handleLogin = async (values:LoginFormValuesInterface) => {

        const data = await loginUser({...values}).unwrap();
        const access_token = data.access_token;

        if(access_token) {
            const token_type = ACCESS_TOKEN_TYPES.user;
            await dispatchUserAuth({access_token, token_type});
            await AsyncStorage.setItem("token", access_token);
            await AsyncStorage.setItem("token_type", token_type);
        }
        // await console.log(await AsyncStorage.getItem("token"),'tokenfrom async storage')
    };
    useEffect(()=>{
        if (isLoginError) {
        Toast.show({
            type: 'error',
            text1: "Wrong Password Or Username",
            onPress: () => Toast.hide(),
            visibilityTime:1900
            // autoHide:false
        });
        }
    },[isLoginError])
    useEffect(()=>{

        if(isLoginSuccess){

            // Toast.show({
            //     type: 'primaryGreenColorToast',
            //     text1: 'Welcome back!',
            //     onPress: () => Toast.hide(),
            //     visibilityTime:1400
            //     // autoHide:false
            // });
        }
    },[isLoginSuccess])
    return {handleLogin,isLoading,isLoginSuccess};
}