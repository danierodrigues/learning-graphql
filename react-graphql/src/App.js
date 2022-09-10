import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {
  useMutation,
  useQuery,
  gql
} from "@apollo/client";

const BOOKS = gql`
        query Query {
          books {
            id
            title
            author
          }
        }
  `;

const ADD_BOOKS = gql`
# Increments a back-end counter and gets its resulting value
  mutation Mutation($title: String, $author: String) {
    addBook(title: $title, author: $author){
      title
      author
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(BOOKS);
  // Pass mutation to useMutation
  const [mutateFunction, { mutation, loadingMutation, errorMutation }] = useMutation(ADD_BOOKS, {
    refetchQueries: [
      BOOKS, // DocumentNode object parsed with gql
      'Query' // Query name
    ],
    variables: {
      addBookId: 6
  }}
  );
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const createBook = () => {
    console.log(data.books);
    mutateFunction({variables: {addBookId:7, title:title, author:author}});
  };
  



  return (
    <div className="App">
      <div>
        { data?.books && data.books.map((book) => (
          <div style={{"textAlign": "left"}}>
         <span>ID: {book?.id ? book?.id  : "Empty"}</span>
            <br></br>
            <span>Title: {book?.title ? book?.title : "Empty"}</span>
            <br></br>
        <span>Author: {book?.author ? book?.author : "Empty"}</span> 
          </div>
        ))}
      </div>

      <br></br><br></br><br></br>

      <div style={{"textAlign": "center"}}>
        <label>Title</label>
        <input type="text" value={title}  onChange={(event) => setTitle(event.target.value)} />
        <br></br><br></br>
        <label>Author</label>
        <input type="text" value={author} onChange={(event) => setAuthor(event.target.value)} />
        <br></br><br></br>
        <button onClick={createBook}>Submit</button>
      </div>
    </div>
  );
}

export default App;
