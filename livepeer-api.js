import {
    createReactClient,
    studioProvider,
} from '@livepeer/react'


export const livepeerClient = createReactClient({
    provider: studioProvider({ apiKey: 'eecb8587-0ce0-49f8-bcef-53880665c8bc'})
});

