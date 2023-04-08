import styled from "styled-components";

export const Container = styled.div`
  width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  color: #000;
  text-align: center;
  border-radius: 20px;
  padding: 30px 30px 70px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 30%;
  z-index: 12;
`;

export const Button = styled.button<{ color: string }> `
  background-color: ${({color}) => color};
  border: none;
  border-radius: 5px;
  width: 200px;
  padding: 14px;
  font-size: 16px;
  color: white;
  box-shadow: 0px 6px 18px -5px rgba(237, 103, 85, 1);
`;

export const Text = styled.p`
  margin-bottom: 40px;
  font-size: 18px;
  font-weight: 700;
`;

export const Img = styled.img`
  width: 82px;
  margin-bottom: 15px;
`;
