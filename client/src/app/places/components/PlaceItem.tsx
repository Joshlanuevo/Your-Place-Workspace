"use client";
import React, { useState, useEffect, useContext } from "react";
import { useRouter, usePathname } from 'next/navigation';
import Card from "@/app/shared/components/UIElements/Card";
import Button from "@/app/shared/components/FormElements/Button";
import Modal from "@/app/shared/components/UIElements/Modal";
import Map from "@/app/shared/components/UIElements/Map";
import Input from "@/app/shared/components/FormElements/Input";
import { AuthContext } from "@/app/shared/context/auth-context";
import { useForm } from "@/app/shared/hooks/form-hook";
import { useHttpClient } from "@/app/shared/hooks/http-hook";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "@/app/shared/util/validator";
import LoadingSpinner from "@/app/shared/components/UIElements/LoadingSpinner";
import ErrorModal from "@/app/shared/components/UIElements/ErrorModal";

interface PlaceItemProps {
  id: string;
  image: string;
  title: string;
  description: string;
  address: string;
  creatorId: string;
  coordinates: {
    lat: number;
    lng: number;
  }; 
  onUpdate: (placeId: string) => void; 
}

const PlaceItem: React.FC<PlaceItemProps> = (props) => {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [showMap, setShowMap] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      }
    },
    false
  );
  const openMapHandler = () => setShowMap(true);

  const closeMapHandler = () => setShowMap(false);

  const showUpdateModalHandler = () => {
    setShowUpdateModal(true);
  }

  const placeUpdateSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/places/${placeId}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value
        }),
        {
          'Content-Type': 'application/json'
        }
      );
      router.push('/' + auth.userId + '/places');
    } catch (err) {}
  };
  const cancelUpdateModalHandler = () => {
    setShowUpdateModal(false);
  }

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `http://localhost:5000/api/places/${props.id}`,
        'DELETE'
      );
      props.onDelete(props.id);
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <> 
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="p-0"
        footerClass="text-right"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="h-15 w-full">
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={showUpdateModal}
        onCancel={cancelUpdateModalHandler}
      >
      <div>
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            initialValue={formState.inputs.title.value}
            initialValid={formState.inputs.title.isValid}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (min. 5 characters)."
            onInput={inputHandler}
            initialValue={formState.inputs.description.value}
            initialValid={formState.inputs.description.isValid}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE PLACE
          </Button>
        </form>
      </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="text-right"
        footer={
          <>
            <Button secondary onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </>
        }
      >
        <p>
          Do you want to proceed and delete this place? Please note that it
          can't be undone thereafter.
        </p>
      </Modal>
      <li className="place-item mt-8 mb-5 mx-5" key={props.id}>
        <Card className="place-item__content bg-white">
          <div className="place-item__image">
            <img className="w-full h-32 object-cover" src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info p-4 text-center">
            <h2 className="text-[#2C2F33] text-xl font-bold mb-2">{props.title}</h2>
            <h3 className="text-gray-500 mb-2">{props.address}</h3>
            <p className="text-gray-400">{props.description}</p>
          </div>
          <div className="place-item__actions p-4 text-center border-t border-solid border-gray-300">
            <Button
              primary
              onClick={openMapHandler}
            >
              VIEW ON MAP
            </Button>
            {auth.userId === props.creatorId && (
              <Button secondary onClick={() => props.onUpdate(props.id)}>EDIT</Button>
            )}
            {auth.userId === props.creatorId && (
              <Button danger onClick={showDeleteWarningHandler}>DELETE</Button>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;