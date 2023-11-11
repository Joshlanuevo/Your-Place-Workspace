import React from "react";
import PlaceItem from "./PlaceItem";

interface PlaceListProps {
  items: {
    id: string;
    imageUrl: string;
    title: string;
    description: string;
    address: string;
    creator: string;
    location: string;
  }[];
}

const PlaceList: React.FC<PlaceListProps> = (props) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
      {props.items.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.imageUrl}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
        />
      ))}
    </ul>
  );
};

export default PlaceList;