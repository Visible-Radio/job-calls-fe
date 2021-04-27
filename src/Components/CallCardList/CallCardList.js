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

const CallCardList = ({ colors, callsById, searchField }) => {
  return (
    <CallCardListStyles>
      {Object.values(callsById)?.map(({ instances, uniqueJobsForLifeCycle, members_needed }, i) => {
        return (
          <CallCard
            index={i}
						instanceCount={instances.length}
            uniqueJobsForLifeCycle={uniqueJobsForLifeCycle}
            instances={instances}
            members_needed={members_needed}
            key={instances[0].union_call_id}
            color={colors[instances[0].member_class]}
            searchField={searchField}
          />
        );
      })}
    </CallCardListStyles>
  );
};

export default React.memo(CallCardList);