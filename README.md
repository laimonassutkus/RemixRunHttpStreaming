Simply return an object in loader function that contains a promise:

```javascript
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
```

Then your client-side html can work with the promise using `Await` and `Suspense`:

```javascript
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
```

P.S. increase your server timeout in `entry.server.tsx`:

```javascript
const ABORT_DELAY = 60_000
```