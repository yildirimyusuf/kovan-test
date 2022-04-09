import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link } from '@reach/router';
import styled, { css } from 'react-emotion';

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
export const GET_BIKES = gql`
  query GetBikeList {
    bikes{
      bike_id
      lat
      lon
      is_reserved
      is_disabled
      vehicle_type
    }
  }
`;

const Bikes = () => {
  // call api
  const { data, loading, error } = useQuery(GET_BIKES);
  // search field
  const [input, setInput] = useState('');

  if (loading) return <p>Loading</p>;
  if (error) return <p>ERROR</p>;
  if (!data.bikes) return <p>Not bike list found</p>;

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
            {data.bikes.map((bike) => (
                <TableRow key={bike.bike_id}>
                  <Link to={`/${bike.bike_id}`}>
                    <TableCell component="th" scope="row">{bike.bike_id}</TableCell>
                  </Link>
                  <TableCell align="right">{bike.lat}</TableCell>
                  <TableCell align="right">{bike.lon}</TableCell>
                  <TableCell align="right">{bike.is_reserved? 'yes':'no'}</TableCell>
                  <TableCell align="right">{bike.is_disabled? 'yes':'no'}</TableCell>
                  <TableCell align="right">{bike.vehicle_type}</TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledDiv>
  );
};

// styles for the page
export const cardClassName = css({
  padding: '30px 500px',
  borderRadius: 7,
  color: 'white',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});

export const StyledDiv = styled('div')(cardClassName, {
  height: 365,
  marginBottom: 30,
});




export default Bikes;
