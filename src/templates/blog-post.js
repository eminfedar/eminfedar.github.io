import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Navbar from '../components/Navbar'
import Tag from '../components/Tag'
import AuthorCard from '../components/AuthorCard'
import Footer from '../components/Footer'
import author from '../author/eminfedar.json'

const BlogPostTemplate = ({ data }) => {
  const post = data.markdownRemark

  return (
    <div>
      <Navbar />
      <Helmet title={`Emin Fedar | ${post.frontmatter.title}`} />
      <div className="blog-post-header" style={{ backgroundImage: `url(${ post.frontmatter.image })` }}>
        { post.frontmatter.tags.map((n, i) => <Tag key={ i } tag= { n } />) }
      </div>
      <main id="site-main" className="site-main outer bg-white" role="main">
        <div className="inner">
          <article className="post-full">
            <div className="blog-content">
              <h1 className="post-full-title">{ post.frontmatter.title }</h1>
                <div className="date-meta">
                  <p>{ post.frontmatter.date }</p>
                </div>
                <div dangerouslySetInnerHTML={{ __html: post.html }} />
                <hr />
                <AuthorCard 
                  image={ author.cardimage } 
                  name={ author.name } 
                  website={ author.website }
                  bio={ author.shortbio }
                />
              </div>
            </article>
          </div>
      </main>
      <Footer />
    </div>
  );
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY" locale:"tr-TR")
        description
        image
        tags
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
