import cookie from 'react-cookies';
import {Box, Text, Button} from '@chakra-ui/react';
import React from 'react';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import CustomInput from './../components/CustomInput';
import {Redirect, Link as ReachLink} from 'react-router-dom';

require('dotenv').config();

const SignUp = (props) => {
    return (
        <Box bg="white">
            <Box>
                <Formik
                    initialValues={{
                        username: '',
                        password: '',
                    }}
                    validationSchema={Yup.object({
                        username: Yup.string()
                            .required('Required'),
                        password: Yup.string().required('Required'),
                    })}
                    onSubmit={async (values, {setSubmitting, setErrors}) => {
                        let payload = {
                            username: values.username,
                            password: values.password,
                        };
                        try {
                            const result = await axios.put(`${process.env.REACT_APP_API_HOST}/user`, payload);
                            if (result) {
                                cookie.save(process.env.REACT_APP_SESSION_COOKIE_NAME, result.data.data.token, {
                                    path: '/',
                                });
                                props.setIsLoggedIn(true);
                            }
                        } catch (err) {
                            if (err.response.data.errors) {
                                setErrors(err.response.data.errors);
                            }
                        }
                    }}
                >
                    {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          isSubmitting,
                          isValidating,
                      }) => (
                        <Form>
                            <Box
                                maxWidth={{sm: '85vw', md: '40vw', lg: '30vw'}}
                                mx="auto"
                            >
                                <Text
                                    fontSize="xl"
                                    my="7"
                                    fontWeight="bold"
                                    textAlign="center"
                                    color="#13344C"
                                >
                                    YourFileKeeper SignUp
                                </Text>
                                {/* Username */}
                                <CustomInput label="Username" name="username" type="text"/>
                                {/* Password */}
                                <CustomInput label="Password" name="password" type="password"/>
                                {/* Login */}
                                <Box px="2">
                                    {props.isLoggedIn ? (
                                        <Redirect to="/"/>
                                    ) : (<>
                                        <Button
                                            mt="2"
                                            w="100%"
                                            py="6"
                                            background="#13344C"
                                            borderRadius="full"
                                            color="white"
                                            border='2px solid white'
                                            _hover={
                                                {
                                                    color: '#00223E',
                                                    bg: 'white',
                                                    border: '2px solid #00223E',
                                                }
                                            }
                                            disabled={
                                                !Object.keys(touched).length ||
                                                (Object.keys(touched).length &&
                                                    Object.keys(errors).length) ||
                                                isSubmitting
                                            }
                                            isLoading={isSubmitting} type="submit">SignUp</Button>
                                            <Button
                                                as={ReachLink}
                                                to='/login'
                                                mt="2"
                                                w="100%"
                                                py="6"
                                                bg="white"
                                                color="#13344C"
                                                border="2px solid #13344C"
                                                _hover={{
                                                    color: 'white',
                                                    bg: '#13344C',
                                                }}
                                                borderRadius="full"
                                            >
                                                LogIn instead
                                            </Button>
                                        </>
                                    )}
                                </Box>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Box>
    )
}

export default SignUp;
