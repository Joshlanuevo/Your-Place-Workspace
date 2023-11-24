import React, { useContext } from "react";
import PlaceItem from "./PlaceItem";
import Card from "@/app/shared/components/UIElements/Card";
import Button from "@/app/shared/components/FormElements/Button";
import { AuthContext } from "@/app/shared/context/auth-context";

interface PlaceListProps {
  items: {
    id: string;
    image: string;
    title: string;
    description: string;
    address: string;
    creator: string;
    location: {
      lat: number;
      lng: number;
    };
  }[];
}

const PlaceList: React.FC<PlaceListProps> = (props) => {
  const auth = useContext(AuthContext);

  if (props.items.length === 0) {
    return (
    <div className="mt-20 flex items-center justify-center">
      <Card className="w-96 p-8 text-center bg-gray-200">
        <h2 className="text-2xl font-bold m-4">No places found.</h2>
        {auth.isLoggedIn && (
          <Button to="/places/new" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Share Place
          </Button>
        )}
      </Card>
    </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
      {props.items.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.image}
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