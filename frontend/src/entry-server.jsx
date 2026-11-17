import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";

export function render(url) {
  const appHtml = renderToString(
    <HelmetProvider>
      <StaticRouter location={url}>
        <div id="ssr-content">
          <App />
        </div>
      </StaticRouter>
    </HelmetProvider>
  );

  const marker = '<div id="ssr-content">';
  const start = appHtml.indexOf(marker);
  const end = appHtml.lastIndexOf("</div>");

  if (start === -1 || end < start) {
    throw new Error("Could not locate the rendered application content.");
  }

  return {
    html: appHtml.slice(start + marker.length, end),
  };
}