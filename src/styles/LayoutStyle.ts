import styled from "styled-components";

export const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  .main-content {
    display: flex;
    flex: 1;

    aside {
      width: 200px;
      background: #f4f4f4;
      padding: 10px;
    }

    main {
      flex: 1;
      padding: 10px;
      background: #f9f9f9;
    }
  }
`;
