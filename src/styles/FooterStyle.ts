import styled from "styled-components";

export const FooterWrapper = styled.footer`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 30px;
  background: linear-gradient(to bottom, white, #d6c7c7);
  height: 400px;
  .footer__section {
    flex: 0 1 200px;
    margin: 10px;
    .footer__title {
      margin-bottom: 10px;
      color: #b02e12;
    }

    .footer__list {
      list-style: none;
      padding: 0;
      li {
        margin: 6px 0;
      }
    }
    .footer__social-icons {
      a {
        margin-right: 15px;
      }
    }
  }
  . footer__bottom {
    width: 100%;
    text-align: center;
    margin-top: 20px;
    border-top: 1px solid #333;
    padding-top: 10px;
    font-size: 14px;
    color: red;
  }
`;
