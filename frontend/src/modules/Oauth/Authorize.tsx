import React, { useEffect, useState } from "react";
import useRouter from "@/_hooks/use-router";
import { authenticationService } from "@/_services";
import Configs from "./Configs/Config.json";
import { RedirectLoader } from "@/_components";
import { redirectToWorkspace } from "@/core/utils";
import { JetRouteName, navigate } from "../routes";

export function Authorize() {
  const [error, setError] = useState("");
  const router = useRouter();

  const organizationId = authenticationService.getLoginOrganizationId();

  useEffect(() => {
    const errorMessage: any =
      router.query.error_description || router.query.error;

    if (errorMessage) {
      return setError(errorMessage);
    }

    if (!(router.query.origin && Configs[router.query.origin as string])) {
      return setError("Login failed");
    }

    const configs = Configs[router.query.origin as string];
    const authParams: any = {};

    if (configs.responseType === "hash") {
      if (!window.location.hash) {
        return setError("Login failed");
      }
      const params = new Proxy(
        new URLSearchParams(window.location.hash.substr(1)),
        {
          get: (searchParams, prop: string) => searchParams.get(prop),
        }
      );
      authParams.token = params[configs.params.token];
      authParams.state = params[configs.params.state];
    } else {
      authParams.token = router.query[configs.params.token];
      authParams.state = router.query[configs.params.state];
    }

    let subsciption;
    if (organizationId) {
      subsciption = authenticationService.currentSession.subscribe(
        (session) => {
          //logged users should send tj-workspace-id when login to unauthorized workspace
          if (
            session.authentication_status === false ||
            session.current_organization_id
          ) {
            signIn(authParams, configs);
          }
        }
      );
    } else {
      signIn(authParams, configs);
    }

    () => subsciption && subsciption.unsubscribe();
    // Disabled for useEffect not being called for updation
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signIn = (authParams, configs) => {
    authenticationService
      .signInViaOAuth(router.query.configId, router.query.origin, authParams)
      .then(({ redirect_url, current_organization_id }) => {
        if (redirect_url) {
          window.location.href = redirect_url;
          return;
        }
        /*for workspace login / normal login response will contain the next organization_id user want to login*/
        if (current_organization_id) {
          redirectToWorkspace();
        }
      })
      .catch((err) =>
        setError(
          `${configs.name} login failed - ${
            err?.error || "something went wrong"
          }`
        )
      );
  };

  useEffect(() => {
    if (error) {
      navigate({
        to: JetRouteName.login,
        state: { errorMessage: error && error },
      });
    }
  }, [error]);

  return (
    <div>
      <RedirectLoader
        origin={
          Configs[router.query.origin as string]
            ? (router.query.origin as string)
            : "unknown"
        }
      />
      {/* {error && (
        <Navigate
          replace
          to={`/login${error && organizationId ? `/${organizationId}` : ""}`}
          state={{ errorMessage: error && error }}
        />
      )} */}
    </div>
  );
}
