import React from "react";
import styled from "styled-components";
import CallCard from "../CallCard/CallCard";

const CallCardListStyles = styled.div`
  grid-column: 2 / -1;
  grid-row: 2 / 3;

  padding: 0 10px 10px 10px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  margin: 0;

  @media screen and (max-width: 840px) {
    grid-column: 1 / 4;
    grid-row: 2;
  }

`;

const CallCardList = ({ colors, callsById }) => {
  return (
    <CallCardListStyles>
      {Object.values(callsById)?.map(({ instances }, i) => {
        return (
          <CallCard
            index={i}
						instances={instances.length}
            data={instances[0]}
            key={"reactKey" + i}
            color={colors[instances[0].member_class]}
          />
        );
      })}
    </CallCardListStyles>
  );
};

export default React.memo(CallCardList);