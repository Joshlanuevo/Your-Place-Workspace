"use client";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from 'next/navigation';
import Card from "@/app/shared/components/UIElements/Card";
import Button from "@/app/shared/components/FormElements/Button";
import Modal from "@/app/shared/components/UIElements/Modal";
import Map from "@/app/shared/components/UIElements/Map";
import Input from "@/app/shared/components/FormElements/Input";
import { AuthContext } from "@/app/shared/context/auth-context";
import { useForm } from "@/app/shared/hooks/form-hook";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "@/app/shared/util/validator";

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Mandaluyong City',
    description: '',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
    address: 'Mandaluyong City, Metro Manila',
    location: {
      lat: 14.57937439855522,
      lng: 121.03541430501816
    },
    creator: 'u1'
  },
  {
    id: 'p2',
    title: 'Emp. State Building!!!',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creator: 'u2'
  },
  {
    id: 'p3',
    title: 'Empire State Building!!!!',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creator: 'u1'
  },
];

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
}

const PlaceItem: React.FC<PlaceItemProps> = (props) => {
  const auth = useContext(AuthContext);
  const placeId = useParams().placeId;
  const [isLoading, setIsLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [formState, inputHandler, setFormData] = useForm(
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

  const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);

  useEffect(() => {
    if (identifiedPlace) {
      setFormData(
        {
          title: {
            value: identifiedPlace.title,
            isValid: true
          },
          description: {
            value: identifiedPlace.description,
            isValid: true
          }
        },
        true
      );
    }
    setIsLoading(false);
  }, [setFormData, identifiedPlace]);

  const openMapHandler = () => setShowMap(true);

  const closeMapHandler = () => setShowMap(false);

  const showUpdateModalHandler = () => {
    setShowUpdateModal(true);
  }

  const placeUpdateSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Form State:", formState);
    console.log("Updating place...", formState.inputs);
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

  const confirmDeleteHandler = () => {
    setShowConfirmModal(false);
    console.log("DELETING...");
  }

  // if (!identifiedPlace) {
  //   return (
  //     <div className="center">
  //       <Card>
  //         <h2>Could not find place!</h2>
  //       </Card>
  //     </div>
  //   );
  // }

  if (isLoading) {
    return (
      <div className="center pt-20">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <> 
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
      <li className="place-item mt-8 mb-5 mx-5">
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
            {auth.isLoggedIn && (
              <Button secondary onClick={showUpdateModalHandler}>EDIT</Button>
            )}
            {auth.isLoggedIn && (
              <Button danger onClick={showDeleteWarningHandler}>DELETE</Button>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;