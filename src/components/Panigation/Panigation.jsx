import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './Panigation.scss'



const PaginationSize = (props) =>  {
  const  {setPage, totalPage} = props
    const handlePage = (page) => {
        setPage(page);
        console.log(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  return (
    <Stack spacing={3} >
              <Pagination  count={totalPage} variant="outlined" color="primary" hidePrevButton hideNextButton  onChange={(e) => handlePage(e.target.textContent)}/>
      
    </Stack>
  );
}
export default PaginationSize