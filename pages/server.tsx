import React from "react"
import { getSession } from "next-auth/react"
import { GetServerSidePropsContext } from "next"
import { Session } from "next-auth"

interface IServerSideRenderedPageProps {
	session: Session | null
}

const ServerSideRenderedPage = ({session}: IServerSideRenderedPageProps) => {
	if(session){
		return (
			<>
				<h1>Server Side Rendering</h1>
				<p>Using <strong>getSession()</strong> in <strong>getServerSideProps()</strong> is the recommended approach if you need to support Server Side Rendering with authentication</p>
				<p>The advantage of server side rendering is that this page does not require client side JavaScript.</p>
				<p>The disadvantage of server side rendering is that it is slower to render.</p>
			</>
		)
	}

	return <h1>Now the server says you are not authenticated.</h1>
}

// Export the `session` prop to use sessions with Server side rendering
export const getServerSideProps = async (context: GetServerSidePropsContext) => {
	return {
		props: {
			session: await getSession(context)
		}
	}
}

export default ServerSideRenderedPage;