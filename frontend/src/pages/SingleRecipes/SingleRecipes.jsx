import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {client} from '../../client'
import BlockContent from '@sanity/block-content-to-react'

import './SingleRecipes.scss'
import { avatar } from '../../assets'

const SingleRecipes = () => {

  const [recipes, setRecipes] = useState([]);
  const [singlerecipes, setSinglerecipes] = useState([]);
  const [values, setValues] = useState([]);
  const [comments, setComments] = useState([]);
  const {slug} = useParams();

  const [formData, setFormData] = useState({  username:"", email:"", textarea:"", blog:""});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const {username, email, textarea, blog} = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {

    const comment = {
      _type: 'comment',
      blog: `${singlerecipes.title}`,
      name: formData.username.toUpperCase(),
      email: formData.email,
      message: formData.textarea,
    };

    client.create(comment)
      .then(() => {
        setIsFormSubmitted(true);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    client.fetch(
      `*[slug.current == '${slug}'] {
        title,
        body,
        author,
        publishedAt,
        mainImage{
          asset -> {
            _id,
            url
          },
          alt
        },
        "author": author -> name
      }`
    ).then((data) => setSinglerecipes(data[0]))
  }, [slug])
  useEffect(() => {
    client.fetch(
      `*[_type == "post"] | order(_createdAt desc){
        title,
        slug,
      } [0...10]`
    ).then((data) => setRecipes(data)).catch(console.error)
  }, [])

  const id = `${singlerecipes.title}`;

  useEffect (() => {
    client.fetch(
      ` *[_type == "comment"] {
        ...,
     }[blog[] match '${id}']| order(_createdAt desc){
      name,
      message,
     }`
    ).then((data) => setComments(data)).catch(console.error)
  }, [id])


  return (
    <div className="single_recipes">
      <div className="single_recipes_blog">
        <section className='single_recipes_blog_card'>
          {singlerecipes.mainImage && singlerecipes.mainImage.asset && (
            <img src={singlerecipes.mainImage.asset.url} alt={singlerecipes.title}
            title={singlerecipes.title} />
          )}
          <h1>{singlerecipes.title}</h1>
          <p> {comments.length ? `${comments.length}`: 0} comments / By {singlerecipes.author} / {singlerecipes.publishedAt}</p>
          <p className='block_data'><BlockContent blocks={singlerecipes.body} projectId="qo0p9ec6" dataset="production" /></p>
        </section>
       
       {/* comment section  */}

       <div className="user_comment">
        <div className="user_comment-data">
          <h2>Your Shared Thoughts</h2>
          {comments.map((comment) => (
            <article key={comment.blog} className='comment_fields'>
              <div className='comment_avatar'><img src={avatar} alt="avatar" />
              <h6>{comment.name}</h6>
              </div>
              <p>"{comment.message}"</p>
            </article>
          ))}
        </div>
       </div>

      
        {!isFormSubmitted ? 
        <div className="comment_body">
          <div className="comment_background">
            <div className="comment_box">
              <h2>Leave a Comment</h2>
              <form>
                <input type="hidden" name='blog' value={blog} onChange={handleChange}/>
                <input type="text" name='username' value={username} onChange={handleChange} placeholder='Name' required='true' />
                <input type="email" name='email'value={email} onChange={handleChange} placeholder='Email' required="true" />
                <textarea name="textarea" value={textarea} onChange={handleChange} placeholder='Your Comment Goes Here' required="true"></textarea>
                <button type='button' onClick={handleSubmit}> Post Comment </button>
              </form>
            </div>
          </div>
        </div>
        :
        <h3 className='comment_success'>Thank You For Your Response</h3>
        }
      </div>
      <div className="recipes_blog_button_single">
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
          {recipes.map((post) => (
            <article className='recipes_button'>
              <Link to={`/Recipes/${post.slug.current}`} className='blog_button'> {post.title} </Link>
            </article>
          ))}
        </div>
      </div>

    </div>
  )
}

export default SingleRecipes