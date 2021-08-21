import React from "react";
import axios from "axios";

const AddComments = () => {
  const data = {
    body: "laudantium enim quasi est quidem magnam voluptate ipsam eos",
    email: "Eliseo@gardner.biz",
    id: 100,
    name: "id labore ex et quam laborum",
  };
  const setData = () => {
    axios
      .post("https://jsonplaceholder.typicode.com/posts", data)
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <button onClick={setData}>add comm</button>
    </div>
  );
};

export default AddComments;
