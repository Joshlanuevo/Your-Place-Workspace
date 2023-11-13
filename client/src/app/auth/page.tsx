"use client"
import { useState } from "react";
import Link from "next/link";
import Modal from "../shared/components/UIElements/Modal";
import Card from "../shared/components/UIElements/Card";
import Input from "../shared/components/FormElements/Input";
import Button from "../shared/components/FormElements/Button";
import { VALIDATOR_REQUIRE } from "../shared/util/validator";
import { AiOutlineClose } from "react-icons/ai";

const AuthPage = () => {
    const [showModal, setShowModal] = useState(false);

    const openSignUpModal = () => {
        setShowModal(true);
    }

    const closeSignUpModal = () => {
        setShowModal(false);
    }

    const closeButton = (
        <div>
          <AiOutlineClose className="header-style" onClick={closeSignUpModal} />
        </div>
    );

    return (
        <>
        <Modal
            show={showModal}
            onCancel={closeSignUpModal}
            header={closeButton}
            headerClass="flex justify-end pr-5"
            contentClass="p-0"
        >   
            <h1 className="text-2xl font-bold mt-4 mb-6">Sign Up</h1>
            <form>
                <Input
                    id="name"
                    element="input"
                    label="Name"
                    validators={[VALIDATOR_REQUIRE()]}
                    onInput={() => console.log('wazzup')}
                />
                <Input
                    id="email"
                    element="input"
                    type="email"
                    label="Email"
                    validators={[VALIDATOR_REQUIRE()]}
                    onInput={() => console.log('wazzup')}
                />
                <Input
                    id="password"
                    element="input"
                    type="password"
                    label="Password"
                    validators={[VALIDATOR_REQUIRE()]}
                    onInput={() => console.log('wazzup')}
                />
                <Button wide className="mt-4 bg-blue-500 hover:bg-blue-700 text-white">
                    SIGN IN
                </Button>
            </form>
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
                    <form>
                        <Input
                            id="email"
                            element="input"
                            type="email"
                            label="Email"
                            validators={[VALIDATOR_REQUIRE()]}
                            onInput={() => console.log('wazzup')}
                        />
                        <Input
                            id="password"
                            element="input"
                            type="password"
                            label="Password"
                            validators={[VALIDATOR_REQUIRE()]}
                            onInput={() => console.log('wazzup')}
                        />
                        <Button wide className="mt-4 bg-blue-500 hover:bg-blue-700 text-white">
                            SIGN IN
                        </Button>
                    </form>
                </Card>
                <div className="mt-6">
                    <Card className="bg-gray-300 p-4">
                        <h3 className="text-sm text-center text-black font-semibold">
                            New to YourPlace? <Link href="/auth" className="text-blue-500" onClick={openSignUpModal}>Create an account</Link>
                        </h3>
                    </Card>
                </div>
            </div>
        </div>
        </>
    );
}

export default AuthPage;
