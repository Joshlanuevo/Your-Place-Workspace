import React, { ReactNode, CSSProperties } from 'react';
import Link from "next/link";
import Card from "@/app/shared/components/UIElements/Card";
import Avatar from "@/app/shared/components/UIElements/Avatar";

interface UserItemProps {
  id: string;
  name: string;
  image: string;
  placeCount: number;
}

const UserItem: React.FC<UserItemProps> = (props) => {
  return (
    <li className="m-4 w-full md:w-2/4 lg:w-2/5 xl:w-2/5">
      <Card className="p-0">
        <Link href={`/places/${props.id}`} className="flex items-center w-full h-full no-underline p-4 text-white bg-gray-900 hover:bg-yellow-500">
          <div className="w-16 h-16 md:w-20 md:h-20 lg:w-16 lg:h-16 xl:w-20 xl:h-20 mr-4">
            <Avatar image={props.image} alt={props.name} />
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg md:text-2xl mb-2 font-normal text-yellow-500">{props.name}</h2>
            <h3 className="m-0 text-sm md:text-base">{props.placeCount} {props.placeCount === 1 ? "Place" : "Places"}</h3>
          </div>
        </Link>
      </Card>
    </li>
  );
}

export default UserItem;
