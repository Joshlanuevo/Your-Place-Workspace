import UserItem from "./UserItem";

interface UsersListProps {
    items: {
        id: string;
        name: string;
        image: string;
        places: number
    }[];
}

const UsersList: React.FC<UsersListProps> = (props) => {
    if (props.items.length === 0) {
        return ( 
            <div className="center pt-40">
                <h2 className="text-white text-lg">No users found.</h2>
            </div>
        )
    }

    return (
        <ul className="list-none mx-auto p-0 w-90 md:w-2/3 lg:w-3/5 xl:w-2/3 flex justify-center flex-wrap">
            {props.items.map((user) => (
                <UserItem 
                    key={user.id}
                    id={user.id}
                    image={user.image}
                    name={user.name}
                    placeCount={user.places}
                />
            ))}
        </ul>
    )
}
 
export default UsersList;