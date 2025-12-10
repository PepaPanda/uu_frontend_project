import { type ReactNode, useEffect, useState } from "react";
import { type User, UserContext } from "./UserContext";

import { useNavigate, useLocation } from "react-router";

const apiUrl = import.meta.env.VITE_API_URL;

//test user
import owner from "../../test_data/user-owner.json";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
    if (user) return;

    const { pathname } = location;
    if (pathname === "/login" || pathname === "/register") return;
    if (!apiUrl) {
      const fakeUser: User = JSON.parse(JSON.stringify(owner));
      setTimeout(() => {
        setUser(fakeUser);
        setLoading(false);
      }, 150);
    } else {
      const getUser = async () => {
        try {
          const response = await fetch(`${apiUrl}/user/`, {
            credentials: "include",
          });
          if (!response.ok) {
            setUser(null);
            setLoading(false);
            navigate("/login");
            return;
          }

          const json = await response.json();
          setUser(json);
          setLoading(false);
        } catch (err) {
          console.error(err);
          setUser(null);
          setLoading(false);
          navigate("/login");
        }
      };

      getUser();
    }
  }, [navigate, location, user]);

  return (
    <UserContext.Provider value={{ user, loading, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
