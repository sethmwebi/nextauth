import React, { FC, useState, useEffect } from "react"
import { useSession, getProviders, signIn, signOut, ClientSafeProvider, LiteralUnion } from "next-auth/react"

const SignIn: FC = () => {
	const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>()
	const {data: session, status} = useSession()

	useEffect(() => {
		const setTheProviders = async () => {
			const setupProviders = await getProviders()
			setProviders(setupProviders)
		}
		setTheProviders()
	},[])

	if(status === "loading"){
		return <h1>Loading...</h1>
	}

	if(session){
		return (
			<>
				Signed in as Custom Page {session.user?.email}<br />
				<button type="button" onClick={() => signOut()}>
					Sign Out
				</button>
			</>
		)
	}

	return (
		<>
			Not signed in but in the custom page!
			<br />
			<button type="button" onClick={() => signIn()}>
				Sign in
			</button>
			{providers?.email && (
				<>
					<br />
					<br />
					<button type="button" onClick={() => signIn(providers.email.id)}>
						Email Login Bro
					</button>
				</>
			)}
			{providers?.github && (
				<>
					<br />
					<br />
					<button type="button" onClick={() => signIn(providers.github.id)}>
						Github Login Sister
					</button>
				</>
			)}
		</>
	)
}

export default SignIn