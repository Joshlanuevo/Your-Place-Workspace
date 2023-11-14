"use client";
import React, { useContext, useState } from 'react';
import Modal from '../shared/components/UIElements/Modal';
import Card from '../shared/components/UIElements/Card';
import Input from '../shared/components/FormElements/Input';
import Button from '../shared/components/FormElements/Button';
import { useForm } from '../shared/hooks/form-hook';
import { AuthContext } from '../shared/context/auth-context';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../shared/util/validator';
import { AiOutlineClose } from 'react-icons/ai';

const AuthPage = () => {
  const auth = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  const [isLoginMode, setIsLoginMode] = useState(true);

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

  const openSignUpModal = () => {
    setIsLoginMode(prevMode => !prevMode);
  
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
  
    setShowModal(true);
  };
  const closeSignUpModal = () => {
    setShowModal(false);
  };

  const authSignUpHandler = async (event) => {
    event.preventDefault();
    await auth.signup(formState.inputs.email.value, formState.inputs.password.value);
  }
  

  const authSignInHandler = (event) => {
    event.preventDefault();
    auth.signin();
  }

  return (
    <>
      <Modal
        show={showModal}
        onCancel={closeSignUpModal}
        header={<AiOutlineClose className="header-style" onClick={closeSignUpModal} />}
        headerClass="flex justify-end pr-5"
        contentClass="p-0"
      >
        <h1 className="text-2xl font-bold mt-4 mb-6">Sign Up</h1>
        <div>
          <form onSubmit={authSignUpHandler}>
            <Input
              element="input"
              id="name"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name."
              onInput={inputHandler}
            />
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
            <Button type="submit" className="mt-4" disabled={!formState.isValid} wide>
              SIGN UP
            </Button>
          </form>
        </div>
      </Modal>
      <div className="flex justify-center items-center h-screen mt-10">
        <div className="w-80 sm:w-96">
          <h1 className="text-2xl text-center text-white font-semibold mb-10">
            Sign in to
            <span className="text-2xl text-white bg-[#5865F2] mx-2 py-2 px-4 rounded-lg font-bold">
              YourPlace
            </span>
          </h1>
          <Card className="bg-gray-300 p-4">
            <form onSubmit={authSignInHandler}>
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
              <Button type="submit" className="mt-4" disabled={!formState.isValid} wide>
                SIGN IN
              </Button>
            </form>
          </Card>
          <div className="mt-6">
            <Card className="bg-gray-300 p-4">
              <h3 className="text-sm text-center text-black font-semibold">
                New to YourPlace?{' '}
                <Button className="text-blue-500" onClick={openSignUpModal}>
                  Create an account
                </Button>
              </h3>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;