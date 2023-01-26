import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Tab, Tabs } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './FormPropsTextFields.scss'
import { style } from '@mui/system';


const FormPropsTextFields = props => {

  const { setSearchText, fetchMovieBySearch, SearchMovieList, SearchTVList } = props

  const [type, setType] = useState(0)


  return (
    <div>
      <Box
        sx={{
          '& > :not(style)': { m: 1, background: '#fff' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="filled-search"
          label="Search film"
          type="search"
          variant="filled" style={{ width: '60%' }} onChange={(e) => setSearchText(e.target.value)} />
        <Button variant='contained' style={{ backgroundColor: '#1565c0', marginTop: '15px', color: '#fff' }} onClick={fetchMovieBySearch}><SearchIcon /></Button>
        <Tabs
          value={type}
          indicatorColor='primary'
          textColor='primary'
          style={{ backgroundColor: 'transparent' }}
          onChange={(event, newValue) => {
            setType(newValue)
          }}
        >
          <Tab label={'SEARCH MOVIES'} onClick={SearchMovieList} style={{ width: '50%', color: 'white' }}></Tab>
          <Tab label={'SEARCH TV SERIES'} onClick={SearchTVList} style={{ width: '50%', color: 'white' }}></Tab>

        </Tabs>
      </Box>
    </div>

  );
}
export default FormPropsTextFields