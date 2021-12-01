import { Links, Meta, Outlet, Scripts, useMatches } from "remix";

export default function App() {
  let matches = useMatches();

  let includeScripts = matches.some((match) => match.handle?.hydrate);

  return (
    <html lang="de">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport"  content= "width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="Anzeige der Coronazahlen von Gladbeck, 
        bereitgestellt vom Kreis Recklinghausen. Die Seite zeigt stellt die Zahlen 
        textuell dar und gibt einen Überblick über die täglichen Veränderungen."/>        
        <meta name="theme-color" content="#000000"/>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />

        {includeScripts && <Scripts />}
      </body>
      <footer>
    <div>Favicon by <a href="https://www.flaticon.com/de/autoren/surang" title="surang">surang</a> from <a
            href="https://www.flaticon.com/de/" title="Flaticon">www.flaticon.com</a></div>
</footer>
    </html>
  );
}
