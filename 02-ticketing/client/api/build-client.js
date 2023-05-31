import axios from 'axios';

export default ({ req }) => {

  if( typeof window === 'undefined') {
    return axios.create({
      // we are on the server
      // 'http://SERVICENAME.NAMESPACE.svc.cluster.local'
      baseURL: 'http://ingress-nginx.ingress-nginx.svc.cluster.local',
      headers: req.headers
    })
  } else {
    // we must be on the browser
      // request can be made with a base url of ''
    return axios.create({
      baseURL: '/',

    })
  }

}
