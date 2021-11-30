import { Links, Meta, Outlet, Scripts, useMatches } from "remix";

export default function App() {
  let matches = useMatches();

  let includeScripts = matches.some((match) => match.handle?.hydrate);

  return (
    <html lang="de">
      <head>
        <meta charSet="utf-8" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />

        {includeScripts && <Scripts />}
      </body>
    </html>
  );
}
