const CompanySelect = ({ companiesOnRecord, handleCompanyChange, selectedCompany }) => {

  return (
    <div className='CompanySelect'>
      <div className="wrapperC">
        <label htmlFor="companySelect">Company</label>
        {
          companiesOnRecord
          ?
            <select
              id ='companySelect'
              value={selectedCompany}
              onChange={handleCompanyChange}
            >
              <option value={'All Companies'}>{'All Companies'}</option>
              {companiesOnRecord?.map((company, index) => {
                return <option value={company} key={index}>{company}</option>
              })}
            </select>
          :
            <select disabled id ='companySelect' defaultValue={'All Companies'}>
              <option value={'All Companies'}>{'Fetching Company List'}</option>
            </select>
        }
      </div>
    </div>
  )
}

export default CompanySelect;