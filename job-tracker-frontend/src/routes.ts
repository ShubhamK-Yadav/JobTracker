import {
  type RouteConfig,
  index,
  layout,
  route
} from "@react-router/dev/routes"

export default [
  layout("./layout.tsx", [
    index("./pages/homepage.tsx"),
  ]),
] satisfies RouteConfig;
