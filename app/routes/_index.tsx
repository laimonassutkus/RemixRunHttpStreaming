import {Await, useLoaderData} from "@remix-run/react"
import {Suspense} from "react"

export async function loader() {
    const messagePromise = new Promise(resolve => {
        setTimeout(() => {
            console.log("Loader resolved!")
            resolve("Hello World !")
        }, 20_000)
    })

    return {
        message: messagePromise
    }
}

export default function Index() {
    const {message} = useLoaderData<typeof loader>()

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Await resolve={message}>
                {(message) => <div>{message}</div>}
            </Await>
        </Suspense>
    )
}
