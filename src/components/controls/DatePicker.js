import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function DatePickers(props) {
    const { id, name, label, value, error=null, onChange } = props;

    const classes = useStyles();

    return (
        <TextField
            id={id}
            name={name}
            label={label}
            type="date"
            value={value}
            onChange={onChange}
            //defaultValue=""
            className={classes.textField}
            InputLabelProps={{
            shrink: true,
            }}
            {...(error && {error:true,helperText:error})}
        />
    );
}