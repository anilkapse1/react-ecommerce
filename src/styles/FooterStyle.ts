import styled from "styled-components";
import '../styles/_colors.scss'

export const FooterWrapper = styled.footer`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-top: 30px;
  padding-bottom: 30px;
  background: linear-gradient(to bottom, white, #d6c7c7);
  height: 400px;
  .footer__section {
    flex: 0 1 200px;
    margin: 10px;
    .footer__title {
      margin-bottom: 10px;
      color: var(--common-heading);
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
  .footer__bottom {
    width: 100%;
    text-align: center;
    margin-top: 20px;
    padding-top: 10px;
  }
`;
