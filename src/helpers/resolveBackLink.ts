import { matchPath } from "react-router";

//Takes current locations and returns string OR null. string is not always the previous location but it's always the parent. E.g. /shopping-list/:id/settings -> /shopping-list/:id
const resolveBackLink = (currentLocation: string): string | null => {
  const match = [
    matchPath("/user/settings", currentLocation),
    matchPath("/shopping-list/:id/settings", currentLocation),
    matchPath("/shopping-list/:id/members", currentLocation),
  ];

  const matched = match.filter((path) => path)[0];

  if (!matched) {
    return null;
  }

  switch (matched.pattern.path) {
    case "/user/settings":
      return "/";

    case "/shopping-list/:id/settings":
      return `/shopping-list/${matched.params.id}`;

    case "/shopping-list/:id/members":
      return `/shopping-list/${matched.params.id}`;
  }

  return "/";
};

export default resolveBackLink;
