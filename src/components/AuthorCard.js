import React from 'react'

const AuthorCard = ({ image, name, website, bio }) =>
  <section className="author-card">
    <div>
      <img className="author-profile-image" src={ image } alt={ name } />
    </div>
    <div className="author-card-content">
      <h4 className="author-card-name">{ name }</h4>
      <span>{bio}</span>
    </div>
  </section>

export default AuthorCard
