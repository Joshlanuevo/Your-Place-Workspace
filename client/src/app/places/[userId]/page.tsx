"use client"
import { useState, useContext, useEffect } from "react";
import { useRouter, usePathname } from 'next/navigation';
import PlaceList from "../components/PlaceList";
import Modal from "@/app/shared/components/UIElements/Modal";
import Input from "@/app/shared/components/FormElements/Input";
import Button from "@/app/shared/components/FormElements/Button";
import ErrorModal from "@/app/shared/components/UIElements/ErrorModal";
import LoadingSpinner from "@/app/shared/components/UIElements/LoadingSpinner";
import { useForm } from "@/app/shared/hooks/form-hook";
import { useHttpClient } from "@/app/shared/hooks/http-hook";
import { AuthContext } from "@/app/shared/context/auth-context";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "@/app/shared/util/validator";
import { AiOutlineClose } from "react-icons/ai";

const UserPlacesPage = (props) => {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const userId = usePathname().split('/').pop();
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      address: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const [showModal, setShowModal] = useState(false);
  const [updatePlaceId, setUpdatePlaceId] = useState(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/user/${userId}`
        );
        setLoadedPlaces(responseData.places);
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest, userId]);

  const openAddPlaceModal = () => {
    setShowModal(true);
    setUpdatePlaceId(null);
  };

  const closeAddPlaceModal = () => {
    setShowModal(false);
    setUpdatePlaceId(null);
  };

  // const showUpdateModalHandler = (place) => {
  //   setFormData({
  //     title: {
  //       value: place.title,
  //       isValid: true,
  //     },
  //     description: {
  //       value: place.description,
  //       isValid: true,
  //     },
  //   }, true);
  
  //   setShowModal(true);
  // }

  const closeButton = (
    <div>
      <AiOutlineClose className="header-style" onClick={closeAddPlaceModal} />
    </div>
  );

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        'http://localhost:5000/api/places',
        'POST',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          address: formState.inputs.address.value,
          creator: auth.userId
        }),
        { 'Content-Type': 'application/json' }
      );
      router.push('/');
    } catch (err) {}
  };

    const placeDeletedHandler = deletedPlaceId => {
    setLoadedPlaces(prevPlaces =>
      prevPlaces.filter(place => place.id !== deletedPlaceId)
    );
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {auth.isLoggedIn && (
        <>
        <form onSubmit={placeSubmitHandler}>
          {auth.userId === userId && (
            <div className="pt-8 md:pt-10 relative">
              <div className="absolute top-0 right-0 mr-5">
                <Button circle onClick={openAddPlaceModal}>
                  +
                </Button>
              </div>
            </div>
          )}
          <Modal
            show={showModal}
            onCancel={closeAddPlaceModal}
            header={closeButton}
            headerClass="flex justify-end pr-5"
            contentClass="p-0"
          >
            <div className="p-8">
              <h1 className="text-2xl font-bold mb-4">Add New Place</h1>
              {isLoading && <LoadingSpinner asOverlay />}
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
            </div>
          </Modal>
        </form>
        </>
      )}
      {!isLoading && loadedPlaces && (
        <PlaceList 
          items={loadedPlaces} 
          onDeletePlace={placeDeletedHandler} 
          // onUpdatePlace={showUpdateModalHandler}
        />
      )}
    </>
  );
};

export default UserPlacesPage;