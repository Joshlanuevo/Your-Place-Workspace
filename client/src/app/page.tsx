"use client";
import { useState, useEffect } from "react";
import { useHttpClient } from "./shared/hooks/http-hook";
import UsersList from "./users/components/UserList";
import ErrorModal from "./shared/components/UIElements/ErrorModal";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";

export default function Home() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/users'
        );

        setLoadedUsers(responseData.users);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);

  return (
    <div className="min-h-screen p-20">
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </div>
  );
}
