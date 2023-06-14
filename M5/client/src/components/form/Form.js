import React from "react";
import style from "./Form.module.css";
import { useState } from "react";
import Modal from "react-modal";

function FormApplication() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const applications = { name, number, email, message };

    const response = await fetch("/api/applications", {
      method: "POST",
      body: JSON.stringify(applications),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setError(null);
      console.log(`New application added`);
    }

    setShowModal(true);

    console.log({ name });
    console.log({ number });
    console.log({ email });
    console.log({ message });

    setName("");
    setNumber("");
    setEmail("");
    setMessage("");
  };

  return (
    <div>
      <div className={style.form_main}>
        <div className={style.form_container}>
          <div>
            <h1 className={style.form_header}>Make an inquiry:</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name"></label>
              <input
                className={style.input_formatter_name}
                type="text"
                id="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="number"></label>
              <input
                className={style.input_formatter_number}
                type="number"
                id="number"
                placeholder="Enter number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email"></label>
              <input
                className={style.input_formatter_email}
                type="email"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="message"></label>
              <textarea
                className={style.input_formatter_message}
                id="message"
                placeholder="Write your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            <div className={style.input_formatter_submit}>
              <button className={style.input_formatter_button} type="submit">
                Send enquiry
              </button>
            </div>
            {error && <div className={style.error_message}>{error}</div>}
          </form>

          <Modal
            className={style.modal}
            isOpen={showModal}
            onRequestClose={() => setShowModal(false)}
            contentLabel="Form Input Modal"
          >
            <div className={style.modal_inner}>
              <h4>
                Thanks for dropping us a line.<br></br>
                <br></br>
                One of our agents will be in touch shortly.
                <br></br>
                <br></br>
                Have a great day from the team here at Metro.
              </h4>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default FormApplication;
