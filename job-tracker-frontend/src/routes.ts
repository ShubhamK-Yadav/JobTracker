import {
  type RouteConfig,
  index,
  layout,
  route
} from "@react-router/dev/routes"

// TODO: change JobsTable route to proper page with modular fetch request setup.
export default [
  layout("./Layout.tsx", [
    index("./pages/Homepage.tsx"),
    route("add-job", "./pages/AddJobs.tsx"),
    route("jobs-table", "./components/JobsTable.tsx")
  ]),
  route("/about", "./pages/About.tsx"),
] satisfies RouteConfig;
