import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";

function getHelmetHead(appHtml, startIndex) {
  const headHtml = appHtml.slice(0, startIndex);
  const tags = headHtml.match(
    /<(title|meta|link|base|style|script)[^>]*>(?:<\/\1>|)/gi
  );

  return tags ? tags.join("") : "";
}

export function render(url) {
  const helmetContext = {};
  const appHtml = renderToString(
    <HelmetProvider context={helmetContext}>
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

  const head =
    helmetContext.helmet && typeof helmetContext.helmet === "object"
      ? [
          helmetContext.helmet.title?.toString?.() ?? "",
          helmetContext.helmet.meta?.toString?.() ?? "",
          helmetContext.helmet.link?.toString?.() ?? "",
          helmetContext.helmet.script?.toString?.() ?? "",
          helmetContext.helmet.noscript?.toString?.() ?? "",
          helmetContext.helmet.base?.toString?.() ?? "",
          helmetContext.helmet.style?.toString?.() ?? "",
        ].join("")
      : getHelmetHead(appHtml, start);

  return {
    head,
    html: appHtml.slice(start + marker.length, end),
  };
}