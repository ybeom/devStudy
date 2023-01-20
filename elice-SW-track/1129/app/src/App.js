import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Header = ({ title }) => {
  return (
    <header>
      <h1>
        <Link to="/">{title}</Link>
      </h1>
    </header>
  );
};
const Nav = ({ topics }) => {
  const liTag = topics.map((t) => {
    return (
      <li key={t.id}>
        <Link to={`/read/${t.id}`}>{t.title}</Link>
      </li>
    );
  });
  return (
    <nav>
      <ul>{liTag}</ul>
    </nav>
  );
};
const Article = ({ title, body }) => {
  return (
    <article>
      <h2>{title}</h2>
      {body}
    </article>
  );
};
const Control = () => {
  const params = useParams();
  const id = Number(params.id);
  let contextUI = null;
  if (id) {
    contextUI = (
      <li>
        <Link to={`/update/${id}`}>Update</Link>
      </li>
    );
  }
  return (
    <ul>
      <li>
        <Link to="/create">Create</Link>
      </li>
      {contextUI}
    </ul>
  );
};
const Create = ({ onSave }) => {
  const submitHandler = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const body = e.target.body.value;
    onSave(title, body);
  };
  return (
    <form onSubmit={submitHandler}>
      <p>
        <input type="text" name="title" placeholder="title" />
      </p>
      <p>
        <textarea name="body" placeholder="body"></textarea>
      </p>
      <p>
        <input type="submit" value="Create" />
      </p>
    </form>
  );
};
const Update = ({ onSave }) => {
  const params = useParams();
  const id = Number(params.id);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  useEffect(() => {
    axios.get(`/topics/${id}`).then((result) => {
      setTitle(result.data.title);
      setBody(result.data.body);
    });
  }, [id]);
  const submitHandler = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const body = e.target.body.value;
    onSave(id, title, body);
  };
  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
  };
  const bodyChangeHandler = (e) => {
    setBody(e.target.value);
  };
  return (
    <form onSubmit={submitHandler}>
      <p>
        <input
          type="text"
          name="title"
          placeholder="title"
          value={title}
          onChange={titleChangeHandler}
        />
      </p>
      <p>
        <textarea
          name="body"
          placeholder="body"
          value={body}
          onChange={bodyChangeHandler}
        ></textarea>
      </p>
      <p>
        <input type="submit" value="Update" />
      </p>
    </form>
  );
};
const Read = () => {
  const params = useParams();
  const id = Number(params.id);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  useEffect(() => {
    axios.get(`/topics/${id}`).then((result) => {
      setTitle(result.data.title);
      setBody(result.data.body);
    });
  }, [id]);
  return <Article title={title} body={body}></Article>;
};
function App() {
  const [topics, setTopics] = useState([]);
  const fetchTopics = async () => {
    const topics = await axios.get("/topics");
    setTopics(topics.data);
  };
  useEffect(() => {
    fetchTopics();
  }, []);
  const navigate = useNavigate();
  const createHandler = (title, body) => {
    axios.post("/topics", { title, body }).then((result) => {
      setTopics((prev) => {
        return [...prev, result.data];
      });
      navigate(`read/${result.data.id}`);
    });
  };
  const updateHandler = (id, title, body) => {
    axios.patch(`/topics/${id}`, { title, body }).then((result) => {
      setTopics((prev) => {
        const index = prev.findIndex((t) => t.id === id);
        const updatedTopics = [...prev];
        updatedTopics[index].title = title;
        updatedTopics[index].body = body;
        return updatedTopics;
      });
      navigate(`read/${result.data.id}`);
    });
  };
  return (
    <div className="App">
      <Header title="웹" />
      <Nav topics={topics} />
      <Routes>
        <Route path="/" element={<Article title="Hello" body="Welcome, WEB!" />}></Route>
        <Route path="/create" element={<Create onSave={createHandler} />}></Route>
        <Route path="/read/:id" element={<Read topics={topics} />}></Route>
        <Route path="update/:id" element={<Update onSave={updateHandler} />}></Route>
      </Routes>
      <Routes>
        <Route path="/" element={<Control></Control>} />
        <Route path="/read/:id" element={<Control></Control>} />
        <Route path="/create" element={<Control></Control>} />
        <Route path="/update/:id" element={<Control></Control>} />
      </Routes>
    </div>
  );
}

export default App;
