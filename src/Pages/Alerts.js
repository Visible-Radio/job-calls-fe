import { useCallback, useEffect, useState } from "react";
import MultiSelect from "../Components/MultiSelect/MultiSelect";
import { colors, readableClassification } from "../config";
import { Link } from "react-router-dom";
import Loader from "../Components/Loader/Loader";
import { ButtonStyled } from "../Components/ButtonStyled";
import styled from "styled-components";

// const alertsURL = "http://localhost:4000/alerts";
const alertsURL = "https://evening-plateau-74700.herokuapp.com/alerts";

const SmallPageWrapper = styled.div`
  padding: 0 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  div.sectionWrapper {
    width: 100%;
    max-width: var(--maxWidth);
  }

  p {
    margin: 0;
    line-height: 1.5rem;
  }

  section {
    padding: var(--pad);
  }

  section.about {
    h2 {
      border-bottom: 2px solid var(--greyCyan);
    }
  }

  section.alertsConfig {
    border: 2px solid var(--greyCyan);
    border-radius: var(--borad);
  }

  div.center {
    display: flex;
    flex-flow: wrap;
    width: 100%;
    justify-content: center;
    align-items: center;
    padding: 1rem;
  }
`;

const Alerts = ({ toggleAuth }) => {
  // const token = localStorage.token;
  const [ companies, setCompanies ] = useState([]);
  const [ multiSelectSelections, setMultiSelectSelections] = useState({});
  const [ loading, setLoading ] = useState({});

  const getUserAlerts = useCallback(async () => {
    try {
      const token = localStorage.token;
      if (!token) throw new Error('Session Expired');
      setLoading((prevState) => ({
        ...prevState,
        loadingAlerts: true
      }));
      const response = await fetch(alertsURL, {
        method: "GET",
        headers: {
          "token": token
        }
      }).then(res => res.json());

      console.log(`response`, response);
      setMultiSelectSelections(response);

    } catch (error) {
      console.error(error.message);

    } finally {
      setLoading((prevState) => ({
        ...prevState,
        loadingAlerts: false
      }));
    }
  },[]);

  useEffect(() => {
    getCompanies();
    getUserAlerts();
  },[getUserAlerts]);

  const getCompanies = async() => {
    setLoading((prevState) => ({
      ...prevState,
      loadingCompanies: true
    }));

    const response = await fetch("https://evening-plateau-74700.herokuapp.com/API/companies")
      .then(res => res.json()).catch(e => console.error(e.message));

    setCompanies(response);

    setLoading((prevState) => ({
      ...prevState,
      loadingCompanies: false
    }));
  }

  const postNewAlerts = async() => {
    const body = {
      alertsCompanies: multiSelectSelections.alertsCompanies,
      alertsClasses: multiSelectSelections.alertsClasses
    }

    try {
      const token = localStorage.token;
      if (!token) throw new Error('Session Expired');
      const response = await fetch("https://evening-plateau-74700.herokuapp.com/alerts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token": token
        },
        body: JSON.stringify(body)
      });

      if (response.status === 403) {
        throw new Error("403 status from server, logging client out");
      }
      const parsedResponse = await response.json();
      setMultiSelectSelections(parsedResponse);
      alert('Alerts Updated!');

    } catch (error) {
      console.error(error.message);
      alert('Session Expired');
      logOut();
    }
  }

  const logOut = (event) => {
    localStorage.removeItem("token");
    toggleAuth(false);
  }

  const onSelectionChange = useCallback(({ id, selection }) => {
    // this needs to get passed in to the multiselect component
    // so you can set state out here in the parent
    // inside it is passed an id, and an array of the currently selected options
    setMultiSelectSelections((prevState) => ({
      ...prevState,
      [id]: selection
    }));
  },[])

  const { alertsClasses, alertsCompanies } = multiSelectSelections;
  return (
    <>
      <Loader loading={Object.values(loading).includes(true)}>
        <SmallPageWrapper>
          <div className="sectionWrapper">
            <section className="about">
              <h2>Alerts Configuration</h2>
              <p>You'll receive alerts via the email address you provided during registration.</p>
              <p>Specifying a company AND a classification will return more specific results. Only matches at that company for that classification will be sent to you.</p>
              <p>Specifying a classification or group of classifcations will return results from any company for those classifications.</p>
              <p>Specifying a company or group of companies will return results from any classification at that company.</p>
            </section>
            <section className="alertsConfig">
              <h2>Company Alerts</h2>
              <MultiSelect
                optionsArray={companies}
                selectedOptionsArray={alertsCompanies}
                placeholder={'Search companies'}
                id={'alertsCompanies'}
                onSelectionChange={onSelectionChange}
                loading={Object.values(loading).includes(true)}
              />
              <h2>Classification Alerts</h2>
              <MultiSelect
                optionsArray={Object.keys(colors).sort()}
                itemColors={colors}
                longOptions={readableClassification}
                selectedOptionsArray={alertsClasses}
                placeholder={'Search classes'}
                id={'alertsClasses'}
                onSelectionChange={onSelectionChange}
                loading={Object.values(loading).includes(true)}
              />
              <div className="center">
                <ButtonStyled onClick={postNewAlerts} className="btn btn-primary">Save my alerts configuration</ButtonStyled>
              </div>
            </section>
            <div className="center">
              <Link to="/">
                <ButtonStyled onClick={logOut} className="btn btn-primary">Logout</ButtonStyled>
              </Link>
              <Link to="/">
                <ButtonStyled className="btn btn-primary">Browse Database</ButtonStyled>
              </Link>
            </div>
          </div>
        </SmallPageWrapper>
      </Loader>
    </>
  )
}

export default Alerts;

