import React from 'react';
import useState from 'usestate';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

const labels = {
  0.5: '',
  1: '',
  1.5: '',
  2: '',
  2.5: '',
  3: '',
  3.5: '',
  4: '',
  4.5: '',
  5: '',
};

const useStyles = makeStyles({
  root: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
  },
});


export default function HoverRating(props) {
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const classes = useStyles();

  function handleRateChange () { 
    console.log('stars:', value)
    props.onSelectRating(value);    
  }

  return (
    <div className={classes.root}>
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        onChange={(event, newValue) => {
          setValue(newValue);
          handleRateChange();
          
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
          handleRateChange();
        }}
      />
    </div>
  );
}