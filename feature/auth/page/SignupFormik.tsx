import React, {useState} from "react";
import {boolean, date, number, object, string} from "yup";
import {Form, Formik} from 'formik';
import {Button, TextInput, View} from "react-native";

export interface SignupFormValuesInterface{
    firstName:string;
    lastName:string;
    email:string;
    phoneNumber:string;
    password:string;
}
const initialFormState = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password:"",
    termsOfService: false
}
interface SignupFormInterface{
    handleRegister(values:SignupFormValuesInterface): Promise<void>;
}

const validationSchema = object({
    firstName: string().required("First name required"),
    lastName: string().required('Last name required'),
    email: string().email("Invalid email").required("Email required"),
    password: string().required("Password required"),
    phoneNumber: number()
        .positive("The number must be positive")
        .integer("The number must be an integer")
        .typeError("Please enter a valid phone number")
        .required("Phone number required"),
    message: string(),
    termsOfService: boolean()
        .oneOf([true], "The terms and conditions must be accepted.")
        .required("The terms and conditions must be accepted.")
})

export default ({handleRegister}:SignupFormInterface) => {

    const [open, setOpen] = useState(false)

    const submitHandler = async (values:SignupFormValuesInterface, actions:any) => {
        actions.setSubmitting(false);
        setOpen(true);
        await handleRegister(values);
    }
    const handleClose = (event:any, reason:any) => {
        if (reason === "clickaway") {
            return
        }
        setOpen(false)
    }

    return (
        <Formik
            initialValues={initialFormState}
            onSubmit={submitHandler}
        >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View>
                    <TextInput
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        autoCapitalize='none'
                        value={values.email}
                    />
                    <TextInput
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        textContentType={"password"}
                        autoCapitalize='none'
                        value={values.password}
                    />
                    <Button onPress={() => handleSubmit()} title="Submit" />
                </View>
            )}
        </Formik>
    )

}