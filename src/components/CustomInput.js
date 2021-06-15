import { Box, FormLabel, Input, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useField } from 'formik';

const CustomInput = ({ label, ...props }) => {
    const [field, { error, touched }] = useField(props);
    const [isFocused, setIsFocused] = useState(false);

    return (
        <>
            <Box
                m="2"
                pos="relative"
                onFocus={() => {
                    setIsFocused(true);
                }}
                onBlur={() => {
                    setIsFocused(false);
                }}
                border="2px solid"
                borderRadius="2xl"
                borderColor={isFocused ? '#13344C' : '#367A91'}
                color={isFocused ? '#13344C' : '#367A91'}
                overflow="hidden"
            >
                <FormLabel
                    pos="absolute"
                    top={isFocused || (field.value&&field.value.length !== 0) ? '0.8rem' : '4'}
                    left="4"
                    fontSize="0.65rem"
                    style={{
                        transform:
                            isFocused || (field.value&&field.value.length !== 0) ? '' : 'scale(2.2)',
                        transformOrigin:
                            isFocused || (field.value&&field.value.length !== 0) ? '' : 'top left',
                        transition: 'all 0.2s',
                    }}
                    htmlFor={props.id || props.name}
                >
                    {label}
                </FormLabel>
                <Input
                    pt="3"
                    px="4"
                    h="16"
                    border="0"
                    focusBorderColor="none"
                    className="text-input"
                    {...field}
                    {...props}
                />
            </Box>
            {touched && error ? (
                <Text
                    color="red.500"
                    px={2}
                    pt={0}
                    pb={2}
                    className="error"
                    textAlign="left"
                    ml="2"
                >
                    {error}
                </Text>
            ) : null}
        </>
    );
};

export default CustomInput;