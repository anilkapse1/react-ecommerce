import styled from "styled-components";

export const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  // height: 100vh;
  .main-content {
    display: flex;
    flex: 1;

    aside {
      width: 15vw;
      // background: #fdcbcb;
      padding: 10px;
    }

    main {
      flex: 1;
      padding: 10px;
      background: #fff;
    }
  }
`;
