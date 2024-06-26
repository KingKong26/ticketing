import axios from "axios";

export default ({ req }) => {
  if (typeof window === "undefined") {
    // We are on the server side render
    return axios.create({
      baseURL:
        // "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
        "http://ticketing.vishnuverse.xyz/",
      headers: req.headers,
    });
  } else {
    // We are on the client side render
    return axios.create({
      baseURL: "/",
    });
  }
};
