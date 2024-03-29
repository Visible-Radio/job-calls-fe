import { useEffect, useState } from "react";
import styled from "styled-components";
import { FancyButton } from "../FancyButton/FancyButtonStyled";

const CallCardStyled = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 5px;
  color: var(--greyCyan);
  border-radius: 20px;
  font-size: 15px;
  padding: 6px;
  align-content: flex-start;
  height: max-content;
  border: 3px solid transparent;
  border-color: var(--greyCyan);
  transition: height 1s;

  div {
    margin: 4px 4px 4px 4px;
    background-color: #0c142a;
    text-align: center;
  }

  div.center {
    background-color: transparent;
  }

  p {
    margin: 0.5rem 1rem 1rem 1rem;
    line-height: 1.25rem;
  }

  h5 {
    margin: 0;
    color: var(--slate);
    font-size: 1rem;
    font-weight: 600;
    text-align: center;
    background-color: ${(props) => props.color};
  }

  h2 {
      font-size: var(--fzh2);
      padding: 0;
      margin: 1rem;
  }
  h3 {
    font-size: var(--fzh3);
  }
  h4 {
    font-size: var(--fzh4);
  }

  .compact {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: transparent;
    color: ${(props) => props.color};
  }

  .classShield {
    border-radius: 0 0 25px 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    width: 60px;
    height: 60px;
    background-color: ${(props) => props.color};

    h3 {
      font-weight: bold;
      color: var(--slate);
      margin: 0;
      padding: 0;
    }
  }

  .expanded {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    max-height: ${(props) => (props.isOpen ? "1000px" : "0px")};
    transition: max-height 0.5s;
    overflow-y: hidden;
    background-color: transparent;
  }

  .highlight {
    background-color: var(--brightOrange);
    padding: 3px;
    border-radius: 1rem;
    color: black;
  }

  div.headline {
    display: flex;
    width: 100%;
    flex-direction: row wrap;
    /* flex-direction: column; */
    align-items: center;
    /* align-items: flex-start; */
    justify-content: space-between;
    background-color: transparent;
    padding: 0 1rem 0 1rem;
    margin: 0;

    h2, h4 {
      padding: 0;
      margin: 0;
      text-align: left;
    }
  }

  @media screen and (max-width: 1000px) {
    div.headline {
      flex-direction: column;
      align-items: flex-start;
    }
  }

`;

const CallCard = ({
  instances,
  members_needed,
  color,
  instanceCount,
  uniqueJobsForLifeCycle,
  searchField,
}) => {
  const [isOpen, setIsOpen] = useState(null);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(searchField.length ? true : false);
  }, [searchField]);

  const callAttributes = instances[0];
  const firstAppeared = instances[0].call_date_from_html;
  const lastAppeared = instances[instances.length - 1].call_date_from_html;
  return (
    <CallCardStyled color={color} isOpen={isOpen}>
      <div className="compact">
        <div className="classShield">
          <h3>{callAttributes?.member_class}</h3>
        </div>
        <div className="headline">
          <h2>{callAttributes?.company}</h2>
          {!isOpen &&
            <h4>{firstAppeared.split(',').join(', ')}</h4>
          }
        </div>
        <div className="center">
          <FancyButton
            color={color}
            isOpen={isOpen}
            onClick={handleClick}
          ></FancyButton>
        </div>
      </div>
      <div className="expanded">
        {instanceCount > 1 && (
          <>
            <div>
              <h5>First Call Date</h5>
              <p>{firstAppeared}</p>
            </div>
            <div>
              <h5>Last Call Date</h5>
              <p>{lastAppeared}</p>
            </div>
          </>
        )}
        {instanceCount === 1 && (
          <>
            <div>
              <h5>Call Date</h5>
              <p>{firstAppeared}</p>
            </div>
          </>
        )}
        <div>
          <h5>Start Date</h5>
          <p>{callAttributes?.start_date_from_html}</p>
        </div>
        <div>
          <h5>Location</h5>
          <p>{callAttributes?.location}</p>
        </div>
        <div>
          <h5>Start Time</h5>
          <p>{callAttributes?.start_time}</p>
        </div>
        {instanceCount === 1 && (
          <div>
            <h5>Members</h5>
            <p>{members_needed[0]}</p>
          </div>
        )}
        {instanceCount > 1 && (
          <div>
            <h5>Members</h5>
            <p>{members_needed.join(", ")}</p>
          </div>
        )}
        <div>
          <h5>Occurences</h5>
          <p>{instanceCount}</p>
        </div>
        <div>
          <h5>Unique Jobs</h5>
          <p>{uniqueJobsForLifeCycle}</p>
        </div>
        <div>
          <h5>Union Call ID</h5>
          <p>{callAttributes?.union_call_id}</p>
        </div>
        {searchField.length === 0 && (
          <div>
            <h5>Details</h5>
            <p>{callAttributes?.summary}</p>
          </div>
        )}
        {searchField.length > 0 && (
          <div>
            <h5>Details</h5>
            {
              <p>{
                callAttributes?.summary.split(new RegExp(`(${searchField})`, 'gi'))
                  .map((textSegment, i) => {
                    return textSegment.toLowerCase() === searchField.toLowerCase()
                      ? <span key={i} className="highlight">{textSegment}</span>
                      : <span key={i}>{textSegment}</span>
                  })
              }</p>
            }
          </div>
        )}
      </div>
    </CallCardStyled>
  );
};

export default CallCard;
