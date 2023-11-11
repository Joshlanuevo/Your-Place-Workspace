import UsersList from "./users/components/UserList";
import Users from "@/app/users/user.json";

export default function Home() {
  // const Users = [
  //   {
  //     id: 'u1',
  //     name: 'Max Schwarz',
  //     image:
  //       'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  //     places: 3
  //   },
  //   {
  //     id: 'u1',
  //     name: 'Max Schwarz',
  //     image:
  //       'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  //     places: 3
  //   },
  //   {
  //     id: 'u1',
  //     name: 'Max Schwarz',
  //     image:
  //       'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  //     places: 3
  //   },
  //   {
  //     id: 'u1',
  //     name: 'Max Schwarz',
  //     image:
  //       'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  //     places: 3
  //   },
  //   {
  //     id: 'u1',
  //     name: 'Max Schwarz',
  //     image:
  //       'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  //     places: 3
  //   },
  //   {
  //     id: 'u1',
  //     name: 'Max Schwarz',
  //     image:
  //       'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  //     places: 3
  //   },
  // ];

  return (
    <div className="min-h-screen p-20">
      <UsersList items={Users}/>  
    </div>
  );
}
