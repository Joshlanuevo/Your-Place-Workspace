"use client"
import { useState, useCallback, useReducer } from "react";
import PlaceList from "../components/PlaceList";
import Modal from "@/app/shared/components/UIElements/Modal";
import Input from "@/app/shared/components/FormElements/Input";
import Button from "@/app/shared/components/FormElements/Button";
import { useForm } from "@/app/shared/hooks/form-hook";
import { useHttpClient } from "@/app/shared/hooks/http-hook";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "@/app/shared/util/validator";
import { AiOutlineClose } from "react-icons/ai";


const UserPlacesPage = () => {
  const {isLoading, error, sendRequest, clearError} = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      address: {
        value: '',
        isValid: false
      },
    },
    false
  );
  

  const [showModal, setShowModal] = useState(false);

  const openAddPlaceModal = () => {
    setShowModal(true);
  };
  
  const closeAddPlaceModal = () => {
    setShowModal(false);
  };

  const closeButton = (
    <div>
      <AiOutlineClose className="header-style" onClick={closeAddPlaceModal} />
    </div>
  )

  const placeSubmitHandler = async (event:any)=> {
    event.preventDefault();
    sendRequest("http://localhost:5000/api/places", "POST", JSON.stringify({
      title: formState.inputs.title.value,
      description: formState.inputs.description.value,
      address: formState.inputs.address.value,
      creator:
    }), {});
  };
    
  
  return (
    <>
      <Modal 
        show={showModal} 
        onCancel={closeAddPlaceModal} 
        header={closeButton}
        headerClass="flex justify-end pr-5"
        contentClass="p-0"
      >
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">Add New Place</h1>
          <form onSubmit={placeSubmitHandler}>
            <Input
              id="title"
              element="input"
              type="text"
              label="Title"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid title."
              onInput={inputHandler}
            />
            <Input
              id="description"
              element="input"
              type="text"
              label="Description"
              validators={[VALIDATOR_MINLENGTH(5)]}
              errorText="Please enter a valid description."
              onInput={inputHandler}
            />
            <Input
              id="address"
              element="input"
              label="Address"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid address."
              onInput={inputHandler}
            />
            <Button type="submit" className="mt-4" disabled={!formState.isValid}>
              ADD PLACE
            </Button>
          </form>
        </div>
      </Modal>
      <div className="pt-8 md:pt-10 relative">
        <div className="absolute top-0 right-0 mr-5">
          <Button circle onClick={openAddPlaceModal}>
            +
          </Button>
        </div>
        <PlaceList items={DUMMY_PLACES} />
      </div>
    </>
  );
};
  
export default UserPlacesPage;