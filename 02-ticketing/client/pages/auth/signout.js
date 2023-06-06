import { useEffect } from "react";
import Router from 'next/router'
import useRequest from '../../hooks/use-request';

export default () => {
  const { doRequest } = useRequest({
    url: '/api/users/signout',
    method: 'POST',
    body: {},
    onSuccess: () => Router.push('/')
  })

  useEffect(() => {
    doRequest();
  }, [])
  return <div>Signin you out...</div>
}