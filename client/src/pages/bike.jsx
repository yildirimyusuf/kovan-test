import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { StyledDiv } from './bikes';
import { Link } from '@reach/router';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from'@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// query format
export const GET_BIKE_BY_ID = gql`
  query GetBikeById ($id: ID!) {
    bike (bike_id: $id){
      bike_id
      lat
      lon
      is_reserved
      is_disabled
      vehicle_type
    }
  }
`;

const Bike = ({id}) => {
  // call api to grab data
  const { data, loading, error } = useQuery(GET_BIKE_BY_ID,{ variables: { id } });
  // search field value
  const [input, setInput] = useState('');

  if (loading) return <p>Loading</p>;
  if (error) return <p>ERROR</p>;
  // if bike not exist, return the search bar without data showing 'bike not found' reminder
  if (!data.bike) return (
    <StyledDiv>
      <form  noValidate autoComplete="off" align = 'center'>
        <TextField 
          id="standard-basic-1" 
          label='bike not found'
          value = {input}
          onChange = { e => setInput(e.target.value) }
        />
        <label htmlFor="contained-button-file">
          <Link to={`/${input}`}>
            <Button variant="contained" color="primary">
              Search
            </Button>
          </Link>
        </label>
      </form >
    </StyledDiv>
    );
  
  return (
    <StyledDiv>

      <form  noValidate autoComplete="off" align = 'center'>
        <TextField 
          id="standard-basic" 
          label="Search by Bike id" 
          value = {input}
          onChange = { e => setInput(e.target.value) }
        />
        <label htmlFor="contained-button-file">
          <Link to={`/${input}`}>
            <Button variant="contained" color="primary">
              Search
            </Button>
          </Link>
        </label>
      </form >

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Bike ID</TableCell>
              <TableCell align="right">Latitude</TableCell>
              <TableCell align="right">Longitude</TableCell>
              <TableCell align="right">Reserved</TableCell>
              <TableCell align="right">Disabled</TableCell>
              <TableCell align="right">Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
                <TableRow key={data.bike.bike_id}>
                  <TableCell component="th" scope="row">{data.bike.bike_id}</TableCell>
                  <TableCell align="right">{data.bike.lat}</TableCell>
                  <TableCell align="right">{data.bike.lon}</TableCell>
                  <TableCell align="right">{data.bike.is_reserved? 'yes':'no'}</TableCell>
                  <TableCell align="right">{data.bike.is_disabled? 'yes':'no'}</TableCell>
                  <TableCell align="right">{data.bike.vehicle_type}</TableCell>
                </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </StyledDiv>
  );
}

export default Bike;
