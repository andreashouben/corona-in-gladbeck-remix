import { Link } from "react-router-dom";
import { Meta, Links, Outlet } from "remix";

export default function App() {
  return (
    <html lang="de">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
      </body>
    </html>
  );
}
