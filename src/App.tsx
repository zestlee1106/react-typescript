import { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    // console.log(e.currentTarget.value); // target 과 currentTarget 은 같은 거라고 생각하면 되는데, react 에서는 currentTarget 을 선택했다
    const {
      currentTarget: { value },
    } = event;
    setUsername(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("hello", username);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={username}
          onChange={onChange}
          type="text"
          placeholder="username"
        />
        <button>Log in</button>
      </form>
    </div>
  );
}

export default App;
