import {
    LanguageClient,
    ServerOptions,
    LanguageClientOptions as ClientOptions,
} from "vscode-languageclient/node";
import { join } from "path";
import { ExtensionContext } from "vscode";

const clientOptions: ClientOptions = {
    documentSelector: [
        {
            scheme: "file",
            language: "ignore",
        },
    ],
};

function getServerOptions(context: ExtensionContext): ServerOptions {
    // let executableName = "gitignore_ultimate_server";
    // if (process.platform === "win32") executableName += ".exe";

    let debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] };
    const serverModule = context.asAbsolutePath(join("bin/gitignore-ultimate-server/src", "main.js"));
    return {
        // command: "node " + context.asAbsolutePath(join("bin/gitignore-ultimate-server/src", "main.js")),
        run: { module: serverModule },
        debug: { options: debugOptions, module: serverModule },
    };
}

export function createClient(context: ExtensionContext): LanguageClient {
    return new LanguageClient(
        "gitignore-ultimate-server",
        "GitIgnore Ultimate Server",
        getServerOptions(context),
        clientOptions
    );
}

export function stopClient(client: LanguageClient): Thenable<void> | undefined {
    if (!client) return;
    return client.stop();
}
