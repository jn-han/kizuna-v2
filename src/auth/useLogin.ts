// 0. Make sure the user has a connected wallet

import { useAuthenticateMutation } from "../graphql/generated";
import { useMutation } from "@tanstack/react-query";
import { useAddress, useSDK } from "@thirdweb-dev/react";
import generateChallenge from "./generateChallenge";
import { setAccessToken } from "./helpers";

export default function useLogin() {

    const address = useAddress();
    const sdk = useSDK();
    const { mutateAsync: sendSignedMessage } = useAuthenticateMutation()

    // 1. Write the async funciton

    async function login() {
        if(!address) return;

        // 1. Generate challenge that comes from the lens API
        const { challenge } = await generateChallenge(address);

        // 2. Sign the challenge with the user's wallet
        const signature = await sdk?.wallet.sign(challenge.text)

        // 3. Send the signed challenge to Lens API
        const {
            authenticate
        } = await sendSignedMessage({
            request: {
                address,
                signature
            }
        })

        console.log("Authenticated:", authenticate)

        // 4. Receive an access token from Lens Protocol if true
        // 5. Store the access token inside local storage so we can use it

        const { accessToken, refreshToken } = authenticate;

        setAccessToken(accessToken, refreshToken);
    }

    // 2. Return the useMutation hook wrapping the async function
    return useMutation(login)








}