import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Tab, Tabs } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import './Search.scss'
import CardItem from 'components/CardItem/CardItem';
import Helmet from 'components/Helmet/Helmet';
import PaginationSize from '/components/Panigation/Panigation';



const BasicTextFields = () => {
  const [type, setType] = useState(0)
  const [page, setPage] = useState(20)
  const [searchText, setSearchText] = useState("")
  const [content, setContent] = useState([])
  const [totalPage, setTotalPage] = useState(null)

  const fetchMovie = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/search/${type ? "tv" : "movie" }?api_key=6de13cb06459580e8f7ab054d9dbb28e&language=en-US&query=${searchText}&page=${page}&include_adult=false`)
    setContent(data.results)
    setTotalPage(data.total_pages)
  }


  useEffect(() => {

    fetchMovie()
  }, [type, page])

  return (
    <Helmet title='Search'>
      <div className='wrapper__search'>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, background: '#fff' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="outlined-basic" style={{ width: '60%' }} label="Search" variant="outlined" color='info' onChange={(e) => setSearchText(e.target.value)} />
          <Button variant='contained' style={{ backgroundColor: '#1565c0', marginTop: '15px', color: '#fff' }} onClick={fetchMovie}><SearchIcon /></Button>
        
            <Tabs
              value={type}
              indicatorColor='primary'
              textColor='primary'
              onChange={(event, newValue) => {
                setType(newValue)
                setPage(1)
              }}
            >
              <Tab  label={'SEARCH MOVIES'} style={{ width: '50%' }}></Tab>
              <Tab  label={'SEARCH TV SERIES'} style={{ width: '50%' }}></Tab>
            </Tabs>
        </Box>
        <div className="grid wide">
          <div className="row">
            {content.map((item, index) => (
              <div className="l-4 m-6 c-12" key={index}>
                 <CardItem title={item.title} mark={item.vote_average} name={item.name} id={item.id} date={item.release_date} firstDate={item.first_air_date} image={item.poster_path} />
              </div>
            ))}
          </div>
        </div>
        <div className={('wrapper-panigation')}><PaginationSize setPage={500} totalPage={totalPage > 500 ? 500 : totalPage} /></div>

      </div>
    </Helmet>

  );
}
export default BasicTextFields