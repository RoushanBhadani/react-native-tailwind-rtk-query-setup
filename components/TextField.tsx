import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

const TextField = ({ 
  mode, 
  formik, 
  name, 
  label, 
  placeholder, 
  style, 
  secureTextEntry,
  ...props 
}: any) => {
  const [showPassword, setShowPassword] = useState(false);

  const hasError = formik.touched[name] && formik.errors[name];

  return (
    <>
      <TextInput
        mode={mode}
        label={hasError ? `${formik.errors[name]}` : label}
        placeholder={placeholder}
        value={formik.values[name]}
        onChangeText={formik.handleChange(name)}
        onBlur={() => formik.setFieldTouched(name)}
        style={[styles.input, style]}
        secureTextEntry={secureTextEntry ? !showPassword : false}
        right={
          secureTextEntry ? (
            <TextInput.Icon
              icon={showPassword ? 'eye-off' : 'eye'}
              onPress={() => setShowPassword(!showPassword)}
              color="#f58e07"
            />
          ) : undefined
        }
        placeholderTextColor="gray"
        error={!!hasError} 
        theme={{
          colors: {
            primary: '#f58e07', 
            text: 'black',      
            placeholder: 'gray',
            error: 'gray', 
          },
        }}
        {...props}
      />
      
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'transparent',
    color: 'black',
  },
});

export default TextField;
