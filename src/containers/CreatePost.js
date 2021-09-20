import { Box, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import cookie from "react-cookies";
import * as Yup from "yup";
import axios from "axios";
import CustomInput from "./../components/CustomInput";
import React from "react";
import { useHistory } from "react-router";
const CreatePost = ({ ...props }) => {
  let history = useHistory();
  return (
    <>
      <Box bg="white">
        <Box>
          <Formik
            initialValues={{
              title: "",
              summary: "",
              post: "",
            }}
            validationSchema={Yup.object({
              title: Yup.string().required("Required"),
              summary: Yup.string().required("Required"),
              post: Yup.string().required("Required"),
            })}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              let payload = {
                title: values.title,
                summary: values.summary,
                post: values.post,
              };
              try {
                const result = await axios.post(
                  `${process.env.REACT_APP_API_HOST}/post`,
                  payload,
                  {
                    headers: {
                      "X-Session-Cookie": cookie.load(
                        process.env.REACT_APP_SESSION_COOKIE_NAME
                      ),
                    },
                  }
                );
                history.push("/");
                if (result) {
                  cookie.save(
                    process.env.REACT_APP_SESSION_COOKIE_NAME,
                    result.data.data.token,
                    {
                      path: "/",
                    }
                  );

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
                <Box maxWidth="60%" mx="auto">
                  <CustomInput label="Title" name="title" type="text" />

                  <CustomInput label="Summary" name="summary" type="text" />

                  <CustomInput
                    label="Write your post"
                    name="post"
                    type="text"
                  />

                  <Box px="2">
                    <Button
                      mt="2"
                      w="100%"
                      py="6"
                      textDecoration="none"
                      background="#13344C"
                      borderRadius="full"
                      color="white"
                      border="2px solid white"
                      _hover={{
                        color: "#00223E",
                        bg: "white",
                        border: "2px solid #00223E",
                      }}
                      disabled={
                        !Object.keys(touched).length ||
                        (Object.keys(touched).length &&
                          Object.keys(errors).length) ||
                        isSubmitting
                      }
                      isLoading={isSubmitting}
                      type="submit"
                    >
                      Publish
                    </Button>
                  </Box>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </>
  );
};

export default CreatePost;
