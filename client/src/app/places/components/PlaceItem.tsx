"use client";
import React, { useState, useContext } from "react";
import Card from "@/app/shared/components/UIElements/Card";
import Button from "@/app/shared/components/FormElements/Button";
import Modal from "@/app/shared/components/UIElements/Modal";
import Map from "@/app/shared/components/UIElements/Map";
import { AuthContext } from "@/app/shared/context/auth-context";

interface PlaceItemProps {
  id: string;
  image: string;
  title: string;
  description: string;
  address: string;
  creatorId: string;
  coordinates: string; 
}

const PlaceItem: React.FC<PlaceItemProps> = (props) => {
  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const openMapHandler = () => setShowMap(true);

  const closeMapHandler = () => setShowMap(false);

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
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button inverse onClick={cancelDeleteHandler}>
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
              <Button secondary>EDIT</Button>
            )}
            {auth.isLoggedIn && (
              <Button danger onClick={setShowConfirmModal}>DELETE</Button>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;