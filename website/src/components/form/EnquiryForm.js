import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { baseUrl } from "../../../config";
import Loading from "../Other/Loading";
import { toast } from "react-toastify";

const Modal = styled.div`
  display: ${({ show }) => (show ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  overflow: hidden;
`;

const Form = styled.form`
  width: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  right: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 60px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  margin-top: 10px;
  
  @media (max-width: 576px) {
    width: 80%;
    top: 40%;
  }
`;

const FormData = styled.div`
  margin: 0.2rem;
`;

const Label = styled.label`
  line-height: 35px;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  display: inline-block;
  padding: 0.8rem 1.2rem;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  border: none;
  border-radius: 5px;
  background-color: black;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  margin-left: 2.2rem;
  margin-bottom: -3rem;

  &:hover {
    background-color: black;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 10px;
  border: none;
  outline: none;
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: black;

  &:before {
    content: "×";
    font-size: 30px;
    color: white;
    text-align: center;
    vertical-align: middle;
  }
`;

export const EnquiryForm = ({ show, setShow, data }) => {
  console.log(data);
  const [name, setName] = useState("");
  const [medicine, setMedicine] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [phNum, setPhNum] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = `${baseUrl}/api/wholesaleEnquiry`;
      await axios.post(url, {
        productCode: data.id,
        productName: data.name,
        name: name,
        phoneNumber: phNum,
        country: country,
        email: email,
        message: message,
      });
      setLoading(false);
      setShow(false);
      setCountry("");
      setEmail("");
      setMedicine("");
      setName("");
      setPhNum("");
      return toast.success("Your enquiry has been submitted !");
    } catch (error) {
      console.log(error);
      return toast.error("An error has occured!");
    }
  };

  return (
    <>
      { loading ? (
        <Loading />
      ) : (
        <Modal show={show}>
          <Form onSubmit={handleSubmit}>
            <CloseButton onClick={() => setShow(false)} />
            <FormData>
              <Label htmlFor="medicine">Medicine:</Label>
              <Input
                type="text"
                value={data.name}
                onChange={(e) => setMedicine(e.target.value)}
                id="medicine"
                required
              />
              <Label htmlFor="name">Your Name:</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                id="name"
                name="name"
                required
              />
              <br />
              <Label htmlFor="email">Your Email:</Label>
              <Input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                name="email"
                required
              />
              <br />
              <Label htmlFor="phone">Your Phone:</Label>
              <Input
                value={phNum}
                onChange={(e) => setPhNum(e.target.value)}
                type="tel"
                id="phone"
                name="phone"
                required
              />
              <br />
              <Label htmlFor="country">Your Country:</Label>
              <Input
                type="text"
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                name="country"
                required
              />
              <br />
              <Label htmlFor="message">Message:</Label>
              <TextArea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                id="message"
                name="message"
                rows="4"
                required
              />
              <br />
            </FormData>
            <br />
            <Button type="submit">Submit</Button>
          </Form>
        </Modal>
      )}
    </>
  );
};
