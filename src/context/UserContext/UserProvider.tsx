import { type ReactNode, useEffect, useState } from "react";
import { type User, UserContext } from "./UserContext";

//test user
import owner from "../../test_data/user-owner.json";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fakeUser: User = JSON.parse(JSON.stringify(owner));
    // TODO: change to fetch

    setTimeout(() => {
      setUser(fakeUser);
      setLoading(false);
    }, 150);
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
