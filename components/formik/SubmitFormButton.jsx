import React from "react";
import {useFormikContext} from "formik";
import {Button} from "@rneui/themed";


export default ({ children, ...otherProps }) => {
    const { submitForm, isSubmitting } = useFormikContext();

    const handleSubmit = () => {
        console.log(submitForm,'WHAT ARE THES OEHTER')
        submitForm();
    };

    const configButton = {
        // fullWidth: true,
        type: "solid",

        onPress: handleSubmit,
        // disabled: isSubmitting,
        ...otherProps
    };
    return <Button {...configButton} size={"sm"} >
        {children}
    </Button>
}