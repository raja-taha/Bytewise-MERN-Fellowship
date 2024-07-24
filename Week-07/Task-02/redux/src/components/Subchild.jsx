import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, incrementByFive } from "../features/showSlice";
import { getAllUsers } from "../features/gitUserSlice";

const Subchild = () => {
  const data = useSelector((state) => state.show.value);
  const dispatch = useDispatch();

  const users = useSelector((state) => state.userData.users);
  const loading = useSelector((state) => state.userData.loading);
  const error = useSelector((state) => state.userData.error);

  return (
    <div>
      <h3>Subchild - {data}</h3>
      <button onClick={() => dispatch(increment())}>Increment 1</button>
      <button onClick={() => dispatch(incrementByFive(5))}>Increment 5</button>
      <button onClick={() => dispatch(getAllUsers())}>Call API</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error...</p>}
      {users.map((user) => (
        <li key={user.id}>{user.login}</li>
      ))}
    </div>
  );
};

export default Subchild;
