const CompanySelect = ({ companies }) => {

  return (
    <div className='CompanySelect'>
      <div className="wrapperC">
        <label htmlFor="companySelect">Company</label>
        {
          companies
          ?
            <select id ='companySelect' defaultValue={'All Companies'}>
                <option value={'All Companies'}>{'All Companies'}</option>
                {companies?.map((company, index) => {
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