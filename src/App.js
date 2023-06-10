import logo from "./logo.svg";
import "./App.css";
import Header from "./Component/Header";
import Footer from "./Component/Footer";
import NavBar from "./Component/NavBar";
import Home from "./Component/Home";
import NewPost from "./Component/NewPost";
import PostPage from "./Component/PostPage";
import About from "./Component/About";
import Missing from "./Component/Missing";
import { useState, useEffect } from "react";
import { useHistory, Route, Switch } from "react-router-dom";
import { format } from "date-fns";

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "First Post",
      datetime: "July 01,2021 11:18:25 AM",
      body: "kjbvskjladiovbavnkjabdnvkadsbvks v,basv sdkb vkdsn v,bsdBVK ,mBVkjd v mn,dskhvB S< DVkhsdb mnsd khj",
    },
    {
      id: 2,
      title: "Second Post",
      datetime: "July 01,2021 11:18:25 AM",
      body: "kjbvskjladiovbavnkjabdnvkadsbvks v,basv sdkb vkdsn v,bsdBVK ,mBVkjd v mn,dskhvB S< DVkhsdb mnsd khj",
    },
    {
      id: 3,
      title: "Third Post",
      datetime: "July 01,2021 11:18:25 AM",
      body: "kjbvskjladiovbavnkjabdnvkadsbvks v,basv sdkb vkdsn v,bsdBVK ,mBVkjd v mn,dskhvB S< DVkhsdb mnsd khj",
    },
    {
      id: 4,
      title: "Fourth Post",
      datetime: "July 01,2021 11:18:25 AM",
      body: "kjbvskjladiovbavnkjabdnvkadsbvks v,basv sdkb vkdsn v,bsdBVK ,mBVkjd v mn,dskhvB S< DVkhsdb mnsd khj",
    },
    {
      id: 5,
      title: "Fifth Post",
      datetime: "July 01,2021 11:18:25 AM",
      body: "kjbvskjladiovbavnkjabdnvkadsbvks v,basv sdkb vkdsn v,bsdBVK ,mBVkjd v mn,dskhvB S< DVkhsdb mnsd khj",
    },
  ]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchReasults] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length -1].id  + 1 : 1;
    const datetime = format(new Date(), "MMMM dd,yyyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody };
    const allPosts = [ ...posts, newPost ];
    setPosts(allPosts);
    setPostTitle("");
    setPostBody("");
    history.push("/");
  };

  const handleDelete = (id) => {
    const postsList = posts.filter((post) => post.id !== id);
    setPosts(postsList);
    history.push("/");
  };

  useEffect(() => {
    const filteredResults = posts.filter(post =>
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase())
    );
    setSearchReasults(filteredResults.reverse() )
  }, [posts, search]);

  return (
    <div className="App">
      <Header title="React JS Blog Website" />
      <NavBar search={search} setSearch={setSearch} />
      <Switch>
        <Route exact path="/">
          <Home posts={searchResults} />
        </Route>
        <Route exact path="/post">
          <NewPost
            handleSubmit={handleSubmit}
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
          />
        </Route>
        <Route path="/post/:id">
          <PostPage posts={posts} handleDelete={handleDelete} />
        </Route>
        <Route path="/about" component={About} />
        <Route path="*" component={Missing} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
