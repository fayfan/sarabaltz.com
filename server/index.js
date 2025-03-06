import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useParams, useLoaderData, useActionData, useMatches, useRouteError, Meta, Links, ScrollRestoration, Scripts, Outlet, isRouteErrorResponse } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createElement, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
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
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Noto+Color+Emoji&display=swap"
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
function meta$3({}) {
  return [{
    title: "Sara Baltz - About"
  }, {
    name: "description",
    content: "Welcome to my website!"
  }, {
    property: "og:title",
    content: "Sara Baltz - Full-Stack Software Engineer"
  }, {
    property: "og:description",
    content: "I am a software engineer & former clinical researcher with a proven aptitude for teamwork & problem solving. I am eager to leverage my driven, detail-oriented mindset & passion for continuous learning to build robust & user-friendly applications, contribute to innovative teams, and deliver high-quality, impactful software solutions that enhance user experiences."
  }, {
    property: "og:url",
    content: "https://sarabaltz.com"
  }];
}
const navigation$3 = [{
  name: "About",
  href: "/"
}, {
  name: "Projects",
  href: "/projects"
}, {
  name: "Resume",
  href: "/resume"
}, {
  name: "Contact",
  href: "/contact"
}];
const timeline = [{
  name: "UT Dallas – Neuroscience, B.S.",
  date: "Aug 2016 – May 2020",
  dateTime: "2020-05"
}, {
  name: "Fort Bend Neurology – Medical Administrative Assistant",
  description: "Conducted a variety of patient care, coordination, & business tasks",
  date: "Aug 2020 – May 2021",
  dateTime: "2020-08"
}, {
  name: "UNT Health Science Center – Clinical Research Management, M.S.",
  description: "Thesis: Cost Analysis of Robotic Exoskeletons For Use in Inpatient Rehabilitation Post-Spinal Cord Injury (CARE4U In Rehab Post-SCI)",
  date: "Jun 2021 – May 2023",
  dateTime: "2021-06"
}, {
  name: "BSW Institute for Rehabilitation – Internship",
  description: "Completed in fulfillment of graduate degree requirements",
  date: "Jun 2022 – May 2023",
  dateTime: "2022-06"
}, {
  name: "BSW Institute for Rehabilitation – Clinical Research Coordinator 1",
  description: "Coordinated various clinical studies & maintained departmental databases",
  date: "Feb 2023 – Sept 2024",
  dateTime: "2023-02"
}, {
  name: "App Academy – Software Engineering Track (Full-Time)",
  date: "Sept 2024 – March 2025",
  dateTime: "2024-09"
}, {
  name: "On the hunt for a software engineering internship or job!",
  date: "March 2025 – current",
  dateTime: "2025-03"
}];
const footerNavigation$3 = {
  company: [{
    name: "About",
    href: "/#top"
  }, {
    name: "Projects",
    href: "/projects"
  }, {
    name: "Resume",
    href: "/resume"
  }, {
    name: "Contact",
    href: "/contact"
  }],
  social: [{
    name: "GitHub",
    href: "https://github.com/fayfan",
    icon: (props) => /* @__PURE__ */ jsx("svg", {
      fill: "currentColor",
      viewBox: "0 0 24 24",
      ...props,
      children: /* @__PURE__ */ jsx("path", {
        fillRule: "evenodd",
        d: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z",
        clipRule: "evenodd"
      })
    })
  }, {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/sarabaltz",
    icon: (props) => /* @__PURE__ */ jsx("svg", {
      fill: "currentColor",
      viewBox: "-147 100 512 600",
      ...props,
      children: /* @__PURE__ */ jsx("path", {
        fillRule: "evenodd",
        d: "M113,145c-141.4,0-256,114.6-256,256s114.6,256,256,256s256-114.6,256-256S254.4,145,113,145z M41.4,508.1H-8.5V348.4h49.9 V508.1z M15.1,328.4h-0.4c-18.1,0-29.8-12.2-29.8-27.7c0-15.8,12.1-27.7,30.5-27.7c18.4,0,29.7,11.9,30.1,27.7 C45.6,316.1,33.9,328.4,15.1,328.4z M241,508.1h-56.6v-82.6c0-21.6-8.8-36.4-28.3-36.4c-14.9,0-23.2,10-27,19.6 c-1.4,3.4-1.2,8.2-1.2,13.1v86.3H71.8c0,0,0.7-146.4,0-159.7h56.1v25.1c3.3-11,21.2-26.6,49.8-26.6c35.5,0,63.3,23,63.3,72.4V508.1z",
        clipRule: "evenodd"
      })
    })
  }, {
    name: "Wellfound",
    href: "https://wellfound.com/u/sarabaltz",
    icon: (props) => /* @__PURE__ */ jsx("svg", {
      fill: "currentColor",
      viewBox: "-18 -18 285 285",
      ...props,
      children: /* @__PURE__ */ jsx("path", {
        d: "M 125 0 A 125 125 0 0 0 0 125 A 125 125 0 0 0 125 250 A 125 125 0 0 0 250 125 A 125 125 0 0 0 125 0 z M 181.56445 92.4375 C 187.25676 92.314896 192.9634 97.078533 192.68555 103.15625 C 192.93375 111.50557 182.80876 116.87461 176.03906 112.01172 C 169.46113 107.9838 169.97906 97.141109 176.91797 93.767578 C 178.37785 92.888918 179.97061 92.471829 181.56445 92.4375 z M 57.304688 93.205078 L 75.677734 93.205078 L 87.333984 138.93359 L 99.998047 93.205078 L 118.42773 93.205078 L 131.08789 138.93359 L 142.73633 93.205078 L 161.11133 93.205078 L 141.14062 156.80469 L 121.55859 156.80469 C 117.44038 141.49957 113.32371 126.19548 109.2168 110.88477 L 96.619141 156.80469 L 77.048828 156.80469 L 77.037109 156.80469 L 57.304688 93.205078 z M 181.56445 136.14258 C 187.25676 136.0202 192.9634 140.78312 192.68555 146.86523 C 192.92878 155.21117 182.80716 160.5842 176.03906 155.7168 C 169.46113 151.68888 169.97906 140.84619 176.91797 137.47266 C 178.37785 136.594 179.97061 136.17684 181.56445 136.14258 z "
      })
    })
  }, {
    name: "Email",
    href: "mailto:sara@sarabaltz.com",
    icon: (props) => /* @__PURE__ */ jsx("svg", {
      fill: "currentColor",
      viewBox: "0 -1 20 22",
      ...props,
      children: /* @__PURE__ */ jsx("path", {
        fillRule: "evenodd",
        d: "M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6 9.6-4.298 9.6-9.6S15.302.4 10 .4zM6.231 7h7.52c.399 0 .193.512-.024.643-.217.13-3.22 1.947-3.333 2.014s-.257.1-.403.1a.793.793 0 0 1-.402-.1L6.255 7.643C6.038 7.512 5.833 7 6.231 7zM14 12.5c0 .21-.252.5-.444.5H6.444C6.252 13 6 12.71 6 12.5V8.853c0-.092-.002-.211.172-.11l3.417 2.015a.69.69 0 0 0 .402.1c.146 0 .252-.011.403-.1l3.434-2.014c.174-.102.172.018.172.11V12.5z",
        clipRule: "evenodd"
      })
    })
  }, {
    name: "Phone",
    href: "tel:+17655056148",
    icon: (props) => /* @__PURE__ */ jsx("svg", {
      fill: "currentColor",
      viewBox: "0 1 55 55",
      ...props,
      children: /* @__PURE__ */ jsx("path", {
        xmlns: "http://www.w3.org/2000/svg",
        d: "M 27.9999 51.9062 C 41.0546 51.9062 51.9063 41.0547 51.9063 28.0000 C 51.9063 14.9219 41.0312 4.0938 27.9765 4.0938 C 14.8983 4.0938 4.0937 14.9219 4.0937 28.0000 C 4.0937 41.0547 14.9218 51.9062 27.9999 51.9062 Z M 21.8827 33.8360 C 16.0702 28.0469 12.3671 20.6640 16.7499 16.2813 C 17.0077 16.0234 17.2890 15.7656 17.5468 15.5078 C 18.8827 14.2422 20.1718 14.3125 21.3202 15.9297 L 24.3671 20.2656 C 25.3983 21.7656 25.1405 22.6094 24.0390 23.7813 L 23.0780 24.8360 C 22.7265 25.1640 22.8671 25.6094 23.0312 25.8906 C 23.4765 26.7344 24.7421 28.2344 26.1014 29.5938 C 27.5077 31.0000 28.9374 32.1953 29.8280 32.6875 C 30.1562 32.875 30.6249 32.9219 30.9296 32.6406 L 31.9374 31.6797 C 33.0624 30.5781 33.9765 30.2969 35.4296 31.3281 C 37.4452 32.7578 38.6640 33.6016 39.8593 34.4219 C 41.3358 35.5000 41.6874 36.8360 40.1874 38.1953 C 39.9296 38.4531 39.6952 38.7344 39.4374 38.9922 C 35.0546 43.3516 27.6952 39.6484 21.8827 33.8360 Z"
      })
    })
  }]
};
const about = withComponentProps(function About() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return /* @__PURE__ */ jsxs("div", {
    className: "bg-white",
    children: [/* @__PURE__ */ jsxs("header", {
      className: "absolute inset-x-0 top-0 z-50",
      children: [/* @__PURE__ */ jsxs("nav", {
        "aria-label": "Global",
        className: "mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8",
        children: [/* @__PURE__ */ jsx("div", {
          className: "flex lg:flex-1",
          children: /* @__PURE__ */ jsxs("a", {
            href: "/",
            className: "-m-1.5 p-1.5",
            children: [/* @__PURE__ */ jsx("span", {
              className: "sr-only",
              children: "Sara Baltz"
            }), /* @__PURE__ */ jsx("img", {
              alt: "Logo",
              src: "../personal-logo.png",
              className: "h-8 w-auto"
            })]
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "flex lg:hidden",
          children: /* @__PURE__ */ jsxs("button", {
            type: "button",
            onClick: () => setMobileMenuOpen(true),
            className: "-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700",
            children: [/* @__PURE__ */ jsx("span", {
              className: "sr-only",
              children: "Open main menu"
            }), /* @__PURE__ */ jsx(Bars3Icon, {
              "aria-hidden": "true",
              className: "size-6 hover:text-blue-400 hover:cursor-pointer"
            })]
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "hidden lg:flex lg:gap-x-12",
          children: navigation$3.map((item) => /* @__PURE__ */ jsx("a", {
            href: item.href,
            className: "text-sm/6 font-semibold text-gray-900 hover:text-blue-300",
            children: item.name
          }, item.name))
        }), /* @__PURE__ */ jsx("div", {
          className: "hidden lg:flex lg:flex-1 lg:justify-end"
        })]
      }), /* @__PURE__ */ jsxs(Dialog, {
        open: mobileMenuOpen,
        onClose: setMobileMenuOpen,
        className: "lg:hidden",
        children: [/* @__PURE__ */ jsx("div", {
          className: "fixed inset-0 z-50"
        }), /* @__PURE__ */ jsxs(DialogPanel, {
          className: "fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "flex items-center justify-between",
            children: [/* @__PURE__ */ jsxs("a", {
              href: "/",
              className: "-m-1.5 p-1.5",
              children: [/* @__PURE__ */ jsx("span", {
                className: "sr-only",
                children: "Sara Baltz"
              }), /* @__PURE__ */ jsx("img", {
                alt: "Logo",
                src: "../personal-logo.png",
                className: "h-8 w-auto"
              })]
            }), /* @__PURE__ */ jsxs("button", {
              type: "button",
              onClick: () => setMobileMenuOpen(false),
              className: "-m-2.5 rounded-md p-2.5 text-gray-700",
              children: [/* @__PURE__ */ jsx("span", {
                className: "sr-only",
                children: "Close main menu"
              }), /* @__PURE__ */ jsx(XMarkIcon, {
                "aria-hidden": "true",
                className: "size-6 hover:text-blue-400 hover:cursor-pointer"
              })]
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: "mt-6 flow-root",
            children: /* @__PURE__ */ jsxs("div", {
              className: "-my-6 divide-y divide-gray-500/10",
              children: [/* @__PURE__ */ jsx("div", {
                className: "space-y-2 py-6",
                children: navigation$3.map((item) => /* @__PURE__ */ jsx("a", {
                  href: item.href,
                  className: "-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-blue-50",
                  children: item.name
                }, item.name))
              }), /* @__PURE__ */ jsx("div", {
                className: "py-6"
              })]
            })
          })]
        })]
      })]
    }), /* @__PURE__ */ jsxs("main", {
      className: "isolate",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "relative isolate -z-10 overflow-hidden bg-linear-to-b from-blue-100/20 pt-14",
        children: [/* @__PURE__ */ jsx("div", {
          "aria-hidden": "true",
          className: "absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white ring-1 shadow-xl shadow-blue-600/10 ring-blue-50 sm:-mr-80 lg:-mr-96"
        }), /* @__PURE__ */ jsx("div", {
          className: "mx-auto max-w-7xl px-6 py-24 sm:py-30 lg:px-8",
          children: /* @__PURE__ */ jsxs("div", {
            className: "mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8",
            children: [/* @__PURE__ */ jsx("h1", {
              style: {
                color: "cornflowerblue"
              },
              className: "max-w-2xl text-5xl font-semibold tracking-tight text-balance sm:text-7xl lg:col-span-2 xl:col-auto",
              children: "Hello! I'm Sara, a Full-Stack Software Engineer"
            }), /* @__PURE__ */ jsx("div", {
              className: "mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1",
              children: /* @__PURE__ */ jsx("p", {
                className: "text-lg font-medium text-pretty text-gray-500 sm:text-xl/8",
                children: "I am a software engineer & former clinical researcher with a proven aptitude for teamwork & problem solving. I am eager to leverage my driven, detail-oriented mindset & passion for continuous learning to build robust & user-friendly applications, contribute to innovative teams, and deliver high-quality, impactful software solutions that enhance user experiences."
              })
            }), /* @__PURE__ */ jsx("img", {
              alt: "",
              src: "../about-photo.jpg",
              className: "mt-10 aspect-5/6 w-full max-w-sm rounded-2xl object-cover sm:mt-6 lg:mt-0 lg:max-w-md xl:row-span-2 xl:row-end-2 xl:mt-36"
            })]
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "absolute inset-x-0 bottom-0 -z-10 h-24 bg-linear-to-t from-white sm:h-32"
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "mx-auto max-w-7xl px-6 lg:px-8",
        children: /* @__PURE__ */ jsx("div", {
          className: "mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4",
          children: timeline.map((item) => /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsxs("time", {
              dateTime: item.dateTime,
              className: "flex items-center text-sm/6 font-semibold",
              style: {
                color: "cornflowerblue"
              },
              children: [/* @__PURE__ */ jsx("svg", {
                viewBox: "0 0 4 4",
                "aria-hidden": "true",
                className: "mr-4 size-1 flex-none",
                children: /* @__PURE__ */ jsx("circle", {
                  r: 2,
                  cx: 2,
                  cy: 2,
                  fill: "currentColor"
                })
              }), item.date, /* @__PURE__ */ jsx("div", {
                "aria-hidden": "true",
                className: "absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0"
              })]
            }), /* @__PURE__ */ jsx("p", {
              className: "mt-6 text-lg/8 font-semibold tracking-tight text-gray-900",
              children: item.name
            }), /* @__PURE__ */ jsx("p", {
              className: "mt-1 text-base/7 text-gray-600",
              children: item.description
            })]
          }, item.name))
        })
      }), /* @__PURE__ */ jsx("div", {
        className: "flex justify-center mx-auto mt-30 max-w-7xl px-6 lg:px-8",
        children: /* @__PURE__ */ jsxs("div", {
          className: "flex justify-center items-center gap-x-4 overflow-clip",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "relative flex justify-end items-center gap-x-4",
            children: [/* @__PURE__ */ jsx("div", {
              className: "absolute left-0 top-0 h-full w-[33%] bg-gradient-to-r from-white to-transparent pointer-events-none"
            }), /* @__PURE__ */ jsx("img", {
              src: "../ryokanvas-screenshot-2.png",
              className: "object-cover h-30 rounded-md border-solid border-1 border-gray-200"
            }), /* @__PURE__ */ jsx("img", {
              src: "../arkbites-screenshot-1.png",
              className: "object-cover h-30 rounded-md"
            })]
          }), /* @__PURE__ */ jsx("h2", {
            className: "flex-shrink-0 text-blue-400 text-4xl font-semibold tracking-tight text-pretty sm:text-5xl lg:text-6xl",
            children: /* @__PURE__ */ jsx("a", {
              href: "/projects",
              className: "hover:text-blue-300",
              children: "Check out my projects!"
            })
          }), /* @__PURE__ */ jsxs("div", {
            className: "relative flex justify-start items-center gap-x-4",
            children: [/* @__PURE__ */ jsx("img", {
              src: "../ryokanvas-screenshot-1.png",
              className: "object-cover h-30 rounded-md border-solid border-1 border-gray-200"
            }), /* @__PURE__ */ jsx("img", {
              src: "../museic-screenshot-1.png",
              className: "object-cover h-30 rounded-md"
            }), /* @__PURE__ */ jsx("div", {
              className: "absolute right-0 top-0 h-full w-[33%] bg-gradient-to-l from-white to-transparent pointer-events-none"
            })]
          })]
        })
      }), /* @__PURE__ */ jsx("div", {
        className: "mx-auto mt-30 max-w-7xl sm:px-6 lg:px-8",
        children: /* @__PURE__ */ jsxs("div", {
          className: "relative isolate overflow-hidden bg-blue-200 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16",
          children: [/* @__PURE__ */ jsx("h2", {
            style: {
              color: "white"
            },
            className: "mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl",
            children: "Technical Skills"
          }), /* @__PURE__ */ jsxs("div", {
            className: "justify-items-center mx-auto mt-15 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 sm:gap-y-14 lg:max-w-4xl lg:grid-cols-5",
            children: [/* @__PURE__ */ jsx("a", {
              href: "https://nodejs.org",
              children: /* @__PURE__ */ jsx("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                fill: "white",
                x: "0px",
                y: "0px",
                width: "50",
                height: "50",
                viewBox: "0 0 16 16",
                children: /* @__PURE__ */ jsx("path", {
                  d: "M 8 1.0234375 C 7.736875 1.0234375 7.4742344 1.0924687 7.2402344 1.2304688 L 2.7402344 3.8789062 C 2.2832344 4.1469063 2 4.642875 2 5.171875 L 2 11.005859 C 2 11.554859 2.29925 12.059266 2.78125 12.322266 L 4.2558594 13.126953 C 4.4828594 13.250953 4.7286094 13.310547 4.9746094 13.310547 C 5.2386094 13.310547 5.4992812 13.239609 5.7382812 13.099609 C 6.1982812 12.826609 6.4726562 12.344594 6.4726562 11.808594 L 6.4726562 5.4648438 L 5.4726562 5.4648438 L 5.4726562 11.808594 C 5.4726562 12.065594 5.3025156 12.195281 5.2285156 12.238281 C 5.1555156 12.281281 4.959375 12.371047 4.734375 12.248047 L 3.2617188 11.445312 C 3.1007187 11.357312 3 11.188859 3 11.005859 L 3 5.171875 C 3 4.995875 3.0940938 4.8302344 3.2460938 4.7402344 L 7.7460938 2.0917969 C 7.9020937 1.9997969 8.0979062 2.0007969 8.2539062 2.0917969 L 12.753906 4.7402344 C 12.904906 4.8302344 13 4.995875 13 5.171875 L 13 11.009766 C 13 11.189766 12.900234 11.359219 12.740234 11.449219 L 8.2402344 13.900391 C 8.0902344 13.980391 7.9097656 13.980391 7.7597656 13.900391 L 6.8808594 13.419922 C 6.7108594 13.629922 6.5 13.810937 6.25 13.960938 C 6.17 14.010938 6.0897656 14.050078 6.0097656 14.080078 L 7.2792969 14.779297 C 7.5092969 14.899297 7.75 14.960938 8 14.960938 C 8.25 14.960938 8.4907031 14.899297 8.7207031 14.779297 L 13.220703 12.320312 C 13.700703 12.060313 14 11.559766 14 11.009766 L 14 5.171875 C 14 4.642875 13.717719 4.1469062 13.261719 3.8789062 L 8.7617188 1.2304688 C 8.5272187 1.0924688 8.263125 1.0234375 8 1.0234375 z M 9.4511719 5.3183594 C 7.8711719 5.3183594 7.0703125 5.8690781 7.0703125 6.9550781 C 7.0703125 8.1850781 8.4869687 8.3680781 9.1679688 8.4550781 C 9.2659688 8.4680781 9.352875 8.4791875 9.421875 8.4921875 L 9.7207031 8.5449219 C 10.760703 8.7189219 11 8.836875 11 9.171875 C 11 9.333875 10.999172 9.8242188 9.4511719 9.8242188 C 8.1381719 9.8242188 7.8691406 9.4346094 7.8691406 8.8496094 L 6.8691406 8.8496094 C 6.8691406 9.7516094 7.3171719 10.824219 9.4511719 10.824219 C 11.557172 10.824219 12 9.925875 12 9.171875 C 12 7.913875 10.777719 7.7076406 9.8867188 7.5566406 L 9.5996094 7.5078125 C 9.5166094 7.4928125 9.4119219 7.4788438 9.2949219 7.4648438 C 8.6589219 7.3828438 8.0703125 7.2650312 8.0703125 6.9570312 C 8.0703125 6.7340313 8.0691719 6.3193594 9.4511719 6.3183594 C 10.370172 6.3183594 10.837891 6.6207969 10.837891 7.2167969 L 11.837891 7.2167969 C 11.837891 6.2997969 11.209172 5.3183594 9.4511719 5.3183594 z"
                })
              })
            }), /* @__PURE__ */ jsx("a", {
              href: "https://www.python.org",
              children: /* @__PURE__ */ jsx("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                fill: "white",
                x: "0px",
                y: "0px",
                width: "50",
                height: "50",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx("path", {
                  d: "M 10 2 C 8.25 2 7 3.25 7 5 L 7 7 L 12 7 L 12 8 L 5 8 C 3.1875 8 2 9.28125 2 11 L 2 14 C 2 15.78125 3.1875 17 5 17 L 7 17 L 7 13 C 7 11.898438 7.898438 11 9 11 L 14 11 C 15.101563 11 16 10.101563 16 9 L 16 5 C 16 3.25 14.78125 2 13 2 Z M 9 4 C 9.550781 4 10 4.449219 10 5 C 10 5.550781 9.550781 6 9 6 C 8.449219 6 8 5.550781 8 5 C 8 4.449219 8.449219 4 9 4 Z M 17 6 L 17 10 C 17 11.101563 16.101563 12 15 12 L 10 12 C 8.898438 12 8 12.898438 8 14 L 8 18 C 8 19.75 9.21875 21 11 21 L 14 21 C 15.75 21 17 19.75 17 18 L 17 16 L 12 16 L 12 15 L 19 15 C 20.8125 15 22 13.71875 22 12 L 22 9 C 22 7.21875 20.8125 6 19 6 Z M 15 17 C 15.550781 17 16 17.449219 16 18 C 16 18.550781 15.550781 19 15 19 C 14.449219 19 14 18.550781 14 18 C 14 17.449219 14.449219 17 15 17 Z"
                })
              })
            }), /* @__PURE__ */ jsx("a", {
              href: "https://www.typescriptlang.org",
              children: /* @__PURE__ */ jsx("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                fill: "white",
                x: "0px",
                y: "0px",
                width: "50",
                height: "50",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx("path", {
                  d: "M3,5v14c0,1.105,0.895,2,2,2h14c1.105,0,2-0.895,2-2V5c0-1.105-0.895-2-2-2H5C3.895,3,3,3.895,3,5z M13.666,12.451h-2.118	V19H9.841v-6.549H7.767V11h5.899V12.451z M13.998,18.626v-1.751c0,0,0.956,0.721,2.104,0.721c1.148,0,1.103-0.75,1.103-0.853	c0-1.089-3.251-1.089-3.251-3.501c0-3.281,4.737-1.986,4.737-1.986l-0.059,1.559c0,0-0.794-0.53-1.692-0.53	c-0.897,0-1.221,0.427-1.221,0.883c0,1.177,3.281,1.059,3.281,3.428C19,20.244,13.998,18.626,13.998,18.626z"
                })
              })
            }), /* @__PURE__ */ jsx("a", {
              href: "https://react.dev",
              children: /* @__PURE__ */ jsx("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                fill: "white",
                x: "0px",
                y: "0px",
                width: "50",
                height: "50",
                viewBox: "0 0 30 30",
                children: /* @__PURE__ */ jsx("path", {
                  d: "M 10.679688 4.1816406 C 10.068687 4.1816406 9.502 4.3184219 9 4.6074219 C 7.4311297 5.5132122 6.8339651 7.7205462 7.1503906 10.46875 C 4.6127006 11.568833 3 13.188667 3 15 C 3 16.811333 4.6127006 18.431167 7.1503906 19.53125 C 6.8341285 22.279346 7.4311297 24.486788 9 25.392578 C 9.501 25.681578 10.067687 25.818359 10.679688 25.818359 C 11.982314 25.818359 13.48785 25.164589 15 24.042969 C 16.512282 25.164589 18.01964 25.818359 19.322266 25.818359 C 19.933266 25.818359 20.499953 25.681578 21.001953 25.392578 C 22.570814 24.486793 23.167976 22.279432 22.851562 19.53125 C 25.388297 18.431178 27 16.81094 27 15 C 27 13.188667 25.387299 11.568833 22.849609 10.46875 C 23.165872 7.7206538 22.56887 5.5132122 21 4.6074219 C 20.499 4.3174219 19.932312 4.1816406 19.320312 4.1816406 C 18.017686 4.1816406 16.51215 4.8354109 15 5.9570312 C 13.487763 4.8354109 11.981863 4.1816406 10.679688 4.1816406 z M 10.679688 5.9316406 C 11.461321 5.9316406 12.49496 6.3472486 13.617188 7.1171875 C 12.95737 7.7398717 12.311153 8.4479321 11.689453 9.2363281 C 10.681079 9.3809166 9.7303472 9.5916908 8.8496094 9.8554688 C 8.8448793 9.7943902 8.8336776 9.7303008 8.8300781 9.6699219 C 8.7230781 7.8899219 9.114 6.5630469 9.875 6.1230469 C 10.1 5.9930469 10.362688 5.9316406 10.679688 5.9316406 z M 19.320312 5.9316406 C 19.636312 5.9316406 19.9 5.9930469 20.125 6.1230469 C 20.886 6.5620469 21.276922 7.8899219 21.169922 9.6699219 C 21.166295 9.7303008 21.155145 9.7943902 21.150391 9.8554688 C 20.2691 9.5915252 19.317669 9.3809265 18.308594 9.2363281 C 17.686902 8.4480417 17.042616 7.7397993 16.382812 7.1171875 C 17.504962 6.3473772 18.539083 5.9316406 19.320312 5.9316406 z M 15 8.2285156 C 15.27108 8.4752506 15.540266 8.7360345 15.8125 9.0214844 C 15.542718 9.012422 15.274373 9 15 9 C 14.726286 9 14.458598 9.0124652 14.189453 9.0214844 C 14.461446 8.7363308 14.729174 8.4750167 15 8.2285156 z M 15 10.75 C 15.828688 10.75 16.614128 10.796321 17.359375 10.876953 C 17.813861 11.494697 18.261774 12.147811 18.681641 12.875 C 19.084074 13.572033 19.439938 14.285488 19.753906 15 C 19.439896 15.714942 19.084316 16.429502 18.681641 17.126953 C 18.263078 17.852044 17.816279 18.500949 17.363281 19.117188 C 16.591711 19.201607 15.800219 19.25 15 19.25 C 14.171312 19.25 13.385872 19.203679 12.640625 19.123047 C 12.186139 18.505303 11.738226 17.854142 11.318359 17.126953 C 10.915684 16.429502 10.560194 15.714942 10.246094 15 C 10.559972 14.285488 10.915926 13.572033 11.318359 12.875 C 11.737083 12.149909 12.183612 11.499051 12.636719 10.882812 C 13.408289 10.798393 14.199781 10.75 15 10.75 z M 19.746094 11.291016 C 20.142841 11.386804 20.524253 11.490209 20.882812 11.605469 C 20.801579 11.97252 20.702235 12.346608 20.589844 12.724609 C 20.461164 12.483141 20.336375 12.240903 20.197266 12 C 20.054139 11.752196 19.895244 11.529558 19.746094 11.291016 z M 10.251953 11.292969 C 10.103305 11.530776 9.9454023 11.752991 9.8027344 12 C 9.6636666 12.240944 9.5387971 12.483106 9.4101562 12.724609 C 9.29751 12.345829 9.1965499 11.971295 9.1152344 11.603516 C 9.4803698 11.48815 9.86083 11.385986 10.251953 11.292969 z M 7.46875 12.246094 C 7.6794464 13.135714 7.9717297 14.057918 8.3476562 14.998047 C 7.9725263 15.935943 7.6814729 16.856453 7.4707031 17.744141 C 5.7292327 16.903203 4.75 15.856373 4.75 15 C 4.75 14.121 5.701875 13.119266 7.296875 12.322266 C 7.3513169 12.295031 7.4131225 12.272692 7.46875 12.246094 z M 22.529297 12.255859 C 24.270767 13.096797 25.25 14.143627 25.25 15 C 25.25 15.879 24.298125 16.880734 22.703125 17.677734 C 22.648683 17.704969 22.586877 17.727308 22.53125 17.753906 C 22.32043 16.863764 22.030541 15.940699 21.654297 15 C 22.028977 14.062913 22.318703 13.142804 22.529297 12.255859 z M 15 13 C 13.895 13 13 13.895 13 15 C 13 16.105 13.895 17 15 17 C 16.105 17 17 16.105 17 15 C 17 13.895 16.105 13 15 13 z M 9.4101562 17.275391 C 9.5388794 17.516948 9.6655262 17.759008 9.8046875 18 C 9.9476585 18.247625 10.104915 18.470608 10.253906 18.708984 C 9.857159 18.613196 9.4757466 18.509791 9.1171875 18.394531 C 9.1984813 18.02725 9.2976676 17.653633 9.4101562 17.275391 z M 20.589844 17.277344 C 20.702364 17.655759 20.803517 18.02905 20.884766 18.396484 C 20.51963 18.51185 20.13917 18.614014 19.748047 18.707031 C 19.896695 18.469224 20.054598 18.247009 20.197266 18 C 20.336044 17.759557 20.461449 17.518344 20.589844 17.277344 z M 8.8496094 20.144531 C 9.7309004 20.408475 10.682331 20.619073 11.691406 20.763672 C 12.313288 21.552345 12.957085 22.261935 13.617188 22.884766 C 12.495042 23.654481 11.461272 24.070312 10.679688 24.070312 C 10.363687 24.070312 10.1 24.006953 9.875 23.876953 C 9.114 23.437953 8.7230781 22.112031 8.8300781 20.332031 C 8.8337424 20.271023 8.8447938 20.206253 8.8496094 20.144531 z M 21.150391 20.144531 C 21.155182 20.206253 21.166285 20.271023 21.169922 20.332031 C 21.276922 22.112031 20.886 23.436953 20.125 23.876953 C 19.9 24.006953 19.637312 24.070313 19.320312 24.070312 C 18.538728 24.070312 17.504958 23.654609 16.382812 22.884766 C 17.042964 22.261863 17.688542 21.552454 18.310547 20.763672 C 19.318921 20.619083 20.269653 20.408309 21.150391 20.144531 z M 14.1875 20.978516 C 14.457282 20.987578 14.725627 21 15 21 C 15.274373 21 15.542718 20.987578 15.8125 20.978516 C 15.540266 21.263964 15.27108 21.524765 15 21.771484 C 14.72892 21.524749 14.459734 21.263966 14.1875 20.978516 z"
                })
              })
            }), /* @__PURE__ */ jsx("a", {
              href: "https://html.spec.whatwg.org/multipage",
              children: /* @__PURE__ */ jsx("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                fill: "white",
                x: "0px",
                y: "0px",
                width: "50",
                height: "50",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx("path", {
                  d: "M 21 2 L 3 2 L 5 20 L 12 22 L 19 20 Z M 16.824219 8.082031 L 9.167969 8.082031 L 9.351563 10.261719 L 16.640625 10.261719 L 16.09375 16.699219 L 12 18.003906 L 11.960938 17.988281 L 7.914063 16.699219 L 7.691406 14.074219 L 9.675781 14.074219 L 9.761719 15.09375 L 12.023438 15.59375 L 14.242188 15.09375 L 14.480469 12.339844 L 7.542969 12.339844 L 7.007813 6 L 17.003906 6 Z"
                })
              })
            }), /* @__PURE__ */ jsx("a", {
              href: "https://www.w3.org/Style/CSS/Overview.en.html",
              children: /* @__PURE__ */ jsx("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                fill: "white",
                x: "0px",
                y: "0px",
                width: "50",
                height: "50",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx("path", {
                  d: "M 3 2 L 5 20 L 11.992188 22 L 19 20 L 21 2 Z M 16.726563 10.347656 L 16.34375 16.589844 L 12.027344 18 L 7.710938 16.589844 L 7.546875 13.605469 L 9.734375 13.605469 L 9.789063 14.960938 L 12.027344 15.722656 L 14.269531 14.960938 L 14.433594 12.519531 L 9.625 12.519531 L 9.515625 10.347656 L 14.539063 10.347656 L 14.703125 8.175781 L 7.164063 8.175781 L 7 6.007813 L 17 6.007813 Z"
                })
              })
            }), /* @__PURE__ */ jsx("a", {
              href: "https://tailwindcss.com",
              children: /* @__PURE__ */ jsx("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                fill: "white",
                x: "0px",
                y: "0px",
                width: "50",
                height: "50",
                viewBox: "0 0 48 48",
                children: /* @__PURE__ */ jsx("path", {
                  d: "M24,9.604c-6.4,0-10.4,3.199-12,9.597c2.4-3.199,5.2-4.398,8.4-3.599 c1.826,0.456,3.131,1.781,4.576,3.247C27.328,21.236,30.051,24,36,24c6.4,0,10.4-3.199,12-9.598c-2.4,3.199-5.2,4.399-8.4,3.6 c-1.825-0.456-3.13-1.781-4.575-3.247C32.672,12.367,29.948,9.604,24,9.604L24,9.604z M12,24c-6.4,0-10.4,3.199-12,9.598 c2.4-3.199,5.2-4.399,8.4-3.599c1.825,0.457,3.13,1.781,4.575,3.246c2.353,2.388,5.077,5.152,11.025,5.152 c6.4,0,10.4-3.199,12-9.598c-2.4,3.199-5.2,4.399-8.4,3.599c-1.826-0.456-3.131-1.781-4.576-3.246C20.672,26.764,17.949,24,12,24 L12,24z"
                })
              })
            }), /* @__PURE__ */ jsx("a", {
              href: "https://www.postgresql.org",
              children: /* @__PURE__ */ jsx("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                fill: "white",
                x: "0px",
                y: "0px",
                width: "50",
                height: "50",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx("path", {
                  d: "M 13 2 C 9.28125 2 8.316406 4.828125 7.992188 6.46875 C 8.4375 6.277344 9.535156 6 10 6 L 10.019531 6 C 11.164063 6.007813 11.519531 6.332031 11.75 7.390625 C 11.917969 8.167969 12.003906 9.378906 12 10 C 11.996094 11.359375 11.667969 12.296875 11.425781 12.925781 L 11.347656 13.128906 C 11.289063 13.296875 11.21875 13.453125 11.15625 13.597656 C 11.09375 13.75 11.039063 13.882813 11 14 C 11.242188 14.054688 11.433594 14.132813 11.5625 14.1875 L 11.636719 14.222656 C 11.660156 14.234375 11.683594 14.242188 11.703125 14.257813 C 12.128906 14.515625 12 15.109375 12 15.578125 C 12 15.96875 12.011719 17.523438 12 19.003906 C 12.042969 19.644531 12.207031 20.183594 12.347656 20.578125 C 12.554688 21.132813 13.019531 21.957031 14 22 C 14.773438 22.035156 15.890625 21.628906 16 20.003906 L 16 16.003906 C 16.074219 14.667969 17.605469 14.136719 18 13.84375 C 17.945313 13.769531 17.734375 13.117188 17.511719 12.769531 L 17.46875 12.6875 C 17.4375 12.609375 17.355469 12.46875 17.253906 12.28125 C 16.664063 11.210938 15.429688 8.464844 16.273438 7.058594 C 16.640625 6.441406 17 6.085938 18 6 C 17.59375 4.839844 16.46875 2.058594 13 2 Z M 6.4375 2 C 4.566406 2.070313 2 3.230469 2 7.011719 C 2 9.574219 3.742188 17 6.492188 17 C 6.617188 17 6.742188 16.957031 6.871094 16.890625 C 6.628906 16.679688 6.453125 16.40625 6.429688 16.046875 C 6.386719 15.320313 6.914063 14.808594 8.050781 14.519531 C 8.105469 14.511719 8.394531 14.425781 9.03125 14.066406 C 8.695313 13.921875 8.34375 13.726563 8.054688 13.425781 C 7.261719 12.597656 6.859375 11.4375 7.007813 10.394531 C 7.148438 9.378906 7.066406 8.382813 7.023438 7.851563 L 7.019531 7.800781 L 7.007813 7.625 L 6.984375 7.257813 L 7.015625 6.273438 C 7.339844 4.609375 8.019531 3.320313 9 2.429688 C 8.257813 2.1875 7.324219 1.96875 6.4375 2 Z M 16.933594 2.003906 C 16.742188 2.007813 16.5625 2.023438 16.386719 2.042969 C 17.390625 2.742188 18.3125 3.871094 18.941406 5.671875 L 18.984375 7.046875 C 18.988281 7.09375 18.996094 7.140625 19.003906 7.1875 C 19.035156 7.359375 19.074219 7.59375 19.042969 7.875 C 19.003906 8.195313 18.964844 8.523438 18.953125 8.851563 C 18.945313 9.175781 18.988281 9.492188 19.035156 9.828125 C 19.121094 10.425781 19.074219 11.03125 18.886719 11.679688 L 18.59375 12.6875 C 18.671875 12.859375 18.746094 13.035156 18.820313 13.21875 C 18.835938 13.265625 18.851563 13.300781 18.863281 13.332031 L 19.191406 13.785156 C 20.957031 12.230469 22 8.976563 22 5.625 C 22 4.976563 21.824219 4.476563 21.597656 4.1875 C 20.257813 2.472656 18.402344 1.980469 16.933594 2.003906 Z M 10 7 C 9.71875 7 8.75 7.230469 8.382813 7.386719 L 8.023438 7.539063 C 8.015625 7.546875 8.007813 7.554688 8.003906 7.5625 C 8.007813 7.617188 8.015625 7.683594 8.023438 7.765625 C 8.066406 8.339844 8.152344 9.40625 7.996094 10.535156 C 7.890625 11.277344 8.191406 12.121094 8.78125 12.734375 C 9.117188 13.085938 9.71875 13.316406 10.15625 13.414063 C 10.183594 13.34375 10.207031 13.285156 10.238281 13.207031 C 10.292969 13.074219 10.355469 12.933594 10.414063 12.777344 L 10.492188 12.566406 C 10.667969 12.109375 10.996094 11.253906 11 9.996094 C 11.003906 9.582031 10.957031 8.828125 10.871094 8.183594 C 10.859375 8.199219 10.851563 8.199219 10.84375 8.21875 C 10.695313 8.367188 10.464844 8.5 10.210938 8.460938 C 9.796875 8.394531 9.480469 7.890625 9.5 7.703125 C 9.523438 7.519531 9.878906 7.421875 10.292969 7.488281 C 10.433594 7.511719 10.566406 7.554688 10.675781 7.601563 C 10.714844 7.632813 10.746094 7.652344 10.78125 7.675781 C 10.777344 7.652344 10.777344 7.625 10.769531 7.601563 C 10.675781 7.160156 10.597656 7.078125 10.59375 7.074219 C 10.589844 7.070313 10.484375 7.003906 10 7 Z M 17.984375 7.011719 C 17.5 7.070313 17.363281 7.199219 17.1875 7.484375 C 17.527344 7.484375 17.773438 7.597656 17.800781 7.808594 C 17.828125 7.988281 17.675781 8.160156 17.609375 8.226563 C 17.46875 8.359375 17.292969 8.449219 17.117188 8.46875 C 17.085938 8.476563 17.054688 8.476563 17.019531 8.476563 C 17.011719 8.476563 17.007813 8.472656 17 8.472656 C 17.058594 9.296875 17.429688 10.410156 17.925781 11.402344 C 18.0625 10.925781 18.117188 10.460938 18.046875 9.96875 C 17.996094 9.605469 17.941406 9.230469 17.953125 8.820313 C 17.96875 8.449219 18.007813 8.101563 18.046875 7.761719 C 18.078125 7.5 17.976563 7.257813 17.984375 7.011719 Z M 20.179688 14.53125 C 20.101563 14.519531 19.992188 14.527344 19.859375 14.554688 C 19.230469 14.683594 18.8125 14.71875 18.503906 14.699219 C 18.394531 14.773438 18.28125 14.84375 18.140625 14.921875 C 17.578125 15.230469 17.078125 15.550781 17.011719 16 L 17.011719 16.582031 C 17.671875 16.613281 18.554688 16.203125 19.0625 15.96875 C 20.019531 15.527344 20.738281 14.605469 20.179688 14.53125 Z M 9.835938 14.761719 C 9.285156 15.089844 8.664063 15.414063 8.25 15.5 C 6.78125 15.890625 7.691406 16.347656 8.210938 16.398438 C 8.765625 16.535156 10.125 16.84375 11 16.128906 C 11 16.128906 11 16.128906 11 16.125 L 11 15.578125 C 11 15.472656 11.003906 15.367188 11.011719 15.253906 C 11.011719 15.195313 11.015625 15.117188 11.015625 15.046875 C 10.949219 15.019531 10.867188 14.996094 10.777344 14.972656 Z"
                })
              })
            }), /* @__PURE__ */ jsx("a", {
              href: "https://www.sqlite.org",
              children: /* @__PURE__ */ jsx("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                fill: "white",
                x: "0px",
                y: "0px",
                width: "50",
                height: "50",
                viewBox: "0 0 50 50",
                children: /* @__PURE__ */ jsx("path", {
                  d: "M 43.640625 1.0019531 C 42.177246 0.96137695 40.611719 1.7683594 39.058594 3.1464844 C 38.689594 3.4744844 38.321078 3.8385625 37.955078 4.2265625 C 33.705078 8.7355625 29.759203 17.086844 28.533203 23.464844 C 29.010203 24.432844 29.384859 25.669281 29.630859 26.613281 C 29.693859 26.855281 29.749922 27.081391 29.794922 27.275391 C 29.902922 27.733391 29.960938 28.029297 29.960938 28.029297 C 29.960938 28.029297 29.923578 27.885641 29.767578 27.431641 C 29.737578 27.344641 29.703062 27.250672 29.664062 27.138672 C 29.647063 27.092672 29.625609 27.036562 29.599609 26.976562 C 29.322609 26.331563 28.554797 24.970906 28.216797 24.378906 C 27.927797 25.230906 27.673937 26.027047 27.460938 26.748047 C 28.434938 28.531047 29.027344 31.585937 29.027344 31.585938 C 29.027344 31.585938 28.977422 31.388266 28.732422 30.697266 C 28.515422 30.086266 27.432781 28.188141 27.175781 27.744141 C 26.736781 29.364141 26.56175 30.458609 26.71875 30.724609 C 27.02375 31.240609 27.315313 32.129281 27.570312 33.113281 C 27.659312 33.454281 27.742266 33.806203 27.822266 34.158203 C 27.557266 36.485203 27.495047 38.822719 27.623047 41.136719 C 27.756047 43.644719 28.106906 46.1205 28.503906 48.5625 C 28.545906 48.8195 28.781922 49.005469 29.044922 48.980469 C 29.319922 48.954469 29.522094 48.710547 29.496094 48.435547 C 29.371094 47.104547 29.265266 45.777125 29.197266 44.453125 L 29.257812 45.046875 C 29.162813 43.857875 29.1365 42.577844 29.1875 41.214844 C 29.3685 36.380844 30.482109 30.550609 32.537109 24.474609 C 36.010109 15.302609 40.827328 7.9417344 45.236328 4.4277344 C 41.217328 8.0577344 35.778391 19.807203 34.150391 24.158203 C 32.327391 29.030203 31.034859 33.601422 30.255859 37.982422 C 31.599859 33.875422 35.943359 32.111328 35.943359 32.111328 C 35.943359 32.111328 38.075453 29.482516 40.564453 25.728516 C 39.073453 26.068516 36.622734 26.651094 35.802734 26.996094 C 34.592734 27.504094 34.267578 27.677734 34.267578 27.677734 C 34.267578 27.677734 38.186828 25.289984 41.548828 24.208984 C 46.173828 16.924984 51.212672 6.5767813 46.138672 2.0507812 C 45.359047 1.3555312 44.518652 1.0262988 43.640625 1.0019531 z M 9 3 C 6.79 3 5 4.79 5 7 L 5 40 C 5 42.21 6.79 44 9 44 L 25.849609 44 C 25.749609 43.1 25.680859 42.170234 25.630859 41.240234 C 25.500859 38.920234 25.550781 36.569297 25.800781 34.279297 C 25.740781 34.049297 25.690859 33.829141 25.630859 33.619141 C 25.290859 32.299141 25.06 31.850234 25 31.740234 C 24.55 30.990234 24.470234 30.080703 25.240234 27.220703 C 25.901234 24.955703 28.786375 11.163 36.359375 3 L 9 3 z"
                })
              })
            }), /* @__PURE__ */ jsx("a", {
              href: "https://expressjs.com",
              children: /* @__PURE__ */ jsxs("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                fill: "white",
                x: "0px",
                y: "0px",
                width: "50",
                height: "50",
                viewBox: "0 0 48 48",
                children: [/* @__PURE__ */ jsx("path", {
                  d: "M23.697,37.56h1.18c0.84,0,1.631-0.392,2.139-1.061l7.485-9.847l7.485,9.847	c0.508,0.668,1.299,1.061,2.139,1.061h1.18L35.756,25l9.121-12h-1.18c-0.84,0-1.631,0.392-2.139,1.061L34.5,23.347l-7.059-9.287	C26.933,13.392,26.142,13,25.302,13h-1.18l9.121,12L23.697,37.56z"
                }), /* @__PURE__ */ jsx("path", {
                  d: "M24,26v-3c0-6.675-5.945-11.961-12.829-10.852C5.812,13.011,2,17.857,2,23.284L2,24v2v0.142	c0,6.553,4.777,11.786,10.868,11.858c5.092,0.06,9.389-3.344,10.707-7.999h-1.028c-0.62,0-1.182,0.355-1.451,0.913	c-1.739,3.595-5.789,5.862-10.228,4.842C6.776,34.815,4,30.981,4,26.783V26H24z M4,23.71c0-4.708,2.804-8.557,6.924-9.478	C16.798,12.92,22,17.352,22,23v1H4V23.71z"
                })]
              })
            }), /* @__PURE__ */ jsx("a", {
              href: "https://redux.js.org",
              children: /* @__PURE__ */ jsx("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                fill: "white",
                x: "0px",
                y: "0px",
                width: "50",
                height: "50",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx("path", {
                  d: "M 11.5 2 C 8.416 2 6 5.5822969 6 10.154297 C 6 12.224297 6.5020781 14.081906 7.3300781 15.503906 C 7.2830781 15.662906 7.25 15.826 7.25 16 C 7.25 16.966 8.034 17.75 9 17.75 C 9.966 17.75 10.75 16.966 10.75 16 C 10.75 15.034 9.966 14.25 9 14.25 C 8.976 14.25 8.9536875 14.256813 8.9296875 14.257812 C 8.3596875 13.159813 8 11.719297 8 10.154297 C 8 6.8182969 9.603 4 11.5 4 C 12.786 4 13.934969 5.2969219 14.542969 7.1699219 C 15.285969 7.2889219 16.026672 7.4920937 16.763672 7.7460938 C 16.085672 4.3850938 14.016 2 11.5 2 z M 11.375 8.5 C 10.409 8.5 9.625 9.284 9.625 10.25 C 9.625 11.216 10.409 12 11.375 12 C 12.062 12 12.6505 11.601391 12.9375 11.025391 C 14.2305 11.083391 15.669344 11.458359 17.027344 12.193359 C 18.987344 13.255359 20.465813 14.885219 20.882812 16.449219 C 21.097812 17.252219 21.021156 17.957922 20.660156 18.544922 C 19.942156 19.712922 18.226531 20.180594 16.269531 19.933594 C 15.690531 20.524594 15.0295 21.067594 14.3125 21.558594 C 15.3125 21.850594 16.303328 22.001953 17.236328 22.001953 C 19.470328 22.001953 21.383281 21.18675 22.363281 19.59375 C 23.015281 18.53375 23.171453 17.268594 22.814453 15.933594 C 22.250453 13.826594 20.441516 11.769547 17.978516 10.435547 C 16.179516 9.4605469 14.307281 9.0066719 12.613281 9.0136719 C 12.296281 8.6956719 11.859 8.5 11.375 8.5 z M 4.0976562 11.742188 C 2.6376563 12.951187 1.5905 14.426594 1.1875 15.933594 C 0.8305 17.268594 0.98667187 18.533797 1.6386719 19.591797 C 2.6166719 21.184797 4.530625 22 6.765625 22 C 8.457625 22 10.333 21.536453 12.125 20.564453 C 13.835 19.638453 15.216656 18.361844 16.097656 16.964844 C 16.896656 16.802844 17.5 16.097 17.5 15.25 C 17.5 14.284 16.716 13.5 15.75 13.5 C 14.784 13.5 14 14.284 14 15.25 C 14 15.576 14.095953 15.878625 14.251953 16.140625 C 13.544953 17.155625 12.468828 18.105641 11.173828 18.806641 C 8.0548281 20.495641 4.4658438 20.374969 3.3398438 18.542969 C 2.9788438 17.955969 2.9041406 17.252219 3.1191406 16.449219 C 3.3371406 15.634219 3.8475469 14.801063 4.5605469 14.039062 C 4.3425469 13.314063 4.1876563 12.545187 4.0976562 11.742188 z"
                })
              })
            }), /* @__PURE__ */ jsx("a", {
              href: "https://sequelize.org",
              children: /* @__PURE__ */ jsx("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                fill: "white",
                width: "50px",
                height: "50px",
                viewBox: "-10 236 510 40",
                children: /* @__PURE__ */ jsx("path", {
                  d: "M221.7328491,0L0,128v256l222.2363892,128l220.7240601-127.49646V127.49646L221.7328491,0z M49.077301,358.4714355V156.6301422L221.6456604,55.0871696l173.2460938,98.8398438v202.9203949L222.2955627,458.9616699L49.077301,358.4714355z M137.5888519,308.3948669v71.8737793l-62.6321945-34.2255859v-74.098999L137.5888519,308.3948669z M148.9033813,197.4828033l55.2918701-32.2536011l-62.6322021-36.9630127l-55.675293,32.9417114L148.9033813,197.4828033z M223.7045898,175.1542511l-56.0150757,33.1427002l57.0129395,32.819458l55.5505981-32.5879517L223.7045898,175.1542511z M213.2172699,260.2302551l-56.1191406-32.3048706v66.7792358l56.1191406,30.6665649V260.2302551z M295.6186523,199.5144196l61.4734497-36.0625l-56.7225342-33.4744263l-61.6060791,36.4508057L295.6186523,199.5144196z M280.8619995,120.0524445l-62.6339111-36.9647217l-61.6060791,36.4508057l62.6339111,36.4508057L280.8619995,120.0524445z M74.9566574,180.6408386v67.1740112l62.6321945,34.2255859v-65.34552L74.9566574,180.6408386z M304.6950684,310.983429v72.0933838l63.3087158-37.5476685v-73.3600464L304.6950684,310.983429z M304.6950684,220.0362854v64.7205505l63.3087158-37.4541931v-64.4052124L304.6950684,220.0362854z M235.2179108,260.7937317v64.8900146l56.1191254-33.2043457v-64.6068726L235.2179108,260.7937317z M235.2179108,350.6167908v73.295166l56.1191254-33.2042847v-71.3599243L235.2179108,350.6167908z M213.2172699,350.4064636l-56.1191406-31.5726318v74.098999l56.1191406,30.6665039V350.4064636z"
                })
              })
            }), /* @__PURE__ */ jsx("a", {
              href: "https://flask.palletsprojects.com",
              children: /* @__PURE__ */ jsx("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                fill: "white",
                x: "0px",
                y: "0px",
                width: "50",
                height: "50",
                viewBox: "0 0 50 50",
                children: /* @__PURE__ */ jsx("path", {
                  d: "M 2.609375 14.628906 C 2.194125 14.663781 1.8316094 14.997641 2.3496094 15.556641 C 3.3446094 16.118641 1.3683125 16.532203 1.9453125 16.908203 C 2.1293125 17.304203 1.9305781 17.745406 1.3925781 17.816406 C 0.60457812 17.884406 0.67926562 18.960484 1.4472656 18.396484 C 2.3042656 18.124484 1.5954062 18.504031 1.1914062 18.582031 C 0.28440625 18.846031 -0.33364063 19.752078 0.19335938 20.580078 C 0.69735938 21.720078 0.83165625 22.991734 1.2226562 24.177734 C 1.8696563 26.001734 2.8149688 27.737328 4.0429688 29.236328 C 4.6259687 30.086328 5.4782969 30.690313 6.2792969 31.320312 C 7.0672969 31.831312 7.9447969 32.342516 8.8417969 32.603516 C 10.434797 33.186516 12.144359 33.241047 13.818359 33.373047 C 14.838359 33.371047 15.862141 33.299141 16.869141 33.119141 C 17.775141 33.217141 18.427094 32.442563 19.246094 32.851562 C 19.742094 32.411563 20.464938 32.603203 20.960938 32.283203 C 21.327938 31.035203 19.700547 32.035781 19.185547 31.425781 C 18.625547 32.083781 18.155562 31.353594 17.476562 31.558594 C 16.320563 31.616594 17.564156 31.040719 17.535156 30.511719 C 16.922156 30.041719 16.229891 31.157031 15.837891 31.457031 C 14.869891 31.282031 13.911437 31.006891 13.023438 30.587891 C 12.011437 30.060891 11.018156 29.433922 10.285156 28.544922 C 9.5181563 27.636922 8.6703125 26.718734 8.3203125 25.552734 C 7.5803125 23.627734 7.6284531 21.543484 7.4394531 19.521484 C 7.5094531 18.152484 8.9550781 19.668828 9.5800781 19.173828 C 9.3660781 18.463828 8.2257031 18.239078 7.5957031 17.955078 C 6.9877031 17.913078 6.7661406 17.368219 6.1191406 17.324219 C 6.1501406 16.564219 4.9303281 16.982406 4.4863281 16.441406 C 4.9233281 15.313406 3.0385469 16.468187 3.1855469 15.492188 C 3.4925469 14.857687 3.024625 14.594031 2.609375 14.628906 z M 2.6152344 14.724609 C 2.7137969 14.700016 2.8271562 14.719797 2.9414062 14.810547 C 3.4834062 15.540547 1.9445156 14.726828 2.4785156 15.423828 C 2.1537656 15.271578 2.3195469 14.798391 2.6152344 14.724609 z M 41.914062 15.085938 C 41.847063 15.085938 41.671672 15.177281 41.388672 15.363281 C 41.038672 15.589281 40.669203 15.767484 40.283203 15.896484 C 40.041203 15.979484 39.921875 16.095141 39.921875 16.244141 C 39.921875 16.347141 40.005781 16.427375 40.175781 16.484375 C 40.536781 16.603375 40.773719 16.767516 40.886719 16.978516 C 40.969719 17.143516 41.011719 17.436375 41.011719 17.859375 L 41.011719 24.615234 C 41.011719 25.207234 40.868938 25.539328 40.585938 25.611328 C 40.270937 25.693328 40.113281 25.814609 40.113281 25.974609 C 40.113281 26.041609 40.118906 26.094859 40.128906 26.130859 C 40.153906 26.233859 40.321859 26.272094 40.630859 26.246094 C 41.857859 26.148094 42.729141 26.123922 43.244141 26.169922 C 43.409141 26.185922 43.509828 26.178391 43.548828 26.150391 C 43.587828 26.122391 43.607422 26.048687 43.607422 25.929688 C 43.607422 25.779687 43.486141 25.689203 43.244141 25.658203 C 42.852141 25.617203 42.602141 25.560281 42.494141 25.488281 C 42.340141 25.385281 42.256094 25.169844 42.246094 24.839844 C 42.236094 24.509844 42.232422 24.257031 42.232422 24.082031 C 42.232422 23.835031 42.353703 23.643766 42.595703 23.509766 C 42.811703 23.354766 42.962781 23.277344 43.050781 23.277344 C 43.122781 23.277344 43.182516 23.320344 43.228516 23.402344 C 43.795516 24.361344 44.486781 25.278297 45.300781 26.154297 C 45.423781 26.283297 45.630922 26.318719 45.919922 26.261719 C 46.502922 26.215719 46.972984 26.190547 47.333984 26.185547 C 47.575984 26.175547 47.697266 26.078437 47.697266 25.898438 C 47.697266 25.754437 47.668328 25.665812 47.611328 25.632812 C 47.554328 25.599812 47.408875 25.582031 47.171875 25.582031 C 46.852875 25.582031 46.508578 25.425328 46.142578 25.111328 C 45.570578 24.612328 44.962359 23.871578 44.318359 22.892578 C 44.143359 22.619578 44.056641 22.447 44.056641 22.375 C 44.056641 22.329 44.076188 22.290766 44.117188 22.259766 C 44.673188 21.703766 45.1975 21.313797 45.6875 21.091797 C 46.0385 20.926797 46.411594 20.835313 46.808594 20.820312 C 47.061594 20.805312 47.1875 20.710156 47.1875 20.535156 C 47.1875 20.349156 47.107266 20.253047 46.947266 20.248047 C 46.458266 20.248047 45.965703 20.245234 45.470703 20.240234 C 44.759703 20.235234 44.218656 20.20825 43.847656 20.15625 C 43.682656 20.13025 43.591172 20.208672 43.576172 20.388672 C 43.566172 20.568672 43.652031 20.668453 43.832031 20.689453 C 44.249031 20.746453 44.457031 20.843422 44.457031 20.982422 C 44.457031 21.059422 44.395484 21.163969 44.271484 21.292969 C 43.647484 21.833969 43.123312 22.270469 42.695312 22.605469 C 42.535313 22.739469 42.416844 22.806641 42.339844 22.806641 C 42.267844 22.806641 42.230469 22.739469 42.230469 22.605469 L 42.216797 17.767578 C 42.216797 17.133578 42.219609 16.627953 42.224609 16.251953 C 42.229609 15.705953 42.232422 15.450328 42.232422 15.486328 C 42.232422 15.218328 42.125062 15.085938 41.914062 15.085938 z M 24.267578 15.140625 C 24.185578 15.140625 23.988688 15.231969 23.679688 15.417969 C 23.303688 15.654969 22.939844 15.830359 22.589844 15.943359 C 22.357844 16.020359 22.242188 16.137969 22.242188 16.292969 C 22.242187 16.395969 22.322422 16.47425 22.482422 16.53125 C 22.786422 16.63925 22.998141 16.792281 23.119141 16.988281 C 23.240141 17.184281 23.302734 17.491203 23.302734 17.908203 L 23.302734 24.902344 C 23.302734 25.324344 23.161859 25.579062 22.880859 25.664062 C 22.599859 25.749063 22.460938 25.852563 22.460938 25.976562 C 22.460938 26.115562 22.484203 26.201422 22.533203 26.232422 C 22.582203 26.262422 22.712828 26.267094 22.923828 26.246094 C 23.975828 26.158094 24.855406 26.149797 25.566406 26.216797 C 25.798406 26.241797 25.914062 26.151312 25.914062 25.945312 C 25.914062 25.796312 25.799406 25.708594 25.566406 25.683594 C 25.190406 25.637594 24.924531 25.542391 24.769531 25.400391 C 24.614531 25.258391 24.537109 25.030797 24.537109 24.716797 L 24.507812 17.814453 C 24.501812 17.320453 24.506484 16.816641 24.521484 16.306641 C 24.542484 15.770641 24.552734 15.512203 24.552734 15.533203 C 24.552734 15.270203 24.458578 15.140625 24.267578 15.140625 z M 13.988281 15.953125 C 13.931281 15.963125 13.891234 16.017234 13.865234 16.115234 C 13.814234 16.275234 13.891656 16.401141 14.097656 16.494141 C 14.426656 16.644141 14.652437 16.811141 14.773438 16.994141 C 14.894438 17.177141 14.955078 17.439297 14.955078 17.779297 L 14.955078 24.396484 C 14.955078 25.226484 14.702266 25.669563 14.197266 25.726562 C 13.976266 25.747563 13.865234 25.823031 13.865234 25.957031 C 13.865234 26.169031 13.975266 26.259516 14.197266 26.228516 C 14.990266 26.120516 15.99775 26.116844 17.21875 26.214844 C 17.64075 26.250844 17.867438 26.183672 17.898438 26.013672 C 17.929437 25.818672 17.818406 25.707641 17.566406 25.681641 C 17.072406 25.619641 16.750563 25.549656 16.601562 25.472656 C 16.410562 25.379656 16.314453 25.203312 16.314453 24.945312 L 16.314453 21.46875 C 16.314453 21.40275 16.360125 21.367188 16.453125 21.367188 C 17.272125 21.367187 17.865516 21.389594 18.228516 21.433594 C 18.591516 21.477594 18.840609 21.822797 18.974609 22.466797 C 19.011609 22.636797 19.100141 22.712266 19.244141 22.697266 C 19.419141 22.687266 19.505 22.616422 19.5 22.482422 C 19.448 21.359422 19.494672 20.447094 19.638672 19.746094 C 19.664672 19.622094 19.589063 19.541859 19.414062 19.505859 C 19.208063 19.459859 19.088734 19.540094 19.052734 19.746094 C 18.995734 20.123094 18.937906 20.355313 18.878906 20.445312 C 18.819906 20.535312 18.703203 20.590328 18.533203 20.611328 C 17.662203 20.668328 16.998062 20.700078 16.539062 20.705078 C 16.390062 20.710078 16.316406 20.654156 16.316406 20.535156 L 16.316406 17.033203 C 16.316406 16.914203 16.340578 16.836781 16.392578 16.800781 C 16.475578 16.743781 16.651922 16.716797 16.919922 16.716797 C 18.089922 16.716797 18.819281 16.739156 19.113281 16.785156 C 19.386281 16.821156 19.606484 16.928516 19.771484 17.103516 C 19.911484 17.252516 20.057891 17.514625 20.212891 17.890625 C 20.268891 18.029625 20.369672 18.099609 20.513672 18.099609 C 20.657672 18.099609 20.728516 18.019375 20.728516 17.859375 C 20.748516 17.045375 20.802625 16.466094 20.890625 16.121094 C 20.895625 16.100094 20.898391 16.080687 20.900391 16.054688 C 20.900391 15.977687 20.727812 15.94775 20.382812 15.96875 C 19.346812 16.03075 18.117313 16.0625 16.695312 16.0625 C 15.489312 16.0625 14.723437 16.036375 14.398438 15.984375 C 14.176438 15.948375 14.040281 15.938125 13.988281 15.953125 z M 3.7910156 16.136719 C 3.9290156 16.165969 3.9766563 16.248328 3.5976562 16.298828 L 3.4453125 16.291016 C 3.4253125 16.131516 3.6530156 16.107469 3.7910156 16.136719 z M 3.6386719 16.669922 C 3.9126719 16.789922 4.4744063 16.845484 4.5664062 17.146484 C 4.0054062 16.854484 4.6780313 17.498328 4.2070312 17.486328 C 3.9530312 17.489328 3.4826719 16.943922 3.6386719 16.669922 z M 3.4980469 17.123047 C 4.1330469 17.606047 3.1441875 17.122781 2.7421875 17.425781 C 2.1091875 17.489781 3.4360469 17.069047 3.4980469 17.123047 z M 5.1757812 17.412109 C 5.2568125 17.434484 5.2567969 17.511125 5.1230469 17.671875 C 5.6150469 18.259875 5.2334375 18.061531 4.8984375 17.644531 C 5.1924375 17.847531 4.9656719 18.724094 4.5136719 18.121094 C 4.1936719 17.525094 3.9910781 17.927937 4.3300781 18.335938 C 3.9970781 17.708938 3.033125 17.976797 2.328125 18.216797 C 1.873125 18.166797 3.5105 17.828047 3.6875 17.748047 C 3.96125 17.753297 4.9326875 17.344984 5.1757812 17.412109 z M 7.1484375 18.076172 C 7.3495469 18.073578 7.5478906 18.081156 7.7441406 18.097656 C 8.0591406 18.464656 7.5056875 19.085953 6.9296875 19.126953 C 6.2296875 19.388953 5.5171875 19.453063 4.8671875 19.539062 C 4.0331875 19.434063 3.4343125 20.184297 2.5703125 20.279297 C 2.8003125 19.853297 2.3813594 20.132328 1.9433594 20.111328 C 2.1663594 20.971328 0.40035938 19.882781 1.4433594 19.675781 C 0.66135938 19.397781 0.65042188 20.2195 0.73242188 20.6875 L 0.6796875 20.6875 C -0.0363125 19.7655 0.76001562 19.389484 1.6660156 19.271484 C 1.4940156 19.696484 1.9134062 19.833156 2.3164062 19.910156 C 2.9694063 19.730156 1.8868594 19.614359 2.3808594 19.443359 C 2.6518594 19.393359 1.5168906 19.171922 2.4628906 19.044922 C 3.4328906 18.881922 4.3055781 18.500781 5.2675781 18.300781 C 5.9185781 18.171781 6.5451094 18.083953 7.1484375 18.076172 z M 6.9335938 18.294922 C 6.8479687 18.268297 6.648875 18.321844 6.546875 18.589844 C 6.620875 18.758844 6.6575781 18.540422 6.6425781 18.482422 C 6.9920781 18.428922 7.0192188 18.321547 6.9335938 18.294922 z M 4.9160156 18.654297 C 4.6361406 18.641422 4.177625 18.701984 4.015625 18.896484 C 4.221625 18.990484 4.4481406 18.636375 4.7441406 18.859375 C 5.2966406 18.754375 5.1958906 18.667172 4.9160156 18.654297 z M 8.9121094 18.705078 C 9.052002 18.682236 9.4851562 18.843984 9.3320312 19.115234 C 9.2270312 19.145234 9.2449687 18.986937 9.1679688 18.960938 C 8.8507188 18.799312 8.8281738 18.718783 8.9121094 18.705078 z M 3.4863281 19.080078 C 3.4131875 19.08 3.3546563 19.113125 3.3476562 19.203125 L 3.4882812 19.332031 C 4.0500312 19.377781 3.70575 19.080313 3.4863281 19.080078 z M 3.171875 19.337891 C 3.0675937 19.322656 2.9709687 19.380422 2.9179688 19.576172 C 3.0159688 19.552172 3.171625 19.608688 3.265625 19.679688 C 3.858125 20.084688 3.4847187 19.383594 3.171875 19.337891 z M 6.9824219 19.433594 C 7.5024453 19.33182 7.3507187 20.677922 7.1835938 21.091797 C 7.4985937 20.876797 7.4379375 22.090969 7.3359375 22.542969 C 7.5079375 22.311969 7.5787188 22.91675 7.3867188 23.34375 C 7.4027188 23.27375 7.8028125 23.21275 7.5078125 23.71875 C 7.2828125 23.22275 7.1850781 24.727734 7.3300781 24.052734 C 7.7270781 23.414734 7.6231406 24.018781 7.7441406 24.300781 C 7.8221406 24.885781 8.0831094 25.425359 8.1621094 25.943359 C 8.5291094 26.313359 8.0058125 26.0625 8.0078125 26.5625 C 8.1268125 26.4175 8.612375 26.766156 8.609375 27.285156 C 8.649375 26.462156 8.6966563 27.092641 9.0976562 27.306641 C 9.4326562 27.846641 9.6835938 28.351875 10.183594 28.796875 C 10.573594 29.247875 10.159125 28.931031 10.328125 29.207031 C 10.742125 29.941031 11.70125 30.366594 12.53125 30.558594 C 12.89525 31.032594 13.441641 31.504062 14.181641 31.289062 C 13.555641 31.675063 15.944719 31.780047 15.136719 31.998047 C 14.716719 32.226047 14.318203 31.851094 13.908203 31.871094 C 13.338203 31.675094 12.437172 31.074422 11.826172 31.482422 C 10.981172 32.011422 12.259219 30.892578 11.574219 31.392578 C 10.880219 32.225578 11.102781 30.874297 10.425781 31.279297 C 10.386781 31.150297 9.824 31.114719 10.25 30.886719 C 9.868 30.862719 10.106141 30.838203 10.244141 30.533203 C 10.080141 30.499203 9.1685469 30.531422 8.8105469 30.232422 C 8.3885469 29.683422 8.8842188 29.906328 9.3242188 29.986328 C 8.6182188 30.110328 9.5670625 30.516016 10.039062 30.291016 C 9.8270625 30.201016 9.5844375 29.742797 9.0234375 29.341797 C 8.2394375 28.869797 7.59425 28.644578 6.78125 28.267578 C 5.90125 27.745578 6.9782031 28.082422 7.2832031 28.357422 C 8.1612031 28.744422 7.8156406 27.814266 7.3066406 27.572266 C 6.7486406 27.595266 6.6052031 26.954234 6.1582031 26.990234 C 6.8642031 27.103234 7.3543594 26.807656 6.5683594 26.097656 C 5.8213594 25.225656 6.8803125 26.755594 6.4453125 26.558594 C 6.2473125 26.297594 6.3956719 25.922109 5.7636719 25.787109 C 5.7566719 26.028109 5.6770625 26.401531 5.5390625 25.894531 C 5.3630625 25.924531 5.1615781 26.117703 5.0175781 25.595703 C 5.1535781 25.002703 4.4303594 24.867281 4.3183594 24.488281 C 4.9433594 24.887281 5.2262031 24.572719 4.7832031 24.136719 C 4.4782031 23.603719 4.435625 24.021703 4.265625 24.095703 C 3.652625 24.721703 4.2095 23.015812 3.9375 23.507812 C 3.6635 23.499813 3.8211719 23.809359 3.8261719 24.193359 C 2.9301719 23.971359 4.0437344 24.664875 4.3027344 25.046875 C 3.8937344 24.618875 3.9630938 25.367719 3.6210938 25.011719 C 3.5050937 24.696719 3.4889219 24.199328 2.9199219 24.111328 C 3.5669219 23.887328 2.5350938 23.432203 2.6210938 23.408203 C 2.9910937 23.071203 3.038375 22.608031 3.484375 23.332031 C 2.919375 23.286031 3.4684219 24.264656 3.6074219 23.972656 C 3.5854219 23.471656 3.838375 22.945844 2.984375 22.714844 C 2.733375 23.052844 2.3007344 22.052672 2.8027344 22.263672 C 2.7367344 21.599672 3.5813437 21.991125 3.5273438 21.703125 C 3.9633438 21.512125 2.9995312 20.895437 3.5195312 20.648438 C 3.9175312 20.890438 4.9498594 20.267641 4.2558594 20.181641 C 4.6898594 20.177641 5.0379844 20.367734 5.0839844 19.927734 C 5.4349844 20.003734 6.3844844 20.306078 5.5214844 19.830078 C 5.7974844 19.693078 6.3807969 19.577266 6.7167969 19.572266 C 6.8204219 19.491641 6.9081328 19.448133 6.9824219 19.433594 z M 36.621094 19.992188 C 35.957094 19.992188 35.426297 20.140453 35.029297 20.439453 C 34.601297 20.749453 34.388672 21.181281 34.388672 21.738281 C 34.388672 22.191281 34.525828 22.552312 34.798828 22.820312 C 35.050828 23.072312 35.552687 23.366172 36.304688 23.701172 C 36.824688 23.928172 37.175469 24.126875 37.355469 24.296875 C 37.520469 24.446875 37.603516 24.631516 37.603516 24.853516 C 37.603516 25.358516 37.240672 25.611328 36.513672 25.611328 C 35.652672 25.611328 35.028578 25.274609 34.642578 24.599609 C 34.554578 24.450609 34.448219 24.383437 34.324219 24.398438 C 34.200219 24.408438 34.138672 24.549266 34.138672 24.822266 C 34.138672 25.456266 34.160172 25.810813 34.201172 25.882812 C 34.268172 25.959812 34.510734 26.043719 34.927734 26.136719 C 35.411734 26.239719 35.896859 26.292969 36.380859 26.292969 C 37.107859 26.292969 37.681562 26.130594 38.101562 25.808594 C 38.521563 25.486594 38.730469 25.053812 38.730469 24.507812 C 38.730469 24.013813 38.576531 23.619266 38.269531 23.322266 C 38.032531 23.096266 37.583828 22.839641 36.923828 22.556641 C 36.294828 22.283641 35.896563 22.082125 35.726562 21.953125 C 35.535562 21.803125 35.439453 21.604563 35.439453 21.351562 C 35.439453 20.898562 35.792047 20.671875 36.498047 20.671875 C 37.122047 20.671875 37.637922 21.002969 38.044922 21.667969 C 38.101922 21.760969 38.214766 21.789906 38.384766 21.753906 C 38.543766 21.712906 38.616563 21.658797 38.601562 21.591797 C 38.472563 21.045797 38.386703 20.628844 38.345703 20.339844 C 38.329703 20.241844 38.136625 20.158797 37.765625 20.091797 C 37.420625 20.025797 37.038094 19.992188 36.621094 19.992188 z M 30.1875 20.023438 C 29.5795 20.023438 28.947109 20.197969 28.287109 20.542969 C 27.658109 20.872969 27.34375 21.161203 27.34375 21.408203 C 27.34375 21.804203 27.555516 21.982406 27.978516 21.941406 C 28.349516 21.910406 28.634031 21.695828 28.832031 21.298828 C 29.030031 20.901828 29.240891 20.703125 29.462891 20.703125 C 30.240891 20.703125 30.613031 21.127656 30.582031 21.972656 L 30.568359 22.466797 C 30.563359 22.682797 30.385156 22.825578 30.035156 22.892578 C 27.994156 23.279578 26.974609 23.917594 26.974609 24.808594 C 26.974609 25.277594 27.1285 25.648875 27.4375 25.921875 C 27.7205 26.168875 28.073094 26.292969 28.496094 26.292969 C 28.944094 26.292969 29.390984 26.187562 29.833984 25.976562 C 30.276984 25.765563 30.522359 25.658203 30.568359 25.658203 C 30.630359 25.658203 30.737578 25.757125 30.892578 25.953125 C 31.046578 26.149125 31.224781 26.246094 31.425781 26.246094 C 31.662781 26.246094 31.979047 26.136969 32.373047 25.917969 C 32.767047 25.698969 32.964844 25.535734 32.964844 25.427734 C 32.964844 25.226734 32.889281 25.126 32.738281 25.125 C 32.712281 25.125 32.620937 25.138063 32.460938 25.164062 C 32.300938 25.190062 32.193719 25.203125 32.136719 25.203125 C 31.848719 25.203125 31.705938 25.036172 31.710938 24.701172 L 31.742188 21.515625 C 31.752188 20.520625 31.2335 20.023438 30.1875 20.023438 z M 6.9257812 20.259766 C 6.7942969 20.297453 6.5887187 20.996344 6.7304688 21.246094 C 7.0424688 21.743094 7.3546563 20.024563 7.0976562 20.601562 C 6.9596562 21.336562 6.8185781 21.029422 7.0175781 20.482422 C 7.0055781 20.306672 6.9696094 20.247203 6.9257812 20.259766 z M 2.5351562 20.910156 C 2.5848594 20.907924 2.6721406 20.911906 2.8066406 20.925781 C 3.5006406 20.901781 3.2778125 21.310891 2.8828125 21.337891 C 2.8738125 21.363891 2.5209687 21.25325 2.6679688 21.15625 C 3.6199688 21.277 2.1872344 20.925783 2.5351562 20.910156 z M 4.2832031 21.152344 C 4.3410781 21.282094 4.4392344 21.526266 4.3652344 21.634766 C 4.5602344 21.827766 5.2264062 22.171219 4.6914062 21.699219 C 5.0324062 21.631219 4.6463594 21.523328 4.4433594 21.361328 C 4.2078594 21.007828 4.2253281 21.022594 4.2832031 21.152344 z M 2.0195312 21.169922 C 2.1770313 21.163797 2.3387031 21.244641 2.0332031 21.431641 C 1.7087031 21.269141 1.8620313 21.176047 2.0195312 21.169922 z M 6.4589844 21.625 C 6.448875 21.610625 6.4435781 21.623359 6.4550781 21.693359 C 6.5728281 21.957359 6.4893125 21.668125 6.4589844 21.625 z M 4.09375 21.888672 C 4.18575 22.021672 4.4347812 21.962797 4.5507812 22.091797 C 5.5987812 22.525797 4.45675 21.810672 4.09375 21.888672 z M 3.9296875 21.970703 C 3.8781301 21.982421 3.8873906 22.050922 4.0019531 22.208984 C 4.0739531 22.371984 4.2475781 22.385828 4.3925781 22.423828 C 5.5170781 22.942203 4.1531028 21.919925 3.9296875 21.970703 z M 1.9941406 22.058594 C 2.1650156 22.086469 2.3705312 22.178578 2.1445312 22.267578 L 2.0527344 22.232422 C 1.6872344 22.065922 1.8232656 22.030719 1.9941406 22.058594 z M 3.5839844 22.195312 C 3.5327813 22.197984 3.5767031 22.274828 3.8144531 22.486328 L 3.96875 22.644531 C 4.74875 22.858281 3.7375937 22.187297 3.5839844 22.195312 z M 3.4785156 22.404297 C 3.43825 22.403031 3.8000625 22.789953 3.6328125 22.783203 C 3.0538125 22.360203 3.2901875 22.659375 3.6171875 22.984375 C 3.9721875 23.511375 4.2655 22.670453 3.6875 22.564453 C 3.55 22.448953 3.4919375 22.404719 3.4785156 22.404297 z M 5.9355469 22.955078 C 5.9281875 22.979219 5.9269063 23.060781 5.9414062 23.238281 C 6.0381563 23.326031 5.957625 22.882656 5.9355469 22.955078 z M 6.4472656 23 C 6.3225312 23.00075 6.2288594 23.885063 6.5371094 24.070312 C 6.6641094 24.435312 6.7997031 24.285094 6.8457031 23.871094 C 6.5477031 23.877094 6.9683594 23.222562 6.5683594 23.351562 C 6.5333594 23.096812 6.4888438 22.99975 6.4472656 23 z M 7.3085938 23.019531 C 7.2862187 22.969906 7.2323906 23.078406 7.2128906 23.441406 L 7.2128906 23.544922 C 7.3208906 23.276422 7.3309688 23.069156 7.3085938 23.019531 z M 1.46875 23.048828 C 1.5477813 23.029797 1.99825 23.942109 1.9375 24.193359 C 1.6615 24.097359 1.674875 23.6655 1.546875 23.4375 C 1.458125 23.16525 1.4424062 23.055172 1.46875 23.048828 z M 4.7597656 23.09375 C 4.6867656 23.29675 4.9147344 23.962453 5.0527344 24.189453 C 5.4047344 24.730453 5.2468125 23.893594 5.6328125 24.433594 C 5.4208125 23.959594 5.7325 24.217625 5.6875 24.015625 C 5.5895 23.811625 4.6402656 22.731875 5.0722656 23.546875 C 5.4632656 24.518875 4.8267656 23.42475 4.7597656 23.09375 z M 1.2832031 23.251953 C 1.388877 23.320068 1.6721094 23.780859 1.7246094 24.037109 C 2.1696094 24.573109 1.9940781 24.868391 2.4550781 25.525391 C 1.8620781 25.151391 1.7500469 24.258641 1.3730469 23.681641 C 1.2189219 23.311516 1.2197988 23.211084 1.2832031 23.251953 z M 30.371094 23.373047 C 30.421969 23.376922 30.462141 23.389656 30.494141 23.410156 C 30.559141 23.451156 30.588984 23.535062 30.583984 23.664062 L 30.568359 24.933594 C 30.568359 25.093594 30.408844 25.23075 30.089844 25.34375 C 29.816844 25.44175 29.550969 25.490234 29.292969 25.490234 C 28.648969 25.490234 28.326172 25.194562 28.326172 24.601562 C 28.326172 24.013563 28.947453 23.608719 30.189453 23.386719 C 30.258953 23.373719 30.320219 23.369172 30.371094 23.373047 z M 4.5566406 24.931641 C 4.7951875 25.006508 4.6510156 25.786703 5.0097656 25.892578 C 5.8107656 26.937578 4.4549531 25.923266 4.0019531 25.822266 C 4.0599531 25.819266 3.5998281 25.691484 3.7988281 25.646484 C 3.6538281 25.497484 3.3293125 24.956359 4.0703125 25.318359 C 4.6593125 25.613359 4.7087344 25.414313 4.4277344 24.945312 C 4.4799844 24.923188 4.5225625 24.920945 4.5566406 24.931641 z M 1.8535156 25.083984 C 1.8733438 24.984234 2.2812187 25.640313 2.3554688 25.914062 C 2.5794687 26.627062 3.2805625 27.037766 3.3515625 27.509766 C 4.1285625 27.957766 3.7298125 28.688531 4.3828125 28.894531 C 4.6728125 28.747531 4.7013594 29.774547 5.3183594 29.560547 C 4.9753594 29.721547 5.4627656 29.911938 5.6347656 30.210938 C 6.0237656 30.157937 6.8763438 31.067906 6.0273438 30.753906 C 5.6693438 30.677906 5.424875 30.3055 5.171875 30.0625 C 4.420875 29.5855 3.9334844 28.787437 3.5214844 28.023438 C 2.9904844 27.220438 2.3512812 26.417516 1.9882812 25.478516 C 1.8817813 25.234766 1.8469062 25.117234 1.8535156 25.083984 z M 7.8203125 25.6875 C 7.7807266 25.707779 7.7786563 25.826438 7.8945312 26.085938 L 7.9628906 26.197266 C 8.0572656 25.890391 7.8862891 25.653701 7.8203125 25.6875 z M 5.1191406 26.605469 C 5.3401406 26.653594 5.6726406 26.772328 5.8066406 26.798828 C 5.8436406 26.957828 5.0491406 26.933141 5.7441406 27.244141 C 5.3391406 27.233141 5.2169219 27.202641 5.7949219 27.556641 C 5.5679219 27.738641 6.2525781 27.88325 6.0175781 28.15625 C 6.7145781 28.70025 5.89175 28.294266 5.59375 28.072266 C 5.41775 27.950266 4.7005 27.707828 4.8125 27.548828 C 5.6585 27.992828 5.0272969 27.529375 4.6542969 27.234375 C 5.3362969 27.401375 4.1078125 26.72925 4.7578125 26.90625 C 4.9508125 26.95325 4.4655625 26.508031 5.1015625 26.832031 C 4.7885625 26.579031 4.8981406 26.557344 5.1191406 26.605469 z M 9.3613281 28.310547 C 9.2741875 28.279797 9.3604375 28.617062 9.5546875 28.820312 C 9.9686875 29.313312 9.6537656 28.540422 9.5097656 28.482422 C 9.4397656 28.372172 9.390375 28.320797 9.3613281 28.310547 z M 5.7089844 28.794922 C 5.9394844 28.797422 6.3163281 28.901391 6.5488281 29.025391 C 7.5688281 29.252391 6.3318281 29.525891 5.9238281 29.212891 L 5.7519531 29.175781 C 5.3954531 28.892781 5.4784844 28.792422 5.7089844 28.794922 z M 6.9277344 28.902344 C 7.0125684 28.884238 7.398125 29.042813 7.5625 29.195312 C 8.0515 29.261313 8.0536719 29.484703 7.5136719 29.345703 C 7.4176719 29.286703 7.2628906 29.290016 7.2128906 29.166016 C 6.9346406 28.988266 6.876834 28.913207 6.9277344 28.902344 z M 7.578125 28.910156 C 7.732375 28.907531 7.9849531 28.951359 8.0644531 29.068359 C 9.1354531 29.240359 7.9966875 29.315203 7.6796875 29.033203 C 7.3681875 28.961703 7.423875 28.912781 7.578125 28.910156 z M 7.578125 29.513672 C 7.6939063 29.488078 8.45 29.800219 7.90625 29.730469 L 7.7480469 29.679688 C 7.5722969 29.569438 7.5395312 29.522203 7.578125 29.513672 z M 11.181641 29.695312 C 11.215391 29.707172 11.249688 29.738078 11.273438 29.798828 C 10.992188 29.794328 11.080391 29.659734 11.181641 29.695312 z M 7.5820312 29.988281 C 7.8017344 30.009516 8.6469375 30.471266 7.8984375 30.259766 L 7.7832031 30.214844 L 7.6523438 30.154297 C 7.5040938 30.022547 7.5087969 29.981203 7.5820312 29.988281 z M 9.4003906 31.205078 C 9.5019219 31.188906 10.335703 31.264563 9.6269531 31.257812 C 9.4137031 31.225313 9.3665469 31.210469 9.4003906 31.205078 z M 7.1835938 31.328125 C 7.243625 31.341541 7.3387656 31.370875 7.4785156 31.421875 C 8.3735156 31.974875 9.4053281 32.267359 10.361328 32.693359 C 11.201328 32.803359 12.087063 33.025656 12.914062 32.847656 C 13.604062 33.192656 14.319719 32.758313 15.011719 33.070312 C 13.482719 33.368312 11.909719 33.042078 10.386719 32.830078 C 9.4267187 32.709078 8.5693594 32.310641 7.6933594 31.931641 C 7.5663594 31.871641 7.4462187 31.796563 7.3242188 31.726562 C 6.7222187 31.392563 6.7968125 31.324344 7.3828125 31.652344 C 7.5898125 31.817344 9.058375 32.418484 8.359375 32.021484 C 8.095125 31.955859 6.763375 31.234213 7.1835938 31.328125 z M 12.75 31.59375 C 12.8185 31.63775 12.820859 31.781391 12.818359 31.962891 C 12.358359 32.470891 12.632656 31.75525 12.347656 32.03125 C 12.084656 32.24125 12.147063 31.906172 12.289062 31.826172 C 12.546563 31.605672 12.6815 31.54975 12.75 31.59375 z M 16.583984 31.755859 C 16.994609 31.791234 17.464328 31.886078 17.736328 31.892578 C 17.571328 32.239578 16.551516 31.920719 16.103516 32.011719 L 15.910156 32 L 15.791016 31.980469 C 15.822516 31.744469 16.173359 31.720484 16.583984 31.755859 z M 20.115234 31.867188 C 21.177234 31.866187 20.185266 32.021531 19.697266 32.019531 C 19.143266 31.889531 19.948234 31.893187 20.115234 31.867188 z M 13.71875 32.005859 C 13.80375 31.996234 13.832797 32.06325 13.591797 32.21875 L 13.503906 32.246094 C 13.491906 32.100094 13.63375 32.015484 13.71875 32.005859 z M 13.314453 32.068359 C 13.330078 32.092516 13.295156 32.161687 13.160156 32.304688 C 12.767156 32.330187 13.267578 31.995891 13.314453 32.068359 z M 9.4824219 32.177734 C 9.5783281 32.153641 10.611391 32.451578 10.744141 32.423828 C 11.797141 32.814828 10.115578 32.551031 9.7675781 32.332031 C 9.5233281 32.228781 9.4504531 32.185766 9.4824219 32.177734 z M 14.570312 32.228516 C 14.572594 32.25475 14.517781 32.316234 14.363281 32.427734 L 14.234375 32.511719 C 14.051375 32.384969 14.563469 32.149813 14.570312 32.228516 z"
                })
              })
            }), /* @__PURE__ */ jsx("a", {
              href: "https://www.sqlalchemy.org",
              children: /* @__PURE__ */ jsxs("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                fill: "white",
                width: "50",
                height: "50",
                viewBox: "0 0 128 128",
                children: [/* @__PURE__ */ jsx("path", {
                  d: "M15.676 69.912c-.671-.107-2.39-.537-3.813-.926L9.27 68.26l1.33-2.444 1.329-2.444-1.074-1.33c-1.518-1.88-3.478-6.002-3.491-7.33-.014-3.103 4.014-7.601 8.956-10.018 3.397-1.665 6.096-1.705 9.48-.12l2.551 1.194.739-1.06c.402-.578.738-1.343.738-1.679s.336-.631.739-.631.738.107.738.228c0 .296-2.967 7.788-3.155 7.976-.081.08-.887-.295-1.8-.832-2.578-1.518-5.814-2.525-8.325-2.592-5.841-.148-7.869 5.56-3.746 10.554l1.45 1.76 3.961-3.21c4.445-3.585 4.955-3.666 8.42-1.275 3.893 2.685 3.96 6.767.2 11.037-3.33 3.8-6.753 4.848-12.635 3.867zm9.964-4.095c1.933-1.517 1.799-4.324-.296-6.553-2.632-2.793-3.45-2.672-8.083 1.195-4.606 3.84-4.633 3.693.873 5.452 3.638 1.181 5.921 1.141 7.506-.094zM63.05 80.614c-1.317-.483-4.862-1.947-7.896-3.263-8.191-3.572-9.346-3.639-11.79-.671-.564.685-1.181 1.114-1.356.94-.524-.524 1.034-3.035 2.914-4.686 1.53-1.343 2.04-1.531 3.733-1.343 1.074.12 4.646 1.37 7.935 2.766 7.426 3.155 9.601 3.827 12.435 3.827 3.45 0 5.223-2.417 4.135-5.626-.268-.806-.188-1.075.35-1.075 1.006 0 1.517 3.76.792 5.922-.31.926-1.209 2.242-2.001 2.9-1.182.994-1.934 1.209-4.15 1.195-1.49-.013-3.786-.402-5.102-.886zm-19.135-11.48c-3.048-1.424-5.801-4.136-7.386-7.305-2.537-5.076-1.759-8.325 3.049-12.716 4.041-3.693 7.345-5.13 11.79-5.13 3.208 0 3.893.175 5.974 1.45 4.928 3.049 6.15 8.863 3.183 15.2-3.478 7.44-10.823 11.186-16.61 8.5zm10.205-3.532c2.282-1.128 3.854-6.338 3.209-10.662-.806-5.33-8.016-8.97-13.307-6.713-5.438 2.323-5.519 8.513-.174 14.085 3.732 3.908 6.942 4.928 10.272 3.29zM64.473 70.114c0-.229.845-.631 1.893-.887l1.893-.47.403-6.82c.443-7.547.12-14.973-.698-15.966-.296-.35-1.195-.78-2.014-.967-3.33-.739-1.115-1.249 5.344-1.249 6.459 0 8.513.47 5.438 1.249-2.645.658-2.659.698-2.659 11.467 0 5.975.215 10.474.524 11.051.43.806 1.074.98 3.545.98 5.102 0 6.861-1.208 8.245-5.68.416-1.342 1.49-1.1 1.114.256-.175.63-.456 2.55-.631 4.296l-.322 3.156H75.51c-6.07 0-11.037-.188-11.037-.416z"
                }), /* @__PURE__ */ jsx("path", {
                  d: "M89.542 69.791c0-.402.39-.805 1.034-1.114.86-.403 1.423-1.249 3.464-5.237 3.236-6.31 8.339-17.147 8.822-18.772.376-1.235.457-1.302 1.853-1.463.806-.094 1.477-.148 1.49-.121.014.027 1.129 2.47 2.485 5.438 1.343 2.967 4.042 8.607 6.002 12.528 3.277 6.593 3.64 7.184 4.74 7.72.672.323 1.195.82 1.195 1.115 0 .47-.577.524-5.545.524-4.982 0-5.546-.054-5.546-.537 0-.322.43-.671 1.114-.9.632-.201 1.115-.577 1.115-.859 0-.269-.658-2.041-1.464-3.934l-1.463-3.451H97.746l-1.06 2.336c-1.988 4.378-2.028 5.412-.175 5.908.927.255 1.182.457 1.074.873-.12.484-.604.55-4.095.55-3.747.028-3.948 0-3.948-.604zm18.181-10.863c.188-.335-3.988-9.453-4.377-9.547-.282-.08-4.606 8.836-4.606 9.507 0 .336 8.782.376 8.983.04z"
                })]
              })
            }), /* @__PURE__ */ jsx("a", {
              href: "https://www.postman.com",
              children: /* @__PURE__ */ jsx("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                fill: "white",
                x: "0px",
                y: "0px",
                width: "50",
                height: "50",
                viewBox: "0 0 64 64",
                children: /* @__PURE__ */ jsx("path", {
                  d: "M 31.880859 3 C 27.661475 3.013642 23.379516 3.9528594 19.330078 5.9199219 C 12.416078 9.2789219 7.1204219 15.247719 4.6074219 22.511719 C -0.63657812 37.637719 7.3749531 54.149578 22.501953 59.392578 C 37.628953 64.635578 54.140766 56.624047 59.384766 41.498047 C 61.928766 34.228047 61.453453 26.240266 58.064453 19.322266 C 53.036797 8.9744219 42.663731 2.9651371 31.880859 3 z M 31.533203 4.9863281 C 34.613636 4.9329984 37.755719 5.4107969 40.835938 6.4785156 C 47.596938 8.8225156 53.151391 13.755359 56.275391 20.193359 C 59.400391 26.631359 59.837141 34.048547 57.494141 40.810547 C 52.613141 54.890547 37.243109 62.34875 23.162109 57.46875 C 9.0811094 52.58875 1.6239062 37.217719 6.5039062 23.136719 C 10.316406 12.135938 20.531658 5.1767914 31.533203 4.9863281 z M 31.638672 8.3183594 C 30.803672 8.3063594 29.968719 8.3399688 29.136719 8.4179688 C 28.584719 8.4359688 28.152875 8.8982188 28.171875 9.4492188 C 28.189875 10.001219 28.652125 10.433063 29.203125 10.414062 C 29.244125 10.413063 29.287125 10.409344 29.328125 10.402344 C 30.080125 10.324344 30.834844 10.286063 31.589844 10.289062 C 32.136844 10.213062 32.517406 9.7081094 32.441406 9.1621094 C 32.382406 8.7381094 32.059672 8.3983594 31.638672 8.3183594 z M 25.052734 9.2421875 C 24.923656 9.2280156 24.7885 9.2397969 24.65625 9.2792969 C 17.61925 11.420297 12.025656 16.787469 9.5976562 23.730469 C 9.4016563 24.246469 9.6617344 24.823531 10.177734 25.019531 C 10.693734 25.215531 11.270797 24.957406 11.466797 24.441406 C 11.473797 24.424406 11.479375 24.406672 11.484375 24.388672 L 11.449219 24.423828 C 13.664219 18.065828 18.787469 13.147359 25.230469 11.193359 C 25.759469 11.035359 26.058391 10.478219 25.900391 9.9492188 C 25.781891 9.5524687 25.439969 9.2847031 25.052734 9.2421875 z M 44.9375 14.75 C 42.5555 14.75 40.626953 16.6805 40.626953 19.0625 C 40.626953 21.4445 42.5565 23.376953 44.9375 23.376953 C 45.5515 23.376953 46.133109 23.243719 46.662109 23.011719 L 43.498047 19.742188 C 43.432047 19.674187 43.396391 19.581328 43.400391 19.486328 C 43.403391 19.391328 43.446578 19.301281 43.517578 19.238281 L 47.535156 15.640625 C 46.811156 15.089625 45.9175 14.75 44.9375 14.75 z M 48.0625 16.105469 L 44.253906 19.517578 L 47.298828 22.664062 C 48.471828 21.893062 49.248047 20.5715 49.248047 19.0625 C 49.248047 17.9145 48.7935 16.878469 48.0625 16.105469 z M 47.982422 18.152344 C 48.117234 18.144234 48.249953 18.21475 48.314453 18.34375 C 48.332453 18.38075 48.7595 19.26225 48.1875 20.40625 C 48.1265 20.52925 48.003 20.599609 47.875 20.599609 C 47.823 20.599609 47.76875 20.5875 47.71875 20.5625 C 47.54575 20.4765 47.4755 20.26775 47.5625 20.09375 C 47.9715 19.27675 47.6985 18.677344 47.6875 18.652344 C 47.6055 18.479344 47.677609 18.2715 47.849609 18.1875 C 47.892609 18.16675 47.937484 18.155047 47.982422 18.152344 z M 39.408203 21.658203 C 38.765203 21.685953 38.0355 21.842 37.25 22.125 C 34.125 23.25 30.375 27.375 30.375 27.375 L 27.367188 30.863281 L 29.835938 33.289062 L 41.044922 21.962891 C 40.607422 21.731891 40.051203 21.630453 39.408203 21.658203 z M 41.601562 22.396484 L 30.333984 33.78125 L 31.789062 35.212891 L 40.25 26.630859 C 40.275 26.606859 42.099766 24.806031 42.009766 23.207031 C 41.926766 22.890031 41.791562 22.615484 41.601562 22.396484 z M 41.771484 25.876953 C 41.285484 26.589953 40.785188 27.085953 40.742188 27.126953 L 32.287109 35.701172 L 33.410156 36.806641 C 33.524156 36.702641 33.634047 36.606 33.748047 36.5 C 39.841047 30.85 41.123484 28.439953 41.771484 25.876953 z M 26.908203 31.394531 L 24.125 34.625 L 29.228516 33.675781 L 26.908203 31.394531 z M 29.720703 34.158203 L 27.962891 35.978516 L 31.083984 35.498047 L 29.720703 34.158203 z M 31.705078 36.111328 L 27.160156 36.810547 L 18.828125 45.433594 L 22.324219 48.871094 L 22.5 48.875 L 21.625 45.25 C 21.625 45.25 26.445578 43.060391 32.892578 37.275391 L 31.705078 36.111328 z M 51.742188 37.121094 C 51.358984 37.191078 51.037266 37.482469 50.947266 37.886719 C 50.834266 38.393719 51.127047 38.903594 51.623047 39.058594 L 53.552734 39.574219 C 54.091734 39.694219 54.626094 39.355406 54.746094 38.816406 C 54.859094 38.309406 54.564359 37.799531 54.068359 37.644531 L 52.140625 37.128906 C 52.005875 37.098906 51.869922 37.097766 51.742188 37.121094 z M 50.042969 41.828125 C 49.654844 41.794 49.265766 41.990219 49.072266 42.355469 C 48.826266 42.819469 48.981734 43.394875 49.427734 43.671875 L 51.158203 44.667969 C 51.640203 44.942969 52.254297 44.774969 52.529297 44.292969 C 52.804297 43.810969 52.636297 43.196875 52.154297 42.921875 L 50.423828 41.941406 C 50.301828 41.876656 50.172344 41.8395 50.042969 41.828125 z M 46.832031 45.832031 C 46.576406 45.832031 46.322453 45.93 46.126953 46.125 C 45.736953 46.515 45.736953 47.147109 46.126953 47.537109 L 47.539062 48.951172 C 47.929063 49.341172 48.561172 49.341172 48.951172 48.951172 C 49.341172 48.561172 49.341172 47.927109 48.951172 47.537109 L 47.539062 46.125 C 47.344063 45.93 47.087656 45.832031 46.832031 45.832031 z M 18.341797 45.9375 L 15.625 48.75 L 21.308594 48.853516 L 18.341797 45.9375 z M 42.669922 48.9375 C 42.541453 48.953781 42.415875 48.995453 42.296875 49.064453 C 41.821875 49.342453 41.659547 49.953688 41.935547 50.429688 L 42.925781 52.152344 C 43.184781 52.640344 43.788391 52.825406 44.275391 52.566406 C 44.763391 52.307406 44.948453 51.703797 44.689453 51.216797 C 44.678453 51.196797 44.66825 51.17525 44.65625 51.15625 L 43.660156 49.425781 C 43.451656 49.068781 43.055328 48.888656 42.669922 48.9375 z M 38.236328 50.886719 C 38.107875 50.867922 37.975297 50.873453 37.841797 50.908203 C 37.839797 50.909203 37.838891 50.908203 37.837891 50.908203 C 37.304891 51.050203 36.985906 51.599813 37.128906 52.132812 C 37.129906 52.134813 37.129859 52.135672 37.130859 52.138672 L 37.646484 54.068359 C 37.811484 54.595359 38.372437 54.887656 38.898438 54.722656 C 39.394438 54.567656 39.689172 54.059734 39.576172 53.552734 L 39.060547 51.623047 C 38.956297 51.222547 38.621688 50.943109 38.236328 50.886719 z"
                })
              })
            }), /* @__PURE__ */ jsx("a", {
              href: "https://www.gnu.org/software/bash",
              children: /* @__PURE__ */ jsx("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                fill: "white",
                x: "0px",
                y: "0px",
                width: "50",
                height: "50",
                viewBox: "0 0 16 16",
                children: /* @__PURE__ */ jsx("path", {
                  d: "M 8 0.7265625 C 7.74 0.7265625 7.48 0.7946875 7.25 0.9296875 L 2.25 3.8105469 C 1.79 4.0805469 1.5 4.579375 1.5 5.109375 L 1.5 10.890625 C 1.5 10.960625 1.5097656 11.039375 1.5097656 11.109375 C 1.5797656 11.549375 1.85 11.959453 2.25 12.189453 L 7.25 15.070312 C 7.48 15.210313 7.74 15.269531 8 15.269531 C 8.26 15.269531 8.52 15.210313 8.75 15.070312 L 13.070312 12.580078 L 13.089844 12.570312 L 13.75 12.189453 C 14.21 11.919453 14.5 11.420625 14.5 10.890625 L 14.5 5.109375 C 14.5 4.579375 14.21 4.0805469 13.75 3.8105469 L 8.75 0.9296875 C 8.52 0.7946875 8.26 0.7265625 8 0.7265625 z M 8 1.7304688 C 8.09 1.7304688 8.17 1.7490625 8.25 1.7890625 L 12.980469 4.5195312 L 13.25 4.6796875 C 13.263965 4.6880668 13.270145 4.7051422 13.283203 4.7148438 L 8.9667969 6.9824219 C 7.8827969 7.5904219 7.9882812 8.3404687 7.9882812 9.2304688 L 8.0019531 14.001953 C 8.0019531 14.150244 8.0062291 14.165045 8.0078125 14.267578 C 7.9175813 14.268872 7.8273519 14.252192 7.75 14.210938 L 2.75 11.320312 C 2.6 11.230313 2.5 11.060625 2.5 10.890625 L 2.5 5.109375 C 2.5 4.939375 2.6 4.7696875 2.75 4.6796875 L 3.0292969 4.5195312 L 7.75 1.7890625 C 7.83 1.7490625 7.91 1.7304688 8 1.7304688 z M 9.5195312 8.0996094 C 9.5495312 8.0796094 9.5898438 8.1001563 9.5898438 8.1601562 L 9.5898438 8.5703125 C 9.7698437 8.5003125 9.9207813 8.4795313 10.050781 8.5195312 C 10.080781 8.5195312 10.099844 8.559375 10.089844 8.609375 L 9.9902344 8.9804688 C 9.9902344 9.0104687 9.9692187 9.0405469 9.9492188 9.0605469 C 9.9392188 9.0605469 9.9396875 9.0703125 9.9296875 9.0703125 C 9.9196875 9.0803125 9.900625 9.0800781 9.890625 9.0800781 C 9.830625 9.0700781 9.6792188 9.0303906 9.4492188 9.1503906 C 9.1992188 9.2803906 9.109375 9.4903906 9.109375 9.6503906 C 9.119375 9.8403906 9.2107813 9.9003906 9.5507812 9.9003906 C 10.000781 9.9103906 10.189453 10.100781 10.189453 10.550781 C 10.199453 11.000781 9.9596094 11.469766 9.5996094 11.759766 L 9.609375 12.060547 L 9.609375 12.179688 C 9.609375 12.229688 9.5790625 12.280781 9.5390625 12.300781 L 9.2890625 12.439453 C 9.2590625 12.459453 9.2207031 12.440625 9.2207031 12.390625 L 9.2207031 11.980469 C 9.0107031 12.070469 8.8001562 12.089063 8.6601562 12.039062 C 8.6401563 12.029063 8.630625 11.989219 8.640625 11.949219 L 8.7207031 11.570312 C 8.7307031 11.540313 8.7495313 11.510234 8.7695312 11.490234 C 8.7695312 11.490234 8.7790625 11.480469 8.7890625 11.480469 C 8.7990625 11.470469 8.8200781 11.470703 8.8300781 11.470703 C 8.9800781 11.520703 9.1598437 11.500156 9.3398438 11.410156 C 9.5698438 11.290156 9.7207031 11.060078 9.7207031 10.830078 C 9.7207031 10.620078 9.6000781 10.529297 9.3300781 10.529297 C 8.9800781 10.529297 8.650625 10.459219 8.640625 9.9492188 C 8.640625 9.5192188 8.8609375 9.0807813 9.2109375 8.8007812 L 9.2109375 8.3808594 C 9.2109375 8.3308594 9.2392969 8.27 9.2792969 8.25 L 9.5195312 8.0996094 z M 12 11 L 12 11.5 L 11 12 L 11 11.5 L 12 11 z"
                })
              })
            }), /* @__PURE__ */ jsx("a", {
              href: "https://git-scm.com",
              children: /* @__PURE__ */ jsx("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                fill: "white",
                x: "0px",
                y: "0px",
                width: "50",
                height: "50",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx("path", {
                  d: "M 20.292969 11.792969 L 12.207031 3.707031 C 11.816406 3.316406 11.183594 3.316406 10.792969 3.707031 L 9.101563 5.394531 L 10.855469 7.148438 C 11.050781 7.058594 11.269531 7 11.5 7 C 12.328125 7 13 7.671875 13 8.5 C 13 8.730469 12.941406 8.945313 12.847656 9.144531 L 14.855469 11.148438 C 15.050781 11.058594 15.269531 11 15.5 11 C 16.328125 11 17 11.671875 17 12.5 C 17 13.328125 16.328125 14 15.5 14 C 14.671875 14 14 13.328125 14 12.5 C 14 12.269531 14.054688 12.054688 14.148438 11.855469 L 12.140625 9.851563 C 12.097656 9.871094 12.046875 9.890625 12 9.90625 L 12 15.09375 C 12.578125 15.300781 13 15.847656 13 16.5 C 13 17.328125 12.328125 18 11.5 18 C 10.671875 18 10 17.328125 10 16.5 C 10 15.847656 10.417969 15.296875 11 15.09375 L 11 9.90625 C 10.417969 9.699219 10 9.152344 10 8.5 C 10 8.269531 10.054688 8.054688 10.148438 7.855469 L 8.394531 6.105469 L 2.707031 11.792969 C 2.316406 12.183594 2.316406 12.816406 2.707031 13.207031 L 10.792969 21.292969 C 11.183594 21.683594 11.816406 21.683594 12.207031 21.292969 L 20.292969 13.207031 C 20.683594 12.816406 20.683594 12.183594 20.292969 11.792969 Z"
                })
              })
            }), /* @__PURE__ */ jsx("a", {
              href: "https://github.com",
              children: /* @__PURE__ */ jsx("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                fill: "white",
                x: "0px",
                y: "0px",
                width: "50",
                height: "50",
                viewBox: "0 0 32 32",
                children: /* @__PURE__ */ jsx("path", {
                  fillRule: "evenodd",
                  d: "M 16 4 C 9.371094 4 4 9.371094 4 16 C 4 21.300781 7.4375 25.800781 12.207031 27.386719 C 12.808594 27.496094 13.027344 27.128906 13.027344 26.808594 C 13.027344 26.523438 13.015625 25.769531 13.011719 24.769531 C 9.671875 25.492188 8.96875 23.160156 8.96875 23.160156 C 8.421875 21.773438 7.636719 21.402344 7.636719 21.402344 C 6.546875 20.660156 7.71875 20.675781 7.71875 20.675781 C 8.921875 20.761719 9.554688 21.910156 9.554688 21.910156 C 10.625 23.746094 12.363281 23.214844 13.046875 22.910156 C 13.15625 22.132813 13.46875 21.605469 13.808594 21.304688 C 11.144531 21.003906 8.34375 19.972656 8.34375 15.375 C 8.34375 14.0625 8.8125 12.992188 9.578125 12.152344 C 9.457031 11.851563 9.042969 10.628906 9.695313 8.976563 C 9.695313 8.976563 10.703125 8.65625 12.996094 10.207031 C 13.953125 9.941406 14.980469 9.808594 16 9.804688 C 17.019531 9.808594 18.046875 9.941406 19.003906 10.207031 C 21.296875 8.65625 22.300781 8.976563 22.300781 8.976563 C 22.957031 10.628906 22.546875 11.851563 22.421875 12.152344 C 23.191406 12.992188 23.652344 14.0625 23.652344 15.375 C 23.652344 19.984375 20.847656 20.996094 18.175781 21.296875 C 18.605469 21.664063 18.988281 22.398438 18.988281 23.515625 C 18.988281 25.121094 18.976563 26.414063 18.976563 26.808594 C 18.976563 27.128906 19.191406 27.503906 19.800781 27.386719 C 24.566406 25.796875 28 21.300781 28 16 C 28 9.371094 22.628906 4 16 4 Z"
                })
              })
            }), /* @__PURE__ */ jsx("a", {
              href: "https://aws.amazon.com/s3",
              children: /* @__PURE__ */ jsx("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                fill: "white",
                x: "0px",
                y: "0px",
                width: "50",
                height: "50",
                viewBox: "0 0 50 50",
                children: /* @__PURE__ */ jsx("path", {
                  d: "M 29 7 L 23.308594 9 L 29 11 L 34.691406 9 L 29 7 z M 43 7 L 37.308594 9 L 43 11 L 48.691406 9 L 43 7 z M 23 11 L 23 17.332031 L 28 19 L 28 12.667969 L 23 11 z M 35 11 L 30 12.667969 L 30 19 L 35 17.332031 L 35 11 z M 37 11 L 37 17.332031 L 42 19 L 42 12.667969 L 37 11 z M 49 11 L 44 12.667969 L 44 19 L 49 17.332031 L 49 11 z M 8 19 L 2.3085938 21 L 8 23 L 13.691406 21 L 8 19 z M 22 19 L 16.308594 21 L 22 23 L 27.691406 21 L 22 19 z M 2 23 L 2 29.332031 L 7 31 L 7 24.667969 L 2 23 z M 14 23 L 9 24.667969 L 9 31 L 14 29.332031 L 14 23 z M 16 23 L 16 29.332031 L 21 31 L 21 24.667969 L 16 23 z M 28 23 L 23 24.667969 L 23 31 L 28 29.332031 L 28 23 z M 15 31 L 9.3085938 33 L 15 35 L 20.691406 33 L 15 31 z M 9 35 L 9 41.332031 L 14 43 L 14 36.667969 L 9 35 z M 21 35 L 16 36.667969 L 16 43 L 21 41.332031 L 21 35 z"
                })
              })
            }), /* @__PURE__ */ jsx("a", {
              href: "https://www.docker.com",
              children: /* @__PURE__ */ jsx("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                fill: "white",
                x: "0px",
                y: "0px",
                width: "50",
                height: "50",
                viewBox: "0 0 16 16",
                children: /* @__PURE__ */ jsx("path", {
                  d: "M 4 2 L 4 4 L 6 4 L 6 2 L 4 2 z M 7 2 L 7 4 L 9 4 L 9 2 L 7 2 z M 11.798828 4.671875 L 11.392578 4.9707031 C 11.392578 4.9707031 11.053225 5.2200353 10.716797 5.609375 C 10.380369 5.9987147 10 6.5518333 10 7.25 C 10 7.7413797 10.040129 7.7639122 10.080078 8 L 0.98046875 8 L 1 8.5195312 C 1.0543802 9.8790373 1.4753502 11.02501 2.125 11.923828 L 2.125 12 L 2.1855469 12 C 3.1289259 13.255243 4.5383295 13.994894 6.1230469 14 L 6.125 14 C 8.0138218 14 9.3239394 13.550097 10.285156 12.763672 C 11.178418 12.032845 11.728382 11.024085 12.292969 9.9433594 C 14.136797 9.7815275 14.949219 8.34375 14.949219 8.34375 L 15.119141 7.9960938 L 14.826172 7.7460938 C 14.826172 7.7460938 13.989973 7.1619174 12.888672 7.0859375 C 12.717559 6.0115932 12.09375 5.0820312 12.09375 5.0820312 L 11.798828 4.671875 z M 1 5 L 1 7 L 3 7 L 3 5 L 1 5 z M 4 5 L 4 7 L 6 7 L 6 5 L 4 5 z M 7 5 L 7 7 L 9 7 L 9 5 L 7 5 z M 11.503906 6.2324219 C 11.715377 6.6062682 12 6.9955924 12 7.5 L 12 8.0585938 L 12.554688 7.9960938 C 13.063443 7.9395652 13.472211 8.098904 13.771484 8.2597656 C 13.520879 8.5835418 13.070361 9 12 9 L 11.695312 9 L 11.554688 9.2714844 C 10.956003 10.432147 10.420627 11.361659 9.6523438 11.990234 C 8.8844078 12.618525 7.8617027 12.999656 6.1269531 13 C 5.1111488 12.996727 4.2059194 12.647345 3.5058594 12 L 5 12 L 5 11 L 2.7402344 11 C 2.4255238 10.438154 2.1964234 9.7777559 2.1015625 9 L 11.318359 9 L 11.099609 8.3417969 C 11.099609 8.3417969 11 8.077381 11 7.25 C 11 6.9481667 11.214584 6.5623322 11.472656 6.2636719 C 11.488776 6.2450199 11.487876 6.2501969 11.503906 6.2324219 z M 6.5 10 A 0.5 0.5 0 0 0 6 10.5 A 0.5 0.5 0 0 0 6.5 11 A 0.5 0.5 0 0 0 7 10.5 A 0.5 0.5 0 0 0 6.5 10 z"
                })
              })
            }), /* @__PURE__ */ jsx("a", {
              href: "https://inkscape.org",
              children: /* @__PURE__ */ jsx("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                fill: "white",
                x: "0px",
                y: "0px",
                width: "50",
                height: "50",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx("path", {
                  d: "M 11.894531 2.0292969 C 11.278531 2.0292969 10.672375 2.2559375 10.234375 2.7109375 L 2.8808594 10.349609 C 0.093859375 13.176609 4.6797969 12.938766 6.3417969 14.009766 C 7.1087969 14.515766 3.8791094 15.167938 4.5371094 15.835938 C 5.1791094 16.507937 8.4136875 17.122438 9.0546875 17.773438 C 9.6966875 18.441437 7.7504844 19.152313 8.3964844 19.820312 C 9.0214844 20.488312 10.516109 19.856953 10.787109 21.376953 C 10.864109 21.818953 11.302953 22 11.876953 22 C 12.767953 22 13.985688 21.562516 14.679688 20.978516 C 15.391687 20.364516 13.446891 20.364406 14.087891 19.691406 C 14.662891 19.102406 15.212891 18.841687 15.712891 18.679688 C 16.608891 18.384687 17.333891 18.408688 17.712891 17.429688 C 18.033891 16.615687 15.282625 16.034719 16.015625 15.511719 C 17.766625 14.262719 24.195516 13.628047 21.228516 10.623047 L 13.609375 2.7109375 C 13.136375 2.2559375 12.510531 2.0292969 11.894531 2.0292969 z M 11.894531 4.0292969 C 11.951531 4.0292969 12.092078 4.0406719 12.205078 4.1386719 L 17.25 9.375 L 16 10 L 15 9 L 13 10 L 11 8 L 9 10 L 6 10 L 11.675781 4.0976562 C 11.715781 4.0556563 11.800531 4.0292969 11.894531 4.0292969 z M 8.4394531 14.070312 C 8.5764531 14.070312 11.718563 14.593266 12.851562 15.197266 C 13.363563 15.471266 13.460734 15.762297 12.677734 16.029297 C 12.653734 16.037297 12.619797 16.037969 12.591797 16.042969 C 12.547797 16.050969 12.506125 16.0615 12.453125 16.0625 C 11.940125 16.0685 11.025687 15.753094 10.179688 15.371094 C 10.177687 15.370094 10.175828 15.368188 10.173828 15.367188 C 10.044828 15.308188 9.9169688 15.2475 9.7929688 15.1875 C 9.7669688 15.1745 9.7417969 15.163391 9.7167969 15.150391 C 9.6197969 15.102391 9.5255937 15.053859 9.4335938 15.005859 C 9.3895937 14.982859 9.3466875 14.9605 9.3046875 14.9375 C 9.2366875 14.9005 9.1694688 14.862172 9.1054688 14.826172 C 9.0524687 14.796172 9.0001719 14.765328 8.9511719 14.736328 C 8.9041719 14.708328 8.8613594 14.68225 8.8183594 14.65625 C 8.7633594 14.62225 8.7101094 14.587688 8.6621094 14.554688 C 8.6321094 14.533687 8.605125 14.514141 8.578125 14.494141 C 8.530125 14.460141 8.4852656 14.426531 8.4472656 14.394531 C 8.4272656 14.377531 8.4115312 14.363656 8.3945312 14.347656 C 8.3615313 14.317656 8.3295937 14.289672 8.3085938 14.263672 C 8.2955938 14.247672 8.2912031 14.234703 8.2832031 14.220703 C 8.2702031 14.199703 8.2578594 14.177156 8.2558594 14.160156 C 8.2538594 14.142156 8.2643906 14.130187 8.2753906 14.117188 C 8.2813906 14.109188 8.2819687 14.09975 8.2929688 14.09375 C 8.3219687 14.07875 8.3694531 14.070312 8.4394531 14.070312 z M 20.533203 16.507812 C 19.860328 16.534437 19.175 16.900578 19 17.580078 C 19 18.026078 22.167187 18.281609 21.992188 17.474609 C 21.865687 16.794609 21.206078 16.481188 20.533203 16.507812 z M 7.0273438 18.005859 C 5.8344688 17.921859 4.3054531 18.826547 5.3457031 19.716797 C 6.2307031 20.492797 7.57 19.546078 8 18.455078 C 7.78475 18.170328 7.4249687 18.033859 7.0273438 18.005859 z M 18.234375 19 C 17.618375 19.633 18.342312 20.296375 18.945312 19.859375 C 19.105313 19.739375 18.930375 19.151 18.234375 19 z"
                })
              })
            }), /* @__PURE__ */ jsx("a", {
              href: "https://www.gimp.org",
              children: /* @__PURE__ */ jsx("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                fill: "white",
                x: "0px",
                y: "0px",
                width: "50",
                height: "50",
                viewBox: "0 0 50 50",
                children: /* @__PURE__ */ jsx("path", {
                  d: "M 41.191406 6.019531 C 40.054688 5.882813 39.429688 7.226563 38.789063 8.867188 C 37.097656 13.210938 32.128906 15.980469 27.769531 16.890625 C 26.808594 16.328125 25.695313 16 24.5 16 C 22.925781 16 21.480469 16.5625 20.355469 17.496094 C 16.050781 17.15625 12.863281 12.492188 12.828125 12.441406 L 11 9.710938 L 11 19.347656 C 10.597656 19.917969 10.316406 20.574219 10.15625 21.277344 C 8.105469 19.84375 5.71875 19.546875 3.960938 20.71875 C 2.984375 21.367188 2.339844 22.386719 2.101563 23.660156 C 1.753906 25.507813 2.300781 27.621094 3.59375 29.464844 C 5.1875 31.726563 7.484375 33.011719 9.5625 33.011719 C 10.453125 33.011719 11.300781 32.773438 12.039063 32.28125 C 13.019531 31.632813 13.664063 30.613281 13.902344 29.339844 C 13.996094 28.835938 14.019531 28.308594 13.984375 27.777344 C 14.472656 27.917969 14.980469 28 15.5 28 C 15.664063 28 15.824219 27.984375 15.988281 27.96875 C 16.007813 28.558594 15.972656 29.140625 15.867188 29.703125 C 15.527344 31.523438 14.585938 32.992188 13.144531 33.949219 C 12.761719 34.207031 12.34375 34.40625 11.910156 34.566406 C 12.980469 35.242188 14.15625 35.898438 15.28125 36.390625 C 19.304688 38.152344 23.058594 39.027344 26.4375 39.027344 C 29.28125 39.027344 31.847656 38.390625 34.09375 37.152344 C 34.617188 37.4375 35.140625 37.707031 35.65625 37.941406 C 38.378906 39.183594 41.074219 40.085938 43.078125 40.449219 C 43.117188 40.675781 43.164063 40.90625 43.238281 41.144531 C 43.976563 43.539063 47.945313 44.746094 48.734375 44.964844 L 50 45.3125 L 50 44 C 50.003906 42.359375 49.886719 38.40625 48.769531 37.199219 C 47.773438 36.121094 46.441406 35.746094 45.246094 36.167969 C 43.832031 34.984375 41.699219 33.667969 39.214844 32.46875 C 43.695313 25.605469 43.136719 12.21875 42.730469 9.101563 C 42.519531 7.523438 42.339844 6.160156 41.191406 6.019531 Z M 24.5 18 C 26.980469 18 29 20.019531 29 22.5 C 29 22.78125 28.964844 23.054688 28.917969 23.324219 C 28.609375 21.992188 27.421875 21 26 21 C 25.914063 21 25.835938 21.019531 25.75 21.027344 C 26.460938 21.144531 27 21.757813 27 22.5 C 27 23.328125 26.328125 24 25.5 24 C 24.671875 24 24 23.328125 24 22.5 C 24 22.09375 24.164063 21.726563 24.425781 21.457031 C 23.574219 21.984375 23 22.921875 23 24 C 23 25.421875 23.992188 26.609375 25.324219 26.917969 C 25.054688 26.964844 24.78125 27 24.5 27 C 22.019531 27 20 24.980469 20 22.5 C 20 20.019531 22.019531 18 24.5 18 Z M 15.5 19 C 16.636719 19 17.691406 19.554688 18.34375 20.464844 C 18.222656 20.824219 18.140625 21.195313 18.078125 21.578125 C 17.648438 21.222656 17.101563 21 16.5 21 C 16.429688 21 16.363281 21.015625 16.292969 21.019531 C 16.882813 21.121094 17.332031 21.632813 17.332031 22.25 C 17.332031 22.941406 16.773438 23.5 16.082031 23.5 C 15.394531 23.5 14.832031 22.941406 14.832031 22.25 C 14.832031 21.910156 14.96875 21.605469 15.1875 21.378906 C 14.476563 21.820313 14 22.601563 14 23.5 C 14 24.71875 14.875 25.734375 16.03125 25.953125 C 15.855469 25.980469 15.679688 26 15.5 26 C 14.761719 26 14.054688 25.773438 13.453125 25.339844 L 13.363281 25.277344 C 13.113281 24.679688 12.796875 24.09375 12.40625 23.535156 C 12.296875 23.382813 12.179688 23.238281 12.066406 23.09375 C 12.03125 22.898438 12 22.699219 12 22.5 C 12 20.570313 13.570313 19 15.5 19 Z M 6 22 C 7.105469 22 8 23.117188 8 24.5 C 8 25.882813 7.105469 27 6 27 C 4.894531 27 4 25.882813 4 24.5 C 4 23.117188 4.894531 22 6 22 Z M 31 28 C 31 28 32.234375 28.5625 33.117188 29.464844 C 33.121094 29.46875 33.125 29.472656 33.132813 29.480469 C 33.21875 29.566406 33.300781 29.65625 33.375 29.75 C 33.773438 30.234375 34.042969 30.796875 33.984375 31.410156 C 33.984375 31.410156 33.988281 31.414063 33.988281 31.414063 C 33.980469 31.5 33.96875 31.589844 33.949219 31.675781 C 33.890625 31.898438 33.78125 32.125 33.640625 32.359375 C 34.871094 32.765625 36.175781 33.269531 37.515625 33.875 C 39.976563 35 42.199219 36.296875 43.648438 37.433594 C 43.453125 37.722656 43.296875 38.054688 43.183594 38.421875 C 41.375 38.070313 38.96875 37.253906 36.488281 36.125 C 35.003906 35.445313 33.441406 34.484375 32.121094 33.597656 C 31.722656 33.753906 31.277344 33.855469 30.796875 33.917969 C 26.667969 34.460938 20 32 20 32 C 20 32 31.863281 32.65625 31.863281 30.34375 C 31.863281 29.191406 31 28 31 28 Z"
                })
              })
            }), /* @__PURE__ */ jsx("p", {
              className: "text-white font-semibold col-span-2 -col-end-1 sm:col-span-2 sm:-col-end-1 lg:col-span-1 lg:-col-end-1 mx-auto mt-6 max-w-xl text-lg/8",
              children: "...and more!"
            })]
          }), /* @__PURE__ */ jsx("div", {
            "aria-hidden": "true",
            className: "absolute -top-24 right-0 -z-10 transform-gpu blur-3xl",
            children: /* @__PURE__ */ jsx("div", {
              style: {
                clipPath: "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)"
              },
              className: "aspect-1404/767 w-[87.75rem] bg-linear-to-r from-[#80caff] to-[#4f46e5] opacity-25"
            })
          })]
        })
      }), /* @__PURE__ */ jsx("div", {
        className: "mt-34 overflow-hidden",
        children: /* @__PURE__ */ jsx("div", {
          className: "mx-auto max-w-7xl px-6 lg:flex lg:px-8",
          children: /* @__PURE__ */ jsxs("div", {
            className: "mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:max-w-none lg:min-w-full lg:flex-none lg:gap-y-8",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8",
              children: [/* @__PURE__ */ jsx("h2", {
                className: "mb-4 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl",
                children: "My interests"
              }), /* @__PURE__ */ jsxs("ul", {
                className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-1",
                children: [/* @__PURE__ */ jsxs("li", {
                  children: [/* @__PURE__ */ jsx("p", {
                    style: {
                      color: "cornflowerblue"
                    },
                    className: "text-xl font-semibold",
                    children: "My dog, Arlo"
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-sm text-gray-400",
                    children: "A blanket-loving Italian Greyhound"
                  })]
                }), /* @__PURE__ */ jsxs("li", {
                  children: [/* @__PURE__ */ jsx("p", {
                    style: {
                      color: "cornflowerblue"
                    },
                    className: "text-xl font-semibold",
                    children: "Video games"
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-sm text-gray-400",
                    children: "Gotta do my Arknights dailies"
                  })]
                }), /* @__PURE__ */ jsxs("li", {
                  children: [/* @__PURE__ */ jsx("p", {
                    style: {
                      color: "cornflowerblue"
                    },
                    className: "text-xl font-semibold",
                    children: "Anime"
                  }), /* @__PURE__ */ jsxs("p", {
                    className: "text-sm text-gray-400",
                    children: ["I recommend ", /* @__PURE__ */ jsx("em", {
                      children: "Shin Sekai Yori"
                    })]
                  })]
                }), /* @__PURE__ */ jsxs("li", {
                  children: [/* @__PURE__ */ jsx("p", {
                    style: {
                      color: "cornflowerblue"
                    },
                    className: "text-xl font-semibold",
                    children: "日本語の勉強"
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-sm text-gray-400",
                    children: "よろしくお願いいたします"
                  })]
                }), /* @__PURE__ */ jsxs("li", {
                  children: [/* @__PURE__ */ jsx("p", {
                    style: {
                      color: "cornflowerblue"
                    },
                    className: "text-xl font-semibold",
                    children: "Traveling"
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-sm text-gray-400",
                    children: "Next trip: NYC"
                  })]
                }), /* @__PURE__ */ jsxs("li", {
                  children: [/* @__PURE__ */ jsx("p", {
                    style: {
                      color: "cornflowerblue"
                    },
                    className: "text-xl font-semibold",
                    children: "Food"
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-sm text-gray-400",
                    children: "Especially Japanese & Filipino"
                  })]
                })]
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents",
              children: [/* @__PURE__ */ jsx("div", {
                className: "w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end",
                children: /* @__PURE__ */ jsx("img", {
                  alt: "",
                  src: "../hobbies-photo-1.jpg",
                  className: "aspect-7/5 w-[37rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                })
              }), /* @__PURE__ */ jsxs("div", {
                className: "contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "order-first flex w-64 flex-none justify-end self-end lg:w-auto",
                  children: /* @__PURE__ */ jsx("img", {
                    alt: "",
                    src: "../hobbies-photo-2.jpg",
                    className: "aspect-4/3 w-[24rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"
                  })
                }), /* @__PURE__ */ jsx("div", {
                  className: "flex w-96 flex-auto justify-end lg:w-auto lg:flex-none",
                  children: /* @__PURE__ */ jsx("img", {
                    alt: "",
                    src: "../hobbies-photo-3.jpg",
                    className: "aspect-7/5 w-[37rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"
                  })
                }), /* @__PURE__ */ jsx("div", {
                  className: "hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none",
                  children: /* @__PURE__ */ jsx("img", {
                    alt: "",
                    src: "../hobbies-photo-4.jpg",
                    className: "aspect-4/3 w-[24rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                  })
                })]
              })]
            })]
          })
        })
      }), /* @__PURE__ */ jsx("div", {
        className: "mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8",
        children: /* @__PURE__ */ jsxs("div", {
          className: "mx-auto max-w-2xl lg:mx-0",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "mb-[0.5rem] text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl",
            children: "Want to know more about me?"
          }), /* @__PURE__ */ jsx("h2", {
            className: "text-blue-400 text-4xl font-semibold tracking-tight text-pretty sm:text-5xl",
            children: /* @__PURE__ */ jsx("a", {
              href: "/contact",
              className: "hover:text-blue-300",
              children: "Let's connect!"
            })
          })]
        })
      })]
    }), /* @__PURE__ */ jsx("footer", {
      className: "mx-auto mt-32 sm:mt-40 max-w-7xl px-6 lg:px-8",
      children: /* @__PURE__ */ jsxs("div", {
        className: "border-t border-gray-900/10 pt-15 pb-8",
        children: [/* @__PURE__ */ jsx("div", {
          className: "xl:grid xl:grid-cols-1 xl:gap-8",
          children: /* @__PURE__ */ jsx("div", {
            className: "grid grid-cols-1 gap-8 xl:col-span-2",
            children: /* @__PURE__ */ jsx("div", {
              className: "md:grid md:grid-cols-1 md:gap-8",
              children: /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("h3", {
                  style: {
                    color: "cornflowerblue"
                  },
                  className: "text-sm/6 font-semibold",
                  children: "Sara Baltz"
                }), /* @__PURE__ */ jsx("ul", {
                  role: "list",
                  className: "mt-6 space-y-4",
                  children: footerNavigation$3.company.map((item) => /* @__PURE__ */ jsx("li", {
                    children: /* @__PURE__ */ jsx("a", {
                      href: item.href,
                      className: "text-sm/6 text-gray-600 hover:text-blue-300",
                      children: item.name
                    })
                  }, item.name))
                })]
              })
            })
          })
        }), /* @__PURE__ */ jsxs("div", {
          className: "mt-15 border-t border-gray-900/10 pt-8 md:flex md:items-center md:justify-between",
          children: [/* @__PURE__ */ jsx("div", {
            className: "flex gap-x-6 md:order-2",
            children: footerNavigation$3.social.map((item) => /* @__PURE__ */ jsxs("a", {
              href: item.href,
              target: "_blank",
              className: "text-blue-400 hover:text-blue-300",
              children: [/* @__PURE__ */ jsx("span", {
                className: "sr-only",
                children: item.name
              }), /* @__PURE__ */ jsx(item.icon, {
                "aria-hidden": "true",
                className: "size-6"
              })]
            }, item.name))
          }), /* @__PURE__ */ jsx("p", {
            className: "mt-8 text-sm/6 text-gray-600 md:order-1 md:mt-0",
            children: "©2025 Sara Baltz. All rights reserved."
          })]
        })]
      })
    })]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: about,
  meta: meta$3
}, Symbol.toStringTag, { value: "Module" }));
function meta$2({}) {
  return [{
    title: "Sara Baltz - Projects"
  }, {
    name: "description",
    content: "Check out my projects!"
  }, {
    property: "og:title",
    content: "Sara Baltz - Full-Stack Software Engineer"
  }, {
    property: "og:description",
    content: "I am a software engineer & former clinical researcher with a proven aptitude for teamwork & problem solving. I am eager to leverage my driven, detail-oriented mindset & passion for continuous learning to build robust & user-friendly applications, contribute to innovative teams, and deliver high-quality, impactful software solutions that enhance user experiences."
  }, {
    property: "og:url",
    content: "https://sarabaltz.com/projects"
  }];
}
const navigation$2 = [{
  name: "About",
  href: "/"
}, {
  name: "Projects",
  href: "/projects"
}, {
  name: "Resume",
  href: "/resume"
}, {
  name: "Contact",
  href: "/contact"
}];
const footerNavigation$2 = {
  company: [{
    name: "About",
    href: "/#top"
  }, {
    name: "Projects",
    href: "/projects"
  }, {
    name: "Resume",
    href: "/resume"
  }, {
    name: "Contact",
    href: "/contact"
  }],
  social: [{
    name: "GitHub",
    href: "https://github.com/fayfan",
    icon: (props) => /* @__PURE__ */ jsx("svg", {
      fill: "currentColor",
      viewBox: "0 0 24 24",
      ...props,
      children: /* @__PURE__ */ jsx("path", {
        fillRule: "evenodd",
        d: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z",
        clipRule: "evenodd"
      })
    })
  }, {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/sarabaltz",
    icon: (props) => /* @__PURE__ */ jsx("svg", {
      fill: "currentColor",
      viewBox: "-147 100 512 600",
      ...props,
      children: /* @__PURE__ */ jsx("path", {
        fillRule: "evenodd",
        d: "M113,145c-141.4,0-256,114.6-256,256s114.6,256,256,256s256-114.6,256-256S254.4,145,113,145z M41.4,508.1H-8.5V348.4h49.9 V508.1z M15.1,328.4h-0.4c-18.1,0-29.8-12.2-29.8-27.7c0-15.8,12.1-27.7,30.5-27.7c18.4,0,29.7,11.9,30.1,27.7 C45.6,316.1,33.9,328.4,15.1,328.4z M241,508.1h-56.6v-82.6c0-21.6-8.8-36.4-28.3-36.4c-14.9,0-23.2,10-27,19.6 c-1.4,3.4-1.2,8.2-1.2,13.1v86.3H71.8c0,0,0.7-146.4,0-159.7h56.1v25.1c3.3-11,21.2-26.6,49.8-26.6c35.5,0,63.3,23,63.3,72.4V508.1z",
        clipRule: "evenodd"
      })
    })
  }, {
    name: "Wellfound",
    href: "https://wellfound.com/u/sarabaltz",
    icon: (props) => /* @__PURE__ */ jsx("svg", {
      fill: "currentColor",
      viewBox: "-18 -18 285 285",
      ...props,
      children: /* @__PURE__ */ jsx("path", {
        d: "M 125 0 A 125 125 0 0 0 0 125 A 125 125 0 0 0 125 250 A 125 125 0 0 0 250 125 A 125 125 0 0 0 125 0 z M 181.56445 92.4375 C 187.25676 92.314896 192.9634 97.078533 192.68555 103.15625 C 192.93375 111.50557 182.80876 116.87461 176.03906 112.01172 C 169.46113 107.9838 169.97906 97.141109 176.91797 93.767578 C 178.37785 92.888918 179.97061 92.471829 181.56445 92.4375 z M 57.304688 93.205078 L 75.677734 93.205078 L 87.333984 138.93359 L 99.998047 93.205078 L 118.42773 93.205078 L 131.08789 138.93359 L 142.73633 93.205078 L 161.11133 93.205078 L 141.14062 156.80469 L 121.55859 156.80469 C 117.44038 141.49957 113.32371 126.19548 109.2168 110.88477 L 96.619141 156.80469 L 77.048828 156.80469 L 77.037109 156.80469 L 57.304688 93.205078 z M 181.56445 136.14258 C 187.25676 136.0202 192.9634 140.78312 192.68555 146.86523 C 192.92878 155.21117 182.80716 160.5842 176.03906 155.7168 C 169.46113 151.68888 169.97906 140.84619 176.91797 137.47266 C 178.37785 136.594 179.97061 136.17684 181.56445 136.14258 z "
      })
    })
  }, {
    name: "Email",
    href: "mailto:sara@sarabaltz.com",
    icon: (props) => /* @__PURE__ */ jsx("svg", {
      fill: "currentColor",
      viewBox: "0 -1 20 22",
      ...props,
      children: /* @__PURE__ */ jsx("path", {
        fillRule: "evenodd",
        d: "M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6 9.6-4.298 9.6-9.6S15.302.4 10 .4zM6.231 7h7.52c.399 0 .193.512-.024.643-.217.13-3.22 1.947-3.333 2.014s-.257.1-.403.1a.793.793 0 0 1-.402-.1L6.255 7.643C6.038 7.512 5.833 7 6.231 7zM14 12.5c0 .21-.252.5-.444.5H6.444C6.252 13 6 12.71 6 12.5V8.853c0-.092-.002-.211.172-.11l3.417 2.015a.69.69 0 0 0 .402.1c.146 0 .252-.011.403-.1l3.434-2.014c.174-.102.172.018.172.11V12.5z",
        clipRule: "evenodd"
      })
    })
  }, {
    name: "Phone",
    href: "tel:+17655056148",
    icon: (props) => /* @__PURE__ */ jsx("svg", {
      fill: "currentColor",
      viewBox: "0 1 55 55",
      ...props,
      children: /* @__PURE__ */ jsx("path", {
        xmlns: "http://www.w3.org/2000/svg",
        d: "M 27.9999 51.9062 C 41.0546 51.9062 51.9063 41.0547 51.9063 28.0000 C 51.9063 14.9219 41.0312 4.0938 27.9765 4.0938 C 14.8983 4.0938 4.0937 14.9219 4.0937 28.0000 C 4.0937 41.0547 14.9218 51.9062 27.9999 51.9062 Z M 21.8827 33.8360 C 16.0702 28.0469 12.3671 20.6640 16.7499 16.2813 C 17.0077 16.0234 17.2890 15.7656 17.5468 15.5078 C 18.8827 14.2422 20.1718 14.3125 21.3202 15.9297 L 24.3671 20.2656 C 25.3983 21.7656 25.1405 22.6094 24.0390 23.7813 L 23.0780 24.8360 C 22.7265 25.1640 22.8671 25.6094 23.0312 25.8906 C 23.4765 26.7344 24.7421 28.2344 26.1014 29.5938 C 27.5077 31.0000 28.9374 32.1953 29.8280 32.6875 C 30.1562 32.875 30.6249 32.9219 30.9296 32.6406 L 31.9374 31.6797 C 33.0624 30.5781 33.9765 30.2969 35.4296 31.3281 C 37.4452 32.7578 38.6640 33.6016 39.8593 34.4219 C 41.3358 35.5000 41.6874 36.8360 40.1874 38.1953 C 39.9296 38.4531 39.6952 38.7344 39.4374 38.9922 C 35.0546 43.3516 27.6952 39.6484 21.8827 33.8360 Z"
      })
    })
  }]
};
const projects = withComponentProps(function Projects() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return /* @__PURE__ */ jsxs("div", {
    className: "bg-white",
    children: [/* @__PURE__ */ jsxs("header", {
      className: "absolute inset-x-0 top-0 z-50",
      children: [/* @__PURE__ */ jsxs("nav", {
        "aria-label": "Global",
        className: "mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8",
        children: [/* @__PURE__ */ jsx("div", {
          className: "flex lg:flex-1",
          children: /* @__PURE__ */ jsxs("a", {
            href: "/",
            className: "-m-1.5 p-1.5",
            children: [/* @__PURE__ */ jsx("span", {
              className: "sr-only",
              children: "Sara Baltz"
            }), /* @__PURE__ */ jsx("img", {
              alt: "Logo",
              src: "../personal-logo.png",
              className: "h-8 w-auto"
            })]
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "flex lg:hidden",
          children: /* @__PURE__ */ jsxs("button", {
            type: "button",
            onClick: () => setMobileMenuOpen(true),
            className: "-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700",
            children: [/* @__PURE__ */ jsx("span", {
              className: "sr-only",
              children: "Open main menu"
            }), /* @__PURE__ */ jsx(Bars3Icon, {
              "aria-hidden": "true",
              className: "size-6 hover:text-blue-400 hover:cursor-pointer"
            })]
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "hidden lg:flex lg:gap-x-12",
          children: navigation$2.map((item) => /* @__PURE__ */ jsx("a", {
            href: item.href,
            className: "text-sm/6 font-semibold text-gray-900 hover:text-blue-300",
            children: item.name
          }, item.name))
        }), /* @__PURE__ */ jsx("div", {
          className: "hidden lg:flex lg:flex-1 lg:justify-end"
        })]
      }), /* @__PURE__ */ jsxs(Dialog, {
        open: mobileMenuOpen,
        onClose: setMobileMenuOpen,
        className: "lg:hidden",
        children: [/* @__PURE__ */ jsx("div", {
          className: "fixed inset-0 z-50"
        }), /* @__PURE__ */ jsxs(DialogPanel, {
          className: "fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "flex items-center justify-between",
            children: [/* @__PURE__ */ jsxs("a", {
              href: "/",
              className: "-m-1.5 p-1.5",
              children: [/* @__PURE__ */ jsx("span", {
                className: "sr-only",
                children: "Sara Baltz"
              }), /* @__PURE__ */ jsx("img", {
                alt: "Logo",
                src: "../personal-logo.png",
                className: "h-8 w-auto"
              })]
            }), /* @__PURE__ */ jsxs("button", {
              type: "button",
              onClick: () => setMobileMenuOpen(false),
              className: "-m-2.5 rounded-md p-2.5 text-gray-700",
              children: [/* @__PURE__ */ jsx("span", {
                className: "sr-only",
                children: "Close main menu"
              }), /* @__PURE__ */ jsx(XMarkIcon, {
                "aria-hidden": "true",
                className: "size-6 hover:text-blue-400 hover:cursor-pointer"
              })]
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: "mt-6 flow-root",
            children: /* @__PURE__ */ jsxs("div", {
              className: "-my-6 divide-y divide-gray-500/10",
              children: [/* @__PURE__ */ jsx("div", {
                className: "space-y-2 py-6",
                children: navigation$2.map((item) => /* @__PURE__ */ jsx("a", {
                  href: item.href,
                  className: "-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-blue-50",
                  children: item.name
                }, item.name))
              }), /* @__PURE__ */ jsx("div", {
                className: "py-6"
              })]
            })
          })]
        })]
      })]
    }), /* @__PURE__ */ jsxs("main", {
      className: "isolate",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "relative isolate -z-10 overflow-hidden bg-linear-to-b from-blue-100/20 pt-14",
        children: [/* @__PURE__ */ jsx("div", {
          "aria-hidden": "true",
          className: "absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white ring-1 shadow-xl shadow-blue-600/10 ring-blue-50 sm:-mr-80 lg:-mr-96"
        }), /* @__PURE__ */ jsx("div", {
          className: "mx-auto max-w-7xl px-6 py-24 sm:py-30 lg:px-8",
          children: /* @__PURE__ */ jsx("div", {
            className: "mx-auto max-w-2xl lg:mx-0 lg:max-w-none",
            children: /* @__PURE__ */ jsx("h1", {
              style: {
                color: "cornflowerblue"
              },
              className: "max-w-2xl text-5xl font-semibold tracking-tight text-balance sm:text-7xl ",
              children: "Projects"
            })
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "absolute inset-x-0 bottom-0 -z-10 h-24 bg-linear-to-t from-white sm:h-32"
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "overflow-hidden",
        children: /* @__PURE__ */ jsx("div", {
          className: "mx-auto max-w-7xl px-6 lg:flex lg:px-8",
          children: /* @__PURE__ */ jsxs("div", {
            className: "mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:max-w-none lg:min-w-full lg:flex-none lg:gap-y-8",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "flex flex-col lg:flex-row justify-between",
                children: [/* @__PURE__ */ jsx("h2", {
                  className: "mb-2 lg:mb-0 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl",
                  children: "Arkbites"
                }), /* @__PURE__ */ jsxs("div", {
                  className: "flex items-end lg:mb-1",
                  children: [/* @__PURE__ */ jsx("a", {
                    href: "https://react.dev",
                    children: /* @__PURE__ */ jsx("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "cornflowerBlue",
                      x: "0px",
                      y: "0px",
                      width: "25",
                      height: "25",
                      viewBox: "0 0 30 30",
                      children: /* @__PURE__ */ jsx("path", {
                        d: "M 10.679688 4.1816406 C 10.068687 4.1816406 9.502 4.3184219 9 4.6074219 C 7.4311297 5.5132122 6.8339651 7.7205462 7.1503906 10.46875 C 4.6127006 11.568833 3 13.188667 3 15 C 3 16.811333 4.6127006 18.431167 7.1503906 19.53125 C 6.8341285 22.279346 7.4311297 24.486788 9 25.392578 C 9.501 25.681578 10.067687 25.818359 10.679688 25.818359 C 11.982314 25.818359 13.48785 25.164589 15 24.042969 C 16.512282 25.164589 18.01964 25.818359 19.322266 25.818359 C 19.933266 25.818359 20.499953 25.681578 21.001953 25.392578 C 22.570814 24.486793 23.167976 22.279432 22.851562 19.53125 C 25.388297 18.431178 27 16.81094 27 15 C 27 13.188667 25.387299 11.568833 22.849609 10.46875 C 23.165872 7.7206538 22.56887 5.5132122 21 4.6074219 C 20.499 4.3174219 19.932312 4.1816406 19.320312 4.1816406 C 18.017686 4.1816406 16.51215 4.8354109 15 5.9570312 C 13.487763 4.8354109 11.981863 4.1816406 10.679688 4.1816406 z M 10.679688 5.9316406 C 11.461321 5.9316406 12.49496 6.3472486 13.617188 7.1171875 C 12.95737 7.7398717 12.311153 8.4479321 11.689453 9.2363281 C 10.681079 9.3809166 9.7303472 9.5916908 8.8496094 9.8554688 C 8.8448793 9.7943902 8.8336776 9.7303008 8.8300781 9.6699219 C 8.7230781 7.8899219 9.114 6.5630469 9.875 6.1230469 C 10.1 5.9930469 10.362688 5.9316406 10.679688 5.9316406 z M 19.320312 5.9316406 C 19.636312 5.9316406 19.9 5.9930469 20.125 6.1230469 C 20.886 6.5620469 21.276922 7.8899219 21.169922 9.6699219 C 21.166295 9.7303008 21.155145 9.7943902 21.150391 9.8554688 C 20.2691 9.5915252 19.317669 9.3809265 18.308594 9.2363281 C 17.686902 8.4480417 17.042616 7.7397993 16.382812 7.1171875 C 17.504962 6.3473772 18.539083 5.9316406 19.320312 5.9316406 z M 15 8.2285156 C 15.27108 8.4752506 15.540266 8.7360345 15.8125 9.0214844 C 15.542718 9.012422 15.274373 9 15 9 C 14.726286 9 14.458598 9.0124652 14.189453 9.0214844 C 14.461446 8.7363308 14.729174 8.4750167 15 8.2285156 z M 15 10.75 C 15.828688 10.75 16.614128 10.796321 17.359375 10.876953 C 17.813861 11.494697 18.261774 12.147811 18.681641 12.875 C 19.084074 13.572033 19.439938 14.285488 19.753906 15 C 19.439896 15.714942 19.084316 16.429502 18.681641 17.126953 C 18.263078 17.852044 17.816279 18.500949 17.363281 19.117188 C 16.591711 19.201607 15.800219 19.25 15 19.25 C 14.171312 19.25 13.385872 19.203679 12.640625 19.123047 C 12.186139 18.505303 11.738226 17.854142 11.318359 17.126953 C 10.915684 16.429502 10.560194 15.714942 10.246094 15 C 10.559972 14.285488 10.915926 13.572033 11.318359 12.875 C 11.737083 12.149909 12.183612 11.499051 12.636719 10.882812 C 13.408289 10.798393 14.199781 10.75 15 10.75 z M 19.746094 11.291016 C 20.142841 11.386804 20.524253 11.490209 20.882812 11.605469 C 20.801579 11.97252 20.702235 12.346608 20.589844 12.724609 C 20.461164 12.483141 20.336375 12.240903 20.197266 12 C 20.054139 11.752196 19.895244 11.529558 19.746094 11.291016 z M 10.251953 11.292969 C 10.103305 11.530776 9.9454023 11.752991 9.8027344 12 C 9.6636666 12.240944 9.5387971 12.483106 9.4101562 12.724609 C 9.29751 12.345829 9.1965499 11.971295 9.1152344 11.603516 C 9.4803698 11.48815 9.86083 11.385986 10.251953 11.292969 z M 7.46875 12.246094 C 7.6794464 13.135714 7.9717297 14.057918 8.3476562 14.998047 C 7.9725263 15.935943 7.6814729 16.856453 7.4707031 17.744141 C 5.7292327 16.903203 4.75 15.856373 4.75 15 C 4.75 14.121 5.701875 13.119266 7.296875 12.322266 C 7.3513169 12.295031 7.4131225 12.272692 7.46875 12.246094 z M 22.529297 12.255859 C 24.270767 13.096797 25.25 14.143627 25.25 15 C 25.25 15.879 24.298125 16.880734 22.703125 17.677734 C 22.648683 17.704969 22.586877 17.727308 22.53125 17.753906 C 22.32043 16.863764 22.030541 15.940699 21.654297 15 C 22.028977 14.062913 22.318703 13.142804 22.529297 12.255859 z M 15 13 C 13.895 13 13 13.895 13 15 C 13 16.105 13.895 17 15 17 C 16.105 17 17 16.105 17 15 C 17 13.895 16.105 13 15 13 z M 9.4101562 17.275391 C 9.5388794 17.516948 9.6655262 17.759008 9.8046875 18 C 9.9476585 18.247625 10.104915 18.470608 10.253906 18.708984 C 9.857159 18.613196 9.4757466 18.509791 9.1171875 18.394531 C 9.1984813 18.02725 9.2976676 17.653633 9.4101562 17.275391 z M 20.589844 17.277344 C 20.702364 17.655759 20.803517 18.02905 20.884766 18.396484 C 20.51963 18.51185 20.13917 18.614014 19.748047 18.707031 C 19.896695 18.469224 20.054598 18.247009 20.197266 18 C 20.336044 17.759557 20.461449 17.518344 20.589844 17.277344 z M 8.8496094 20.144531 C 9.7309004 20.408475 10.682331 20.619073 11.691406 20.763672 C 12.313288 21.552345 12.957085 22.261935 13.617188 22.884766 C 12.495042 23.654481 11.461272 24.070312 10.679688 24.070312 C 10.363687 24.070312 10.1 24.006953 9.875 23.876953 C 9.114 23.437953 8.7230781 22.112031 8.8300781 20.332031 C 8.8337424 20.271023 8.8447938 20.206253 8.8496094 20.144531 z M 21.150391 20.144531 C 21.155182 20.206253 21.166285 20.271023 21.169922 20.332031 C 21.276922 22.112031 20.886 23.436953 20.125 23.876953 C 19.9 24.006953 19.637312 24.070313 19.320312 24.070312 C 18.538728 24.070312 17.504958 23.654609 16.382812 22.884766 C 17.042964 22.261863 17.688542 21.552454 18.310547 20.763672 C 19.318921 20.619083 20.269653 20.408309 21.150391 20.144531 z M 14.1875 20.978516 C 14.457282 20.987578 14.725627 21 15 21 C 15.274373 21 15.542718 20.987578 15.8125 20.978516 C 15.540266 21.263964 15.27108 21.524765 15 21.771484 C 14.72892 21.524749 14.459734 21.263966 14.1875 20.978516 z"
                      })
                    })
                  }), /* @__PURE__ */ jsx("a", {
                    href: "https://html.spec.whatwg.org/multipage",
                    children: /* @__PURE__ */ jsx("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "cornflowerBlue",
                      x: "0px",
                      y: "0px",
                      width: "25",
                      height: "25",
                      viewBox: "0 0 24 24",
                      children: /* @__PURE__ */ jsx("path", {
                        d: "M 21 2 L 3 2 L 5 20 L 12 22 L 19 20 Z M 16.824219 8.082031 L 9.167969 8.082031 L 9.351563 10.261719 L 16.640625 10.261719 L 16.09375 16.699219 L 12 18.003906 L 11.960938 17.988281 L 7.914063 16.699219 L 7.691406 14.074219 L 9.675781 14.074219 L 9.761719 15.09375 L 12.023438 15.59375 L 14.242188 15.09375 L 14.480469 12.339844 L 7.542969 12.339844 L 7.007813 6 L 17.003906 6 Z"
                      })
                    })
                  }), /* @__PURE__ */ jsx("a", {
                    href: "https://www.w3.org/Style/CSS/Overview.en.html",
                    children: /* @__PURE__ */ jsx("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "cornflowerBlue",
                      x: "0px",
                      y: "0px",
                      width: "25",
                      height: "25",
                      viewBox: "0 0 24 24",
                      children: /* @__PURE__ */ jsx("path", {
                        d: "M 3 2 L 5 20 L 11.992188 22 L 19 20 L 21 2 Z M 16.726563 10.347656 L 16.34375 16.589844 L 12.027344 18 L 7.710938 16.589844 L 7.546875 13.605469 L 9.734375 13.605469 L 9.789063 14.960938 L 12.027344 15.722656 L 14.269531 14.960938 L 14.433594 12.519531 L 9.625 12.519531 L 9.515625 10.347656 L 14.539063 10.347656 L 14.703125 8.175781 L 7.164063 8.175781 L 7 6.007813 L 17 6.007813 Z"
                      })
                    })
                  }), /* @__PURE__ */ jsx("a", {
                    href: "https://www.python.org",
                    children: /* @__PURE__ */ jsx("svg", {
                      xmlns: " http://www.w3.org/2000/svg",
                      fill: "cornflowerBlue",
                      x: "0px",
                      y: "0px",
                      width: "25",
                      height: "25",
                      viewBox: "0 0 24 24",
                      children: /* @__PURE__ */ jsx("path", {
                        d: "M 10 2 C 8.25 2 7 3.25 7 5 L 7 7 L 12 7 L 12 8 L 5 8 C 3.1875 8 2 9.28125 2 11 L 2 14 C 2 15.78125 3.1875 17 5 17 L 7 17 L 7 13 C 7 11.898438 7.898438 11 9 11 L 14 11 C 15.101563 11 16 10.101563 16 9 L 16 5 C 16 3.25 14.78125 2 13 2 Z M 9 4 C 9.550781 4 10 4.449219 10 5 C 10 5.550781 9.550781 6 9 6 C 8.449219 6 8 5.550781 8 5 C 8 4.449219 8.449219 4 9 4 Z M 17 6 L 17 10 C 17 11.101563 16.101563 12 15 12 L 10 12 C 8.898438 12 8 12.898438 8 14 L 8 18 C 8 19.75 9.21875 21 11 21 L 14 21 C 15.75 21 17 19.75 17 18 L 17 16 L 12 16 L 12 15 L 19 15 C 20.8125 15 22 13.71875 22 12 L 22 9 C 22 7.21875 20.8125 6 19 6 Z M 15 17 C 15.550781 17 16 17.449219 16 18 C 16 18.550781 15.550781 19 15 19 C 14.449219 19 14 18.550781 14 18 C 14 17.449219 14.449219 17 15 17 Z"
                      })
                    })
                  }), /* @__PURE__ */ jsx("a", {
                    href: "https://flask.palletsprojects.com",
                    children: /* @__PURE__ */ jsx("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "cornflowerBlue",
                      x: "0px",
                      y: "0px",
                      width: "25",
                      height: "25",
                      viewBox: "0 0 50 50",
                      children: /* @__PURE__ */ jsx("path", {
                        d: "M 2.609375 14.628906 C 2.194125 14.663781 1.8316094 14.997641 2.3496094 15.556641 C 3.3446094 16.118641 1.3683125 16.532203 1.9453125 16.908203 C 2.1293125 17.304203 1.9305781 17.745406 1.3925781 17.816406 C 0.60457812 17.884406 0.67926562 18.960484 1.4472656 18.396484 C 2.3042656 18.124484 1.5954062 18.504031 1.1914062 18.582031 C 0.28440625 18.846031 -0.33364063 19.752078 0.19335938 20.580078 C 0.69735938 21.720078 0.83165625 22.991734 1.2226562 24.177734 C 1.8696563 26.001734 2.8149688 27.737328 4.0429688 29.236328 C 4.6259687 30.086328 5.4782969 30.690313 6.2792969 31.320312 C 7.0672969 31.831312 7.9447969 32.342516 8.8417969 32.603516 C 10.434797 33.186516 12.144359 33.241047 13.818359 33.373047 C 14.838359 33.371047 15.862141 33.299141 16.869141 33.119141 C 17.775141 33.217141 18.427094 32.442563 19.246094 32.851562 C 19.742094 32.411563 20.464938 32.603203 20.960938 32.283203 C 21.327938 31.035203 19.700547 32.035781 19.185547 31.425781 C 18.625547 32.083781 18.155562 31.353594 17.476562 31.558594 C 16.320563 31.616594 17.564156 31.040719 17.535156 30.511719 C 16.922156 30.041719 16.229891 31.157031 15.837891 31.457031 C 14.869891 31.282031 13.911437 31.006891 13.023438 30.587891 C 12.011437 30.060891 11.018156 29.433922 10.285156 28.544922 C 9.5181563 27.636922 8.6703125 26.718734 8.3203125 25.552734 C 7.5803125 23.627734 7.6284531 21.543484 7.4394531 19.521484 C 7.5094531 18.152484 8.9550781 19.668828 9.5800781 19.173828 C 9.3660781 18.463828 8.2257031 18.239078 7.5957031 17.955078 C 6.9877031 17.913078 6.7661406 17.368219 6.1191406 17.324219 C 6.1501406 16.564219 4.9303281 16.982406 4.4863281 16.441406 C 4.9233281 15.313406 3.0385469 16.468187 3.1855469 15.492188 C 3.4925469 14.857687 3.024625 14.594031 2.609375 14.628906 z M 2.6152344 14.724609 C 2.7137969 14.700016 2.8271562 14.719797 2.9414062 14.810547 C 3.4834062 15.540547 1.9445156 14.726828 2.4785156 15.423828 C 2.1537656 15.271578 2.3195469 14.798391 2.6152344 14.724609 z M 41.914062 15.085938 C 41.847063 15.085938 41.671672 15.177281 41.388672 15.363281 C 41.038672 15.589281 40.669203 15.767484 40.283203 15.896484 C 40.041203 15.979484 39.921875 16.095141 39.921875 16.244141 C 39.921875 16.347141 40.005781 16.427375 40.175781 16.484375 C 40.536781 16.603375 40.773719 16.767516 40.886719 16.978516 C 40.969719 17.143516 41.011719 17.436375 41.011719 17.859375 L 41.011719 24.615234 C 41.011719 25.207234 40.868938 25.539328 40.585938 25.611328 C 40.270937 25.693328 40.113281 25.814609 40.113281 25.974609 C 40.113281 26.041609 40.118906 26.094859 40.128906 26.130859 C 40.153906 26.233859 40.321859 26.272094 40.630859 26.246094 C 41.857859 26.148094 42.729141 26.123922 43.244141 26.169922 C 43.409141 26.185922 43.509828 26.178391 43.548828 26.150391 C 43.587828 26.122391 43.607422 26.048687 43.607422 25.929688 C 43.607422 25.779687 43.486141 25.689203 43.244141 25.658203 C 42.852141 25.617203 42.602141 25.560281 42.494141 25.488281 C 42.340141 25.385281 42.256094 25.169844 42.246094 24.839844 C 42.236094 24.509844 42.232422 24.257031 42.232422 24.082031 C 42.232422 23.835031 42.353703 23.643766 42.595703 23.509766 C 42.811703 23.354766 42.962781 23.277344 43.050781 23.277344 C 43.122781 23.277344 43.182516 23.320344 43.228516 23.402344 C 43.795516 24.361344 44.486781 25.278297 45.300781 26.154297 C 45.423781 26.283297 45.630922 26.318719 45.919922 26.261719 C 46.502922 26.215719 46.972984 26.190547 47.333984 26.185547 C 47.575984 26.175547 47.697266 26.078437 47.697266 25.898438 C 47.697266 25.754437 47.668328 25.665812 47.611328 25.632812 C 47.554328 25.599812 47.408875 25.582031 47.171875 25.582031 C 46.852875 25.582031 46.508578 25.425328 46.142578 25.111328 C 45.570578 24.612328 44.962359 23.871578 44.318359 22.892578 C 44.143359 22.619578 44.056641 22.447 44.056641 22.375 C 44.056641 22.329 44.076188 22.290766 44.117188 22.259766 C 44.673188 21.703766 45.1975 21.313797 45.6875 21.091797 C 46.0385 20.926797 46.411594 20.835313 46.808594 20.820312 C 47.061594 20.805312 47.1875 20.710156 47.1875 20.535156 C 47.1875 20.349156 47.107266 20.253047 46.947266 20.248047 C 46.458266 20.248047 45.965703 20.245234 45.470703 20.240234 C 44.759703 20.235234 44.218656 20.20825 43.847656 20.15625 C 43.682656 20.13025 43.591172 20.208672 43.576172 20.388672 C 43.566172 20.568672 43.652031 20.668453 43.832031 20.689453 C 44.249031 20.746453 44.457031 20.843422 44.457031 20.982422 C 44.457031 21.059422 44.395484 21.163969 44.271484 21.292969 C 43.647484 21.833969 43.123312 22.270469 42.695312 22.605469 C 42.535313 22.739469 42.416844 22.806641 42.339844 22.806641 C 42.267844 22.806641 42.230469 22.739469 42.230469 22.605469 L 42.216797 17.767578 C 42.216797 17.133578 42.219609 16.627953 42.224609 16.251953 C 42.229609 15.705953 42.232422 15.450328 42.232422 15.486328 C 42.232422 15.218328 42.125062 15.085938 41.914062 15.085938 z M 24.267578 15.140625 C 24.185578 15.140625 23.988688 15.231969 23.679688 15.417969 C 23.303688 15.654969 22.939844 15.830359 22.589844 15.943359 C 22.357844 16.020359 22.242188 16.137969 22.242188 16.292969 C 22.242187 16.395969 22.322422 16.47425 22.482422 16.53125 C 22.786422 16.63925 22.998141 16.792281 23.119141 16.988281 C 23.240141 17.184281 23.302734 17.491203 23.302734 17.908203 L 23.302734 24.902344 C 23.302734 25.324344 23.161859 25.579062 22.880859 25.664062 C 22.599859 25.749063 22.460938 25.852563 22.460938 25.976562 C 22.460938 26.115562 22.484203 26.201422 22.533203 26.232422 C 22.582203 26.262422 22.712828 26.267094 22.923828 26.246094 C 23.975828 26.158094 24.855406 26.149797 25.566406 26.216797 C 25.798406 26.241797 25.914062 26.151312 25.914062 25.945312 C 25.914062 25.796312 25.799406 25.708594 25.566406 25.683594 C 25.190406 25.637594 24.924531 25.542391 24.769531 25.400391 C 24.614531 25.258391 24.537109 25.030797 24.537109 24.716797 L 24.507812 17.814453 C 24.501812 17.320453 24.506484 16.816641 24.521484 16.306641 C 24.542484 15.770641 24.552734 15.512203 24.552734 15.533203 C 24.552734 15.270203 24.458578 15.140625 24.267578 15.140625 z M 13.988281 15.953125 C 13.931281 15.963125 13.891234 16.017234 13.865234 16.115234 C 13.814234 16.275234 13.891656 16.401141 14.097656 16.494141 C 14.426656 16.644141 14.652437 16.811141 14.773438 16.994141 C 14.894438 17.177141 14.955078 17.439297 14.955078 17.779297 L 14.955078 24.396484 C 14.955078 25.226484 14.702266 25.669563 14.197266 25.726562 C 13.976266 25.747563 13.865234 25.823031 13.865234 25.957031 C 13.865234 26.169031 13.975266 26.259516 14.197266 26.228516 C 14.990266 26.120516 15.99775 26.116844 17.21875 26.214844 C 17.64075 26.250844 17.867438 26.183672 17.898438 26.013672 C 17.929437 25.818672 17.818406 25.707641 17.566406 25.681641 C 17.072406 25.619641 16.750563 25.549656 16.601562 25.472656 C 16.410562 25.379656 16.314453 25.203312 16.314453 24.945312 L 16.314453 21.46875 C 16.314453 21.40275 16.360125 21.367188 16.453125 21.367188 C 17.272125 21.367187 17.865516 21.389594 18.228516 21.433594 C 18.591516 21.477594 18.840609 21.822797 18.974609 22.466797 C 19.011609 22.636797 19.100141 22.712266 19.244141 22.697266 C 19.419141 22.687266 19.505 22.616422 19.5 22.482422 C 19.448 21.359422 19.494672 20.447094 19.638672 19.746094 C 19.664672 19.622094 19.589063 19.541859 19.414062 19.505859 C 19.208063 19.459859 19.088734 19.540094 19.052734 19.746094 C 18.995734 20.123094 18.937906 20.355313 18.878906 20.445312 C 18.819906 20.535312 18.703203 20.590328 18.533203 20.611328 C 17.662203 20.668328 16.998062 20.700078 16.539062 20.705078 C 16.390062 20.710078 16.316406 20.654156 16.316406 20.535156 L 16.316406 17.033203 C 16.316406 16.914203 16.340578 16.836781 16.392578 16.800781 C 16.475578 16.743781 16.651922 16.716797 16.919922 16.716797 C 18.089922 16.716797 18.819281 16.739156 19.113281 16.785156 C 19.386281 16.821156 19.606484 16.928516 19.771484 17.103516 C 19.911484 17.252516 20.057891 17.514625 20.212891 17.890625 C 20.268891 18.029625 20.369672 18.099609 20.513672 18.099609 C 20.657672 18.099609 20.728516 18.019375 20.728516 17.859375 C 20.748516 17.045375 20.802625 16.466094 20.890625 16.121094 C 20.895625 16.100094 20.898391 16.080687 20.900391 16.054688 C 20.900391 15.977687 20.727812 15.94775 20.382812 15.96875 C 19.346812 16.03075 18.117313 16.0625 16.695312 16.0625 C 15.489312 16.0625 14.723437 16.036375 14.398438 15.984375 C 14.176438 15.948375 14.040281 15.938125 13.988281 15.953125 z M 3.7910156 16.136719 C 3.9290156 16.165969 3.9766563 16.248328 3.5976562 16.298828 L 3.4453125 16.291016 C 3.4253125 16.131516 3.6530156 16.107469 3.7910156 16.136719 z M 3.6386719 16.669922 C 3.9126719 16.789922 4.4744063 16.845484 4.5664062 17.146484 C 4.0054062 16.854484 4.6780313 17.498328 4.2070312 17.486328 C 3.9530312 17.489328 3.4826719 16.943922 3.6386719 16.669922 z M 3.4980469 17.123047 C 4.1330469 17.606047 3.1441875 17.122781 2.7421875 17.425781 C 2.1091875 17.489781 3.4360469 17.069047 3.4980469 17.123047 z M 5.1757812 17.412109 C 5.2568125 17.434484 5.2567969 17.511125 5.1230469 17.671875 C 5.6150469 18.259875 5.2334375 18.061531 4.8984375 17.644531 C 5.1924375 17.847531 4.9656719 18.724094 4.5136719 18.121094 C 4.1936719 17.525094 3.9910781 17.927937 4.3300781 18.335938 C 3.9970781 17.708938 3.033125 17.976797 2.328125 18.216797 C 1.873125 18.166797 3.5105 17.828047 3.6875 17.748047 C 3.96125 17.753297 4.9326875 17.344984 5.1757812 17.412109 z M 7.1484375 18.076172 C 7.3495469 18.073578 7.5478906 18.081156 7.7441406 18.097656 C 8.0591406 18.464656 7.5056875 19.085953 6.9296875 19.126953 C 6.2296875 19.388953 5.5171875 19.453063 4.8671875 19.539062 C 4.0331875 19.434063 3.4343125 20.184297 2.5703125 20.279297 C 2.8003125 19.853297 2.3813594 20.132328 1.9433594 20.111328 C 2.1663594 20.971328 0.40035938 19.882781 1.4433594 19.675781 C 0.66135938 19.397781 0.65042188 20.2195 0.73242188 20.6875 L 0.6796875 20.6875 C -0.0363125 19.7655 0.76001562 19.389484 1.6660156 19.271484 C 1.4940156 19.696484 1.9134062 19.833156 2.3164062 19.910156 C 2.9694063 19.730156 1.8868594 19.614359 2.3808594 19.443359 C 2.6518594 19.393359 1.5168906 19.171922 2.4628906 19.044922 C 3.4328906 18.881922 4.3055781 18.500781 5.2675781 18.300781 C 5.9185781 18.171781 6.5451094 18.083953 7.1484375 18.076172 z M 6.9335938 18.294922 C 6.8479687 18.268297 6.648875 18.321844 6.546875 18.589844 C 6.620875 18.758844 6.6575781 18.540422 6.6425781 18.482422 C 6.9920781 18.428922 7.0192188 18.321547 6.9335938 18.294922 z M 4.9160156 18.654297 C 4.6361406 18.641422 4.177625 18.701984 4.015625 18.896484 C 4.221625 18.990484 4.4481406 18.636375 4.7441406 18.859375 C 5.2966406 18.754375 5.1958906 18.667172 4.9160156 18.654297 z M 8.9121094 18.705078 C 9.052002 18.682236 9.4851562 18.843984 9.3320312 19.115234 C 9.2270312 19.145234 9.2449687 18.986937 9.1679688 18.960938 C 8.8507188 18.799312 8.8281738 18.718783 8.9121094 18.705078 z M 3.4863281 19.080078 C 3.4131875 19.08 3.3546563 19.113125 3.3476562 19.203125 L 3.4882812 19.332031 C 4.0500312 19.377781 3.70575 19.080313 3.4863281 19.080078 z M 3.171875 19.337891 C 3.0675937 19.322656 2.9709687 19.380422 2.9179688 19.576172 C 3.0159688 19.552172 3.171625 19.608688 3.265625 19.679688 C 3.858125 20.084688 3.4847187 19.383594 3.171875 19.337891 z M 6.9824219 19.433594 C 7.5024453 19.33182 7.3507187 20.677922 7.1835938 21.091797 C 7.4985937 20.876797 7.4379375 22.090969 7.3359375 22.542969 C 7.5079375 22.311969 7.5787188 22.91675 7.3867188 23.34375 C 7.4027188 23.27375 7.8028125 23.21275 7.5078125 23.71875 C 7.2828125 23.22275 7.1850781 24.727734 7.3300781 24.052734 C 7.7270781 23.414734 7.6231406 24.018781 7.7441406 24.300781 C 7.8221406 24.885781 8.0831094 25.425359 8.1621094 25.943359 C 8.5291094 26.313359 8.0058125 26.0625 8.0078125 26.5625 C 8.1268125 26.4175 8.612375 26.766156 8.609375 27.285156 C 8.649375 26.462156 8.6966563 27.092641 9.0976562 27.306641 C 9.4326562 27.846641 9.6835938 28.351875 10.183594 28.796875 C 10.573594 29.247875 10.159125 28.931031 10.328125 29.207031 C 10.742125 29.941031 11.70125 30.366594 12.53125 30.558594 C 12.89525 31.032594 13.441641 31.504062 14.181641 31.289062 C 13.555641 31.675063 15.944719 31.780047 15.136719 31.998047 C 14.716719 32.226047 14.318203 31.851094 13.908203 31.871094 C 13.338203 31.675094 12.437172 31.074422 11.826172 31.482422 C 10.981172 32.011422 12.259219 30.892578 11.574219 31.392578 C 10.880219 32.225578 11.102781 30.874297 10.425781 31.279297 C 10.386781 31.150297 9.824 31.114719 10.25 30.886719 C 9.868 30.862719 10.106141 30.838203 10.244141 30.533203 C 10.080141 30.499203 9.1685469 30.531422 8.8105469 30.232422 C 8.3885469 29.683422 8.8842188 29.906328 9.3242188 29.986328 C 8.6182188 30.110328 9.5670625 30.516016 10.039062 30.291016 C 9.8270625 30.201016 9.5844375 29.742797 9.0234375 29.341797 C 8.2394375 28.869797 7.59425 28.644578 6.78125 28.267578 C 5.90125 27.745578 6.9782031 28.082422 7.2832031 28.357422 C 8.1612031 28.744422 7.8156406 27.814266 7.3066406 27.572266 C 6.7486406 27.595266 6.6052031 26.954234 6.1582031 26.990234 C 6.8642031 27.103234 7.3543594 26.807656 6.5683594 26.097656 C 5.8213594 25.225656 6.8803125 26.755594 6.4453125 26.558594 C 6.2473125 26.297594 6.3956719 25.922109 5.7636719 25.787109 C 5.7566719 26.028109 5.6770625 26.401531 5.5390625 25.894531 C 5.3630625 25.924531 5.1615781 26.117703 5.0175781 25.595703 C 5.1535781 25.002703 4.4303594 24.867281 4.3183594 24.488281 C 4.9433594 24.887281 5.2262031 24.572719 4.7832031 24.136719 C 4.4782031 23.603719 4.435625 24.021703 4.265625 24.095703 C 3.652625 24.721703 4.2095 23.015812 3.9375 23.507812 C 3.6635 23.499813 3.8211719 23.809359 3.8261719 24.193359 C 2.9301719 23.971359 4.0437344 24.664875 4.3027344 25.046875 C 3.8937344 24.618875 3.9630938 25.367719 3.6210938 25.011719 C 3.5050937 24.696719 3.4889219 24.199328 2.9199219 24.111328 C 3.5669219 23.887328 2.5350938 23.432203 2.6210938 23.408203 C 2.9910937 23.071203 3.038375 22.608031 3.484375 23.332031 C 2.919375 23.286031 3.4684219 24.264656 3.6074219 23.972656 C 3.5854219 23.471656 3.838375 22.945844 2.984375 22.714844 C 2.733375 23.052844 2.3007344 22.052672 2.8027344 22.263672 C 2.7367344 21.599672 3.5813437 21.991125 3.5273438 21.703125 C 3.9633438 21.512125 2.9995312 20.895437 3.5195312 20.648438 C 3.9175312 20.890438 4.9498594 20.267641 4.2558594 20.181641 C 4.6898594 20.177641 5.0379844 20.367734 5.0839844 19.927734 C 5.4349844 20.003734 6.3844844 20.306078 5.5214844 19.830078 C 5.7974844 19.693078 6.3807969 19.577266 6.7167969 19.572266 C 6.8204219 19.491641 6.9081328 19.448133 6.9824219 19.433594 z M 36.621094 19.992188 C 35.957094 19.992188 35.426297 20.140453 35.029297 20.439453 C 34.601297 20.749453 34.388672 21.181281 34.388672 21.738281 C 34.388672 22.191281 34.525828 22.552312 34.798828 22.820312 C 35.050828 23.072312 35.552687 23.366172 36.304688 23.701172 C 36.824688 23.928172 37.175469 24.126875 37.355469 24.296875 C 37.520469 24.446875 37.603516 24.631516 37.603516 24.853516 C 37.603516 25.358516 37.240672 25.611328 36.513672 25.611328 C 35.652672 25.611328 35.028578 25.274609 34.642578 24.599609 C 34.554578 24.450609 34.448219 24.383437 34.324219 24.398438 C 34.200219 24.408438 34.138672 24.549266 34.138672 24.822266 C 34.138672 25.456266 34.160172 25.810813 34.201172 25.882812 C 34.268172 25.959812 34.510734 26.043719 34.927734 26.136719 C 35.411734 26.239719 35.896859 26.292969 36.380859 26.292969 C 37.107859 26.292969 37.681562 26.130594 38.101562 25.808594 C 38.521563 25.486594 38.730469 25.053812 38.730469 24.507812 C 38.730469 24.013813 38.576531 23.619266 38.269531 23.322266 C 38.032531 23.096266 37.583828 22.839641 36.923828 22.556641 C 36.294828 22.283641 35.896563 22.082125 35.726562 21.953125 C 35.535562 21.803125 35.439453 21.604563 35.439453 21.351562 C 35.439453 20.898562 35.792047 20.671875 36.498047 20.671875 C 37.122047 20.671875 37.637922 21.002969 38.044922 21.667969 C 38.101922 21.760969 38.214766 21.789906 38.384766 21.753906 C 38.543766 21.712906 38.616563 21.658797 38.601562 21.591797 C 38.472563 21.045797 38.386703 20.628844 38.345703 20.339844 C 38.329703 20.241844 38.136625 20.158797 37.765625 20.091797 C 37.420625 20.025797 37.038094 19.992188 36.621094 19.992188 z M 30.1875 20.023438 C 29.5795 20.023438 28.947109 20.197969 28.287109 20.542969 C 27.658109 20.872969 27.34375 21.161203 27.34375 21.408203 C 27.34375 21.804203 27.555516 21.982406 27.978516 21.941406 C 28.349516 21.910406 28.634031 21.695828 28.832031 21.298828 C 29.030031 20.901828 29.240891 20.703125 29.462891 20.703125 C 30.240891 20.703125 30.613031 21.127656 30.582031 21.972656 L 30.568359 22.466797 C 30.563359 22.682797 30.385156 22.825578 30.035156 22.892578 C 27.994156 23.279578 26.974609 23.917594 26.974609 24.808594 C 26.974609 25.277594 27.1285 25.648875 27.4375 25.921875 C 27.7205 26.168875 28.073094 26.292969 28.496094 26.292969 C 28.944094 26.292969 29.390984 26.187562 29.833984 25.976562 C 30.276984 25.765563 30.522359 25.658203 30.568359 25.658203 C 30.630359 25.658203 30.737578 25.757125 30.892578 25.953125 C 31.046578 26.149125 31.224781 26.246094 31.425781 26.246094 C 31.662781 26.246094 31.979047 26.136969 32.373047 25.917969 C 32.767047 25.698969 32.964844 25.535734 32.964844 25.427734 C 32.964844 25.226734 32.889281 25.126 32.738281 25.125 C 32.712281 25.125 32.620937 25.138063 32.460938 25.164062 C 32.300938 25.190062 32.193719 25.203125 32.136719 25.203125 C 31.848719 25.203125 31.705938 25.036172 31.710938 24.701172 L 31.742188 21.515625 C 31.752188 20.520625 31.2335 20.023438 30.1875 20.023438 z M 6.9257812 20.259766 C 6.7942969 20.297453 6.5887187 20.996344 6.7304688 21.246094 C 7.0424688 21.743094 7.3546563 20.024563 7.0976562 20.601562 C 6.9596562 21.336562 6.8185781 21.029422 7.0175781 20.482422 C 7.0055781 20.306672 6.9696094 20.247203 6.9257812 20.259766 z M 2.5351562 20.910156 C 2.5848594 20.907924 2.6721406 20.911906 2.8066406 20.925781 C 3.5006406 20.901781 3.2778125 21.310891 2.8828125 21.337891 C 2.8738125 21.363891 2.5209687 21.25325 2.6679688 21.15625 C 3.6199688 21.277 2.1872344 20.925783 2.5351562 20.910156 z M 4.2832031 21.152344 C 4.3410781 21.282094 4.4392344 21.526266 4.3652344 21.634766 C 4.5602344 21.827766 5.2264062 22.171219 4.6914062 21.699219 C 5.0324062 21.631219 4.6463594 21.523328 4.4433594 21.361328 C 4.2078594 21.007828 4.2253281 21.022594 4.2832031 21.152344 z M 2.0195312 21.169922 C 2.1770313 21.163797 2.3387031 21.244641 2.0332031 21.431641 C 1.7087031 21.269141 1.8620313 21.176047 2.0195312 21.169922 z M 6.4589844 21.625 C 6.448875 21.610625 6.4435781 21.623359 6.4550781 21.693359 C 6.5728281 21.957359 6.4893125 21.668125 6.4589844 21.625 z M 4.09375 21.888672 C 4.18575 22.021672 4.4347812 21.962797 4.5507812 22.091797 C 5.5987812 22.525797 4.45675 21.810672 4.09375 21.888672 z M 3.9296875 21.970703 C 3.8781301 21.982421 3.8873906 22.050922 4.0019531 22.208984 C 4.0739531 22.371984 4.2475781 22.385828 4.3925781 22.423828 C 5.5170781 22.942203 4.1531028 21.919925 3.9296875 21.970703 z M 1.9941406 22.058594 C 2.1650156 22.086469 2.3705312 22.178578 2.1445312 22.267578 L 2.0527344 22.232422 C 1.6872344 22.065922 1.8232656 22.030719 1.9941406 22.058594 z M 3.5839844 22.195312 C 3.5327813 22.197984 3.5767031 22.274828 3.8144531 22.486328 L 3.96875 22.644531 C 4.74875 22.858281 3.7375937 22.187297 3.5839844 22.195312 z M 3.4785156 22.404297 C 3.43825 22.403031 3.8000625 22.789953 3.6328125 22.783203 C 3.0538125 22.360203 3.2901875 22.659375 3.6171875 22.984375 C 3.9721875 23.511375 4.2655 22.670453 3.6875 22.564453 C 3.55 22.448953 3.4919375 22.404719 3.4785156 22.404297 z M 5.9355469 22.955078 C 5.9281875 22.979219 5.9269063 23.060781 5.9414062 23.238281 C 6.0381563 23.326031 5.957625 22.882656 5.9355469 22.955078 z M 6.4472656 23 C 6.3225312 23.00075 6.2288594 23.885063 6.5371094 24.070312 C 6.6641094 24.435312 6.7997031 24.285094 6.8457031 23.871094 C 6.5477031 23.877094 6.9683594 23.222562 6.5683594 23.351562 C 6.5333594 23.096812 6.4888438 22.99975 6.4472656 23 z M 7.3085938 23.019531 C 7.2862187 22.969906 7.2323906 23.078406 7.2128906 23.441406 L 7.2128906 23.544922 C 7.3208906 23.276422 7.3309688 23.069156 7.3085938 23.019531 z M 1.46875 23.048828 C 1.5477813 23.029797 1.99825 23.942109 1.9375 24.193359 C 1.6615 24.097359 1.674875 23.6655 1.546875 23.4375 C 1.458125 23.16525 1.4424062 23.055172 1.46875 23.048828 z M 4.7597656 23.09375 C 4.6867656 23.29675 4.9147344 23.962453 5.0527344 24.189453 C 5.4047344 24.730453 5.2468125 23.893594 5.6328125 24.433594 C 5.4208125 23.959594 5.7325 24.217625 5.6875 24.015625 C 5.5895 23.811625 4.6402656 22.731875 5.0722656 23.546875 C 5.4632656 24.518875 4.8267656 23.42475 4.7597656 23.09375 z M 1.2832031 23.251953 C 1.388877 23.320068 1.6721094 23.780859 1.7246094 24.037109 C 2.1696094 24.573109 1.9940781 24.868391 2.4550781 25.525391 C 1.8620781 25.151391 1.7500469 24.258641 1.3730469 23.681641 C 1.2189219 23.311516 1.2197988 23.211084 1.2832031 23.251953 z M 30.371094 23.373047 C 30.421969 23.376922 30.462141 23.389656 30.494141 23.410156 C 30.559141 23.451156 30.588984 23.535062 30.583984 23.664062 L 30.568359 24.933594 C 30.568359 25.093594 30.408844 25.23075 30.089844 25.34375 C 29.816844 25.44175 29.550969 25.490234 29.292969 25.490234 C 28.648969 25.490234 28.326172 25.194562 28.326172 24.601562 C 28.326172 24.013563 28.947453 23.608719 30.189453 23.386719 C 30.258953 23.373719 30.320219 23.369172 30.371094 23.373047 z M 4.5566406 24.931641 C 4.7951875 25.006508 4.6510156 25.786703 5.0097656 25.892578 C 5.8107656 26.937578 4.4549531 25.923266 4.0019531 25.822266 C 4.0599531 25.819266 3.5998281 25.691484 3.7988281 25.646484 C 3.6538281 25.497484 3.3293125 24.956359 4.0703125 25.318359 C 4.6593125 25.613359 4.7087344 25.414313 4.4277344 24.945312 C 4.4799844 24.923188 4.5225625 24.920945 4.5566406 24.931641 z M 1.8535156 25.083984 C 1.8733438 24.984234 2.2812187 25.640313 2.3554688 25.914062 C 2.5794687 26.627062 3.2805625 27.037766 3.3515625 27.509766 C 4.1285625 27.957766 3.7298125 28.688531 4.3828125 28.894531 C 4.6728125 28.747531 4.7013594 29.774547 5.3183594 29.560547 C 4.9753594 29.721547 5.4627656 29.911938 5.6347656 30.210938 C 6.0237656 30.157937 6.8763438 31.067906 6.0273438 30.753906 C 5.6693438 30.677906 5.424875 30.3055 5.171875 30.0625 C 4.420875 29.5855 3.9334844 28.787437 3.5214844 28.023438 C 2.9904844 27.220438 2.3512812 26.417516 1.9882812 25.478516 C 1.8817813 25.234766 1.8469062 25.117234 1.8535156 25.083984 z M 7.8203125 25.6875 C 7.7807266 25.707779 7.7786563 25.826438 7.8945312 26.085938 L 7.9628906 26.197266 C 8.0572656 25.890391 7.8862891 25.653701 7.8203125 25.6875 z M 5.1191406 26.605469 C 5.3401406 26.653594 5.6726406 26.772328 5.8066406 26.798828 C 5.8436406 26.957828 5.0491406 26.933141 5.7441406 27.244141 C 5.3391406 27.233141 5.2169219 27.202641 5.7949219 27.556641 C 5.5679219 27.738641 6.2525781 27.88325 6.0175781 28.15625 C 6.7145781 28.70025 5.89175 28.294266 5.59375 28.072266 C 5.41775 27.950266 4.7005 27.707828 4.8125 27.548828 C 5.6585 27.992828 5.0272969 27.529375 4.6542969 27.234375 C 5.3362969 27.401375 4.1078125 26.72925 4.7578125 26.90625 C 4.9508125 26.95325 4.4655625 26.508031 5.1015625 26.832031 C 4.7885625 26.579031 4.8981406 26.557344 5.1191406 26.605469 z M 9.3613281 28.310547 C 9.2741875 28.279797 9.3604375 28.617062 9.5546875 28.820312 C 9.9686875 29.313312 9.6537656 28.540422 9.5097656 28.482422 C 9.4397656 28.372172 9.390375 28.320797 9.3613281 28.310547 z M 5.7089844 28.794922 C 5.9394844 28.797422 6.3163281 28.901391 6.5488281 29.025391 C 7.5688281 29.252391 6.3318281 29.525891 5.9238281 29.212891 L 5.7519531 29.175781 C 5.3954531 28.892781 5.4784844 28.792422 5.7089844 28.794922 z M 6.9277344 28.902344 C 7.0125684 28.884238 7.398125 29.042813 7.5625 29.195312 C 8.0515 29.261313 8.0536719 29.484703 7.5136719 29.345703 C 7.4176719 29.286703 7.2628906 29.290016 7.2128906 29.166016 C 6.9346406 28.988266 6.876834 28.913207 6.9277344 28.902344 z M 7.578125 28.910156 C 7.732375 28.907531 7.9849531 28.951359 8.0644531 29.068359 C 9.1354531 29.240359 7.9966875 29.315203 7.6796875 29.033203 C 7.3681875 28.961703 7.423875 28.912781 7.578125 28.910156 z M 7.578125 29.513672 C 7.6939063 29.488078 8.45 29.800219 7.90625 29.730469 L 7.7480469 29.679688 C 7.5722969 29.569438 7.5395312 29.522203 7.578125 29.513672 z M 11.181641 29.695312 C 11.215391 29.707172 11.249688 29.738078 11.273438 29.798828 C 10.992188 29.794328 11.080391 29.659734 11.181641 29.695312 z M 7.5820312 29.988281 C 7.8017344 30.009516 8.6469375 30.471266 7.8984375 30.259766 L 7.7832031 30.214844 L 7.6523438 30.154297 C 7.5040938 30.022547 7.5087969 29.981203 7.5820312 29.988281 z M 9.4003906 31.205078 C 9.5019219 31.188906 10.335703 31.264563 9.6269531 31.257812 C 9.4137031 31.225313 9.3665469 31.210469 9.4003906 31.205078 z M 7.1835938 31.328125 C 7.243625 31.341541 7.3387656 31.370875 7.4785156 31.421875 C 8.3735156 31.974875 9.4053281 32.267359 10.361328 32.693359 C 11.201328 32.803359 12.087063 33.025656 12.914062 32.847656 C 13.604062 33.192656 14.319719 32.758313 15.011719 33.070312 C 13.482719 33.368312 11.909719 33.042078 10.386719 32.830078 C 9.4267187 32.709078 8.5693594 32.310641 7.6933594 31.931641 C 7.5663594 31.871641 7.4462187 31.796563 7.3242188 31.726562 C 6.7222187 31.392563 6.7968125 31.324344 7.3828125 31.652344 C 7.5898125 31.817344 9.058375 32.418484 8.359375 32.021484 C 8.095125 31.955859 6.763375 31.234213 7.1835938 31.328125 z M 12.75 31.59375 C 12.8185 31.63775 12.820859 31.781391 12.818359 31.962891 C 12.358359 32.470891 12.632656 31.75525 12.347656 32.03125 C 12.084656 32.24125 12.147063 31.906172 12.289062 31.826172 C 12.546563 31.605672 12.6815 31.54975 12.75 31.59375 z M 16.583984 31.755859 C 16.994609 31.791234 17.464328 31.886078 17.736328 31.892578 C 17.571328 32.239578 16.551516 31.920719 16.103516 32.011719 L 15.910156 32 L 15.791016 31.980469 C 15.822516 31.744469 16.173359 31.720484 16.583984 31.755859 z M 20.115234 31.867188 C 21.177234 31.866187 20.185266 32.021531 19.697266 32.019531 C 19.143266 31.889531 19.948234 31.893187 20.115234 31.867188 z M 13.71875 32.005859 C 13.80375 31.996234 13.832797 32.06325 13.591797 32.21875 L 13.503906 32.246094 C 13.491906 32.100094 13.63375 32.015484 13.71875 32.005859 z M 13.314453 32.068359 C 13.330078 32.092516 13.295156 32.161687 13.160156 32.304688 C 12.767156 32.330187 13.267578 31.995891 13.314453 32.068359 z M 9.4824219 32.177734 C 9.5783281 32.153641 10.611391 32.451578 10.744141 32.423828 C 11.797141 32.814828 10.115578 32.551031 9.7675781 32.332031 C 9.5233281 32.228781 9.4504531 32.185766 9.4824219 32.177734 z M 14.570312 32.228516 C 14.572594 32.25475 14.517781 32.316234 14.363281 32.427734 L 14.234375 32.511719 C 14.051375 32.384969 14.563469 32.149813 14.570312 32.228516 z"
                      })
                    })
                  }), /* @__PURE__ */ jsx("a", {
                    href: "https://www.sqlalchemy.org",
                    children: /* @__PURE__ */ jsxs("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      opacity: 0.5,
                      fill: "cornflowerBlue",
                      width: "25",
                      height: "25",
                      viewBox: "0 0 128 128",
                      children: [/* @__PURE__ */ jsx("path", {
                        d: "M15.676 69.912c-.671-.107-2.39-.537-3.813-.926L9.27 68.26l1.33-2.444 1.329-2.444-1.074-1.33c-1.518-1.88-3.478-6.002-3.491-7.33-.014-3.103 4.014-7.601 8.956-10.018 3.397-1.665 6.096-1.705 9.48-.12l2.551 1.194.739-1.06c.402-.578.738-1.343.738-1.679s.336-.631.739-.631.738.107.738.228c0 .296-2.967 7.788-3.155 7.976-.081.08-.887-.295-1.8-.832-2.578-1.518-5.814-2.525-8.325-2.592-5.841-.148-7.869 5.56-3.746 10.554l1.45 1.76 3.961-3.21c4.445-3.585 4.955-3.666 8.42-1.275 3.893 2.685 3.96 6.767.2 11.037-3.33 3.8-6.753 4.848-12.635 3.867zm9.964-4.095c1.933-1.517 1.799-4.324-.296-6.553-2.632-2.793-3.45-2.672-8.083 1.195-4.606 3.84-4.633 3.693.873 5.452 3.638 1.181 5.921 1.141 7.506-.094zM63.05 80.614c-1.317-.483-4.862-1.947-7.896-3.263-8.191-3.572-9.346-3.639-11.79-.671-.564.685-1.181 1.114-1.356.94-.524-.524 1.034-3.035 2.914-4.686 1.53-1.343 2.04-1.531 3.733-1.343 1.074.12 4.646 1.37 7.935 2.766 7.426 3.155 9.601 3.827 12.435 3.827 3.45 0 5.223-2.417 4.135-5.626-.268-.806-.188-1.075.35-1.075 1.006 0 1.517 3.76.792 5.922-.31.926-1.209 2.242-2.001 2.9-1.182.994-1.934 1.209-4.15 1.195-1.49-.013-3.786-.402-5.102-.886zm-19.135-11.48c-3.048-1.424-5.801-4.136-7.386-7.305-2.537-5.076-1.759-8.325 3.049-12.716 4.041-3.693 7.345-5.13 11.79-5.13 3.208 0 3.893.175 5.974 1.45 4.928 3.049 6.15 8.863 3.183 15.2-3.478 7.44-10.823 11.186-16.61 8.5zm10.205-3.532c2.282-1.128 3.854-6.338 3.209-10.662-.806-5.33-8.016-8.97-13.307-6.713-5.438 2.323-5.519 8.513-.174 14.085 3.732 3.908 6.942 4.928 10.272 3.29zM64.473 70.114c0-.229.845-.631 1.893-.887l1.893-.47.403-6.82c.443-7.547.12-14.973-.698-15.966-.296-.35-1.195-.78-2.014-.967-3.33-.739-1.115-1.249 5.344-1.249 6.459 0 8.513.47 5.438 1.249-2.645.658-2.659.698-2.659 11.467 0 5.975.215 10.474.524 11.051.43.806 1.074.98 3.545.98 5.102 0 6.861-1.208 8.245-5.68.416-1.342 1.49-1.1 1.114.256-.175.63-.456 2.55-.631 4.296l-.322 3.156H75.51c-6.07 0-11.037-.188-11.037-.416z"
                      }), /* @__PURE__ */ jsx("path", {
                        d: "M89.542 69.791c0-.402.39-.805 1.034-1.114.86-.403 1.423-1.249 3.464-5.237 3.236-6.31 8.339-17.147 8.822-18.772.376-1.235.457-1.302 1.853-1.463.806-.094 1.477-.148 1.49-.121.014.027 1.129 2.47 2.485 5.438 1.343 2.967 4.042 8.607 6.002 12.528 3.277 6.593 3.64 7.184 4.74 7.72.672.323 1.195.82 1.195 1.115 0 .47-.577.524-5.545.524-4.982 0-5.546-.054-5.546-.537 0-.322.43-.671 1.114-.9.632-.201 1.115-.577 1.115-.859 0-.269-.658-2.041-1.464-3.934l-1.463-3.451H97.746l-1.06 2.336c-1.988 4.378-2.028 5.412-.175 5.908.927.255 1.182.457 1.074.873-.12.484-.604.55-4.095.55-3.747.028-3.948 0-3.948-.604zm18.181-10.863c.188-.335-3.988-9.453-4.377-9.547-.282-.08-4.606 8.836-4.606 9.507 0 .336 8.782.376 8.983.04z"
                      })]
                    })
                  }), /* @__PURE__ */ jsx("a", {
                    href: "https://www.postgresql.org",
                    children: /* @__PURE__ */ jsx("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "cornflowerBlue",
                      x: "0px",
                      y: "0px",
                      width: "25",
                      height: "25",
                      viewBox: "0 0 24 24",
                      children: /* @__PURE__ */ jsx("path", {
                        d: "M 13 2 C 9.28125 2 8.316406 4.828125 7.992188 6.46875 C 8.4375 6.277344 9.535156 6 10 6 L 10.019531 6 C 11.164063 6.007813 11.519531 6.332031 11.75 7.390625 C 11.917969 8.167969 12.003906 9.378906 12 10 C 11.996094 11.359375 11.667969 12.296875 11.425781 12.925781 L 11.347656 13.128906 C 11.289063 13.296875 11.21875 13.453125 11.15625 13.597656 C 11.09375 13.75 11.039063 13.882813 11 14 C 11.242188 14.054688 11.433594 14.132813 11.5625 14.1875 L 11.636719 14.222656 C 11.660156 14.234375 11.683594 14.242188 11.703125 14.257813 C 12.128906 14.515625 12 15.109375 12 15.578125 C 12 15.96875 12.011719 17.523438 12 19.003906 C 12.042969 19.644531 12.207031 20.183594 12.347656 20.578125 C 12.554688 21.132813 13.019531 21.957031 14 22 C 14.773438 22.035156 15.890625 21.628906 16 20.003906 L 16 16.003906 C 16.074219 14.667969 17.605469 14.136719 18 13.84375 C 17.945313 13.769531 17.734375 13.117188 17.511719 12.769531 L 17.46875 12.6875 C 17.4375 12.609375 17.355469 12.46875 17.253906 12.28125 C 16.664063 11.210938 15.429688 8.464844 16.273438 7.058594 C 16.640625 6.441406 17 6.085938 18 6 C 17.59375 4.839844 16.46875 2.058594 13 2 Z M 6.4375 2 C 4.566406 2.070313 2 3.230469 2 7.011719 C 2 9.574219 3.742188 17 6.492188 17 C 6.617188 17 6.742188 16.957031 6.871094 16.890625 C 6.628906 16.679688 6.453125 16.40625 6.429688 16.046875 C 6.386719 15.320313 6.914063 14.808594 8.050781 14.519531 C 8.105469 14.511719 8.394531 14.425781 9.03125 14.066406 C 8.695313 13.921875 8.34375 13.726563 8.054688 13.425781 C 7.261719 12.597656 6.859375 11.4375 7.007813 10.394531 C 7.148438 9.378906 7.066406 8.382813 7.023438 7.851563 L 7.019531 7.800781 L 7.007813 7.625 L 6.984375 7.257813 L 7.015625 6.273438 C 7.339844 4.609375 8.019531 3.320313 9 2.429688 C 8.257813 2.1875 7.324219 1.96875 6.4375 2 Z M 16.933594 2.003906 C 16.742188 2.007813 16.5625 2.023438 16.386719 2.042969 C 17.390625 2.742188 18.3125 3.871094 18.941406 5.671875 L 18.984375 7.046875 C 18.988281 7.09375 18.996094 7.140625 19.003906 7.1875 C 19.035156 7.359375 19.074219 7.59375 19.042969 7.875 C 19.003906 8.195313 18.964844 8.523438 18.953125 8.851563 C 18.945313 9.175781 18.988281 9.492188 19.035156 9.828125 C 19.121094 10.425781 19.074219 11.03125 18.886719 11.679688 L 18.59375 12.6875 C 18.671875 12.859375 18.746094 13.035156 18.820313 13.21875 C 18.835938 13.265625 18.851563 13.300781 18.863281 13.332031 L 19.191406 13.785156 C 20.957031 12.230469 22 8.976563 22 5.625 C 22 4.976563 21.824219 4.476563 21.597656 4.1875 C 20.257813 2.472656 18.402344 1.980469 16.933594 2.003906 Z M 10 7 C 9.71875 7 8.75 7.230469 8.382813 7.386719 L 8.023438 7.539063 C 8.015625 7.546875 8.007813 7.554688 8.003906 7.5625 C 8.007813 7.617188 8.015625 7.683594 8.023438 7.765625 C 8.066406 8.339844 8.152344 9.40625 7.996094 10.535156 C 7.890625 11.277344 8.191406 12.121094 8.78125 12.734375 C 9.117188 13.085938 9.71875 13.316406 10.15625 13.414063 C 10.183594 13.34375 10.207031 13.285156 10.238281 13.207031 C 10.292969 13.074219 10.355469 12.933594 10.414063 12.777344 L 10.492188 12.566406 C 10.667969 12.109375 10.996094 11.253906 11 9.996094 C 11.003906 9.582031 10.957031 8.828125 10.871094 8.183594 C 10.859375 8.199219 10.851563 8.199219 10.84375 8.21875 C 10.695313 8.367188 10.464844 8.5 10.210938 8.460938 C 9.796875 8.394531 9.480469 7.890625 9.5 7.703125 C 9.523438 7.519531 9.878906 7.421875 10.292969 7.488281 C 10.433594 7.511719 10.566406 7.554688 10.675781 7.601563 C 10.714844 7.632813 10.746094 7.652344 10.78125 7.675781 C 10.777344 7.652344 10.777344 7.625 10.769531 7.601563 C 10.675781 7.160156 10.597656 7.078125 10.59375 7.074219 C 10.589844 7.070313 10.484375 7.003906 10 7 Z M 17.984375 7.011719 C 17.5 7.070313 17.363281 7.199219 17.1875 7.484375 C 17.527344 7.484375 17.773438 7.597656 17.800781 7.808594 C 17.828125 7.988281 17.675781 8.160156 17.609375 8.226563 C 17.46875 8.359375 17.292969 8.449219 17.117188 8.46875 C 17.085938 8.476563 17.054688 8.476563 17.019531 8.476563 C 17.011719 8.476563 17.007813 8.472656 17 8.472656 C 17.058594 9.296875 17.429688 10.410156 17.925781 11.402344 C 18.0625 10.925781 18.117188 10.460938 18.046875 9.96875 C 17.996094 9.605469 17.941406 9.230469 17.953125 8.820313 C 17.96875 8.449219 18.007813 8.101563 18.046875 7.761719 C 18.078125 7.5 17.976563 7.257813 17.984375 7.011719 Z M 20.179688 14.53125 C 20.101563 14.519531 19.992188 14.527344 19.859375 14.554688 C 19.230469 14.683594 18.8125 14.71875 18.503906 14.699219 C 18.394531 14.773438 18.28125 14.84375 18.140625 14.921875 C 17.578125 15.230469 17.078125 15.550781 17.011719 16 L 17.011719 16.582031 C 17.671875 16.613281 18.554688 16.203125 19.0625 15.96875 C 20.019531 15.527344 20.738281 14.605469 20.179688 14.53125 Z M 9.835938 14.761719 C 9.285156 15.089844 8.664063 15.414063 8.25 15.5 C 6.78125 15.890625 7.691406 16.347656 8.210938 16.398438 C 8.765625 16.535156 10.125 16.84375 11 16.128906 C 11 16.128906 11 16.128906 11 16.125 L 11 15.578125 C 11 15.472656 11.003906 15.367188 11.011719 15.253906 C 11.011719 15.195313 11.015625 15.117188 11.015625 15.046875 C 10.949219 15.019531 10.867188 14.996094 10.777344 14.972656 Z"
                      })
                    })
                  }), /* @__PURE__ */ jsx("a", {
                    href: "https://www.sqlite.org",
                    children: /* @__PURE__ */ jsx("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "cornflowerBlue",
                      x: "0px",
                      y: "0px",
                      width: "25",
                      height: "25",
                      viewBox: "0 0 50 50",
                      children: /* @__PURE__ */ jsx("path", {
                        d: "M 43.640625 1.0019531 C 42.177246 0.96137695 40.611719 1.7683594 39.058594 3.1464844 C 38.689594 3.4744844 38.321078 3.8385625 37.955078 4.2265625 C 33.705078 8.7355625 29.759203 17.086844 28.533203 23.464844 C 29.010203 24.432844 29.384859 25.669281 29.630859 26.613281 C 29.693859 26.855281 29.749922 27.081391 29.794922 27.275391 C 29.902922 27.733391 29.960938 28.029297 29.960938 28.029297 C 29.960938 28.029297 29.923578 27.885641 29.767578 27.431641 C 29.737578 27.344641 29.703062 27.250672 29.664062 27.138672 C 29.647063 27.092672 29.625609 27.036562 29.599609 26.976562 C 29.322609 26.331563 28.554797 24.970906 28.216797 24.378906 C 27.927797 25.230906 27.673937 26.027047 27.460938 26.748047 C 28.434938 28.531047 29.027344 31.585937 29.027344 31.585938 C 29.027344 31.585938 28.977422 31.388266 28.732422 30.697266 C 28.515422 30.086266 27.432781 28.188141 27.175781 27.744141 C 26.736781 29.364141 26.56175 30.458609 26.71875 30.724609 C 27.02375 31.240609 27.315313 32.129281 27.570312 33.113281 C 27.659312 33.454281 27.742266 33.806203 27.822266 34.158203 C 27.557266 36.485203 27.495047 38.822719 27.623047 41.136719 C 27.756047 43.644719 28.106906 46.1205 28.503906 48.5625 C 28.545906 48.8195 28.781922 49.005469 29.044922 48.980469 C 29.319922 48.954469 29.522094 48.710547 29.496094 48.435547 C 29.371094 47.104547 29.265266 45.777125 29.197266 44.453125 L 29.257812 45.046875 C 29.162813 43.857875 29.1365 42.577844 29.1875 41.214844 C 29.3685 36.380844 30.482109 30.550609 32.537109 24.474609 C 36.010109 15.302609 40.827328 7.9417344 45.236328 4.4277344 C 41.217328 8.0577344 35.778391 19.807203 34.150391 24.158203 C 32.327391 29.030203 31.034859 33.601422 30.255859 37.982422 C 31.599859 33.875422 35.943359 32.111328 35.943359 32.111328 C 35.943359 32.111328 38.075453 29.482516 40.564453 25.728516 C 39.073453 26.068516 36.622734 26.651094 35.802734 26.996094 C 34.592734 27.504094 34.267578 27.677734 34.267578 27.677734 C 34.267578 27.677734 38.186828 25.289984 41.548828 24.208984 C 46.173828 16.924984 51.212672 6.5767813 46.138672 2.0507812 C 45.359047 1.3555312 44.518652 1.0262988 43.640625 1.0019531 z M 9 3 C 6.79 3 5 4.79 5 7 L 5 40 C 5 42.21 6.79 44 9 44 L 25.849609 44 C 25.749609 43.1 25.680859 42.170234 25.630859 41.240234 C 25.500859 38.920234 25.550781 36.569297 25.800781 34.279297 C 25.740781 34.049297 25.690859 33.829141 25.630859 33.619141 C 25.290859 32.299141 25.06 31.850234 25 31.740234 C 24.55 30.990234 24.470234 30.080703 25.240234 27.220703 C 25.901234 24.955703 28.786375 11.163 36.359375 3 L 9 3 z"
                      })
                    })
                  })]
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "mt-2 text-lg",
                children: [/* @__PURE__ */ jsx("a", {
                  href: "https://arkbites.com",
                  className: "text-blue-400 hover:text-blue-300",
                  children: "Live Website"
                }), " | ", /* @__PURE__ */ jsx("a", {
                  href: "https://github.com/fayfan/Arkbites",
                  className: "text-blue-400 hover:text-blue-300",
                  children: "GitHub"
                })]
              }), /* @__PURE__ */ jsx("p", {
                className: "mt-4 text-xl/8 text-gray-600",
                children: "Arkbites is website with tools for helping players of the mobile game Arknights. Players can create an account to track their operators & materials, make squads with their operators, & favorite their operators."
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents",
              children: [/* @__PURE__ */ jsx("div", {
                className: "w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end",
                children: /* @__PURE__ */ jsx("video", {
                  preload: "auto",
                  autoPlay: true,
                  loop: true,
                  muted: true,
                  src: "../arkbites-video.mp4",
                  className: "w-[37rem] max-w-none rounded-2xl object-cover"
                })
              }), /* @__PURE__ */ jsxs("div", {
                className: "contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "order-first flex w-64 flex-none justify-end self-end lg:w-auto",
                  children: /* @__PURE__ */ jsx("img", {
                    alt: "Arkbites Screenshot 2",
                    src: "../arkbites-screenshot-2.png",
                    className: "w-[24rem] max-w-none flex-none rounded-2xl object-cover"
                  })
                }), /* @__PURE__ */ jsx("div", {
                  className: "flex w-96 flex-auto justify-end lg:w-auto lg:flex-none",
                  children: /* @__PURE__ */ jsx("img", {
                    alt: "Arkbites Screenshot 1",
                    src: "../arkbites-screenshot-1.png",
                    className: "w-[37rem] max-w-none flex-none rounded-2xl object-cover"
                  })
                }), /* @__PURE__ */ jsx("div", {
                  className: "hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none",
                  children: /* @__PURE__ */ jsx("img", {
                    alt: "Arkbites Logo",
                    src: "../arkbites-logo.png",
                    className: "w-[24rem] max-w-none object-cover"
                  })
                })]
              })]
            })]
          })
        })
      }), /* @__PURE__ */ jsx("div", {
        className: "mt-32 overflow-hidden sm:mt-40",
        children: /* @__PURE__ */ jsx("div", {
          className: "mx-auto max-w-7xl px-6 lg:flex lg:px-8",
          children: /* @__PURE__ */ jsxs("div", {
            className: "mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:max-w-none lg:min-w-full lg:flex-none lg:gap-y-8",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "flex flex-col lg:flex-row justify-between",
                children: [/* @__PURE__ */ jsx("h2", {
                  className: "mb-2 lg:mb-0 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl",
                  children: "Museic"
                }), /* @__PURE__ */ jsxs("div", {
                  className: "flex items-end lg:mb-1",
                  children: [/* @__PURE__ */ jsx("a", {
                    href: "https://react.dev",
                    children: /* @__PURE__ */ jsx("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "cornflowerBlue",
                      x: "0px",
                      y: "0px",
                      width: "25",
                      height: "25",
                      viewBox: "0 0 30 30",
                      children: /* @__PURE__ */ jsx("path", {
                        d: "M 10.679688 4.1816406 C 10.068687 4.1816406 9.502 4.3184219 9 4.6074219 C 7.4311297 5.5132122 6.8339651 7.7205462 7.1503906 10.46875 C 4.6127006 11.568833 3 13.188667 3 15 C 3 16.811333 4.6127006 18.431167 7.1503906 19.53125 C 6.8341285 22.279346 7.4311297 24.486788 9 25.392578 C 9.501 25.681578 10.067687 25.818359 10.679688 25.818359 C 11.982314 25.818359 13.48785 25.164589 15 24.042969 C 16.512282 25.164589 18.01964 25.818359 19.322266 25.818359 C 19.933266 25.818359 20.499953 25.681578 21.001953 25.392578 C 22.570814 24.486793 23.167976 22.279432 22.851562 19.53125 C 25.388297 18.431178 27 16.81094 27 15 C 27 13.188667 25.387299 11.568833 22.849609 10.46875 C 23.165872 7.7206538 22.56887 5.5132122 21 4.6074219 C 20.499 4.3174219 19.932312 4.1816406 19.320312 4.1816406 C 18.017686 4.1816406 16.51215 4.8354109 15 5.9570312 C 13.487763 4.8354109 11.981863 4.1816406 10.679688 4.1816406 z M 10.679688 5.9316406 C 11.461321 5.9316406 12.49496 6.3472486 13.617188 7.1171875 C 12.95737 7.7398717 12.311153 8.4479321 11.689453 9.2363281 C 10.681079 9.3809166 9.7303472 9.5916908 8.8496094 9.8554688 C 8.8448793 9.7943902 8.8336776 9.7303008 8.8300781 9.6699219 C 8.7230781 7.8899219 9.114 6.5630469 9.875 6.1230469 C 10.1 5.9930469 10.362688 5.9316406 10.679688 5.9316406 z M 19.320312 5.9316406 C 19.636312 5.9316406 19.9 5.9930469 20.125 6.1230469 C 20.886 6.5620469 21.276922 7.8899219 21.169922 9.6699219 C 21.166295 9.7303008 21.155145 9.7943902 21.150391 9.8554688 C 20.2691 9.5915252 19.317669 9.3809265 18.308594 9.2363281 C 17.686902 8.4480417 17.042616 7.7397993 16.382812 7.1171875 C 17.504962 6.3473772 18.539083 5.9316406 19.320312 5.9316406 z M 15 8.2285156 C 15.27108 8.4752506 15.540266 8.7360345 15.8125 9.0214844 C 15.542718 9.012422 15.274373 9 15 9 C 14.726286 9 14.458598 9.0124652 14.189453 9.0214844 C 14.461446 8.7363308 14.729174 8.4750167 15 8.2285156 z M 15 10.75 C 15.828688 10.75 16.614128 10.796321 17.359375 10.876953 C 17.813861 11.494697 18.261774 12.147811 18.681641 12.875 C 19.084074 13.572033 19.439938 14.285488 19.753906 15 C 19.439896 15.714942 19.084316 16.429502 18.681641 17.126953 C 18.263078 17.852044 17.816279 18.500949 17.363281 19.117188 C 16.591711 19.201607 15.800219 19.25 15 19.25 C 14.171312 19.25 13.385872 19.203679 12.640625 19.123047 C 12.186139 18.505303 11.738226 17.854142 11.318359 17.126953 C 10.915684 16.429502 10.560194 15.714942 10.246094 15 C 10.559972 14.285488 10.915926 13.572033 11.318359 12.875 C 11.737083 12.149909 12.183612 11.499051 12.636719 10.882812 C 13.408289 10.798393 14.199781 10.75 15 10.75 z M 19.746094 11.291016 C 20.142841 11.386804 20.524253 11.490209 20.882812 11.605469 C 20.801579 11.97252 20.702235 12.346608 20.589844 12.724609 C 20.461164 12.483141 20.336375 12.240903 20.197266 12 C 20.054139 11.752196 19.895244 11.529558 19.746094 11.291016 z M 10.251953 11.292969 C 10.103305 11.530776 9.9454023 11.752991 9.8027344 12 C 9.6636666 12.240944 9.5387971 12.483106 9.4101562 12.724609 C 9.29751 12.345829 9.1965499 11.971295 9.1152344 11.603516 C 9.4803698 11.48815 9.86083 11.385986 10.251953 11.292969 z M 7.46875 12.246094 C 7.6794464 13.135714 7.9717297 14.057918 8.3476562 14.998047 C 7.9725263 15.935943 7.6814729 16.856453 7.4707031 17.744141 C 5.7292327 16.903203 4.75 15.856373 4.75 15 C 4.75 14.121 5.701875 13.119266 7.296875 12.322266 C 7.3513169 12.295031 7.4131225 12.272692 7.46875 12.246094 z M 22.529297 12.255859 C 24.270767 13.096797 25.25 14.143627 25.25 15 C 25.25 15.879 24.298125 16.880734 22.703125 17.677734 C 22.648683 17.704969 22.586877 17.727308 22.53125 17.753906 C 22.32043 16.863764 22.030541 15.940699 21.654297 15 C 22.028977 14.062913 22.318703 13.142804 22.529297 12.255859 z M 15 13 C 13.895 13 13 13.895 13 15 C 13 16.105 13.895 17 15 17 C 16.105 17 17 16.105 17 15 C 17 13.895 16.105 13 15 13 z M 9.4101562 17.275391 C 9.5388794 17.516948 9.6655262 17.759008 9.8046875 18 C 9.9476585 18.247625 10.104915 18.470608 10.253906 18.708984 C 9.857159 18.613196 9.4757466 18.509791 9.1171875 18.394531 C 9.1984813 18.02725 9.2976676 17.653633 9.4101562 17.275391 z M 20.589844 17.277344 C 20.702364 17.655759 20.803517 18.02905 20.884766 18.396484 C 20.51963 18.51185 20.13917 18.614014 19.748047 18.707031 C 19.896695 18.469224 20.054598 18.247009 20.197266 18 C 20.336044 17.759557 20.461449 17.518344 20.589844 17.277344 z M 8.8496094 20.144531 C 9.7309004 20.408475 10.682331 20.619073 11.691406 20.763672 C 12.313288 21.552345 12.957085 22.261935 13.617188 22.884766 C 12.495042 23.654481 11.461272 24.070312 10.679688 24.070312 C 10.363687 24.070312 10.1 24.006953 9.875 23.876953 C 9.114 23.437953 8.7230781 22.112031 8.8300781 20.332031 C 8.8337424 20.271023 8.8447938 20.206253 8.8496094 20.144531 z M 21.150391 20.144531 C 21.155182 20.206253 21.166285 20.271023 21.169922 20.332031 C 21.276922 22.112031 20.886 23.436953 20.125 23.876953 C 19.9 24.006953 19.637312 24.070313 19.320312 24.070312 C 18.538728 24.070312 17.504958 23.654609 16.382812 22.884766 C 17.042964 22.261863 17.688542 21.552454 18.310547 20.763672 C 19.318921 20.619083 20.269653 20.408309 21.150391 20.144531 z M 14.1875 20.978516 C 14.457282 20.987578 14.725627 21 15 21 C 15.274373 21 15.542718 20.987578 15.8125 20.978516 C 15.540266 21.263964 15.27108 21.524765 15 21.771484 C 14.72892 21.524749 14.459734 21.263966 14.1875 20.978516 z"
                      })
                    })
                  }), /* @__PURE__ */ jsx("a", {
                    href: "https://html.spec.whatwg.org/multipage",
                    children: /* @__PURE__ */ jsx("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "cornflowerBlue",
                      x: "0px",
                      y: "0px",
                      width: "25",
                      height: "25",
                      viewBox: "0 0 24 24",
                      children: /* @__PURE__ */ jsx("path", {
                        d: "M 21 2 L 3 2 L 5 20 L 12 22 L 19 20 Z M 16.824219 8.082031 L 9.167969 8.082031 L 9.351563 10.261719 L 16.640625 10.261719 L 16.09375 16.699219 L 12 18.003906 L 11.960938 17.988281 L 7.914063 16.699219 L 7.691406 14.074219 L 9.675781 14.074219 L 9.761719 15.09375 L 12.023438 15.59375 L 14.242188 15.09375 L 14.480469 12.339844 L 7.542969 12.339844 L 7.007813 6 L 17.003906 6 Z"
                      })
                    })
                  }), /* @__PURE__ */ jsx("a", {
                    href: "https://www.w3.org/Style/CSS/Overview.en.html",
                    children: /* @__PURE__ */ jsx("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "cornflowerBlue",
                      x: "0px",
                      y: "0px",
                      width: "25",
                      height: "25",
                      viewBox: "0 0 24 24",
                      children: /* @__PURE__ */ jsx("path", {
                        d: "M 3 2 L 5 20 L 11.992188 22 L 19 20 L 21 2 Z M 16.726563 10.347656 L 16.34375 16.589844 L 12.027344 18 L 7.710938 16.589844 L 7.546875 13.605469 L 9.734375 13.605469 L 9.789063 14.960938 L 12.027344 15.722656 L 14.269531 14.960938 L 14.433594 12.519531 L 9.625 12.519531 L 9.515625 10.347656 L 14.539063 10.347656 L 14.703125 8.175781 L 7.164063 8.175781 L 7 6.007813 L 17 6.007813 Z"
                      })
                    })
                  }), /* @__PURE__ */ jsx("a", {
                    href: "https://www.python.org",
                    children: /* @__PURE__ */ jsx("svg", {
                      xmlns: " http://www.w3.org/2000/svg",
                      fill: "cornflowerBlue",
                      x: "0px",
                      y: "0px",
                      width: "25",
                      height: "25",
                      viewBox: "0 0 24 24",
                      children: /* @__PURE__ */ jsx("path", {
                        d: "M 10 2 C 8.25 2 7 3.25 7 5 L 7 7 L 12 7 L 12 8 L 5 8 C 3.1875 8 2 9.28125 2 11 L 2 14 C 2 15.78125 3.1875 17 5 17 L 7 17 L 7 13 C 7 11.898438 7.898438 11 9 11 L 14 11 C 15.101563 11 16 10.101563 16 9 L 16 5 C 16 3.25 14.78125 2 13 2 Z M 9 4 C 9.550781 4 10 4.449219 10 5 C 10 5.550781 9.550781 6 9 6 C 8.449219 6 8 5.550781 8 5 C 8 4.449219 8.449219 4 9 4 Z M 17 6 L 17 10 C 17 11.101563 16.101563 12 15 12 L 10 12 C 8.898438 12 8 12.898438 8 14 L 8 18 C 8 19.75 9.21875 21 11 21 L 14 21 C 15.75 21 17 19.75 17 18 L 17 16 L 12 16 L 12 15 L 19 15 C 20.8125 15 22 13.71875 22 12 L 22 9 C 22 7.21875 20.8125 6 19 6 Z M 15 17 C 15.550781 17 16 17.449219 16 18 C 16 18.550781 15.550781 19 15 19 C 14.449219 19 14 18.550781 14 18 C 14 17.449219 14.449219 17 15 17 Z"
                      })
                    })
                  }), /* @__PURE__ */ jsx("a", {
                    href: "https://flask.palletsprojects.com",
                    children: /* @__PURE__ */ jsx("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "cornflowerBlue",
                      x: "0px",
                      y: "0px",
                      width: "25",
                      height: "25",
                      viewBox: "0 0 50 50",
                      children: /* @__PURE__ */ jsx("path", {
                        d: "M 2.609375 14.628906 C 2.194125 14.663781 1.8316094 14.997641 2.3496094 15.556641 C 3.3446094 16.118641 1.3683125 16.532203 1.9453125 16.908203 C 2.1293125 17.304203 1.9305781 17.745406 1.3925781 17.816406 C 0.60457812 17.884406 0.67926562 18.960484 1.4472656 18.396484 C 2.3042656 18.124484 1.5954062 18.504031 1.1914062 18.582031 C 0.28440625 18.846031 -0.33364063 19.752078 0.19335938 20.580078 C 0.69735938 21.720078 0.83165625 22.991734 1.2226562 24.177734 C 1.8696563 26.001734 2.8149688 27.737328 4.0429688 29.236328 C 4.6259687 30.086328 5.4782969 30.690313 6.2792969 31.320312 C 7.0672969 31.831312 7.9447969 32.342516 8.8417969 32.603516 C 10.434797 33.186516 12.144359 33.241047 13.818359 33.373047 C 14.838359 33.371047 15.862141 33.299141 16.869141 33.119141 C 17.775141 33.217141 18.427094 32.442563 19.246094 32.851562 C 19.742094 32.411563 20.464938 32.603203 20.960938 32.283203 C 21.327938 31.035203 19.700547 32.035781 19.185547 31.425781 C 18.625547 32.083781 18.155562 31.353594 17.476562 31.558594 C 16.320563 31.616594 17.564156 31.040719 17.535156 30.511719 C 16.922156 30.041719 16.229891 31.157031 15.837891 31.457031 C 14.869891 31.282031 13.911437 31.006891 13.023438 30.587891 C 12.011437 30.060891 11.018156 29.433922 10.285156 28.544922 C 9.5181563 27.636922 8.6703125 26.718734 8.3203125 25.552734 C 7.5803125 23.627734 7.6284531 21.543484 7.4394531 19.521484 C 7.5094531 18.152484 8.9550781 19.668828 9.5800781 19.173828 C 9.3660781 18.463828 8.2257031 18.239078 7.5957031 17.955078 C 6.9877031 17.913078 6.7661406 17.368219 6.1191406 17.324219 C 6.1501406 16.564219 4.9303281 16.982406 4.4863281 16.441406 C 4.9233281 15.313406 3.0385469 16.468187 3.1855469 15.492188 C 3.4925469 14.857687 3.024625 14.594031 2.609375 14.628906 z M 2.6152344 14.724609 C 2.7137969 14.700016 2.8271562 14.719797 2.9414062 14.810547 C 3.4834062 15.540547 1.9445156 14.726828 2.4785156 15.423828 C 2.1537656 15.271578 2.3195469 14.798391 2.6152344 14.724609 z M 41.914062 15.085938 C 41.847063 15.085938 41.671672 15.177281 41.388672 15.363281 C 41.038672 15.589281 40.669203 15.767484 40.283203 15.896484 C 40.041203 15.979484 39.921875 16.095141 39.921875 16.244141 C 39.921875 16.347141 40.005781 16.427375 40.175781 16.484375 C 40.536781 16.603375 40.773719 16.767516 40.886719 16.978516 C 40.969719 17.143516 41.011719 17.436375 41.011719 17.859375 L 41.011719 24.615234 C 41.011719 25.207234 40.868938 25.539328 40.585938 25.611328 C 40.270937 25.693328 40.113281 25.814609 40.113281 25.974609 C 40.113281 26.041609 40.118906 26.094859 40.128906 26.130859 C 40.153906 26.233859 40.321859 26.272094 40.630859 26.246094 C 41.857859 26.148094 42.729141 26.123922 43.244141 26.169922 C 43.409141 26.185922 43.509828 26.178391 43.548828 26.150391 C 43.587828 26.122391 43.607422 26.048687 43.607422 25.929688 C 43.607422 25.779687 43.486141 25.689203 43.244141 25.658203 C 42.852141 25.617203 42.602141 25.560281 42.494141 25.488281 C 42.340141 25.385281 42.256094 25.169844 42.246094 24.839844 C 42.236094 24.509844 42.232422 24.257031 42.232422 24.082031 C 42.232422 23.835031 42.353703 23.643766 42.595703 23.509766 C 42.811703 23.354766 42.962781 23.277344 43.050781 23.277344 C 43.122781 23.277344 43.182516 23.320344 43.228516 23.402344 C 43.795516 24.361344 44.486781 25.278297 45.300781 26.154297 C 45.423781 26.283297 45.630922 26.318719 45.919922 26.261719 C 46.502922 26.215719 46.972984 26.190547 47.333984 26.185547 C 47.575984 26.175547 47.697266 26.078437 47.697266 25.898438 C 47.697266 25.754437 47.668328 25.665812 47.611328 25.632812 C 47.554328 25.599812 47.408875 25.582031 47.171875 25.582031 C 46.852875 25.582031 46.508578 25.425328 46.142578 25.111328 C 45.570578 24.612328 44.962359 23.871578 44.318359 22.892578 C 44.143359 22.619578 44.056641 22.447 44.056641 22.375 C 44.056641 22.329 44.076188 22.290766 44.117188 22.259766 C 44.673188 21.703766 45.1975 21.313797 45.6875 21.091797 C 46.0385 20.926797 46.411594 20.835313 46.808594 20.820312 C 47.061594 20.805312 47.1875 20.710156 47.1875 20.535156 C 47.1875 20.349156 47.107266 20.253047 46.947266 20.248047 C 46.458266 20.248047 45.965703 20.245234 45.470703 20.240234 C 44.759703 20.235234 44.218656 20.20825 43.847656 20.15625 C 43.682656 20.13025 43.591172 20.208672 43.576172 20.388672 C 43.566172 20.568672 43.652031 20.668453 43.832031 20.689453 C 44.249031 20.746453 44.457031 20.843422 44.457031 20.982422 C 44.457031 21.059422 44.395484 21.163969 44.271484 21.292969 C 43.647484 21.833969 43.123312 22.270469 42.695312 22.605469 C 42.535313 22.739469 42.416844 22.806641 42.339844 22.806641 C 42.267844 22.806641 42.230469 22.739469 42.230469 22.605469 L 42.216797 17.767578 C 42.216797 17.133578 42.219609 16.627953 42.224609 16.251953 C 42.229609 15.705953 42.232422 15.450328 42.232422 15.486328 C 42.232422 15.218328 42.125062 15.085938 41.914062 15.085938 z M 24.267578 15.140625 C 24.185578 15.140625 23.988688 15.231969 23.679688 15.417969 C 23.303688 15.654969 22.939844 15.830359 22.589844 15.943359 C 22.357844 16.020359 22.242188 16.137969 22.242188 16.292969 C 22.242187 16.395969 22.322422 16.47425 22.482422 16.53125 C 22.786422 16.63925 22.998141 16.792281 23.119141 16.988281 C 23.240141 17.184281 23.302734 17.491203 23.302734 17.908203 L 23.302734 24.902344 C 23.302734 25.324344 23.161859 25.579062 22.880859 25.664062 C 22.599859 25.749063 22.460938 25.852563 22.460938 25.976562 C 22.460938 26.115562 22.484203 26.201422 22.533203 26.232422 C 22.582203 26.262422 22.712828 26.267094 22.923828 26.246094 C 23.975828 26.158094 24.855406 26.149797 25.566406 26.216797 C 25.798406 26.241797 25.914062 26.151312 25.914062 25.945312 C 25.914062 25.796312 25.799406 25.708594 25.566406 25.683594 C 25.190406 25.637594 24.924531 25.542391 24.769531 25.400391 C 24.614531 25.258391 24.537109 25.030797 24.537109 24.716797 L 24.507812 17.814453 C 24.501812 17.320453 24.506484 16.816641 24.521484 16.306641 C 24.542484 15.770641 24.552734 15.512203 24.552734 15.533203 C 24.552734 15.270203 24.458578 15.140625 24.267578 15.140625 z M 13.988281 15.953125 C 13.931281 15.963125 13.891234 16.017234 13.865234 16.115234 C 13.814234 16.275234 13.891656 16.401141 14.097656 16.494141 C 14.426656 16.644141 14.652437 16.811141 14.773438 16.994141 C 14.894438 17.177141 14.955078 17.439297 14.955078 17.779297 L 14.955078 24.396484 C 14.955078 25.226484 14.702266 25.669563 14.197266 25.726562 C 13.976266 25.747563 13.865234 25.823031 13.865234 25.957031 C 13.865234 26.169031 13.975266 26.259516 14.197266 26.228516 C 14.990266 26.120516 15.99775 26.116844 17.21875 26.214844 C 17.64075 26.250844 17.867438 26.183672 17.898438 26.013672 C 17.929437 25.818672 17.818406 25.707641 17.566406 25.681641 C 17.072406 25.619641 16.750563 25.549656 16.601562 25.472656 C 16.410562 25.379656 16.314453 25.203312 16.314453 24.945312 L 16.314453 21.46875 C 16.314453 21.40275 16.360125 21.367188 16.453125 21.367188 C 17.272125 21.367187 17.865516 21.389594 18.228516 21.433594 C 18.591516 21.477594 18.840609 21.822797 18.974609 22.466797 C 19.011609 22.636797 19.100141 22.712266 19.244141 22.697266 C 19.419141 22.687266 19.505 22.616422 19.5 22.482422 C 19.448 21.359422 19.494672 20.447094 19.638672 19.746094 C 19.664672 19.622094 19.589063 19.541859 19.414062 19.505859 C 19.208063 19.459859 19.088734 19.540094 19.052734 19.746094 C 18.995734 20.123094 18.937906 20.355313 18.878906 20.445312 C 18.819906 20.535312 18.703203 20.590328 18.533203 20.611328 C 17.662203 20.668328 16.998062 20.700078 16.539062 20.705078 C 16.390062 20.710078 16.316406 20.654156 16.316406 20.535156 L 16.316406 17.033203 C 16.316406 16.914203 16.340578 16.836781 16.392578 16.800781 C 16.475578 16.743781 16.651922 16.716797 16.919922 16.716797 C 18.089922 16.716797 18.819281 16.739156 19.113281 16.785156 C 19.386281 16.821156 19.606484 16.928516 19.771484 17.103516 C 19.911484 17.252516 20.057891 17.514625 20.212891 17.890625 C 20.268891 18.029625 20.369672 18.099609 20.513672 18.099609 C 20.657672 18.099609 20.728516 18.019375 20.728516 17.859375 C 20.748516 17.045375 20.802625 16.466094 20.890625 16.121094 C 20.895625 16.100094 20.898391 16.080687 20.900391 16.054688 C 20.900391 15.977687 20.727812 15.94775 20.382812 15.96875 C 19.346812 16.03075 18.117313 16.0625 16.695312 16.0625 C 15.489312 16.0625 14.723437 16.036375 14.398438 15.984375 C 14.176438 15.948375 14.040281 15.938125 13.988281 15.953125 z M 3.7910156 16.136719 C 3.9290156 16.165969 3.9766563 16.248328 3.5976562 16.298828 L 3.4453125 16.291016 C 3.4253125 16.131516 3.6530156 16.107469 3.7910156 16.136719 z M 3.6386719 16.669922 C 3.9126719 16.789922 4.4744063 16.845484 4.5664062 17.146484 C 4.0054062 16.854484 4.6780313 17.498328 4.2070312 17.486328 C 3.9530312 17.489328 3.4826719 16.943922 3.6386719 16.669922 z M 3.4980469 17.123047 C 4.1330469 17.606047 3.1441875 17.122781 2.7421875 17.425781 C 2.1091875 17.489781 3.4360469 17.069047 3.4980469 17.123047 z M 5.1757812 17.412109 C 5.2568125 17.434484 5.2567969 17.511125 5.1230469 17.671875 C 5.6150469 18.259875 5.2334375 18.061531 4.8984375 17.644531 C 5.1924375 17.847531 4.9656719 18.724094 4.5136719 18.121094 C 4.1936719 17.525094 3.9910781 17.927937 4.3300781 18.335938 C 3.9970781 17.708938 3.033125 17.976797 2.328125 18.216797 C 1.873125 18.166797 3.5105 17.828047 3.6875 17.748047 C 3.96125 17.753297 4.9326875 17.344984 5.1757812 17.412109 z M 7.1484375 18.076172 C 7.3495469 18.073578 7.5478906 18.081156 7.7441406 18.097656 C 8.0591406 18.464656 7.5056875 19.085953 6.9296875 19.126953 C 6.2296875 19.388953 5.5171875 19.453063 4.8671875 19.539062 C 4.0331875 19.434063 3.4343125 20.184297 2.5703125 20.279297 C 2.8003125 19.853297 2.3813594 20.132328 1.9433594 20.111328 C 2.1663594 20.971328 0.40035938 19.882781 1.4433594 19.675781 C 0.66135938 19.397781 0.65042188 20.2195 0.73242188 20.6875 L 0.6796875 20.6875 C -0.0363125 19.7655 0.76001562 19.389484 1.6660156 19.271484 C 1.4940156 19.696484 1.9134062 19.833156 2.3164062 19.910156 C 2.9694063 19.730156 1.8868594 19.614359 2.3808594 19.443359 C 2.6518594 19.393359 1.5168906 19.171922 2.4628906 19.044922 C 3.4328906 18.881922 4.3055781 18.500781 5.2675781 18.300781 C 5.9185781 18.171781 6.5451094 18.083953 7.1484375 18.076172 z M 6.9335938 18.294922 C 6.8479687 18.268297 6.648875 18.321844 6.546875 18.589844 C 6.620875 18.758844 6.6575781 18.540422 6.6425781 18.482422 C 6.9920781 18.428922 7.0192188 18.321547 6.9335938 18.294922 z M 4.9160156 18.654297 C 4.6361406 18.641422 4.177625 18.701984 4.015625 18.896484 C 4.221625 18.990484 4.4481406 18.636375 4.7441406 18.859375 C 5.2966406 18.754375 5.1958906 18.667172 4.9160156 18.654297 z M 8.9121094 18.705078 C 9.052002 18.682236 9.4851562 18.843984 9.3320312 19.115234 C 9.2270312 19.145234 9.2449687 18.986937 9.1679688 18.960938 C 8.8507188 18.799312 8.8281738 18.718783 8.9121094 18.705078 z M 3.4863281 19.080078 C 3.4131875 19.08 3.3546563 19.113125 3.3476562 19.203125 L 3.4882812 19.332031 C 4.0500312 19.377781 3.70575 19.080313 3.4863281 19.080078 z M 3.171875 19.337891 C 3.0675937 19.322656 2.9709687 19.380422 2.9179688 19.576172 C 3.0159688 19.552172 3.171625 19.608688 3.265625 19.679688 C 3.858125 20.084688 3.4847187 19.383594 3.171875 19.337891 z M 6.9824219 19.433594 C 7.5024453 19.33182 7.3507187 20.677922 7.1835938 21.091797 C 7.4985937 20.876797 7.4379375 22.090969 7.3359375 22.542969 C 7.5079375 22.311969 7.5787188 22.91675 7.3867188 23.34375 C 7.4027188 23.27375 7.8028125 23.21275 7.5078125 23.71875 C 7.2828125 23.22275 7.1850781 24.727734 7.3300781 24.052734 C 7.7270781 23.414734 7.6231406 24.018781 7.7441406 24.300781 C 7.8221406 24.885781 8.0831094 25.425359 8.1621094 25.943359 C 8.5291094 26.313359 8.0058125 26.0625 8.0078125 26.5625 C 8.1268125 26.4175 8.612375 26.766156 8.609375 27.285156 C 8.649375 26.462156 8.6966563 27.092641 9.0976562 27.306641 C 9.4326562 27.846641 9.6835938 28.351875 10.183594 28.796875 C 10.573594 29.247875 10.159125 28.931031 10.328125 29.207031 C 10.742125 29.941031 11.70125 30.366594 12.53125 30.558594 C 12.89525 31.032594 13.441641 31.504062 14.181641 31.289062 C 13.555641 31.675063 15.944719 31.780047 15.136719 31.998047 C 14.716719 32.226047 14.318203 31.851094 13.908203 31.871094 C 13.338203 31.675094 12.437172 31.074422 11.826172 31.482422 C 10.981172 32.011422 12.259219 30.892578 11.574219 31.392578 C 10.880219 32.225578 11.102781 30.874297 10.425781 31.279297 C 10.386781 31.150297 9.824 31.114719 10.25 30.886719 C 9.868 30.862719 10.106141 30.838203 10.244141 30.533203 C 10.080141 30.499203 9.1685469 30.531422 8.8105469 30.232422 C 8.3885469 29.683422 8.8842188 29.906328 9.3242188 29.986328 C 8.6182188 30.110328 9.5670625 30.516016 10.039062 30.291016 C 9.8270625 30.201016 9.5844375 29.742797 9.0234375 29.341797 C 8.2394375 28.869797 7.59425 28.644578 6.78125 28.267578 C 5.90125 27.745578 6.9782031 28.082422 7.2832031 28.357422 C 8.1612031 28.744422 7.8156406 27.814266 7.3066406 27.572266 C 6.7486406 27.595266 6.6052031 26.954234 6.1582031 26.990234 C 6.8642031 27.103234 7.3543594 26.807656 6.5683594 26.097656 C 5.8213594 25.225656 6.8803125 26.755594 6.4453125 26.558594 C 6.2473125 26.297594 6.3956719 25.922109 5.7636719 25.787109 C 5.7566719 26.028109 5.6770625 26.401531 5.5390625 25.894531 C 5.3630625 25.924531 5.1615781 26.117703 5.0175781 25.595703 C 5.1535781 25.002703 4.4303594 24.867281 4.3183594 24.488281 C 4.9433594 24.887281 5.2262031 24.572719 4.7832031 24.136719 C 4.4782031 23.603719 4.435625 24.021703 4.265625 24.095703 C 3.652625 24.721703 4.2095 23.015812 3.9375 23.507812 C 3.6635 23.499813 3.8211719 23.809359 3.8261719 24.193359 C 2.9301719 23.971359 4.0437344 24.664875 4.3027344 25.046875 C 3.8937344 24.618875 3.9630938 25.367719 3.6210938 25.011719 C 3.5050937 24.696719 3.4889219 24.199328 2.9199219 24.111328 C 3.5669219 23.887328 2.5350938 23.432203 2.6210938 23.408203 C 2.9910937 23.071203 3.038375 22.608031 3.484375 23.332031 C 2.919375 23.286031 3.4684219 24.264656 3.6074219 23.972656 C 3.5854219 23.471656 3.838375 22.945844 2.984375 22.714844 C 2.733375 23.052844 2.3007344 22.052672 2.8027344 22.263672 C 2.7367344 21.599672 3.5813437 21.991125 3.5273438 21.703125 C 3.9633438 21.512125 2.9995312 20.895437 3.5195312 20.648438 C 3.9175312 20.890438 4.9498594 20.267641 4.2558594 20.181641 C 4.6898594 20.177641 5.0379844 20.367734 5.0839844 19.927734 C 5.4349844 20.003734 6.3844844 20.306078 5.5214844 19.830078 C 5.7974844 19.693078 6.3807969 19.577266 6.7167969 19.572266 C 6.8204219 19.491641 6.9081328 19.448133 6.9824219 19.433594 z M 36.621094 19.992188 C 35.957094 19.992188 35.426297 20.140453 35.029297 20.439453 C 34.601297 20.749453 34.388672 21.181281 34.388672 21.738281 C 34.388672 22.191281 34.525828 22.552312 34.798828 22.820312 C 35.050828 23.072312 35.552687 23.366172 36.304688 23.701172 C 36.824688 23.928172 37.175469 24.126875 37.355469 24.296875 C 37.520469 24.446875 37.603516 24.631516 37.603516 24.853516 C 37.603516 25.358516 37.240672 25.611328 36.513672 25.611328 C 35.652672 25.611328 35.028578 25.274609 34.642578 24.599609 C 34.554578 24.450609 34.448219 24.383437 34.324219 24.398438 C 34.200219 24.408438 34.138672 24.549266 34.138672 24.822266 C 34.138672 25.456266 34.160172 25.810813 34.201172 25.882812 C 34.268172 25.959812 34.510734 26.043719 34.927734 26.136719 C 35.411734 26.239719 35.896859 26.292969 36.380859 26.292969 C 37.107859 26.292969 37.681562 26.130594 38.101562 25.808594 C 38.521563 25.486594 38.730469 25.053812 38.730469 24.507812 C 38.730469 24.013813 38.576531 23.619266 38.269531 23.322266 C 38.032531 23.096266 37.583828 22.839641 36.923828 22.556641 C 36.294828 22.283641 35.896563 22.082125 35.726562 21.953125 C 35.535562 21.803125 35.439453 21.604563 35.439453 21.351562 C 35.439453 20.898562 35.792047 20.671875 36.498047 20.671875 C 37.122047 20.671875 37.637922 21.002969 38.044922 21.667969 C 38.101922 21.760969 38.214766 21.789906 38.384766 21.753906 C 38.543766 21.712906 38.616563 21.658797 38.601562 21.591797 C 38.472563 21.045797 38.386703 20.628844 38.345703 20.339844 C 38.329703 20.241844 38.136625 20.158797 37.765625 20.091797 C 37.420625 20.025797 37.038094 19.992188 36.621094 19.992188 z M 30.1875 20.023438 C 29.5795 20.023438 28.947109 20.197969 28.287109 20.542969 C 27.658109 20.872969 27.34375 21.161203 27.34375 21.408203 C 27.34375 21.804203 27.555516 21.982406 27.978516 21.941406 C 28.349516 21.910406 28.634031 21.695828 28.832031 21.298828 C 29.030031 20.901828 29.240891 20.703125 29.462891 20.703125 C 30.240891 20.703125 30.613031 21.127656 30.582031 21.972656 L 30.568359 22.466797 C 30.563359 22.682797 30.385156 22.825578 30.035156 22.892578 C 27.994156 23.279578 26.974609 23.917594 26.974609 24.808594 C 26.974609 25.277594 27.1285 25.648875 27.4375 25.921875 C 27.7205 26.168875 28.073094 26.292969 28.496094 26.292969 C 28.944094 26.292969 29.390984 26.187562 29.833984 25.976562 C 30.276984 25.765563 30.522359 25.658203 30.568359 25.658203 C 30.630359 25.658203 30.737578 25.757125 30.892578 25.953125 C 31.046578 26.149125 31.224781 26.246094 31.425781 26.246094 C 31.662781 26.246094 31.979047 26.136969 32.373047 25.917969 C 32.767047 25.698969 32.964844 25.535734 32.964844 25.427734 C 32.964844 25.226734 32.889281 25.126 32.738281 25.125 C 32.712281 25.125 32.620937 25.138063 32.460938 25.164062 C 32.300938 25.190062 32.193719 25.203125 32.136719 25.203125 C 31.848719 25.203125 31.705938 25.036172 31.710938 24.701172 L 31.742188 21.515625 C 31.752188 20.520625 31.2335 20.023438 30.1875 20.023438 z M 6.9257812 20.259766 C 6.7942969 20.297453 6.5887187 20.996344 6.7304688 21.246094 C 7.0424688 21.743094 7.3546563 20.024563 7.0976562 20.601562 C 6.9596562 21.336562 6.8185781 21.029422 7.0175781 20.482422 C 7.0055781 20.306672 6.9696094 20.247203 6.9257812 20.259766 z M 2.5351562 20.910156 C 2.5848594 20.907924 2.6721406 20.911906 2.8066406 20.925781 C 3.5006406 20.901781 3.2778125 21.310891 2.8828125 21.337891 C 2.8738125 21.363891 2.5209687 21.25325 2.6679688 21.15625 C 3.6199688 21.277 2.1872344 20.925783 2.5351562 20.910156 z M 4.2832031 21.152344 C 4.3410781 21.282094 4.4392344 21.526266 4.3652344 21.634766 C 4.5602344 21.827766 5.2264062 22.171219 4.6914062 21.699219 C 5.0324062 21.631219 4.6463594 21.523328 4.4433594 21.361328 C 4.2078594 21.007828 4.2253281 21.022594 4.2832031 21.152344 z M 2.0195312 21.169922 C 2.1770313 21.163797 2.3387031 21.244641 2.0332031 21.431641 C 1.7087031 21.269141 1.8620313 21.176047 2.0195312 21.169922 z M 6.4589844 21.625 C 6.448875 21.610625 6.4435781 21.623359 6.4550781 21.693359 C 6.5728281 21.957359 6.4893125 21.668125 6.4589844 21.625 z M 4.09375 21.888672 C 4.18575 22.021672 4.4347812 21.962797 4.5507812 22.091797 C 5.5987812 22.525797 4.45675 21.810672 4.09375 21.888672 z M 3.9296875 21.970703 C 3.8781301 21.982421 3.8873906 22.050922 4.0019531 22.208984 C 4.0739531 22.371984 4.2475781 22.385828 4.3925781 22.423828 C 5.5170781 22.942203 4.1531028 21.919925 3.9296875 21.970703 z M 1.9941406 22.058594 C 2.1650156 22.086469 2.3705312 22.178578 2.1445312 22.267578 L 2.0527344 22.232422 C 1.6872344 22.065922 1.8232656 22.030719 1.9941406 22.058594 z M 3.5839844 22.195312 C 3.5327813 22.197984 3.5767031 22.274828 3.8144531 22.486328 L 3.96875 22.644531 C 4.74875 22.858281 3.7375937 22.187297 3.5839844 22.195312 z M 3.4785156 22.404297 C 3.43825 22.403031 3.8000625 22.789953 3.6328125 22.783203 C 3.0538125 22.360203 3.2901875 22.659375 3.6171875 22.984375 C 3.9721875 23.511375 4.2655 22.670453 3.6875 22.564453 C 3.55 22.448953 3.4919375 22.404719 3.4785156 22.404297 z M 5.9355469 22.955078 C 5.9281875 22.979219 5.9269063 23.060781 5.9414062 23.238281 C 6.0381563 23.326031 5.957625 22.882656 5.9355469 22.955078 z M 6.4472656 23 C 6.3225312 23.00075 6.2288594 23.885063 6.5371094 24.070312 C 6.6641094 24.435312 6.7997031 24.285094 6.8457031 23.871094 C 6.5477031 23.877094 6.9683594 23.222562 6.5683594 23.351562 C 6.5333594 23.096812 6.4888438 22.99975 6.4472656 23 z M 7.3085938 23.019531 C 7.2862187 22.969906 7.2323906 23.078406 7.2128906 23.441406 L 7.2128906 23.544922 C 7.3208906 23.276422 7.3309688 23.069156 7.3085938 23.019531 z M 1.46875 23.048828 C 1.5477813 23.029797 1.99825 23.942109 1.9375 24.193359 C 1.6615 24.097359 1.674875 23.6655 1.546875 23.4375 C 1.458125 23.16525 1.4424062 23.055172 1.46875 23.048828 z M 4.7597656 23.09375 C 4.6867656 23.29675 4.9147344 23.962453 5.0527344 24.189453 C 5.4047344 24.730453 5.2468125 23.893594 5.6328125 24.433594 C 5.4208125 23.959594 5.7325 24.217625 5.6875 24.015625 C 5.5895 23.811625 4.6402656 22.731875 5.0722656 23.546875 C 5.4632656 24.518875 4.8267656 23.42475 4.7597656 23.09375 z M 1.2832031 23.251953 C 1.388877 23.320068 1.6721094 23.780859 1.7246094 24.037109 C 2.1696094 24.573109 1.9940781 24.868391 2.4550781 25.525391 C 1.8620781 25.151391 1.7500469 24.258641 1.3730469 23.681641 C 1.2189219 23.311516 1.2197988 23.211084 1.2832031 23.251953 z M 30.371094 23.373047 C 30.421969 23.376922 30.462141 23.389656 30.494141 23.410156 C 30.559141 23.451156 30.588984 23.535062 30.583984 23.664062 L 30.568359 24.933594 C 30.568359 25.093594 30.408844 25.23075 30.089844 25.34375 C 29.816844 25.44175 29.550969 25.490234 29.292969 25.490234 C 28.648969 25.490234 28.326172 25.194562 28.326172 24.601562 C 28.326172 24.013563 28.947453 23.608719 30.189453 23.386719 C 30.258953 23.373719 30.320219 23.369172 30.371094 23.373047 z M 4.5566406 24.931641 C 4.7951875 25.006508 4.6510156 25.786703 5.0097656 25.892578 C 5.8107656 26.937578 4.4549531 25.923266 4.0019531 25.822266 C 4.0599531 25.819266 3.5998281 25.691484 3.7988281 25.646484 C 3.6538281 25.497484 3.3293125 24.956359 4.0703125 25.318359 C 4.6593125 25.613359 4.7087344 25.414313 4.4277344 24.945312 C 4.4799844 24.923188 4.5225625 24.920945 4.5566406 24.931641 z M 1.8535156 25.083984 C 1.8733438 24.984234 2.2812187 25.640313 2.3554688 25.914062 C 2.5794687 26.627062 3.2805625 27.037766 3.3515625 27.509766 C 4.1285625 27.957766 3.7298125 28.688531 4.3828125 28.894531 C 4.6728125 28.747531 4.7013594 29.774547 5.3183594 29.560547 C 4.9753594 29.721547 5.4627656 29.911938 5.6347656 30.210938 C 6.0237656 30.157937 6.8763438 31.067906 6.0273438 30.753906 C 5.6693438 30.677906 5.424875 30.3055 5.171875 30.0625 C 4.420875 29.5855 3.9334844 28.787437 3.5214844 28.023438 C 2.9904844 27.220438 2.3512812 26.417516 1.9882812 25.478516 C 1.8817813 25.234766 1.8469062 25.117234 1.8535156 25.083984 z M 7.8203125 25.6875 C 7.7807266 25.707779 7.7786563 25.826438 7.8945312 26.085938 L 7.9628906 26.197266 C 8.0572656 25.890391 7.8862891 25.653701 7.8203125 25.6875 z M 5.1191406 26.605469 C 5.3401406 26.653594 5.6726406 26.772328 5.8066406 26.798828 C 5.8436406 26.957828 5.0491406 26.933141 5.7441406 27.244141 C 5.3391406 27.233141 5.2169219 27.202641 5.7949219 27.556641 C 5.5679219 27.738641 6.2525781 27.88325 6.0175781 28.15625 C 6.7145781 28.70025 5.89175 28.294266 5.59375 28.072266 C 5.41775 27.950266 4.7005 27.707828 4.8125 27.548828 C 5.6585 27.992828 5.0272969 27.529375 4.6542969 27.234375 C 5.3362969 27.401375 4.1078125 26.72925 4.7578125 26.90625 C 4.9508125 26.95325 4.4655625 26.508031 5.1015625 26.832031 C 4.7885625 26.579031 4.8981406 26.557344 5.1191406 26.605469 z M 9.3613281 28.310547 C 9.2741875 28.279797 9.3604375 28.617062 9.5546875 28.820312 C 9.9686875 29.313312 9.6537656 28.540422 9.5097656 28.482422 C 9.4397656 28.372172 9.390375 28.320797 9.3613281 28.310547 z M 5.7089844 28.794922 C 5.9394844 28.797422 6.3163281 28.901391 6.5488281 29.025391 C 7.5688281 29.252391 6.3318281 29.525891 5.9238281 29.212891 L 5.7519531 29.175781 C 5.3954531 28.892781 5.4784844 28.792422 5.7089844 28.794922 z M 6.9277344 28.902344 C 7.0125684 28.884238 7.398125 29.042813 7.5625 29.195312 C 8.0515 29.261313 8.0536719 29.484703 7.5136719 29.345703 C 7.4176719 29.286703 7.2628906 29.290016 7.2128906 29.166016 C 6.9346406 28.988266 6.876834 28.913207 6.9277344 28.902344 z M 7.578125 28.910156 C 7.732375 28.907531 7.9849531 28.951359 8.0644531 29.068359 C 9.1354531 29.240359 7.9966875 29.315203 7.6796875 29.033203 C 7.3681875 28.961703 7.423875 28.912781 7.578125 28.910156 z M 7.578125 29.513672 C 7.6939063 29.488078 8.45 29.800219 7.90625 29.730469 L 7.7480469 29.679688 C 7.5722969 29.569438 7.5395312 29.522203 7.578125 29.513672 z M 11.181641 29.695312 C 11.215391 29.707172 11.249688 29.738078 11.273438 29.798828 C 10.992188 29.794328 11.080391 29.659734 11.181641 29.695312 z M 7.5820312 29.988281 C 7.8017344 30.009516 8.6469375 30.471266 7.8984375 30.259766 L 7.7832031 30.214844 L 7.6523438 30.154297 C 7.5040938 30.022547 7.5087969 29.981203 7.5820312 29.988281 z M 9.4003906 31.205078 C 9.5019219 31.188906 10.335703 31.264563 9.6269531 31.257812 C 9.4137031 31.225313 9.3665469 31.210469 9.4003906 31.205078 z M 7.1835938 31.328125 C 7.243625 31.341541 7.3387656 31.370875 7.4785156 31.421875 C 8.3735156 31.974875 9.4053281 32.267359 10.361328 32.693359 C 11.201328 32.803359 12.087063 33.025656 12.914062 32.847656 C 13.604062 33.192656 14.319719 32.758313 15.011719 33.070312 C 13.482719 33.368312 11.909719 33.042078 10.386719 32.830078 C 9.4267187 32.709078 8.5693594 32.310641 7.6933594 31.931641 C 7.5663594 31.871641 7.4462187 31.796563 7.3242188 31.726562 C 6.7222187 31.392563 6.7968125 31.324344 7.3828125 31.652344 C 7.5898125 31.817344 9.058375 32.418484 8.359375 32.021484 C 8.095125 31.955859 6.763375 31.234213 7.1835938 31.328125 z M 12.75 31.59375 C 12.8185 31.63775 12.820859 31.781391 12.818359 31.962891 C 12.358359 32.470891 12.632656 31.75525 12.347656 32.03125 C 12.084656 32.24125 12.147063 31.906172 12.289062 31.826172 C 12.546563 31.605672 12.6815 31.54975 12.75 31.59375 z M 16.583984 31.755859 C 16.994609 31.791234 17.464328 31.886078 17.736328 31.892578 C 17.571328 32.239578 16.551516 31.920719 16.103516 32.011719 L 15.910156 32 L 15.791016 31.980469 C 15.822516 31.744469 16.173359 31.720484 16.583984 31.755859 z M 20.115234 31.867188 C 21.177234 31.866187 20.185266 32.021531 19.697266 32.019531 C 19.143266 31.889531 19.948234 31.893187 20.115234 31.867188 z M 13.71875 32.005859 C 13.80375 31.996234 13.832797 32.06325 13.591797 32.21875 L 13.503906 32.246094 C 13.491906 32.100094 13.63375 32.015484 13.71875 32.005859 z M 13.314453 32.068359 C 13.330078 32.092516 13.295156 32.161687 13.160156 32.304688 C 12.767156 32.330187 13.267578 31.995891 13.314453 32.068359 z M 9.4824219 32.177734 C 9.5783281 32.153641 10.611391 32.451578 10.744141 32.423828 C 11.797141 32.814828 10.115578 32.551031 9.7675781 32.332031 C 9.5233281 32.228781 9.4504531 32.185766 9.4824219 32.177734 z M 14.570312 32.228516 C 14.572594 32.25475 14.517781 32.316234 14.363281 32.427734 L 14.234375 32.511719 C 14.051375 32.384969 14.563469 32.149813 14.570312 32.228516 z"
                      })
                    })
                  }), /* @__PURE__ */ jsx("a", {
                    href: "https://www.sqlalchemy.org",
                    children: /* @__PURE__ */ jsxs("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      opacity: 0.5,
                      fill: "cornflowerBlue",
                      width: "25",
                      height: "25",
                      viewBox: "0 0 128 128",
                      children: [/* @__PURE__ */ jsx("path", {
                        d: "M15.676 69.912c-.671-.107-2.39-.537-3.813-.926L9.27 68.26l1.33-2.444 1.329-2.444-1.074-1.33c-1.518-1.88-3.478-6.002-3.491-7.33-.014-3.103 4.014-7.601 8.956-10.018 3.397-1.665 6.096-1.705 9.48-.12l2.551 1.194.739-1.06c.402-.578.738-1.343.738-1.679s.336-.631.739-.631.738.107.738.228c0 .296-2.967 7.788-3.155 7.976-.081.08-.887-.295-1.8-.832-2.578-1.518-5.814-2.525-8.325-2.592-5.841-.148-7.869 5.56-3.746 10.554l1.45 1.76 3.961-3.21c4.445-3.585 4.955-3.666 8.42-1.275 3.893 2.685 3.96 6.767.2 11.037-3.33 3.8-6.753 4.848-12.635 3.867zm9.964-4.095c1.933-1.517 1.799-4.324-.296-6.553-2.632-2.793-3.45-2.672-8.083 1.195-4.606 3.84-4.633 3.693.873 5.452 3.638 1.181 5.921 1.141 7.506-.094zM63.05 80.614c-1.317-.483-4.862-1.947-7.896-3.263-8.191-3.572-9.346-3.639-11.79-.671-.564.685-1.181 1.114-1.356.94-.524-.524 1.034-3.035 2.914-4.686 1.53-1.343 2.04-1.531 3.733-1.343 1.074.12 4.646 1.37 7.935 2.766 7.426 3.155 9.601 3.827 12.435 3.827 3.45 0 5.223-2.417 4.135-5.626-.268-.806-.188-1.075.35-1.075 1.006 0 1.517 3.76.792 5.922-.31.926-1.209 2.242-2.001 2.9-1.182.994-1.934 1.209-4.15 1.195-1.49-.013-3.786-.402-5.102-.886zm-19.135-11.48c-3.048-1.424-5.801-4.136-7.386-7.305-2.537-5.076-1.759-8.325 3.049-12.716 4.041-3.693 7.345-5.13 11.79-5.13 3.208 0 3.893.175 5.974 1.45 4.928 3.049 6.15 8.863 3.183 15.2-3.478 7.44-10.823 11.186-16.61 8.5zm10.205-3.532c2.282-1.128 3.854-6.338 3.209-10.662-.806-5.33-8.016-8.97-13.307-6.713-5.438 2.323-5.519 8.513-.174 14.085 3.732 3.908 6.942 4.928 10.272 3.29zM64.473 70.114c0-.229.845-.631 1.893-.887l1.893-.47.403-6.82c.443-7.547.12-14.973-.698-15.966-.296-.35-1.195-.78-2.014-.967-3.33-.739-1.115-1.249 5.344-1.249 6.459 0 8.513.47 5.438 1.249-2.645.658-2.659.698-2.659 11.467 0 5.975.215 10.474.524 11.051.43.806 1.074.98 3.545.98 5.102 0 6.861-1.208 8.245-5.68.416-1.342 1.49-1.1 1.114.256-.175.63-.456 2.55-.631 4.296l-.322 3.156H75.51c-6.07 0-11.037-.188-11.037-.416z"
                      }), /* @__PURE__ */ jsx("path", {
                        d: "M89.542 69.791c0-.402.39-.805 1.034-1.114.86-.403 1.423-1.249 3.464-5.237 3.236-6.31 8.339-17.147 8.822-18.772.376-1.235.457-1.302 1.853-1.463.806-.094 1.477-.148 1.49-.121.014.027 1.129 2.47 2.485 5.438 1.343 2.967 4.042 8.607 6.002 12.528 3.277 6.593 3.64 7.184 4.74 7.72.672.323 1.195.82 1.195 1.115 0 .47-.577.524-5.545.524-4.982 0-5.546-.054-5.546-.537 0-.322.43-.671 1.114-.9.632-.201 1.115-.577 1.115-.859 0-.269-.658-2.041-1.464-3.934l-1.463-3.451H97.746l-1.06 2.336c-1.988 4.378-2.028 5.412-.175 5.908.927.255 1.182.457 1.074.873-.12.484-.604.55-4.095.55-3.747.028-3.948 0-3.948-.604zm18.181-10.863c.188-.335-3.988-9.453-4.377-9.547-.282-.08-4.606 8.836-4.606 9.507 0 .336 8.782.376 8.983.04z"
                      })]
                    })
                  }), /* @__PURE__ */ jsx("a", {
                    href: "https://aws.amazon.com/s3",
                    children: /* @__PURE__ */ jsx("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "cornflowerBlue",
                      x: "0px",
                      y: "0px",
                      width: "25",
                      height: "25",
                      viewBox: "0 0 50 50",
                      children: /* @__PURE__ */ jsx("path", {
                        d: "M 29 7 L 23.308594 9 L 29 11 L 34.691406 9 L 29 7 z M 43 7 L 37.308594 9 L 43 11 L 48.691406 9 L 43 7 z M 23 11 L 23 17.332031 L 28 19 L 28 12.667969 L 23 11 z M 35 11 L 30 12.667969 L 30 19 L 35 17.332031 L 35 11 z M 37 11 L 37 17.332031 L 42 19 L 42 12.667969 L 37 11 z M 49 11 L 44 12.667969 L 44 19 L 49 17.332031 L 49 11 z M 8 19 L 2.3085938 21 L 8 23 L 13.691406 21 L 8 19 z M 22 19 L 16.308594 21 L 22 23 L 27.691406 21 L 22 19 z M 2 23 L 2 29.332031 L 7 31 L 7 24.667969 L 2 23 z M 14 23 L 9 24.667969 L 9 31 L 14 29.332031 L 14 23 z M 16 23 L 16 29.332031 L 21 31 L 21 24.667969 L 16 23 z M 28 23 L 23 24.667969 L 23 31 L 28 29.332031 L 28 23 z M 15 31 L 9.3085938 33 L 15 35 L 20.691406 33 L 15 31 z M 9 35 L 9 41.332031 L 14 43 L 14 36.667969 L 9 35 z M 21 35 L 16 36.667969 L 16 43 L 21 41.332031 L 21 35 z"
                      })
                    })
                  }), /* @__PURE__ */ jsx("a", {
                    href: "https://www.postgresql.org",
                    children: /* @__PURE__ */ jsx("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "cornflowerBlue",
                      x: "0px",
                      y: "0px",
                      width: "25",
                      height: "25",
                      viewBox: "0 0 24 24",
                      children: /* @__PURE__ */ jsx("path", {
                        d: "M 13 2 C 9.28125 2 8.316406 4.828125 7.992188 6.46875 C 8.4375 6.277344 9.535156 6 10 6 L 10.019531 6 C 11.164063 6.007813 11.519531 6.332031 11.75 7.390625 C 11.917969 8.167969 12.003906 9.378906 12 10 C 11.996094 11.359375 11.667969 12.296875 11.425781 12.925781 L 11.347656 13.128906 C 11.289063 13.296875 11.21875 13.453125 11.15625 13.597656 C 11.09375 13.75 11.039063 13.882813 11 14 C 11.242188 14.054688 11.433594 14.132813 11.5625 14.1875 L 11.636719 14.222656 C 11.660156 14.234375 11.683594 14.242188 11.703125 14.257813 C 12.128906 14.515625 12 15.109375 12 15.578125 C 12 15.96875 12.011719 17.523438 12 19.003906 C 12.042969 19.644531 12.207031 20.183594 12.347656 20.578125 C 12.554688 21.132813 13.019531 21.957031 14 22 C 14.773438 22.035156 15.890625 21.628906 16 20.003906 L 16 16.003906 C 16.074219 14.667969 17.605469 14.136719 18 13.84375 C 17.945313 13.769531 17.734375 13.117188 17.511719 12.769531 L 17.46875 12.6875 C 17.4375 12.609375 17.355469 12.46875 17.253906 12.28125 C 16.664063 11.210938 15.429688 8.464844 16.273438 7.058594 C 16.640625 6.441406 17 6.085938 18 6 C 17.59375 4.839844 16.46875 2.058594 13 2 Z M 6.4375 2 C 4.566406 2.070313 2 3.230469 2 7.011719 C 2 9.574219 3.742188 17 6.492188 17 C 6.617188 17 6.742188 16.957031 6.871094 16.890625 C 6.628906 16.679688 6.453125 16.40625 6.429688 16.046875 C 6.386719 15.320313 6.914063 14.808594 8.050781 14.519531 C 8.105469 14.511719 8.394531 14.425781 9.03125 14.066406 C 8.695313 13.921875 8.34375 13.726563 8.054688 13.425781 C 7.261719 12.597656 6.859375 11.4375 7.007813 10.394531 C 7.148438 9.378906 7.066406 8.382813 7.023438 7.851563 L 7.019531 7.800781 L 7.007813 7.625 L 6.984375 7.257813 L 7.015625 6.273438 C 7.339844 4.609375 8.019531 3.320313 9 2.429688 C 8.257813 2.1875 7.324219 1.96875 6.4375 2 Z M 16.933594 2.003906 C 16.742188 2.007813 16.5625 2.023438 16.386719 2.042969 C 17.390625 2.742188 18.3125 3.871094 18.941406 5.671875 L 18.984375 7.046875 C 18.988281 7.09375 18.996094 7.140625 19.003906 7.1875 C 19.035156 7.359375 19.074219 7.59375 19.042969 7.875 C 19.003906 8.195313 18.964844 8.523438 18.953125 8.851563 C 18.945313 9.175781 18.988281 9.492188 19.035156 9.828125 C 19.121094 10.425781 19.074219 11.03125 18.886719 11.679688 L 18.59375 12.6875 C 18.671875 12.859375 18.746094 13.035156 18.820313 13.21875 C 18.835938 13.265625 18.851563 13.300781 18.863281 13.332031 L 19.191406 13.785156 C 20.957031 12.230469 22 8.976563 22 5.625 C 22 4.976563 21.824219 4.476563 21.597656 4.1875 C 20.257813 2.472656 18.402344 1.980469 16.933594 2.003906 Z M 10 7 C 9.71875 7 8.75 7.230469 8.382813 7.386719 L 8.023438 7.539063 C 8.015625 7.546875 8.007813 7.554688 8.003906 7.5625 C 8.007813 7.617188 8.015625 7.683594 8.023438 7.765625 C 8.066406 8.339844 8.152344 9.40625 7.996094 10.535156 C 7.890625 11.277344 8.191406 12.121094 8.78125 12.734375 C 9.117188 13.085938 9.71875 13.316406 10.15625 13.414063 C 10.183594 13.34375 10.207031 13.285156 10.238281 13.207031 C 10.292969 13.074219 10.355469 12.933594 10.414063 12.777344 L 10.492188 12.566406 C 10.667969 12.109375 10.996094 11.253906 11 9.996094 C 11.003906 9.582031 10.957031 8.828125 10.871094 8.183594 C 10.859375 8.199219 10.851563 8.199219 10.84375 8.21875 C 10.695313 8.367188 10.464844 8.5 10.210938 8.460938 C 9.796875 8.394531 9.480469 7.890625 9.5 7.703125 C 9.523438 7.519531 9.878906 7.421875 10.292969 7.488281 C 10.433594 7.511719 10.566406 7.554688 10.675781 7.601563 C 10.714844 7.632813 10.746094 7.652344 10.78125 7.675781 C 10.777344 7.652344 10.777344 7.625 10.769531 7.601563 C 10.675781 7.160156 10.597656 7.078125 10.59375 7.074219 C 10.589844 7.070313 10.484375 7.003906 10 7 Z M 17.984375 7.011719 C 17.5 7.070313 17.363281 7.199219 17.1875 7.484375 C 17.527344 7.484375 17.773438 7.597656 17.800781 7.808594 C 17.828125 7.988281 17.675781 8.160156 17.609375 8.226563 C 17.46875 8.359375 17.292969 8.449219 17.117188 8.46875 C 17.085938 8.476563 17.054688 8.476563 17.019531 8.476563 C 17.011719 8.476563 17.007813 8.472656 17 8.472656 C 17.058594 9.296875 17.429688 10.410156 17.925781 11.402344 C 18.0625 10.925781 18.117188 10.460938 18.046875 9.96875 C 17.996094 9.605469 17.941406 9.230469 17.953125 8.820313 C 17.96875 8.449219 18.007813 8.101563 18.046875 7.761719 C 18.078125 7.5 17.976563 7.257813 17.984375 7.011719 Z M 20.179688 14.53125 C 20.101563 14.519531 19.992188 14.527344 19.859375 14.554688 C 19.230469 14.683594 18.8125 14.71875 18.503906 14.699219 C 18.394531 14.773438 18.28125 14.84375 18.140625 14.921875 C 17.578125 15.230469 17.078125 15.550781 17.011719 16 L 17.011719 16.582031 C 17.671875 16.613281 18.554688 16.203125 19.0625 15.96875 C 20.019531 15.527344 20.738281 14.605469 20.179688 14.53125 Z M 9.835938 14.761719 C 9.285156 15.089844 8.664063 15.414063 8.25 15.5 C 6.78125 15.890625 7.691406 16.347656 8.210938 16.398438 C 8.765625 16.535156 10.125 16.84375 11 16.128906 C 11 16.128906 11 16.128906 11 16.125 L 11 15.578125 C 11 15.472656 11.003906 15.367188 11.011719 15.253906 C 11.011719 15.195313 11.015625 15.117188 11.015625 15.046875 C 10.949219 15.019531 10.867188 14.996094 10.777344 14.972656 Z"
                      })
                    })
                  }), /* @__PURE__ */ jsx("a", {
                    href: "https://www.sqlite.org",
                    children: /* @__PURE__ */ jsx("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "cornflowerBlue",
                      x: "0px",
                      y: "0px",
                      width: "25",
                      height: "25",
                      viewBox: "0 0 50 50",
                      children: /* @__PURE__ */ jsx("path", {
                        d: "M 43.640625 1.0019531 C 42.177246 0.96137695 40.611719 1.7683594 39.058594 3.1464844 C 38.689594 3.4744844 38.321078 3.8385625 37.955078 4.2265625 C 33.705078 8.7355625 29.759203 17.086844 28.533203 23.464844 C 29.010203 24.432844 29.384859 25.669281 29.630859 26.613281 C 29.693859 26.855281 29.749922 27.081391 29.794922 27.275391 C 29.902922 27.733391 29.960938 28.029297 29.960938 28.029297 C 29.960938 28.029297 29.923578 27.885641 29.767578 27.431641 C 29.737578 27.344641 29.703062 27.250672 29.664062 27.138672 C 29.647063 27.092672 29.625609 27.036562 29.599609 26.976562 C 29.322609 26.331563 28.554797 24.970906 28.216797 24.378906 C 27.927797 25.230906 27.673937 26.027047 27.460938 26.748047 C 28.434938 28.531047 29.027344 31.585937 29.027344 31.585938 C 29.027344 31.585938 28.977422 31.388266 28.732422 30.697266 C 28.515422 30.086266 27.432781 28.188141 27.175781 27.744141 C 26.736781 29.364141 26.56175 30.458609 26.71875 30.724609 C 27.02375 31.240609 27.315313 32.129281 27.570312 33.113281 C 27.659312 33.454281 27.742266 33.806203 27.822266 34.158203 C 27.557266 36.485203 27.495047 38.822719 27.623047 41.136719 C 27.756047 43.644719 28.106906 46.1205 28.503906 48.5625 C 28.545906 48.8195 28.781922 49.005469 29.044922 48.980469 C 29.319922 48.954469 29.522094 48.710547 29.496094 48.435547 C 29.371094 47.104547 29.265266 45.777125 29.197266 44.453125 L 29.257812 45.046875 C 29.162813 43.857875 29.1365 42.577844 29.1875 41.214844 C 29.3685 36.380844 30.482109 30.550609 32.537109 24.474609 C 36.010109 15.302609 40.827328 7.9417344 45.236328 4.4277344 C 41.217328 8.0577344 35.778391 19.807203 34.150391 24.158203 C 32.327391 29.030203 31.034859 33.601422 30.255859 37.982422 C 31.599859 33.875422 35.943359 32.111328 35.943359 32.111328 C 35.943359 32.111328 38.075453 29.482516 40.564453 25.728516 C 39.073453 26.068516 36.622734 26.651094 35.802734 26.996094 C 34.592734 27.504094 34.267578 27.677734 34.267578 27.677734 C 34.267578 27.677734 38.186828 25.289984 41.548828 24.208984 C 46.173828 16.924984 51.212672 6.5767813 46.138672 2.0507812 C 45.359047 1.3555312 44.518652 1.0262988 43.640625 1.0019531 z M 9 3 C 6.79 3 5 4.79 5 7 L 5 40 C 5 42.21 6.79 44 9 44 L 25.849609 44 C 25.749609 43.1 25.680859 42.170234 25.630859 41.240234 C 25.500859 38.920234 25.550781 36.569297 25.800781 34.279297 C 25.740781 34.049297 25.690859 33.829141 25.630859 33.619141 C 25.290859 32.299141 25.06 31.850234 25 31.740234 C 24.55 30.990234 24.470234 30.080703 25.240234 27.220703 C 25.901234 24.955703 28.786375 11.163 36.359375 3 L 9 3 z"
                      })
                    })
                  })]
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "mt-2 text-lg",
                children: [/* @__PURE__ */ jsx("a", {
                  href: "https://museic.onrender.com/",
                  className: "text-blue-400 hover:text-blue-300",
                  children: "Live Website"
                }), " | ", /* @__PURE__ */ jsx("a", {
                  href: "https://github.com/miaohua897/Mod6_project",
                  className: "text-blue-400 hover:text-blue-300",
                  children: "GitHub"
                })]
              }), /* @__PURE__ */ jsx("p", {
                className: "mt-4 text-xl/8 text-gray-600",
                children: "Museic is a music service that allows users to upload their own songs, put their songs into albums, & create playlists."
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents",
              children: [/* @__PURE__ */ jsx("div", {
                className: "w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end",
                children: /* @__PURE__ */ jsx("video", {
                  preload: "auto",
                  autoPlay: true,
                  loop: true,
                  muted: true,
                  src: "../museic-video.mp4",
                  className: "w-[37rem] max-w-none rounded-2xl object-cover"
                })
              }), /* @__PURE__ */ jsxs("div", {
                className: "contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "order-first flex w-64 flex-none justify-end self-end lg:w-auto",
                  children: /* @__PURE__ */ jsx("img", {
                    alt: "Museic Screenshot 2",
                    src: "../museic-screenshot-2.png",
                    className: "w-[24rem] max-w-none flex-none rounded-2xl object-cover"
                  })
                }), /* @__PURE__ */ jsx("div", {
                  className: "flex w-96 flex-auto justify-end lg:w-auto lg:flex-none",
                  children: /* @__PURE__ */ jsx("img", {
                    alt: "Museic Screenshot 1",
                    src: "../museic-screenshot-1.png",
                    className: "w-[37rem] max-w-none flex-none rounded-2xl object-cover"
                  })
                }), /* @__PURE__ */ jsx("div", {
                  className: "hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none",
                  children: /* @__PURE__ */ jsx("img", {
                    alt: "Museic Logo",
                    src: "../museic-logo.png",
                    className: "w-[24rem] max-w-none object-cover"
                  })
                })]
              })]
            })]
          })
        })
      }), /* @__PURE__ */ jsx("div", {
        className: "mt-32 overflow-hidden sm:mt-40",
        children: /* @__PURE__ */ jsx("div", {
          className: "mx-auto max-w-7xl px-6 lg:flex lg:px-8",
          children: /* @__PURE__ */ jsxs("div", {
            className: "mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:max-w-none lg:min-w-full lg:flex-none lg:gap-y-8",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "flex flex-col lg:flex-row justify-between",
                children: [/* @__PURE__ */ jsx("h2", {
                  className: "mb-2 lg:mb-0 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl",
                  children: "RyoKanvas"
                }), /* @__PURE__ */ jsxs("div", {
                  className: "flex items-end lg:mb-1",
                  children: [/* @__PURE__ */ jsx("a", {
                    href: "https://react.dev",
                    children: /* @__PURE__ */ jsx("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "cornflowerBlue",
                      x: "0px",
                      y: "0px",
                      width: "25",
                      height: "25",
                      viewBox: "0 0 30 30",
                      children: /* @__PURE__ */ jsx("path", {
                        d: "M 10.679688 4.1816406 C 10.068687 4.1816406 9.502 4.3184219 9 4.6074219 C 7.4311297 5.5132122 6.8339651 7.7205462 7.1503906 10.46875 C 4.6127006 11.568833 3 13.188667 3 15 C 3 16.811333 4.6127006 18.431167 7.1503906 19.53125 C 6.8341285 22.279346 7.4311297 24.486788 9 25.392578 C 9.501 25.681578 10.067687 25.818359 10.679688 25.818359 C 11.982314 25.818359 13.48785 25.164589 15 24.042969 C 16.512282 25.164589 18.01964 25.818359 19.322266 25.818359 C 19.933266 25.818359 20.499953 25.681578 21.001953 25.392578 C 22.570814 24.486793 23.167976 22.279432 22.851562 19.53125 C 25.388297 18.431178 27 16.81094 27 15 C 27 13.188667 25.387299 11.568833 22.849609 10.46875 C 23.165872 7.7206538 22.56887 5.5132122 21 4.6074219 C 20.499 4.3174219 19.932312 4.1816406 19.320312 4.1816406 C 18.017686 4.1816406 16.51215 4.8354109 15 5.9570312 C 13.487763 4.8354109 11.981863 4.1816406 10.679688 4.1816406 z M 10.679688 5.9316406 C 11.461321 5.9316406 12.49496 6.3472486 13.617188 7.1171875 C 12.95737 7.7398717 12.311153 8.4479321 11.689453 9.2363281 C 10.681079 9.3809166 9.7303472 9.5916908 8.8496094 9.8554688 C 8.8448793 9.7943902 8.8336776 9.7303008 8.8300781 9.6699219 C 8.7230781 7.8899219 9.114 6.5630469 9.875 6.1230469 C 10.1 5.9930469 10.362688 5.9316406 10.679688 5.9316406 z M 19.320312 5.9316406 C 19.636312 5.9316406 19.9 5.9930469 20.125 6.1230469 C 20.886 6.5620469 21.276922 7.8899219 21.169922 9.6699219 C 21.166295 9.7303008 21.155145 9.7943902 21.150391 9.8554688 C 20.2691 9.5915252 19.317669 9.3809265 18.308594 9.2363281 C 17.686902 8.4480417 17.042616 7.7397993 16.382812 7.1171875 C 17.504962 6.3473772 18.539083 5.9316406 19.320312 5.9316406 z M 15 8.2285156 C 15.27108 8.4752506 15.540266 8.7360345 15.8125 9.0214844 C 15.542718 9.012422 15.274373 9 15 9 C 14.726286 9 14.458598 9.0124652 14.189453 9.0214844 C 14.461446 8.7363308 14.729174 8.4750167 15 8.2285156 z M 15 10.75 C 15.828688 10.75 16.614128 10.796321 17.359375 10.876953 C 17.813861 11.494697 18.261774 12.147811 18.681641 12.875 C 19.084074 13.572033 19.439938 14.285488 19.753906 15 C 19.439896 15.714942 19.084316 16.429502 18.681641 17.126953 C 18.263078 17.852044 17.816279 18.500949 17.363281 19.117188 C 16.591711 19.201607 15.800219 19.25 15 19.25 C 14.171312 19.25 13.385872 19.203679 12.640625 19.123047 C 12.186139 18.505303 11.738226 17.854142 11.318359 17.126953 C 10.915684 16.429502 10.560194 15.714942 10.246094 15 C 10.559972 14.285488 10.915926 13.572033 11.318359 12.875 C 11.737083 12.149909 12.183612 11.499051 12.636719 10.882812 C 13.408289 10.798393 14.199781 10.75 15 10.75 z M 19.746094 11.291016 C 20.142841 11.386804 20.524253 11.490209 20.882812 11.605469 C 20.801579 11.97252 20.702235 12.346608 20.589844 12.724609 C 20.461164 12.483141 20.336375 12.240903 20.197266 12 C 20.054139 11.752196 19.895244 11.529558 19.746094 11.291016 z M 10.251953 11.292969 C 10.103305 11.530776 9.9454023 11.752991 9.8027344 12 C 9.6636666 12.240944 9.5387971 12.483106 9.4101562 12.724609 C 9.29751 12.345829 9.1965499 11.971295 9.1152344 11.603516 C 9.4803698 11.48815 9.86083 11.385986 10.251953 11.292969 z M 7.46875 12.246094 C 7.6794464 13.135714 7.9717297 14.057918 8.3476562 14.998047 C 7.9725263 15.935943 7.6814729 16.856453 7.4707031 17.744141 C 5.7292327 16.903203 4.75 15.856373 4.75 15 C 4.75 14.121 5.701875 13.119266 7.296875 12.322266 C 7.3513169 12.295031 7.4131225 12.272692 7.46875 12.246094 z M 22.529297 12.255859 C 24.270767 13.096797 25.25 14.143627 25.25 15 C 25.25 15.879 24.298125 16.880734 22.703125 17.677734 C 22.648683 17.704969 22.586877 17.727308 22.53125 17.753906 C 22.32043 16.863764 22.030541 15.940699 21.654297 15 C 22.028977 14.062913 22.318703 13.142804 22.529297 12.255859 z M 15 13 C 13.895 13 13 13.895 13 15 C 13 16.105 13.895 17 15 17 C 16.105 17 17 16.105 17 15 C 17 13.895 16.105 13 15 13 z M 9.4101562 17.275391 C 9.5388794 17.516948 9.6655262 17.759008 9.8046875 18 C 9.9476585 18.247625 10.104915 18.470608 10.253906 18.708984 C 9.857159 18.613196 9.4757466 18.509791 9.1171875 18.394531 C 9.1984813 18.02725 9.2976676 17.653633 9.4101562 17.275391 z M 20.589844 17.277344 C 20.702364 17.655759 20.803517 18.02905 20.884766 18.396484 C 20.51963 18.51185 20.13917 18.614014 19.748047 18.707031 C 19.896695 18.469224 20.054598 18.247009 20.197266 18 C 20.336044 17.759557 20.461449 17.518344 20.589844 17.277344 z M 8.8496094 20.144531 C 9.7309004 20.408475 10.682331 20.619073 11.691406 20.763672 C 12.313288 21.552345 12.957085 22.261935 13.617188 22.884766 C 12.495042 23.654481 11.461272 24.070312 10.679688 24.070312 C 10.363687 24.070312 10.1 24.006953 9.875 23.876953 C 9.114 23.437953 8.7230781 22.112031 8.8300781 20.332031 C 8.8337424 20.271023 8.8447938 20.206253 8.8496094 20.144531 z M 21.150391 20.144531 C 21.155182 20.206253 21.166285 20.271023 21.169922 20.332031 C 21.276922 22.112031 20.886 23.436953 20.125 23.876953 C 19.9 24.006953 19.637312 24.070313 19.320312 24.070312 C 18.538728 24.070312 17.504958 23.654609 16.382812 22.884766 C 17.042964 22.261863 17.688542 21.552454 18.310547 20.763672 C 19.318921 20.619083 20.269653 20.408309 21.150391 20.144531 z M 14.1875 20.978516 C 14.457282 20.987578 14.725627 21 15 21 C 15.274373 21 15.542718 20.987578 15.8125 20.978516 C 15.540266 21.263964 15.27108 21.524765 15 21.771484 C 14.72892 21.524749 14.459734 21.263966 14.1875 20.978516 z"
                      })
                    })
                  }), /* @__PURE__ */ jsx("a", {
                    href: "https://redux.js.org",
                    children: /* @__PURE__ */ jsx("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "cornflowerBlue",
                      x: "0px",
                      y: "0px",
                      width: "25",
                      height: "25",
                      viewBox: "0 0 24 24",
                      children: /* @__PURE__ */ jsx("path", {
                        d: "M 11.5 2 C 8.416 2 6 5.5822969 6 10.154297 C 6 12.224297 6.5020781 14.081906 7.3300781 15.503906 C 7.2830781 15.662906 7.25 15.826 7.25 16 C 7.25 16.966 8.034 17.75 9 17.75 C 9.966 17.75 10.75 16.966 10.75 16 C 10.75 15.034 9.966 14.25 9 14.25 C 8.976 14.25 8.9536875 14.256813 8.9296875 14.257812 C 8.3596875 13.159813 8 11.719297 8 10.154297 C 8 6.8182969 9.603 4 11.5 4 C 12.786 4 13.934969 5.2969219 14.542969 7.1699219 C 15.285969 7.2889219 16.026672 7.4920937 16.763672 7.7460938 C 16.085672 4.3850938 14.016 2 11.5 2 z M 11.375 8.5 C 10.409 8.5 9.625 9.284 9.625 10.25 C 9.625 11.216 10.409 12 11.375 12 C 12.062 12 12.6505 11.601391 12.9375 11.025391 C 14.2305 11.083391 15.669344 11.458359 17.027344 12.193359 C 18.987344 13.255359 20.465813 14.885219 20.882812 16.449219 C 21.097812 17.252219 21.021156 17.957922 20.660156 18.544922 C 19.942156 19.712922 18.226531 20.180594 16.269531 19.933594 C 15.690531 20.524594 15.0295 21.067594 14.3125 21.558594 C 15.3125 21.850594 16.303328 22.001953 17.236328 22.001953 C 19.470328 22.001953 21.383281 21.18675 22.363281 19.59375 C 23.015281 18.53375 23.171453 17.268594 22.814453 15.933594 C 22.250453 13.826594 20.441516 11.769547 17.978516 10.435547 C 16.179516 9.4605469 14.307281 9.0066719 12.613281 9.0136719 C 12.296281 8.6956719 11.859 8.5 11.375 8.5 z M 4.0976562 11.742188 C 2.6376563 12.951187 1.5905 14.426594 1.1875 15.933594 C 0.8305 17.268594 0.98667187 18.533797 1.6386719 19.591797 C 2.6166719 21.184797 4.530625 22 6.765625 22 C 8.457625 22 10.333 21.536453 12.125 20.564453 C 13.835 19.638453 15.216656 18.361844 16.097656 16.964844 C 16.896656 16.802844 17.5 16.097 17.5 15.25 C 17.5 14.284 16.716 13.5 15.75 13.5 C 14.784 13.5 14 14.284 14 15.25 C 14 15.576 14.095953 15.878625 14.251953 16.140625 C 13.544953 17.155625 12.468828 18.105641 11.173828 18.806641 C 8.0548281 20.495641 4.4658438 20.374969 3.3398438 18.542969 C 2.9788438 17.955969 2.9041406 17.252219 3.1191406 16.449219 C 3.3371406 15.634219 3.8475469 14.801063 4.5605469 14.039062 C 4.3425469 13.314063 4.1876563 12.545187 4.0976562 11.742188 z"
                      })
                    })
                  }), /* @__PURE__ */ jsx("a", {
                    href: "https://html.spec.whatwg.org/multipage",
                    children: /* @__PURE__ */ jsx("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "cornflowerBlue",
                      x: "0px",
                      y: "0px",
                      width: "25",
                      height: "25",
                      viewBox: "0 0 24 24",
                      children: /* @__PURE__ */ jsx("path", {
                        d: "M 21 2 L 3 2 L 5 20 L 12 22 L 19 20 Z M 16.824219 8.082031 L 9.167969 8.082031 L 9.351563 10.261719 L 16.640625 10.261719 L 16.09375 16.699219 L 12 18.003906 L 11.960938 17.988281 L 7.914063 16.699219 L 7.691406 14.074219 L 9.675781 14.074219 L 9.761719 15.09375 L 12.023438 15.59375 L 14.242188 15.09375 L 14.480469 12.339844 L 7.542969 12.339844 L 7.007813 6 L 17.003906 6 Z"
                      })
                    })
                  }), /* @__PURE__ */ jsx("a", {
                    href: "https://www.w3.org/Style/CSS/Overview.en.html",
                    children: /* @__PURE__ */ jsx("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "cornflowerBlue",
                      x: "0px",
                      y: "0px",
                      width: "25",
                      height: "25",
                      viewBox: "0 0 24 24",
                      children: /* @__PURE__ */ jsx("path", {
                        d: "M 3 2 L 5 20 L 11.992188 22 L 19 20 L 21 2 Z M 16.726563 10.347656 L 16.34375 16.589844 L 12.027344 18 L 7.710938 16.589844 L 7.546875 13.605469 L 9.734375 13.605469 L 9.789063 14.960938 L 12.027344 15.722656 L 14.269531 14.960938 L 14.433594 12.519531 L 9.625 12.519531 L 9.515625 10.347656 L 14.539063 10.347656 L 14.703125 8.175781 L 7.164063 8.175781 L 7 6.007813 L 17 6.007813 Z"
                      })
                    })
                  }), /* @__PURE__ */ jsx("a", {
                    href: "https://nodejs.org",
                    children: /* @__PURE__ */ jsx("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "cornflowerBlue",
                      x: "0px",
                      y: "0px",
                      width: "25",
                      height: "25",
                      viewBox: "0 0 16 16",
                      children: /* @__PURE__ */ jsx("path", {
                        d: "M 8 1.0234375 C 7.736875 1.0234375 7.4742344 1.0924687 7.2402344 1.2304688 L 2.7402344 3.8789062 C 2.2832344 4.1469063 2 4.642875 2 5.171875 L 2 11.005859 C 2 11.554859 2.29925 12.059266 2.78125 12.322266 L 4.2558594 13.126953 C 4.4828594 13.250953 4.7286094 13.310547 4.9746094 13.310547 C 5.2386094 13.310547 5.4992812 13.239609 5.7382812 13.099609 C 6.1982812 12.826609 6.4726562 12.344594 6.4726562 11.808594 L 6.4726562 5.4648438 L 5.4726562 5.4648438 L 5.4726562 11.808594 C 5.4726562 12.065594 5.3025156 12.195281 5.2285156 12.238281 C 5.1555156 12.281281 4.959375 12.371047 4.734375 12.248047 L 3.2617188 11.445312 C 3.1007187 11.357312 3 11.188859 3 11.005859 L 3 5.171875 C 3 4.995875 3.0940938 4.8302344 3.2460938 4.7402344 L 7.7460938 2.0917969 C 7.9020937 1.9997969 8.0979062 2.0007969 8.2539062 2.0917969 L 12.753906 4.7402344 C 12.904906 4.8302344 13 4.995875 13 5.171875 L 13 11.009766 C 13 11.189766 12.900234 11.359219 12.740234 11.449219 L 8.2402344 13.900391 C 8.0902344 13.980391 7.9097656 13.980391 7.7597656 13.900391 L 6.8808594 13.419922 C 6.7108594 13.629922 6.5 13.810937 6.25 13.960938 C 6.17 14.010938 6.0897656 14.050078 6.0097656 14.080078 L 7.2792969 14.779297 C 7.5092969 14.899297 7.75 14.960938 8 14.960938 C 8.25 14.960938 8.4907031 14.899297 8.7207031 14.779297 L 13.220703 12.320312 C 13.700703 12.060313 14 11.559766 14 11.009766 L 14 5.171875 C 14 4.642875 13.717719 4.1469062 13.261719 3.8789062 L 8.7617188 1.2304688 C 8.5272187 1.0924688 8.263125 1.0234375 8 1.0234375 z M 9.4511719 5.3183594 C 7.8711719 5.3183594 7.0703125 5.8690781 7.0703125 6.9550781 C 7.0703125 8.1850781 8.4869687 8.3680781 9.1679688 8.4550781 C 9.2659688 8.4680781 9.352875 8.4791875 9.421875 8.4921875 L 9.7207031 8.5449219 C 10.760703 8.7189219 11 8.836875 11 9.171875 C 11 9.333875 10.999172 9.8242188 9.4511719 9.8242188 C 8.1381719 9.8242188 7.8691406 9.4346094 7.8691406 8.8496094 L 6.8691406 8.8496094 C 6.8691406 9.7516094 7.3171719 10.824219 9.4511719 10.824219 C 11.557172 10.824219 12 9.925875 12 9.171875 C 12 7.913875 10.777719 7.7076406 9.8867188 7.5566406 L 9.5996094 7.5078125 C 9.5166094 7.4928125 9.4119219 7.4788438 9.2949219 7.4648438 C 8.6589219 7.3828438 8.0703125 7.2650312 8.0703125 6.9570312 C 8.0703125 6.7340313 8.0691719 6.3193594 9.4511719 6.3183594 C 10.370172 6.3183594 10.837891 6.6207969 10.837891 7.2167969 L 11.837891 7.2167969 C 11.837891 6.2997969 11.209172 5.3183594 9.4511719 5.3183594 z"
                      })
                    })
                  }), /* @__PURE__ */ jsx("a", {
                    href: "https://expressjs.com",
                    children: /* @__PURE__ */ jsxs("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "cornflowerBlue",
                      x: "0px",
                      y: "0px",
                      width: "25",
                      height: "25",
                      viewBox: "0 0 48 48",
                      children: [/* @__PURE__ */ jsx("path", {
                        d: "M23.697,37.56h1.18c0.84,0,1.631-0.392,2.139-1.061l7.485-9.847l7.485,9.847	c0.508,0.668,1.299,1.061,2.139,1.061h1.18L35.756,25l9.121-12h-1.18c-0.84,0-1.631,0.392-2.139,1.061L34.5,23.347l-7.059-9.287	C26.933,13.392,26.142,13,25.302,13h-1.18l9.121,12L23.697,37.56z"
                      }), /* @__PURE__ */ jsx("path", {
                        d: "M24,26v-3c0-6.675-5.945-11.961-12.829-10.852C5.812,13.011,2,17.857,2,23.284L2,24v2v0.142	c0,6.553,4.777,11.786,10.868,11.858c5.092,0.06,9.389-3.344,10.707-7.999h-1.028c-0.62,0-1.182,0.355-1.451,0.913	c-1.739,3.595-5.789,5.862-10.228,4.842C6.776,34.815,4,30.981,4,26.783V26H24z M4,23.71c0-4.708,2.804-8.557,6.924-9.478	C16.798,12.92,22,17.352,22,23v1H4V23.71z"
                      })]
                    })
                  }), /* @__PURE__ */ jsx("a", {
                    href: "https://sequelize.org",
                    children: /* @__PURE__ */ jsx("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "cornflowerBlue",
                      width: "25",
                      height: "25",
                      viewBox: "-10 236 510 40",
                      children: /* @__PURE__ */ jsx("path", {
                        d: "M221.7328491,0L0,128v256l222.2363892,128l220.7240601-127.49646V127.49646L221.7328491,0z M49.077301,358.4714355V156.6301422L221.6456604,55.0871696l173.2460938,98.8398438v202.9203949L222.2955627,458.9616699L49.077301,358.4714355z M137.5888519,308.3948669v71.8737793l-62.6321945-34.2255859v-74.098999L137.5888519,308.3948669z M148.9033813,197.4828033l55.2918701-32.2536011l-62.6322021-36.9630127l-55.675293,32.9417114L148.9033813,197.4828033z M223.7045898,175.1542511l-56.0150757,33.1427002l57.0129395,32.819458l55.5505981-32.5879517L223.7045898,175.1542511z M213.2172699,260.2302551l-56.1191406-32.3048706v66.7792358l56.1191406,30.6665649V260.2302551z M295.6186523,199.5144196l61.4734497-36.0625l-56.7225342-33.4744263l-61.6060791,36.4508057L295.6186523,199.5144196z M280.8619995,120.0524445l-62.6339111-36.9647217l-61.6060791,36.4508057l62.6339111,36.4508057L280.8619995,120.0524445z M74.9566574,180.6408386v67.1740112l62.6321945,34.2255859v-65.34552L74.9566574,180.6408386z M304.6950684,310.983429v72.0933838l63.3087158-37.5476685v-73.3600464L304.6950684,310.983429z M304.6950684,220.0362854v64.7205505l63.3087158-37.4541931v-64.4052124L304.6950684,220.0362854z M235.2179108,260.7937317v64.8900146l56.1191254-33.2043457v-64.6068726L235.2179108,260.7937317z M235.2179108,350.6167908v73.295166l56.1191254-33.2042847v-71.3599243L235.2179108,350.6167908z M213.2172699,350.4064636l-56.1191406-31.5726318v74.098999l56.1191406,30.6665039V350.4064636z"
                      })
                    })
                  }), /* @__PURE__ */ jsx("a", {
                    href: "https://www.postgresql.org",
                    children: /* @__PURE__ */ jsx("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "cornflowerBlue",
                      x: "0px",
                      y: "0px",
                      width: "25",
                      height: "25",
                      viewBox: "0 0 24 24",
                      children: /* @__PURE__ */ jsx("path", {
                        d: "M 13 2 C 9.28125 2 8.316406 4.828125 7.992188 6.46875 C 8.4375 6.277344 9.535156 6 10 6 L 10.019531 6 C 11.164063 6.007813 11.519531 6.332031 11.75 7.390625 C 11.917969 8.167969 12.003906 9.378906 12 10 C 11.996094 11.359375 11.667969 12.296875 11.425781 12.925781 L 11.347656 13.128906 C 11.289063 13.296875 11.21875 13.453125 11.15625 13.597656 C 11.09375 13.75 11.039063 13.882813 11 14 C 11.242188 14.054688 11.433594 14.132813 11.5625 14.1875 L 11.636719 14.222656 C 11.660156 14.234375 11.683594 14.242188 11.703125 14.257813 C 12.128906 14.515625 12 15.109375 12 15.578125 C 12 15.96875 12.011719 17.523438 12 19.003906 C 12.042969 19.644531 12.207031 20.183594 12.347656 20.578125 C 12.554688 21.132813 13.019531 21.957031 14 22 C 14.773438 22.035156 15.890625 21.628906 16 20.003906 L 16 16.003906 C 16.074219 14.667969 17.605469 14.136719 18 13.84375 C 17.945313 13.769531 17.734375 13.117188 17.511719 12.769531 L 17.46875 12.6875 C 17.4375 12.609375 17.355469 12.46875 17.253906 12.28125 C 16.664063 11.210938 15.429688 8.464844 16.273438 7.058594 C 16.640625 6.441406 17 6.085938 18 6 C 17.59375 4.839844 16.46875 2.058594 13 2 Z M 6.4375 2 C 4.566406 2.070313 2 3.230469 2 7.011719 C 2 9.574219 3.742188 17 6.492188 17 C 6.617188 17 6.742188 16.957031 6.871094 16.890625 C 6.628906 16.679688 6.453125 16.40625 6.429688 16.046875 C 6.386719 15.320313 6.914063 14.808594 8.050781 14.519531 C 8.105469 14.511719 8.394531 14.425781 9.03125 14.066406 C 8.695313 13.921875 8.34375 13.726563 8.054688 13.425781 C 7.261719 12.597656 6.859375 11.4375 7.007813 10.394531 C 7.148438 9.378906 7.066406 8.382813 7.023438 7.851563 L 7.019531 7.800781 L 7.007813 7.625 L 6.984375 7.257813 L 7.015625 6.273438 C 7.339844 4.609375 8.019531 3.320313 9 2.429688 C 8.257813 2.1875 7.324219 1.96875 6.4375 2 Z M 16.933594 2.003906 C 16.742188 2.007813 16.5625 2.023438 16.386719 2.042969 C 17.390625 2.742188 18.3125 3.871094 18.941406 5.671875 L 18.984375 7.046875 C 18.988281 7.09375 18.996094 7.140625 19.003906 7.1875 C 19.035156 7.359375 19.074219 7.59375 19.042969 7.875 C 19.003906 8.195313 18.964844 8.523438 18.953125 8.851563 C 18.945313 9.175781 18.988281 9.492188 19.035156 9.828125 C 19.121094 10.425781 19.074219 11.03125 18.886719 11.679688 L 18.59375 12.6875 C 18.671875 12.859375 18.746094 13.035156 18.820313 13.21875 C 18.835938 13.265625 18.851563 13.300781 18.863281 13.332031 L 19.191406 13.785156 C 20.957031 12.230469 22 8.976563 22 5.625 C 22 4.976563 21.824219 4.476563 21.597656 4.1875 C 20.257813 2.472656 18.402344 1.980469 16.933594 2.003906 Z M 10 7 C 9.71875 7 8.75 7.230469 8.382813 7.386719 L 8.023438 7.539063 C 8.015625 7.546875 8.007813 7.554688 8.003906 7.5625 C 8.007813 7.617188 8.015625 7.683594 8.023438 7.765625 C 8.066406 8.339844 8.152344 9.40625 7.996094 10.535156 C 7.890625 11.277344 8.191406 12.121094 8.78125 12.734375 C 9.117188 13.085938 9.71875 13.316406 10.15625 13.414063 C 10.183594 13.34375 10.207031 13.285156 10.238281 13.207031 C 10.292969 13.074219 10.355469 12.933594 10.414063 12.777344 L 10.492188 12.566406 C 10.667969 12.109375 10.996094 11.253906 11 9.996094 C 11.003906 9.582031 10.957031 8.828125 10.871094 8.183594 C 10.859375 8.199219 10.851563 8.199219 10.84375 8.21875 C 10.695313 8.367188 10.464844 8.5 10.210938 8.460938 C 9.796875 8.394531 9.480469 7.890625 9.5 7.703125 C 9.523438 7.519531 9.878906 7.421875 10.292969 7.488281 C 10.433594 7.511719 10.566406 7.554688 10.675781 7.601563 C 10.714844 7.632813 10.746094 7.652344 10.78125 7.675781 C 10.777344 7.652344 10.777344 7.625 10.769531 7.601563 C 10.675781 7.160156 10.597656 7.078125 10.59375 7.074219 C 10.589844 7.070313 10.484375 7.003906 10 7 Z M 17.984375 7.011719 C 17.5 7.070313 17.363281 7.199219 17.1875 7.484375 C 17.527344 7.484375 17.773438 7.597656 17.800781 7.808594 C 17.828125 7.988281 17.675781 8.160156 17.609375 8.226563 C 17.46875 8.359375 17.292969 8.449219 17.117188 8.46875 C 17.085938 8.476563 17.054688 8.476563 17.019531 8.476563 C 17.011719 8.476563 17.007813 8.472656 17 8.472656 C 17.058594 9.296875 17.429688 10.410156 17.925781 11.402344 C 18.0625 10.925781 18.117188 10.460938 18.046875 9.96875 C 17.996094 9.605469 17.941406 9.230469 17.953125 8.820313 C 17.96875 8.449219 18.007813 8.101563 18.046875 7.761719 C 18.078125 7.5 17.976563 7.257813 17.984375 7.011719 Z M 20.179688 14.53125 C 20.101563 14.519531 19.992188 14.527344 19.859375 14.554688 C 19.230469 14.683594 18.8125 14.71875 18.503906 14.699219 C 18.394531 14.773438 18.28125 14.84375 18.140625 14.921875 C 17.578125 15.230469 17.078125 15.550781 17.011719 16 L 17.011719 16.582031 C 17.671875 16.613281 18.554688 16.203125 19.0625 15.96875 C 20.019531 15.527344 20.738281 14.605469 20.179688 14.53125 Z M 9.835938 14.761719 C 9.285156 15.089844 8.664063 15.414063 8.25 15.5 C 6.78125 15.890625 7.691406 16.347656 8.210938 16.398438 C 8.765625 16.535156 10.125 16.84375 11 16.128906 C 11 16.128906 11 16.128906 11 16.125 L 11 15.578125 C 11 15.472656 11.003906 15.367188 11.011719 15.253906 C 11.011719 15.195313 11.015625 15.117188 11.015625 15.046875 C 10.949219 15.019531 10.867188 14.996094 10.777344 14.972656 Z"
                      })
                    })
                  }), /* @__PURE__ */ jsx("a", {
                    href: "https://www.sqlite.org",
                    children: /* @__PURE__ */ jsx("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "cornflowerBlue",
                      x: "0px",
                      y: "0px",
                      width: "25",
                      height: "25",
                      viewBox: "0 0 50 50",
                      children: /* @__PURE__ */ jsx("path", {
                        d: "M 43.640625 1.0019531 C 42.177246 0.96137695 40.611719 1.7683594 39.058594 3.1464844 C 38.689594 3.4744844 38.321078 3.8385625 37.955078 4.2265625 C 33.705078 8.7355625 29.759203 17.086844 28.533203 23.464844 C 29.010203 24.432844 29.384859 25.669281 29.630859 26.613281 C 29.693859 26.855281 29.749922 27.081391 29.794922 27.275391 C 29.902922 27.733391 29.960938 28.029297 29.960938 28.029297 C 29.960938 28.029297 29.923578 27.885641 29.767578 27.431641 C 29.737578 27.344641 29.703062 27.250672 29.664062 27.138672 C 29.647063 27.092672 29.625609 27.036562 29.599609 26.976562 C 29.322609 26.331563 28.554797 24.970906 28.216797 24.378906 C 27.927797 25.230906 27.673937 26.027047 27.460938 26.748047 C 28.434938 28.531047 29.027344 31.585937 29.027344 31.585938 C 29.027344 31.585938 28.977422 31.388266 28.732422 30.697266 C 28.515422 30.086266 27.432781 28.188141 27.175781 27.744141 C 26.736781 29.364141 26.56175 30.458609 26.71875 30.724609 C 27.02375 31.240609 27.315313 32.129281 27.570312 33.113281 C 27.659312 33.454281 27.742266 33.806203 27.822266 34.158203 C 27.557266 36.485203 27.495047 38.822719 27.623047 41.136719 C 27.756047 43.644719 28.106906 46.1205 28.503906 48.5625 C 28.545906 48.8195 28.781922 49.005469 29.044922 48.980469 C 29.319922 48.954469 29.522094 48.710547 29.496094 48.435547 C 29.371094 47.104547 29.265266 45.777125 29.197266 44.453125 L 29.257812 45.046875 C 29.162813 43.857875 29.1365 42.577844 29.1875 41.214844 C 29.3685 36.380844 30.482109 30.550609 32.537109 24.474609 C 36.010109 15.302609 40.827328 7.9417344 45.236328 4.4277344 C 41.217328 8.0577344 35.778391 19.807203 34.150391 24.158203 C 32.327391 29.030203 31.034859 33.601422 30.255859 37.982422 C 31.599859 33.875422 35.943359 32.111328 35.943359 32.111328 C 35.943359 32.111328 38.075453 29.482516 40.564453 25.728516 C 39.073453 26.068516 36.622734 26.651094 35.802734 26.996094 C 34.592734 27.504094 34.267578 27.677734 34.267578 27.677734 C 34.267578 27.677734 38.186828 25.289984 41.548828 24.208984 C 46.173828 16.924984 51.212672 6.5767813 46.138672 2.0507812 C 45.359047 1.3555312 44.518652 1.0262988 43.640625 1.0019531 z M 9 3 C 6.79 3 5 4.79 5 7 L 5 40 C 5 42.21 6.79 44 9 44 L 25.849609 44 C 25.749609 43.1 25.680859 42.170234 25.630859 41.240234 C 25.500859 38.920234 25.550781 36.569297 25.800781 34.279297 C 25.740781 34.049297 25.690859 33.829141 25.630859 33.619141 C 25.290859 32.299141 25.06 31.850234 25 31.740234 C 24.55 30.990234 24.470234 30.080703 25.240234 27.220703 C 25.901234 24.955703 28.786375 11.163 36.359375 3 L 9 3 z"
                      })
                    })
                  })]
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "mt-2 text-lg",
                children: [/* @__PURE__ */ jsx("a", {
                  href: "https://ryokanvas.onrender.com/",
                  className: "text-blue-400 hover:text-blue-300",
                  children: "Live Website"
                }), " | ", /* @__PURE__ */ jsx("a", {
                  href: "https://github.com/fayfan/RyoKanvas",
                  className: "text-blue-400 hover:text-blue-300",
                  children: "GitHub"
                })]
              }), /* @__PURE__ */ jsx("p", {
                className: "mt-4 text-xl/8 text-gray-600",
                children: "RyoKanvas is a booking application that allows users to reserve spots. Users can leave a review on any spot they have previously visited. Users can also create their own spots for other users to reserve."
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents",
              children: [/* @__PURE__ */ jsx("div", {
                className: "w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end",
                children: /* @__PURE__ */ jsx("video", {
                  preload: "auto",
                  autoPlay: true,
                  loop: true,
                  muted: true,
                  src: "../ryokanvas-video.mp4",
                  className: "border-solid border-1 border-gray-200 w-[37rem] max-w-none rounded-2xl object-cover"
                })
              }), /* @__PURE__ */ jsxs("div", {
                className: "contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "order-first flex w-64 flex-none justify-end self-end lg:w-auto",
                  children: /* @__PURE__ */ jsx("img", {
                    alt: "RyoKanvas Screenshot 2",
                    src: "../ryokanvas-screenshot-2.png",
                    className: "border-solid border-1 border-gray-200 w-[24rem] max-w-none flex-none rounded-2xl object-cover"
                  })
                }), /* @__PURE__ */ jsx("div", {
                  className: "flex w-96 flex-auto justify-end lg:w-auto lg:flex-none",
                  children: /* @__PURE__ */ jsx("img", {
                    alt: "RyoKanvas Screenshot 1",
                    src: "../ryokanvas-screenshot-1.png",
                    className: "border-solid border-1 border-gray-200 w-[37rem] max-w-none flex-none rounded-2xl object-cover"
                  })
                }), /* @__PURE__ */ jsx("div", {
                  className: "hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none",
                  children: /* @__PURE__ */ jsx("img", {
                    alt: "RyoKanvas Logo",
                    src: "../ryokanvas-logo.png",
                    className: "w-[20rem] max-w-none rounded-2xl object-cover"
                  })
                })]
              })]
            })]
          })
        })
      })]
    }), /* @__PURE__ */ jsx("footer", {
      className: "mx-auto mt-32 sm:mt-40 max-w-7xl px-6 lg:px-8",
      children: /* @__PURE__ */ jsxs("div", {
        className: "border-t border-gray-900/10 pt-15 pb-8",
        children: [/* @__PURE__ */ jsx("div", {
          className: "xl:grid xl:grid-cols-1 xl:gap-8",
          children: /* @__PURE__ */ jsx("div", {
            className: "grid grid-cols-1 gap-8 xl:col-span-2",
            children: /* @__PURE__ */ jsx("div", {
              className: "md:grid md:grid-cols-1 md:gap-8",
              children: /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("h3", {
                  style: {
                    color: "cornflowerblue"
                  },
                  className: "text-sm/6 font-semibold",
                  children: "Sara Baltz"
                }), /* @__PURE__ */ jsx("ul", {
                  role: "list",
                  className: "mt-6 space-y-4",
                  children: footerNavigation$2.company.map((item) => /* @__PURE__ */ jsx("li", {
                    children: /* @__PURE__ */ jsx("a", {
                      href: item.href,
                      className: "text-sm/6 text-gray-600 hover:text-blue-300",
                      children: item.name
                    })
                  }, item.name))
                })]
              })
            })
          })
        }), /* @__PURE__ */ jsxs("div", {
          className: "mt-15 border-t border-gray-900/10 pt-8 md:flex md:items-center md:justify-between",
          children: [/* @__PURE__ */ jsx("div", {
            className: "flex gap-x-6 md:order-2",
            children: footerNavigation$2.social.map((item) => /* @__PURE__ */ jsxs("a", {
              href: item.href,
              target: "_blank",
              className: "text-blue-400 hover:text-blue-300",
              children: [/* @__PURE__ */ jsx("span", {
                className: "sr-only",
                children: item.name
              }), /* @__PURE__ */ jsx(item.icon, {
                "aria-hidden": "true",
                className: "size-6"
              })]
            }, item.name))
          }), /* @__PURE__ */ jsx("p", {
            className: "mt-8 text-sm/6 text-gray-600 md:order-1 md:mt-0",
            children: "©2025 Sara Baltz. All rights reserved."
          })]
        })]
      })
    })]
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: projects,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
function meta$1({}) {
  return [{
    title: "Sara Baltz - Resume"
  }, {
    name: "description",
    content: "Have a look at my resume!"
  }, {
    property: "og:title",
    content: "Sara Baltz - Full-Stack Software Engineer"
  }, {
    property: "og:description",
    content: "I am a software engineer & former clinical researcher with a proven aptitude for teamwork & problem solving. I am eager to leverage my driven, detail-oriented mindset & passion for continuous learning to build robust & user-friendly applications, contribute to innovative teams, and deliver high-quality, impactful software solutions that enhance user experiences."
  }, {
    property: "og:url",
    content: "https://sarabaltz.com/resume"
  }];
}
const navigation$1 = [{
  name: "About",
  href: "/"
}, {
  name: "Projects",
  href: "/projects"
}, {
  name: "Resume",
  href: "/resume"
}, {
  name: "Contact",
  href: "/contact"
}];
const footerNavigation$1 = {
  company: [{
    name: "About",
    href: "/#top"
  }, {
    name: "Projects",
    href: "/projects"
  }, {
    name: "Resume",
    href: "/resume"
  }, {
    name: "Contact",
    href: "/contact"
  }],
  social: [{
    name: "GitHub",
    href: "https://github.com/fayfan",
    icon: (props) => /* @__PURE__ */ jsx("svg", {
      fill: "currentColor",
      viewBox: "0 0 24 24",
      ...props,
      children: /* @__PURE__ */ jsx("path", {
        fillRule: "evenodd",
        d: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z",
        clipRule: "evenodd"
      })
    })
  }, {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/sarabaltz",
    icon: (props) => /* @__PURE__ */ jsx("svg", {
      fill: "currentColor",
      viewBox: "-147 100 512 600",
      ...props,
      children: /* @__PURE__ */ jsx("path", {
        fillRule: "evenodd",
        d: "M113,145c-141.4,0-256,114.6-256,256s114.6,256,256,256s256-114.6,256-256S254.4,145,113,145z M41.4,508.1H-8.5V348.4h49.9 V508.1z M15.1,328.4h-0.4c-18.1,0-29.8-12.2-29.8-27.7c0-15.8,12.1-27.7,30.5-27.7c18.4,0,29.7,11.9,30.1,27.7 C45.6,316.1,33.9,328.4,15.1,328.4z M241,508.1h-56.6v-82.6c0-21.6-8.8-36.4-28.3-36.4c-14.9,0-23.2,10-27,19.6 c-1.4,3.4-1.2,8.2-1.2,13.1v86.3H71.8c0,0,0.7-146.4,0-159.7h56.1v25.1c3.3-11,21.2-26.6,49.8-26.6c35.5,0,63.3,23,63.3,72.4V508.1z",
        clipRule: "evenodd"
      })
    })
  }, {
    name: "Wellfound",
    href: "https://wellfound.com/u/sarabaltz",
    icon: (props) => /* @__PURE__ */ jsx("svg", {
      fill: "currentColor",
      viewBox: "-18 -18 285 285",
      ...props,
      children: /* @__PURE__ */ jsx("path", {
        d: "M 125 0 A 125 125 0 0 0 0 125 A 125 125 0 0 0 125 250 A 125 125 0 0 0 250 125 A 125 125 0 0 0 125 0 z M 181.56445 92.4375 C 187.25676 92.314896 192.9634 97.078533 192.68555 103.15625 C 192.93375 111.50557 182.80876 116.87461 176.03906 112.01172 C 169.46113 107.9838 169.97906 97.141109 176.91797 93.767578 C 178.37785 92.888918 179.97061 92.471829 181.56445 92.4375 z M 57.304688 93.205078 L 75.677734 93.205078 L 87.333984 138.93359 L 99.998047 93.205078 L 118.42773 93.205078 L 131.08789 138.93359 L 142.73633 93.205078 L 161.11133 93.205078 L 141.14062 156.80469 L 121.55859 156.80469 C 117.44038 141.49957 113.32371 126.19548 109.2168 110.88477 L 96.619141 156.80469 L 77.048828 156.80469 L 77.037109 156.80469 L 57.304688 93.205078 z M 181.56445 136.14258 C 187.25676 136.0202 192.9634 140.78312 192.68555 146.86523 C 192.92878 155.21117 182.80716 160.5842 176.03906 155.7168 C 169.46113 151.68888 169.97906 140.84619 176.91797 137.47266 C 178.37785 136.594 179.97061 136.17684 181.56445 136.14258 z "
      })
    })
  }, {
    name: "Email",
    href: "mailto:sara@sarabaltz.com",
    icon: (props) => /* @__PURE__ */ jsx("svg", {
      fill: "currentColor",
      viewBox: "0 -1 20 22",
      ...props,
      children: /* @__PURE__ */ jsx("path", {
        fillRule: "evenodd",
        d: "M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6 9.6-4.298 9.6-9.6S15.302.4 10 .4zM6.231 7h7.52c.399 0 .193.512-.024.643-.217.13-3.22 1.947-3.333 2.014s-.257.1-.403.1a.793.793 0 0 1-.402-.1L6.255 7.643C6.038 7.512 5.833 7 6.231 7zM14 12.5c0 .21-.252.5-.444.5H6.444C6.252 13 6 12.71 6 12.5V8.853c0-.092-.002-.211.172-.11l3.417 2.015a.69.69 0 0 0 .402.1c.146 0 .252-.011.403-.1l3.434-2.014c.174-.102.172.018.172.11V12.5z",
        clipRule: "evenodd"
      })
    })
  }, {
    name: "Phone",
    href: "tel:+17655056148",
    icon: (props) => /* @__PURE__ */ jsx("svg", {
      fill: "currentColor",
      viewBox: "0 1 55 55",
      ...props,
      children: /* @__PURE__ */ jsx("path", {
        xmlns: "http://www.w3.org/2000/svg",
        d: "M 27.9999 51.9062 C 41.0546 51.9062 51.9063 41.0547 51.9063 28.0000 C 51.9063 14.9219 41.0312 4.0938 27.9765 4.0938 C 14.8983 4.0938 4.0937 14.9219 4.0937 28.0000 C 4.0937 41.0547 14.9218 51.9062 27.9999 51.9062 Z M 21.8827 33.8360 C 16.0702 28.0469 12.3671 20.6640 16.7499 16.2813 C 17.0077 16.0234 17.2890 15.7656 17.5468 15.5078 C 18.8827 14.2422 20.1718 14.3125 21.3202 15.9297 L 24.3671 20.2656 C 25.3983 21.7656 25.1405 22.6094 24.0390 23.7813 L 23.0780 24.8360 C 22.7265 25.1640 22.8671 25.6094 23.0312 25.8906 C 23.4765 26.7344 24.7421 28.2344 26.1014 29.5938 C 27.5077 31.0000 28.9374 32.1953 29.8280 32.6875 C 30.1562 32.875 30.6249 32.9219 30.9296 32.6406 L 31.9374 31.6797 C 33.0624 30.5781 33.9765 30.2969 35.4296 31.3281 C 37.4452 32.7578 38.6640 33.6016 39.8593 34.4219 C 41.3358 35.5000 41.6874 36.8360 40.1874 38.1953 C 39.9296 38.4531 39.6952 38.7344 39.4374 38.9922 C 35.0546 43.3516 27.6952 39.6484 21.8827 33.8360 Z"
      })
    })
  }]
};
const pdfUrl = "../Sara_Baltz_Resume.pdf";
const resume = withComponentProps(function Resume() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return /* @__PURE__ */ jsxs("div", {
    className: "bg-white",
    children: [/* @__PURE__ */ jsxs("header", {
      className: "absolute inset-x-0 top-0 z-50",
      children: [/* @__PURE__ */ jsxs("nav", {
        "aria-label": "Global",
        className: "mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8",
        children: [/* @__PURE__ */ jsx("div", {
          className: "flex lg:flex-1",
          children: /* @__PURE__ */ jsxs("a", {
            href: "/",
            className: "-m-1.5 p-1.5",
            children: [/* @__PURE__ */ jsx("span", {
              className: "sr-only",
              children: "Sara Baltz"
            }), /* @__PURE__ */ jsx("img", {
              alt: "Logo",
              src: "../personal-logo.png",
              className: "h-8 w-auto"
            })]
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "flex lg:hidden",
          children: /* @__PURE__ */ jsxs("button", {
            type: "button",
            onClick: () => setMobileMenuOpen(true),
            className: "-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700",
            children: [/* @__PURE__ */ jsx("span", {
              className: "sr-only",
              children: "Open main menu"
            }), /* @__PURE__ */ jsx(Bars3Icon, {
              "aria-hidden": "true",
              className: "size-6 hover:text-blue-400 hover:cursor-pointer"
            })]
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "hidden lg:flex lg:gap-x-12",
          children: navigation$1.map((item) => /* @__PURE__ */ jsx("a", {
            href: item.href,
            className: "text-sm/6 font-semibold text-gray-900 hover:text-blue-300",
            children: item.name
          }, item.name))
        }), /* @__PURE__ */ jsx("div", {
          className: "hidden lg:flex lg:flex-1 lg:justify-end"
        })]
      }), /* @__PURE__ */ jsxs(Dialog, {
        open: mobileMenuOpen,
        onClose: setMobileMenuOpen,
        className: "lg:hidden",
        children: [/* @__PURE__ */ jsx("div", {
          className: "fixed inset-0 z-50"
        }), /* @__PURE__ */ jsxs(DialogPanel, {
          className: "fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "flex items-center justify-between",
            children: [/* @__PURE__ */ jsxs("a", {
              href: "/",
              className: "-m-1.5 p-1.5",
              children: [/* @__PURE__ */ jsx("span", {
                className: "sr-only",
                children: "Sara Baltz"
              }), /* @__PURE__ */ jsx("img", {
                alt: "Logo",
                src: "../personal-logo.png",
                className: "h-8 w-auto"
              })]
            }), /* @__PURE__ */ jsxs("button", {
              type: "button",
              onClick: () => setMobileMenuOpen(false),
              className: "-m-2.5 rounded-md p-2.5 text-gray-700",
              children: [/* @__PURE__ */ jsx("span", {
                className: "sr-only",
                children: "Close main menu"
              }), /* @__PURE__ */ jsx(XMarkIcon, {
                "aria-hidden": "true",
                className: "size-6 hover:text-blue-400 hover:cursor-pointer"
              })]
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: "mt-6 flow-root",
            children: /* @__PURE__ */ jsxs("div", {
              className: "-my-6 divide-y divide-gray-500/10",
              children: [/* @__PURE__ */ jsx("div", {
                className: "space-y-2 py-6",
                children: navigation$1.map((item) => /* @__PURE__ */ jsx("a", {
                  href: item.href,
                  className: "-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-blue-50",
                  children: item.name
                }, item.name))
              }), /* @__PURE__ */ jsx("div", {
                className: "py-6"
              })]
            })
          })]
        })]
      })]
    }), /* @__PURE__ */ jsx("main", {
      className: "isolate",
      children: /* @__PURE__ */ jsxs("div", {
        className: "relative isolate -z-10 overflow-hidden bg-linear-to-b from-blue-100/20 pt-14",
        children: [/* @__PURE__ */ jsx("div", {
          "aria-hidden": "true",
          className: "absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white ring-1 shadow-xl shadow-blue-600/10 ring-blue-50 sm:-mr-80 lg:-mr-96"
        }), /* @__PURE__ */ jsx("div", {
          className: "mx-auto max-w-7xl px-6 py-24 sm:py-30 lg:px-8",
          children: /* @__PURE__ */ jsxs("div", {
            className: "mx-auto max-w-2xl lg:mx-0 lg:max-w-none",
            children: [/* @__PURE__ */ jsx("h1", {
              style: {
                color: "cornflowerblue"
              },
              className: "max-w-2xl text-5xl font-semibold tracking-tight text-balance sm:text-7xl ",
              children: "Resume"
            }), /* @__PURE__ */ jsx("iframe", {
              className: "mx-auto mt-8",
              src: pdfUrl,
              width: "100%",
              height: "1125px",
              style: {
                resize: "both",
                overflow: "auto"
              }
            })]
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "absolute inset-x-0 bottom-0 -z-10 h-24 bg-linear-to-t from-white sm:h-32"
        })]
      })
    }), /* @__PURE__ */ jsx("footer", {
      className: "mx-auto max-w-7xl px-6 lg:px-8",
      children: /* @__PURE__ */ jsxs("div", {
        className: "border-t border-gray-900/10 pt-15 pb-8",
        children: [/* @__PURE__ */ jsx("div", {
          className: "xl:grid xl:grid-cols-1 xl:gap-8",
          children: /* @__PURE__ */ jsx("div", {
            className: "grid grid-cols-1 gap-8 xl:col-span-2",
            children: /* @__PURE__ */ jsx("div", {
              className: "md:grid md:grid-cols-1 md:gap-8",
              children: /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("h3", {
                  style: {
                    color: "cornflowerblue"
                  },
                  className: "text-sm/6 font-semibold",
                  children: "Sara Baltz"
                }), /* @__PURE__ */ jsx("ul", {
                  role: "list",
                  className: "mt-6 space-y-4",
                  children: footerNavigation$1.company.map((item) => /* @__PURE__ */ jsx("li", {
                    children: /* @__PURE__ */ jsx("a", {
                      href: item.href,
                      className: "text-sm/6 text-gray-600 hover:text-blue-300",
                      children: item.name
                    })
                  }, item.name))
                })]
              })
            })
          })
        }), /* @__PURE__ */ jsxs("div", {
          className: "mt-15 border-t border-gray-900/10 pt-8 md:flex md:items-center md:justify-between",
          children: [/* @__PURE__ */ jsx("div", {
            className: "flex gap-x-6 md:order-2",
            children: footerNavigation$1.social.map((item) => /* @__PURE__ */ jsxs("a", {
              href: item.href,
              target: "_blank",
              className: "text-blue-400 hover:text-blue-300",
              children: [/* @__PURE__ */ jsx("span", {
                className: "sr-only",
                children: item.name
              }), /* @__PURE__ */ jsx(item.icon, {
                "aria-hidden": "true",
                className: "size-6"
              })]
            }, item.name))
          }), /* @__PURE__ */ jsx("p", {
            className: "mt-8 text-sm/6 text-gray-600 md:order-1 md:mt-0",
            children: "©2025 Sara Baltz. All rights reserved."
          })]
        })]
      })
    })]
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: resume,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
function meta({}) {
  return [{
    title: "Sara Baltz - Contact"
  }, {
    name: "description",
    content: "Let's get in touch!"
  }, {
    property: "og:title",
    content: "Sara Baltz - Full-Stack Software Engineer"
  }, {
    property: "og:description",
    content: "I am a software engineer & former clinical researcher with a proven aptitude for teamwork & problem solving. I am eager to leverage my driven, detail-oriented mindset & passion for continuous learning to build robust & user-friendly applications, contribute to innovative teams, and deliver high-quality, impactful software solutions that enhance user experiences."
  }, {
    property: "og:url",
    content: "https://sarabaltz.com/contact"
  }];
}
const navigation = [{
  name: "About",
  href: "/"
}, {
  name: "Projects",
  href: "/projects"
}, {
  name: "Resume",
  href: "/resume"
}, {
  name: "Contact",
  href: "/contact"
}];
const footerNavigation = {
  company: [{
    name: "About",
    href: "/#top"
  }, {
    name: "Projects",
    href: "/projects"
  }, {
    name: "Resume",
    href: "/resume"
  }, {
    name: "Contact",
    href: "/contact"
  }],
  social: [{
    name: "GitHub",
    href: "https://github.com/fayfan",
    icon: (props) => /* @__PURE__ */ jsx("svg", {
      fill: "currentColor",
      viewBox: "0 0 24 24",
      ...props,
      children: /* @__PURE__ */ jsx("path", {
        fillRule: "evenodd",
        d: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z",
        clipRule: "evenodd"
      })
    })
  }, {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/sarabaltz",
    icon: (props) => /* @__PURE__ */ jsx("svg", {
      fill: "currentColor",
      viewBox: "-147 100 512 600",
      ...props,
      children: /* @__PURE__ */ jsx("path", {
        fillRule: "evenodd",
        d: "M113,145c-141.4,0-256,114.6-256,256s114.6,256,256,256s256-114.6,256-256S254.4,145,113,145z M41.4,508.1H-8.5V348.4h49.9 V508.1z M15.1,328.4h-0.4c-18.1,0-29.8-12.2-29.8-27.7c0-15.8,12.1-27.7,30.5-27.7c18.4,0,29.7,11.9,30.1,27.7 C45.6,316.1,33.9,328.4,15.1,328.4z M241,508.1h-56.6v-82.6c0-21.6-8.8-36.4-28.3-36.4c-14.9,0-23.2,10-27,19.6 c-1.4,3.4-1.2,8.2-1.2,13.1v86.3H71.8c0,0,0.7-146.4,0-159.7h56.1v25.1c3.3-11,21.2-26.6,49.8-26.6c35.5,0,63.3,23,63.3,72.4V508.1z",
        clipRule: "evenodd"
      })
    })
  }, {
    name: "Wellfound",
    href: "https://wellfound.com/u/sarabaltz",
    icon: (props) => /* @__PURE__ */ jsx("svg", {
      fill: "currentColor",
      viewBox: "-18 -18 285 285",
      ...props,
      children: /* @__PURE__ */ jsx("path", {
        d: "M 125 0 A 125 125 0 0 0 0 125 A 125 125 0 0 0 125 250 A 125 125 0 0 0 250 125 A 125 125 0 0 0 125 0 z M 181.56445 92.4375 C 187.25676 92.314896 192.9634 97.078533 192.68555 103.15625 C 192.93375 111.50557 182.80876 116.87461 176.03906 112.01172 C 169.46113 107.9838 169.97906 97.141109 176.91797 93.767578 C 178.37785 92.888918 179.97061 92.471829 181.56445 92.4375 z M 57.304688 93.205078 L 75.677734 93.205078 L 87.333984 138.93359 L 99.998047 93.205078 L 118.42773 93.205078 L 131.08789 138.93359 L 142.73633 93.205078 L 161.11133 93.205078 L 141.14062 156.80469 L 121.55859 156.80469 C 117.44038 141.49957 113.32371 126.19548 109.2168 110.88477 L 96.619141 156.80469 L 77.048828 156.80469 L 77.037109 156.80469 L 57.304688 93.205078 z M 181.56445 136.14258 C 187.25676 136.0202 192.9634 140.78312 192.68555 146.86523 C 192.92878 155.21117 182.80716 160.5842 176.03906 155.7168 C 169.46113 151.68888 169.97906 140.84619 176.91797 137.47266 C 178.37785 136.594 179.97061 136.17684 181.56445 136.14258 z "
      })
    })
  }, {
    name: "Email",
    href: "mailto:sara@sarabaltz.com",
    icon: (props) => /* @__PURE__ */ jsx("svg", {
      fill: "currentColor",
      viewBox: "0 -1 20 22",
      ...props,
      children: /* @__PURE__ */ jsx("path", {
        fillRule: "evenodd",
        d: "M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6 9.6-4.298 9.6-9.6S15.302.4 10 .4zM6.231 7h7.52c.399 0 .193.512-.024.643-.217.13-3.22 1.947-3.333 2.014s-.257.1-.403.1a.793.793 0 0 1-.402-.1L6.255 7.643C6.038 7.512 5.833 7 6.231 7zM14 12.5c0 .21-.252.5-.444.5H6.444C6.252 13 6 12.71 6 12.5V8.853c0-.092-.002-.211.172-.11l3.417 2.015a.69.69 0 0 0 .402.1c.146 0 .252-.011.403-.1l3.434-2.014c.174-.102.172.018.172.11V12.5z",
        clipRule: "evenodd"
      })
    })
  }, {
    name: "Phone",
    href: "tel:+17655056148",
    icon: (props) => /* @__PURE__ */ jsx("svg", {
      fill: "currentColor",
      viewBox: "0 1 55 55",
      ...props,
      children: /* @__PURE__ */ jsx("path", {
        xmlns: "http://www.w3.org/2000/svg",
        d: "M 27.9999 51.9062 C 41.0546 51.9062 51.9063 41.0547 51.9063 28.0000 C 51.9063 14.9219 41.0312 4.0938 27.9765 4.0938 C 14.8983 4.0938 4.0937 14.9219 4.0937 28.0000 C 4.0937 41.0547 14.9218 51.9062 27.9999 51.9062 Z M 21.8827 33.8360 C 16.0702 28.0469 12.3671 20.6640 16.7499 16.2813 C 17.0077 16.0234 17.2890 15.7656 17.5468 15.5078 C 18.8827 14.2422 20.1718 14.3125 21.3202 15.9297 L 24.3671 20.2656 C 25.3983 21.7656 25.1405 22.6094 24.0390 23.7813 L 23.0780 24.8360 C 22.7265 25.1640 22.8671 25.6094 23.0312 25.8906 C 23.4765 26.7344 24.7421 28.2344 26.1014 29.5938 C 27.5077 31.0000 28.9374 32.1953 29.8280 32.6875 C 30.1562 32.875 30.6249 32.9219 30.9296 32.6406 L 31.9374 31.6797 C 33.0624 30.5781 33.9765 30.2969 35.4296 31.3281 C 37.4452 32.7578 38.6640 33.6016 39.8593 34.4219 C 41.3358 35.5000 41.6874 36.8360 40.1874 38.1953 C 39.9296 38.4531 39.6952 38.7344 39.4374 38.9922 C 35.0546 43.3516 27.6952 39.6484 21.8827 33.8360 Z"
      })
    })
  }]
};
const contact = withComponentProps(function Contact() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return /* @__PURE__ */ jsxs("div", {
    className: "bg-white",
    children: [/* @__PURE__ */ jsxs("header", {
      className: "absolute inset-x-0 top-0 z-50",
      children: [/* @__PURE__ */ jsxs("nav", {
        "aria-label": "Global",
        className: "mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8",
        children: [/* @__PURE__ */ jsx("div", {
          className: "flex lg:flex-1",
          children: /* @__PURE__ */ jsxs("a", {
            href: "/",
            className: "-m-1.5 p-1.5",
            children: [/* @__PURE__ */ jsx("span", {
              className: "sr-only",
              children: "Sara Baltz"
            }), /* @__PURE__ */ jsx("img", {
              alt: "Logo",
              src: "../personal-logo.png",
              className: "h-8 w-auto"
            })]
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "flex lg:hidden",
          children: /* @__PURE__ */ jsxs("button", {
            type: "button",
            onClick: () => setMobileMenuOpen(true),
            className: "-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700",
            children: [/* @__PURE__ */ jsx("span", {
              className: "sr-only",
              children: "Open main menu"
            }), /* @__PURE__ */ jsx(Bars3Icon, {
              "aria-hidden": "true",
              className: "size-6 hover:text-blue-400 hover:cursor-pointer"
            })]
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "hidden lg:flex lg:gap-x-12",
          children: navigation.map((item) => /* @__PURE__ */ jsx("a", {
            href: item.href,
            className: "text-sm/6 font-semibold text-gray-900 hover:text-blue-300",
            children: item.name
          }, item.name))
        }), /* @__PURE__ */ jsx("div", {
          className: "hidden lg:flex lg:flex-1 lg:justify-end"
        })]
      }), /* @__PURE__ */ jsxs(Dialog, {
        open: mobileMenuOpen,
        onClose: setMobileMenuOpen,
        className: "lg:hidden",
        children: [/* @__PURE__ */ jsx("div", {
          className: "fixed inset-0 z-50"
        }), /* @__PURE__ */ jsxs(DialogPanel, {
          className: "fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "flex items-center justify-between",
            children: [/* @__PURE__ */ jsxs("a", {
              href: "/",
              className: "-m-1.5 p-1.5",
              children: [/* @__PURE__ */ jsx("span", {
                className: "sr-only",
                children: "Sara Baltz"
              }), /* @__PURE__ */ jsx("img", {
                alt: "Logo",
                src: "../personal-logo.png",
                className: "h-8 w-auto"
              })]
            }), /* @__PURE__ */ jsxs("button", {
              type: "button",
              onClick: () => setMobileMenuOpen(false),
              className: "-m-2.5 rounded-md p-2.5 text-gray-700",
              children: [/* @__PURE__ */ jsx("span", {
                className: "sr-only",
                children: "Close main menu"
              }), /* @__PURE__ */ jsx(XMarkIcon, {
                "aria-hidden": "true",
                className: "size-6 hover:text-blue-400 hover:cursor-pointer"
              })]
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: "mt-6 flow-root",
            children: /* @__PURE__ */ jsxs("div", {
              className: "-my-6 divide-y divide-gray-500/10",
              children: [/* @__PURE__ */ jsx("div", {
                className: "space-y-2 py-6",
                children: navigation.map((item) => /* @__PURE__ */ jsx("a", {
                  href: item.href,
                  className: "-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-blue-50",
                  children: item.name
                }, item.name))
              }), /* @__PURE__ */ jsx("div", {
                className: "py-6"
              })]
            })
          })]
        })]
      })]
    }), /* @__PURE__ */ jsx("main", {
      className: "isolate",
      children: /* @__PURE__ */ jsxs("div", {
        className: "relative isolate -z-10 overflow-hidden bg-linear-to-b from-blue-100/20 pt-14",
        children: [/* @__PURE__ */ jsx("div", {
          "aria-hidden": "true",
          className: "absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white ring-1 shadow-xl shadow-blue-600/10 ring-blue-50 sm:-mr-80 lg:-mr-96"
        }), /* @__PURE__ */ jsx("div", {
          className: "mx-auto max-w-7xl px-6 py-24 sm:py-30 lg:px-8",
          children: /* @__PURE__ */ jsxs("div", {
            className: "mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-8 lg:gap-y-8 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8",
            children: [/* @__PURE__ */ jsx("h1", {
              style: {
                color: "cornflowerblue"
              },
              className: "max-w-2xl text-5xl font-semibold tracking-tight text-balance sm:text-7xl lg:col-span-2 xl:col-auto",
              children: "Contact"
            }), /* @__PURE__ */ jsx("div", {
              className: "mt-6 lg:mt-0 xl:col-end-1 xl:row-start-1",
              children: /* @__PURE__ */ jsx("p", {
                className: "text-lg font-medium text-pretty text-gray-500 sm:text-xl/8",
                children: /* @__PURE__ */ jsx("div", {
                  className: "mx-auto max-w-7xl",
                  children: /* @__PURE__ */ jsxs("div", {
                    className: "relative isolate overflow-hidden bg-blue-200 px-6 py-24 text-center shadow-2xl rounded-3xl sm:px-16",
                    children: [/* @__PURE__ */ jsxs("p", {
                      className: "text-white mx-auto max-w-2xl text-xl font-bold tracking-tight sm:text-2xl xl:min-w-md",
                      children: ["LinkedIn: ", /* @__PURE__ */ jsx("a", {
                        href: "https://www.linkedin.com/in/sarabaltz",
                        className: "hover:text-blue-50",
                        children: "in/sarabaltz"
                      })]
                    }), /* @__PURE__ */ jsxs("p", {
                      className: "text-white mt-6 mx-auto max-w-2xl text-xl font-bold tracking-tight sm:text-2xl",
                      children: ["Wellfound: ", /* @__PURE__ */ jsx("a", {
                        href: "https://wellfound.com/u/sarabaltz",
                        className: "hover:text-blue-50",
                        children: "u/sarabaltz"
                      })]
                    }), /* @__PURE__ */ jsxs("p", {
                      className: "text-white mt-6 mx-auto max-w-2xl text-xl font-bold tracking-tight sm:text-2xl",
                      children: ["Email: ", /* @__PURE__ */ jsx("a", {
                        href: "mailto:sara@sarabaltz.com",
                        className: "hover:text-blue-50",
                        children: "sara@sarabaltz.com"
                      })]
                    }), /* @__PURE__ */ jsxs("p", {
                      className: "text-white mt-6 mx-auto max-w-2xl text-xl font-bold tracking-tight sm:text-2xl",
                      children: ["Phone: ", /* @__PURE__ */ jsx("a", {
                        href: "tel:+17655056148",
                        className: "hover:text-blue-50",
                        children: "(765) 505-6148"
                      })]
                    }), /* @__PURE__ */ jsx("div", {
                      "aria-hidden": "true",
                      className: "absolute -top-24 right-0 -z-10 transform-gpu blur-3xl",
                      children: /* @__PURE__ */ jsx("div", {
                        style: {
                          clipPath: "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)"
                        },
                        className: "aspect-1404/767 w-[87.75rem] bg-linear-to-r from-[#80caff] to-[#4f46e5] opacity-25"
                      })
                    })]
                  })
                })
              })
            }), /* @__PURE__ */ jsx("img", {
              alt: "",
              src: "../contact-photo.jpg",
              className: "mt-10 aspect-6/5 w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-42"
            })]
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "absolute inset-x-0 bottom-0 -z-10 h-24 bg-linear-to-t from-white sm:h-32"
        })]
      })
    }), /* @__PURE__ */ jsx("footer", {
      className: "mx-auto max-w-7xl px-6 lg:px-8",
      children: /* @__PURE__ */ jsxs("div", {
        className: "border-t border-gray-900/10 pt-15 pb-8",
        children: [/* @__PURE__ */ jsx("div", {
          className: "xl:grid xl:grid-cols-1 xl:gap-8",
          children: /* @__PURE__ */ jsx("div", {
            className: "grid grid-cols-1 gap-8 xl:col-span-2",
            children: /* @__PURE__ */ jsx("div", {
              className: "md:grid md:grid-cols-1 md:gap-8",
              children: /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("h3", {
                  style: {
                    color: "cornflowerblue"
                  },
                  className: "text-sm/6 font-semibold",
                  children: "Sara Baltz"
                }), /* @__PURE__ */ jsx("ul", {
                  role: "list",
                  className: "mt-6 space-y-4",
                  children: footerNavigation.company.map((item) => /* @__PURE__ */ jsx("li", {
                    children: /* @__PURE__ */ jsx("a", {
                      href: item.href,
                      className: "text-sm/6 text-gray-600 hover:text-blue-300",
                      children: item.name
                    })
                  }, item.name))
                })]
              })
            })
          })
        }), /* @__PURE__ */ jsxs("div", {
          className: "mt-15 border-t border-gray-900/10 pt-8 md:flex md:items-center md:justify-between",
          children: [/* @__PURE__ */ jsx("div", {
            className: "flex gap-x-6 md:order-2",
            children: footerNavigation.social.map((item) => /* @__PURE__ */ jsxs("a", {
              href: item.href,
              target: "_blank",
              className: "text-blue-400 hover:text-blue-300",
              children: [/* @__PURE__ */ jsx("span", {
                className: "sr-only",
                children: item.name
              }), /* @__PURE__ */ jsx(item.icon, {
                "aria-hidden": "true",
                className: "size-6"
              })]
            }, item.name))
          }), /* @__PURE__ */ jsx("p", {
            className: "mt-8 text-sm/6 text-gray-600 md:order-1 md:mt-0",
            children: "©2025 Sara Baltz. All rights reserved."
          })]
        })]
      })
    })]
  });
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: contact,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-lXDMAOaW.js", "imports": ["/assets/chunk-IR6S3I6Y-D7UtmayQ.js", "/assets/index-B0BRSZ--.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/root-DtocxV72.js", "imports": ["/assets/chunk-IR6S3I6Y-D7UtmayQ.js", "/assets/index-B0BRSZ--.js", "/assets/with-props-Vsvj35UN.js"], "css": ["/assets/root-CdDAy098.css"] }, "routes/about": { "id": "routes/about", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/about-DsoX4Cg8.js", "imports": ["/assets/with-props-Vsvj35UN.js", "/assets/chunk-IR6S3I6Y-D7UtmayQ.js", "/assets/XMarkIcon-CPYbhe72.js", "/assets/index-B0BRSZ--.js"], "css": [] }, "routes/projects": { "id": "routes/projects", "parentId": "root", "path": "/projects", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/projects-DZ4BD2px.js", "imports": ["/assets/with-props-Vsvj35UN.js", "/assets/chunk-IR6S3I6Y-D7UtmayQ.js", "/assets/XMarkIcon-CPYbhe72.js", "/assets/index-B0BRSZ--.js"], "css": [] }, "routes/resume": { "id": "routes/resume", "parentId": "root", "path": "/resume", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/resume-CVdWvXQY.js", "imports": ["/assets/with-props-Vsvj35UN.js", "/assets/chunk-IR6S3I6Y-D7UtmayQ.js", "/assets/XMarkIcon-CPYbhe72.js", "/assets/index-B0BRSZ--.js"], "css": [] }, "routes/contact": { "id": "routes/contact", "parentId": "root", "path": "/contact", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/contact-CATXJcAz.js", "imports": ["/assets/with-props-Vsvj35UN.js", "/assets/chunk-IR6S3I6Y-D7UtmayQ.js", "/assets/XMarkIcon-CPYbhe72.js", "/assets/index-B0BRSZ--.js"], "css": [] } }, "url": "/assets/manifest-32f594ce.js", "version": "32f594ce" };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_optimizeDeps": false };
const isSpaMode = false;
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
  "routes/about": {
    id: "routes/about",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/projects": {
    id: "routes/projects",
    parentId: "root",
    path: "/projects",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/resume": {
    id: "routes/resume",
    parentId: "root",
    path: "/resume",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/contact": {
    id: "routes/contact",
    parentId: "root",
    path: "/contact",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  publicPath,
  routes
};
