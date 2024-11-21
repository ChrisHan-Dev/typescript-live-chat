import React, { useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

function AccTable() {
  const [data, setData] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<User | null>(null);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const togglePassVisibility = () => {
    setShowPass((prevShowPass) => !prevShowPass);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setEmail(input);
    setIsValid(emailRegex.test(input)); // Check format
  };

  const handleEdit = (user: User) => {
    setEditId(user.id);
    setEditValues({ ...user });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editValues) {
      setEditValues({
        ...editValues,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSave = () => {
    if (editValues) {
      setData((prevData) =>
        prevData.map((user) => (user.id === editId ? { ...editValues } : user))
      );
      setEditId(null);
      setEditValues(null);
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setEditValues(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("name:", name);
    console.log("email:", email);
    console.log("password:", password);
    if (name && email && password) {
      // Thêm người dùng vào mảng data
      const newUser: User = { id: data.length + 1, name, email, password };
      setData((prevData) => [...prevData, newUser]);

      // Reset các input về chuỗi rỗng
      setName("");
      setEmail("");
      setPassword("");
    } else {
      alert("Vui lòng nhập đầy đủ thông tin!");
    }
  };

  return (
    <div className="table-container">
      <div className="input-box">
        <form onSubmit={handleSubmit} className="form-style">
          <input
            className="input-text"
            type="text"
            value={name}
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className={`input-text ${
              isValid ? "input-valid" : "input-invalid"
            }`}
            type="text"
            value={email}
            placeholder="Enter your email"
            onChange={handleEmailChange}
          />
          {!isValid && <p className="input-invalid">Invalid email format</p>}
          <input
            className="input-text"
            type={showPass ? "text" : "password"}
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="div-password">
            <button
              className="toggle-button"
              onClick={togglePassVisibility}
              type="button"
            >
              {showPass ? "Hide" : "Show"}
            </button>
          </div>

          <button type="submit" className="add-button">
            Add
          </button>
        </form>
      </div>
      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Edit</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                {editId === user.id ? (
                  <input
                    type="text"
                    name="name"
                    value={editValues?.name || ""}
                    onChange={handleInputChange}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editId === user.id ? (
                  <input
                    type="email"
                    name="email"
                    value={editValues?.email || ""}
                    onChange={handleInputChange}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editId === user.id ? (
                  <input
                    type="password"
                    name="password"
                    value={editValues?.password || ""}
                    onChange={handleInputChange}
                  />
                ) : (
                  user.password
                )}
              </td>
              <td>
                {editId === user.id ? (
                  <>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </>
                ) : (
                  <button onClick={() => handleEdit(user)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AccTable;
