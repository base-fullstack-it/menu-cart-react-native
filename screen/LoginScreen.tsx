import LoginFormik, {LoginFormValuesInterface} from "../feature/auth/page/LoginFormik";
import useLogin from "../hooks/useLogin";
import NavigateToSignupComponent from "../feature/auth/component/NavigateToSignupComponent";
import { Text, Card, Button, Icon } from '@rneui/themed';
import {View, Image, StatusBar} from "react-native";
import GrasspFormLogo from "../components/GrasspFormLogo";
const LoginScreen = () => {

  const handleLogin = useLogin();
  return <Card>
    {/*<Card.Title></Card.Title>*/}
      <StatusBar barStyle="light-content"/>
      <GrasspFormLogo/>
    <LoginFormik
        loginUser={handleLogin}
    />
    <Card.Divider />
    <NavigateToSignupComponent />
  </Card>
};
export default LoginScreen;
