import styled from "styled-components";
import "../styles/_colors.scss";

export const HeaderWrapper = styled.nav`
  background-color:  var(--common-background);
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
  align-items: center;
  .left-section {
    display: flex;
    gap: 10px;
    align-items: center;
    .logo {
        section {
            width: 30%;
        }
    }
  }

  }
`;
