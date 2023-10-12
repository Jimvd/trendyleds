export const GET_CONTENT = `
query getSinglePost($slug: String) {
  post(id: $slug, idType: SLUG) {
    content(format: RENDERED)
    excerpt(format: RENDERED)
    modified
    slug
    title(format: RENDERED)
    featuredImage {
      node {
        mediaDetails {
          sizes {
            sourceUrl
            width
            height
          }
          meta {
            aperture
            camera
            caption
            copyright
            createdTimestamp
            credit
            focalLength
            iso
            orientation
            shutterSpeed
            title
          }
        }
      }
    }
  }
  categories {
    nodes {
      slug
      name
    }
  }
}

`;



