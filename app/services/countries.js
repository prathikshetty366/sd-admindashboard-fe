// import { GetCountries } from "@/graphql/getCountries";
// import API from "./client";
// import gql from "graphql-tag";


export function fetchCountries() {
  console.log("reaching service")
    return API.query({
      query: gql`
        ${GetCountries()}
      `,
    });
  }