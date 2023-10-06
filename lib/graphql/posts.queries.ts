export const GET_POSTS = `query GetPosts {
  posts {
    nodes {
      date
      slug
      title
      excerpt(format: RENDERED)
      featuredImage {
        node {
          mediaDetails {
            file
            sizes {
              sourceUrl
              width
              height
            }
          }
        }
      }
   categories {
      nodes {
      name
      slug
    }
  }
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  
  }
}`;




