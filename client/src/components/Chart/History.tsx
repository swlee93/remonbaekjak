import React from 'react'
import { UseQuery } from 'utils/fetches'
const History = () => {
  return <></>
}

export default UseQuery(History)`
query {
    rateLimit {
      cost
      remaining
    }
    repository(name: "remonbaekjak", owner: "swlee93") {
      refs(refPrefix: "refs/heads/", orderBy: {direction: DESC, field: TAG_COMMIT_DATE}, first: 100) {
        edges {
          node {
            ... on Ref {
              name
              id
              target {
                ... on Commit {
                  id
                  history(first: 1) {
                    pageInfo {
                      hasNextPage
                    }
                    totalCount
                    edges {
                      node {
                        author {
                          name
                          date
                        }
                        
                        additions
                        deletions
                        changedFiles
                        commitResourcePath
                        oid
                        abbreviatedOid
                        message
                        tree {
                          entries {
                            
                            name
                            type
                            oid
                            object {
                              ...GetAllFiles
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  
  fragment GetAllFiles on Tree {
    ... on Tree {
      entries {
        name
        type
        oid
        object {
          ... on Tree {
            entries {
              name
              type
              oid
              object {
                ... on Blob {
                  text
                }
              }
            }
          }
        }
      }
    }
  }
  
  
`
