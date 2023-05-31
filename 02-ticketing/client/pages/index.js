import React from 'react'
import buildClient from '../api/build-client'

// currentUser getted from initalProps
const LandingPage = ({ currentUser }) => {
 return currentUser ? <h1>Youre signed in</h1> : <h1>Youre not signed in</h1>
}

// in server, property to set initial props during the SSR process
LandingPage.getInitialProps = async (context) => {  // the request object
  console.log('LANDING PAGE!')
  const client = buildClient(context)
  const { data } = await client.get('/api/users/currentuser')
  return data
};

export default LandingPage