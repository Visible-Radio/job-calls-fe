const CompanySelect = ({ companies }) => {

  return (
    <div className='CompanySelect'>
      <select>
        {companies?.map((company, index) => {
          return <option key={index}>{company}</option>
        })}
      </select>
    </div>
  )
}

export default CompanySelect;