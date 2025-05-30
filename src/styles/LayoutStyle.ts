import styled from "styled-components";
import "../styles/_colors.scss";

export const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  .main-content {
    display: flex;
    flex: 1;

    aside {
      width: 15vw;
      padding: 10px;
    }

    main {
      flex: 1;
      padding: 10px;
      background: #fff;
    }
  }
`;
