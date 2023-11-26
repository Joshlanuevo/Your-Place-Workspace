"use client";
import { useState, useContext } from "react";
import { useForm } from "@/app/shared/hooks/form-hook";
import { AuthContext } from "@/app/shared/context/auth-context";
import { useHttpClient } from "@/app/shared/hooks/http-hook";
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from "@/app/shared/util/validator";
import Input from "@/app/shared/components/FormElements/Input";
import Button from "@/app/shared/components/FormElements/Button";
import LoadingSpinner from "@/app/shared/components/UIElements/LoadingSpinner";
import ErrorModal from "@/app/shared/components/UIElements/ErrorModal";

const AuthForm = () => {
    const auth = useContext(AuthContext);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
  
    const [formState, inputHandler, setFormData] = useForm(
      {
        email: {
          value: '',
          isValid: false
        },
        password: {
          value: '',
          isValid: false
        }
      },
      false
    );
  
    const switchModeHandler = () => {
      if (!isLoginMode) {
        setFormData(
          {
            ...formState.inputs,
            name: undefined
          },
          formState.inputs.email.isValid && formState.inputs.password.isValid
        );
      } else {
        setFormData(
          {
            ...formState.inputs,
            name: {
              value: '',
              isValid: false
            }
          },
          false
        );
      }
      setIsLoginMode(prevMode => !prevMode);
    };

    const authSubmitHandler = async (event: React.FormEvent) => {
      event.preventDefault();
    
      if (isLoginMode) {
        try {
          const responseData = await sendRequest(
            "http://localhost:5000/api/users/login",
            "POST",
            JSON.stringify({
              email: formState.inputs.email.value,
              password: formState.inputs.password.value
            }),
            {
              "Content-Type": "application/json"
            }
          );
    
          console.log("Login response data:", responseData);
          auth.login(responseData.user.id);
        } catch (err) {
          console.error("Login error:", err);
        }
      } else {
        try {
          const responseData = await sendRequest(
            "http://localhost:5000/api/users/signup",
            "POST",
            JSON.stringify({
              name: formState.inputs.name ? formState.inputs.name.value : '',
              email: formState.inputs.email.value,
              password: formState.inputs.password.value
            }),
            {
              "Content-Type": "application/json"
            }
          );
    
          auth.login(responseData.user.id);
        } catch (err) {}
      }
    };
  
    return (
      <>
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && <LoadingSpinner asOverlay />}
        <h1 className="text-2xl text-center text-gray-700 font-semibold mb-10">
              {isLoginMode ? "Login to" : "Signup to"}
              <span className="text-2xl text-white bg-[#5865F2] mx-2 py-2 px-4 rounded-lg font-bold">
                  YourPlace
              </span>
        </h1>
        <hr className="mb-4" style={{ borderColor: 'gray' }} />
        <form onSubmit={authSubmitHandler}>
            {!isLoginMode && (
            <Input
                element="input"
                id="name"
                type="text"
                label="Your Name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a name."
                onInput={inputHandler}
            />
            )}
            <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
            />
            <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password, at least 5 characters."
            onInput={inputHandler}
            />
            <Button 
                type="submit" 
                disabled={!formState.isValid} 
                wide 
            >
                {isLoginMode ? 'LOGIN' : 'SIGNUP'}
            </Button>
            <Button 
                type="button" 
                onClick={switchModeHandler} 
                wide 
                danger
            >
                Switch to {isLoginMode ? 'SIGNUP' : 'LOGIN'}
            </Button>
        </form>
      </>
    );
  };

export default AuthForm;
