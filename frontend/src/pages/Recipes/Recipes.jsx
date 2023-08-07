import React from 'react';
import { useState, useEffect } from 'react';
import {client} from '../../client'
import {Link} from 'react-router-dom'

import './Recipes.scss'

const Recipes = () => {

  const [recipes, setRecipes] = useState([]);
  const [recipesbtn, setRecipesbtn] = useState([]);
  const [values, setValues] = useState([]);



  useEffect(() => {
    client.fetch(
      `*[_type == "post"] | order(_createdAt desc)
      {
        title,
        slug,
        body,
        metadesc,
        publishedAt,
        mainImage{
          asset -> {
            _id,
            url
          },
          alt
        },
        "author": author -> name
      } [0...5]`
    ).then((data) => setRecipes(data)).catch(console.error)
  }, [])

  useEffect(() => {
    client.fetch(
      `*[_type == "post"] | order(_createdAt desc)
      {
        title,
        slug,
      } [0...10]`
    ).then((data) => setRecipesbtn(data)).catch(console.error)
  }, [])




  return (
    <div className="recipes">
      <div className="recipes_blog">
        <div className="recipes_blog_heading">
          <h1>Recipes</h1>
        </div>
        <div className="recipes_blog_data">
            {recipes.map((post) => (
              <article key={post.slug.current} className='recipes_blog_data_background'>
                <div className="recipes_blog_data_card">
                <img src={post.mainImage.asset.url} alt={post.title} className='blog_image'/>
                <h2>{post.title}</h2>
                <p className='comment'> By {post.author} / {post.publishedAt}</p>
                <p>{post.metadesc}</p>
                <Link to={`/Recipes/${post.slug.current}`} className='blog_button'>Read More &gt;&gt;&gt; </Link>
          </div>
              </article>
            ))}
        </div>
      </div>
      <div className="recipes_blog_button">
        <div className="recipes_blog_button_search">
        <form className='search_button'>
          <input 
          type="string"
          id='search'
          placeholder='Search'
          value={values.keyword}
          onChange={(e) => setValues({...values, keyword: e.target.value})}
          />
         <Link to={`/Searchedrecipes/${values.keyword}`}className='blog_button'> <button>Search</button> </Link>
        </form>
        </div>
        <div className="recipes_blog_button_blogs">
          <h2>Recent Post</h2>
          {recipesbtn.map((post) => (
            <article className='recipes_button'>
              <Link to={`/Recipes/${post.slug.current}`} className='blog_button'> {post.title} </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Recipes