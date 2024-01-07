import styled from "styled-components";

export const GRAY = "#e8e8e8";

export const Message = styled.div`
  height: 50px;
  // color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  border-radius: 25px;
  drop-shadow(0px 15px 30px rgba(100, 100, 100, 0.4));
`;

export const SuccessMessage = styled(Message)`
  // background-color: #1cd17c;
  // drop-shadow(0px 15px 30px rgba(40, 195, 135, 0.4));
`;

export const ErrorMessage = styled(Message)`
  // background-color: #f23636;
  // filter: drop-shadow(0px 15px 30px rgba(221, 6, 50, 0.4));
`;
