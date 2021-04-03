import React from 'react'
import { UseQuery } from 'utils/fetches'
const History = () => {
  return <></>
}

export default UseQuery(History)`
query {
    viewer {
        login
        starredRepositories {
            totalCount  
        }
        repositories(first: 3) {
            edges {
                node {
                    name
                    stargazers {
                        totalCount
                    }
                    forks {
                        totalCount
                    }
                    watchers {
                        totalCount
                    }
                    issues(states:[OPEN]) {
                        totalCount
                    }
                }
            }
        }
    }
}
`
