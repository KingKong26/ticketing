import { useEffect } from "react";
import useRequest from "../../hooks/use-request";
import Router from "next/router";

export default () => {
  const { doRequest } = useRequest({
    url: "/api/users/signout",
    method: "post",
    body: {},
    onSuccess: () => Router.push("/"),
  });

  useEffect(() => {
    doRequest();
  }, []);
  return (
    <div className="m-5 text-muted-foreground text-lg font-semibold">
      Signing you out...
    </div>
  );
};
