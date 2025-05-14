import { useState, useEffect } from "react";
import type Echo from "laravel-echo";
import echoConfig from "@/config/echo.config";

export const useEcho = (accessToken?: string) => {
    const [echoInstance, setEchoInstance] = useState<Echo<'reverb'> | null>(null);

    useEffect(() => {
        const initializeEcho = async () => {
            const echo: Echo<'reverb'> = await echoConfig(accessToken);
            setEchoInstance(echo);
        };

        initializeEcho();
    }, [accessToken]);

    return echoInstance;
}


export const useEchoChannel = (echo: Echo<'reverb'> | null, channelName: string, event: string, callback: (data) => void, step: number) => {
    useEffect(() => {
        if (!echo) return;

        const channel = echo.private(channelName);
        channel.listen(event, callback);

        return () => {
            if (step == 7) {
                channel.stopListening(event);
                echo.leave(channelName);
            }
        };
    }, [echo, channelName, event, callback, step]);
}