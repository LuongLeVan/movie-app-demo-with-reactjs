import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './Panigation.scss'



const PaginationSize = (props) =>  {
  const  {setPage, setPageTV, totalPageTV, totalPage, Movie} = props
    const handlePage = (page) => {
        setPage(page);
       
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const handlePageTV = (page) => {
      setPageTV(page);
     
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }
    return (
      <Stack spacing={3} >
              <Pagination  count={Movie ? totalPage :  totalPageTV} variant="outlined" color="primary" hidePrevButton hideNextButton  onChange={(e) => {Movie ? handlePage(e.target.textContent) :handlePageTV(e.target.textContent)}}/>
      
    </Stack>
  );
}
export default PaginationSize