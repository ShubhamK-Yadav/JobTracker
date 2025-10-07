import {
  type RouteConfig,
  index,
  layout,
  route
} from "@react-router/dev/routes"

export default [
  layout("./Layout.tsx", [
    index("./pages/Homepage.tsx"),
    route("add-job", "./pages/AddJobs.tsx")
  ]),
  route("/about", "./pages/About.tsx"),
] satisfies RouteConfig;
