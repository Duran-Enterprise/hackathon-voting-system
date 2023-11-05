'use client';
import React, { useEffect } from 'react';

// TODO: Remove these links here and use environment in the future.
export const Login = () => {
    const DEV_REDIRECT_LINK =
        'https://discord.com/api/oauth2/authorize?client_id=1170585102821105805&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fhome&response_type=token&scope=guilds.members.read%20identify';

    return (
        <>
            <h1>Login</h1>
            <a href={DEV_REDIRECT_LINK}> Login via Discord</a>
        </>
    );
};
