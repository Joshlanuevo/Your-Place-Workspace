"use client";
import { useState, useContext } from "react";
import { useForm } from "@/app/shared/hooks/form-hook";
import { AuthContext } from "@/app/shared/context/auth-context";
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from "@/app/shared/util/validator";
import Input from "@/app/shared/components/FormElements/Input";
import Button from "@/app/shared/components/FormElements/Button";

const AuthForm = () => {
    const auth = useContext(AuthContext);
    const [isLoginMode, setIsLoginMode] = useState(false);
  
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
  
    const authSubmitHandler = (event) => {
      event.preventDefault();
      console.log(formState.inputs);
      auth.login();
    };
  
    const toggleMode = () => {
      if (isLoginMode) {
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
      setIsLoginMode((prevMode) => !prevMode);
    };
  
    return (
      <>
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
            validators={[VALIDATOR_MINLENGTH(5)]}
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
                onClick={toggleMode} 
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
