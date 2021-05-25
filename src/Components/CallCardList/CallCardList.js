import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import CallCard from "../CallCard/CallCard";
import PageNav from "../PageNav/PageNav";

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
  const [currentPage, setCurrentPage] = useState(0);
  const [resultsPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(null);
  const firstIndex = currentPage * resultsPerPage;
  const lastIndex = firstIndex + resultsPerPage;

  const allCalls = Object.values(callsById).reverse();
  const topRef = useRef(null);

  useEffect(() => {
    setPageCount(Math.ceil(allCalls?.length / resultsPerPage));
  }, [allCalls, resultsPerPage]);

  useEffect(() => {
    setCurrentPage(0);
  },[pageCount]);

  useEffect(() => {
    topRef.current.scrollIntoView({behavior: "smooth", block: "start"});
  },[currentPage]);

  const changePage = (event) => {
    const direction = Number(event.target.value);
    if (currentPage < pageCount - 1 && direction === 1) {
      setCurrentPage(currentPage + direction);
    } else if ( currentPage > 0 && direction === -1 ) {
      setCurrentPage(currentPage + direction);
    }
  }

  const pageJump = (event) => {
    const destination = event.target.value === 'start' ? 0 : pageCount - 1;
    setCurrentPage(destination);
  }

  const page = allCalls.slice(firstIndex, lastIndex);

  return (
    <CallCardListStyles>
      <div ref={topRef}></div>
      {page?.map(({ instances, uniqueJobsForLifeCycle, members_needed }, i) => {
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
      <PageNav
        pageJump={pageJump}
        changePage={changePage}
        pageCount={pageCount}
        currentPage={currentPage}
      ></PageNav>
    </CallCardListStyles>
  );
};

export default React.memo(CallCardList);
