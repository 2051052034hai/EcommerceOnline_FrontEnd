// Libraries
import { Route, Routes } from "react-router-dom";

// Routes
import { routes } from "./routes";

export const Root = () => {

  return (
    <Routes>
      {routes?.map((route) => {

        return (
          <Route
            key={route?.key}
            path={route?.path}
            Component={route?.component}
          />
          
        )
      })}
    </Routes>
  );
};
