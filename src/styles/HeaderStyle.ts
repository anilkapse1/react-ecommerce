import styled from "styled-components";

export const HeaderWrapper = styled.nav`
  padding: 10px;
  background-color: #eee;

  a {
    text-decoration: none;
    color: #333;
    font-weight: 500;
    font-size: 16px;

    &:hover {
      color: #007bff;
    }

    &.active {
      color: #007bff;
      font-weight: 600;
    }
    &:first-of-type {
      margin-right: 20px;
    }
  }
`;
