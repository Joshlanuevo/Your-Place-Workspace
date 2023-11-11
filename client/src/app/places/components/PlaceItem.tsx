"use client";
import React, { useState } from "react";
import Card from "@/app/shared/components/UIElements/Card";
import Button from "@/app/shared/components/FormElements/Button";
import Modal from "@/app/shared/components/UIElements/Modal";
import Map from "@/app/shared/components/UIElements/Map";

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
  const [showMap, setShowMap] = useState(false);

  const openMapHandler = () => setShowMap(true);

  const closeMapHandler = () => setShowMap(false);

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
            <Button secondary>EDIT</Button>
            <Button danger>DELETE</Button>
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;