import {
  type RouteConfig,
  index,
  route
} from "@react-router/dev/routes"

export default [
  index("pages/Homepage.tsx"),
  route("/about", "pages/about.tsx")
] satisfies RouteConfig;
