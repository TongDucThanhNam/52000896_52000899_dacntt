import {NextSSRPlugin} from "@uploadthing/react/next-ssr-plugin";
import {extractRouterConfig} from "uploadthing/server";

import {ourFileRouter} from "@/app/api/uploadthing/core";
import React, {Fragment} from "react";

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <Fragment>
            <NextSSRPlugin
                /**
                 * The `extractRouterConfig` will extract **only** the route configs
                 * from the router to prevent additional information from being
                 * leaked to the client. The data passed to the client is the same
                 * as if you were to fetch `/api/uploadthing` directly.
                 */
                routerConfig={extractRouterConfig(ourFileRouter)}
            />
            {children}
        </Fragment>
    );
}