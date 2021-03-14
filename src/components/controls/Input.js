import React from 'react'
import { TextField } from '@material-ui/core';

export default function Input(props) {

    const { name, label, value, error=null, onChange } = props;
    let type="text";

    if(props.type === 'number') {
        type = "number";
    }

    /*let range = false;
    if(props.InputProps.range) {
        const { min, max } = props.InputProps.range;
    }*/

    return (
        <TextField
            variant="outlined"
            label={label}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            {...(error && {error:true,helperText:error})}
        />
    )
}
