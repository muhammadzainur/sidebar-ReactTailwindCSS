import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useMatches, useActionData, useLoaderData, useParams, useRouteError, Meta, Links, ScrollRestoration, Scripts, Outlet, isRouteErrorResponse } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createElement, useState } from "react";
import { BsArrowLeftShort, BsSearch, BsChevronDown, BsFillImageFill, BsReverseLayoutTextSidebarReverse, BsFileEarmarkPerson } from "react-icons/bs";
import { AiFillEnvironment, AiOutlineFileText, AiOutlineBarChart, AiOutlineMail, AiOutlineSetting, AiOutlineLogout } from "react-icons/ai";
import { RiDashboardFill } from "react-icons/ri";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component, props);
  };
}
function withErrorBoundaryProps(ErrorBoundary3) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      error: useRouteError()
    };
    return createElement(ErrorBoundary3, props);
  };
}
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const Home = () => {
  const [open, setOpen] = useState(true);
  const [submenuOpen, setSubmenuOpen] = useState(null);
  const Menus = [{
    title: "Dashboard"
  }, {
    title: "Pages",
    icon: /* @__PURE__ */ jsx(AiOutlineFileText, {})
  }, {
    title: "Media",
    spacing: true,
    icon: /* @__PURE__ */ jsx(BsFillImageFill, {})
  }, {
    title: "Project",
    icon: /* @__PURE__ */ jsx(BsReverseLayoutTextSidebarReverse, {}),
    submenu: true,
    submenuItems: [{
      title: "Project 1"
    }, {
      title: "Project 2"
    }, {
      title: "Project 3"
    }]
  }, {
    title: "Analytics",
    icon: /* @__PURE__ */ jsx(AiOutlineBarChart, {})
  }, {
    title: "Inbox",
    icon: /* @__PURE__ */ jsx(AiOutlineMail, {})
  }, {
    title: "Profile",
    spacing: true,
    icon: /* @__PURE__ */ jsx(BsFileEarmarkPerson, {})
  }, {
    title: "Settings",
    icon: /* @__PURE__ */ jsx(AiOutlineSetting, {})
  }, {
    title: "Logout",
    icon: /* @__PURE__ */ jsx(AiOutlineLogout, {})
  }];
  return /* @__PURE__ */ jsxs("div", {
    className: "flex",
    children: [/* @__PURE__ */ jsxs("div", {
      className: `bg-dark-purple h-screen p-5 pt-8 ${open ? "w-72" : "w-20"} duration-300 relative`,
      children: [/* @__PURE__ */ jsx(BsArrowLeftShort, {
        className: `bg-white text-dark-purple text-3xl rounded-full absolute -right-3 
          top-9 border border-dark-purple cursor-pointer ${!open && "rotate-180"}`,
        onClick: () => setOpen(!open)
      }), /* @__PURE__ */ jsxs("div", {
        className: "inline-flex",
        children: [/* @__PURE__ */ jsx(AiFillEnvironment, {
          className: `bg-amber-300 text-4xl rounded cursor-pointer block float-left mr-2 ${open && "rotate-[360deg] duration-500"}`
        }), /* @__PURE__ */ jsx("h1", {
          className: `text-white origin-left font-medium text-2xl duration-300 ${!open && "scale-0"}`,
          children: "Tailwind"
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: `flex items-center rounded-md bg-light-white mt-6 ${!open ? "px-2.5" : "px-4"} py-2`,
        children: [/* @__PURE__ */ jsx(BsSearch, {
          className: `text-white text-lg block float-left cursor-pointer ${open && "mr-2"}`
        }), /* @__PURE__ */ jsx("input", {
          type: "search",
          placeholder: "Search",
          className: `text-base bg-transparent w-full text-white focus:outline-none ${!open && "hidden"}`
        })]
      }), /* @__PURE__ */ jsx("ul", {
        className: "pt-2",
        children: Menus.map((menu, index) => /* @__PURE__ */ jsxs(Fragment, {
          children: [/* @__PURE__ */ jsxs("li", {
            className: `text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md ${menu.spacing ? "mt-9" : "mt-2"}`,
            children: [/* @__PURE__ */ jsx("span", {
              className: "text-2xl block float-left",
              children: menu.icon ? menu.icon : /* @__PURE__ */ jsx(RiDashboardFill, {})
            }), /* @__PURE__ */ jsx("span", {
              className: `text-base font-medium flex-1 duration-200 ${!open && "hidden"}`,
              children: menu.title
            }), menu.submenu && open && /* @__PURE__ */ jsx(BsChevronDown, {
              className: `${submenuOpen === index && "rotate-180"}`,
              onClick: () => setSubmenuOpen(submenuOpen === index ? null : index)
            })]
          }, `menu-${index}`), menu.submenu && submenuOpen === index && open && /* @__PURE__ */ jsx("ul", {
            className: "ml-6 mt-2 space-y-1",
            children: menu.submenuItems.map((submenuItem, subIndex) => /* @__PURE__ */ jsx("li", {
              className: "text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md",
              children: submenuItem.title
            }, `submenu-${index}-${subIndex}`))
          })]
        }))
      })]
    }), /* @__PURE__ */ jsx("div", {
      className: "p-7 flex-1",
      children: /* @__PURE__ */ jsx("h1", {
        className: "text-2xl font-semibold",
        children: "Home Page"
      })
    })]
  });
};
const home = withComponentProps(Home);
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-F_MR5qf5.js", "imports": ["/assets/chunk-KNED5TY2-DDSDFUJj.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-BdhqnRKr.js", "imports": ["/assets/chunk-KNED5TY2-DDSDFUJj.js", "/assets/with-props-Bi3CUFkV.js"], "css": ["/assets/root-D0P9cEEX.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-BYsr_xXw.js", "imports": ["/assets/with-props-Bi3CUFkV.js", "/assets/chunk-KNED5TY2-DDSDFUJj.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-97b6c0ba.js", "version": "97b6c0ba", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routes,
  ssr
};
