import React, { useEffect, useState } from "react";
import {
  Box,
  Input,
  FormControl,
  Image,
  Button,
  Checkbox,
  InputGroup,
  InputRightElement,
  Heading,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa";
import logo from "../../assets/logo.png";
import { CgLogIn } from "react-icons/cg";
import { FaEye } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useToast } from "@chakra-ui/react";
const Login = () => {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [password, setPassword] = useState("");
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      // Show toast notification for each error
      toast({
        title: "Error",
        description: "please check the inputs",
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [errors.email, errors.password]);
  const hanndleLogin = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCreds) => {
        const user = userCreds.user;
        if (user) {
          navigate("/admin/sections");
          toast({
            title: "Logged In.",
            description: "you have succesfully logged in",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top-right",
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <Box
      width={"100%"}
      height={"100vh"}
      bgColor={"#454d55"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box
        width={"100%"}
        minHeight={"350.05px"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        color={"#fff"}
      >
        <Box
          width={"360px"}
          h={"full"}
          color={"#fff"}
          alignItems={"center"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
        >
          <Box marginBottom={"0.9rem"} textAlign={"center"}>
            <Image src={logo} height={50} backgroundSize={"cover"} />
          </Box>
          <Box
            borderTop={"3px solid #3f6791"}
            boxShadow={"0 0 1px rgba(0,0,0,.125), 0 1px 3px rgba(0,0,0,.2)"}
            bgColor={"#343a40"}
            wordBreak={"break-word"}
            borderRadius={"0.25rem"}
            backgroundClip={"border-box"}
            width={"100%"}
            h={"full"}
          >
            <Box
              backgroundColor={"transparent"}
              borderBottom={"1px solid rgba(0,0,0,.125)"}
              padding={"0.75rem 1.25rem"}
              borderTopLeftRadius={"0.25rem"}
              borderTopRightRadius={"0.25rem"}
            >
              <Heading
                as={"h3"}
                fontSize={"1.1rem"}
                fontWeight={"400"}
                textAlign={"center"}
              >
                Sign in to start your session
              </Heading>
              <form onSubmit={handleSubmit(hanndleLogin)}>
                <Box borderColor={"#6c757d"}>
                  <FormControl
                    isInvalid={errors.email}
                    w={"full"}
                    paddingTop={"20px"}
                    display={"grid"}
                    gridRowGap={"1rem"}
                  >
                    <InputGroup display={"flex"} flexDirection={"column"}>
                      <Input
                        type="email"
                        name="email"
                        borderColor={"#6c757d"}
                        placeholder="Email"
                        {...register("email", {
                          required: "email address is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "email address is not valid",
                          },
                        })}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <InputRightElement width="4.5rem">
                        <MdOutlineMailOutline
                          fill="#777"
                          style={{ marginLeft: "20px" }}
                        />
                      </InputRightElement>
                      <FormErrorMessage>
                        {errors?.email?.message}
                      </FormErrorMessage>
                    </InputGroup>
                  </FormControl>
                  <FormControl
                    isInvalid={errors.password}
                    w={"full"}
                    paddingTop={"20px"}
                    display={"grid"}
                    gridRowGap={"1rem"}
                    marginBottom={"1rem"}
                  >
                    <InputGroup display={"flex"} flexDirection={"column"}>
                      <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        borderColor={"#6c757d"}
                        placeholder="password"
                        value={password}
                        {...register("password", {
                          required: "password field is required",
                        })}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <InputRightElement width="4.5rem">
                        {!showPassword ? (
                          <FaEye
                            fill="#777"
                            cursor={"pointer"}
                            style={{ marginLeft: "20px" }}
                            onClick={() => setShowPassword(!showPassword)}
                          />
                        ) : (
                          <FaEyeSlash
                            fill="#777"
                            cursor={"pointer"}
                            style={{ marginLeft: "20px" }}
                            onClick={() => setShowPassword(!showPassword)}
                          />
                        )}
                      </InputRightElement>
                      <FormErrorMessage>
                        {errors?.password?.message}
                      </FormErrorMessage>
                    </InputGroup>
                  </FormControl>
                  <Box display={"flex"}>
                    <Checkbox flex={"1"}>Remember Me</Checkbox>
                    <Button
                      color={"#fff"}
                      loadingText="Login in"
                      isLoading={loading}
                      bgColor={"#3f6791"}
                      _hover={{ opacity: "0.8" }}
                      _active={{ opacity: "0.8" }}
                      borderColor={"#3f6791"}
                      leftIcon={
                        <CgLogIn
                          size={22}
                          fontSize={"sm"}
                          style={{ marginTop: "3px" }}
                        />
                      }
                      rightIcon={"Sign In"}
                      type="submit"
                      borderRadius={"0"}
                      textAlign={"center"}
                    ></Button>
                  </Box>
                </Box>
              </form>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
