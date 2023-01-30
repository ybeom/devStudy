import "./App.css";
import { useState } from "react";

const ChangeMode = {
  WELCOME: "WELCOME",
  READ: "READ",
  CREATE: "CREATE",
  UPDATE: "UPDATE",
};

const Header = ({ title, onChangeMode }) => {
  return (
    <header>
      <h1>
        <a
          href="index.html"
          onClick={(evt) => {
            evt.preventDefault();
            onChangeMode(ChangeMode.WELCOME);
          }}
        >
          {title}
        </a>
      </h1>
    </header>
  );
};
const Nav = ({ topics, onChangeMode }) => {
  const liTag = topics.map((t) => {
    return (
      <li key={t.id}>
        <a
          href={`/read/${t.id}`}
          onClick={(evt) => {
            evt.preventDefault();
            onChangeMode(ChangeMode.READ, t.id);
          }}
        >
          {t.title}
        </a>
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
const Control = ({ onChangeMode, mode }) => {
  const clickCreateHandler = (e) => {
    e.preventDefault();
    onChangeMode(ChangeMode.CREATE);
  };
  const clickUpdateHandler = (e) => {
    e.preventDefault();
    onChangeMode(ChangeMode.UPDATE);
  };
  return (
    <ul>
      <li>
        <a href="/create" onClick={clickCreateHandler}>
          Create
        </a>
      </li>
      <li>
        <a href="/update" onClick={clickUpdateHandler}>
          Update
        </a>
      </li>
    </ul>
  );
};

const Create = ({ onSave }) => {
  const submitHandler = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const body = e.target.body.value;
    onSave(title, body);

    e.target.title.value = "";
    e.target.body.value = "";
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

function App() {
  const [mode, setMode] = useState(ChangeMode.WELCOME);
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "js", body: "js is ..." },
  ]);
  const changeModeHandler = (mode, id) => {
    setMode(mode);
    if (id !== undefined) {
      setId(id);
    }
  };
  const saveHandler = (title, body) => {
    setTopics((prevTopics) => {
      const newTopics = [...prevTopics, { id: nextId, title, body }];
      return newTopics;
    });
    setId(nextId);
    setMode(ChangeMode.READ);
    setNextId((prevNextId) => prevNextId + 1);
  };
  let content = null;
  mode === ChangeMode.WELCOME && (content = <Article title="Hello" body="Welcome, WEB!" />);
  if (mode === ChangeMode.READ) {
    const selected = topics.find((t) => t.id === id);
    content = <Article title={selected.title} body={selected.body} />;
  }
  mode === ChangeMode.CREATE && (content = <Create onSave={saveHandler} />);
  mode === ChangeMode.UPDATE && (content = <div>Update</div>);

  return (
    <div className="App">
      <Header title="웹" onChangeMode={changeModeHandler} />
      <Nav topics={topics} onChangeMode={changeModeHandler} />
      {content}
      <Control onChangeMode={changeModeHandler} mode={mode}></Control>
    </div>
  );
}

export default App;
