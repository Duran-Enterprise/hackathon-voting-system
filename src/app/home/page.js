'use client';
import { useEffect, useState } from 'react';

export default function Home() {
    //TODO: REFACTOR THIS.

    //TODO: Lagay naten to sa .env someday
    const DAEDALUS_SERVER_ID = '1150126011036487723';
    const IS_DAEDALUS_MEMBER_VERIFICATION_LINK = `https://discord.com/api/users/@me/guilds/${DAEDALUS_SERVER_ID}/member`;
    const [username, setUsername] = useState('');
    useEffect(() => {
        // Bale ito oauth na to, ung token is nasa baba ayon. valid for one hr token na yan.
        const fragment = new URLSearchParams(window.location.hash.slice(1));
        const accessToken = fragment.get('access_token');
        const tokenType = fragment.get('token_type');

        fetch(IS_DAEDALUS_MEMBER_VERIFICATION_LINK, {
            headers: {
                authorization: `${tokenType} ${accessToken}`,
            },
        })
            .then((result) => result.json())
            .then((response) => {
                const { user, pending, message } = response;
                console.log(response);

                // If the user is not a daedalus member, maredirect sila sa landing page.
                if (message !== 'Unknown Guild') {
                    setUsername(user.username);
                } else {
                    window.location.href = '/';
                }
            })
            .catch(console.error);
    }, []);
    return (
        <>
            <h1>LANDING PAGE</h1>
            <p>Welcome, {username}</p>
        </>
    );
}
