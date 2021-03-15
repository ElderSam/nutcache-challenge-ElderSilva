import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core';

import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import * as employeeService from "../../services/employeeService";

const formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

const initialFValues = {
    id: 0,
    fullName: '',
    birthDate: '',
    email: '',
    gender: '',
    //mobile: '',
    //city: '',

    CPF: '',
    startDate: formatDate(Date.now()),
    teamId: '',
    //hireDate: new Date(),
    //isPermanent: false,
}

export default function EmployeeForm(props) {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        //console.log(fieldValues)

        if ('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName ? "" : "Este campo é obrigatório."
        if ('email' in fieldValues) {
            if(fieldValues.email === "") {
                temp.email = "Este campo é obrigatório."
            }else {
                temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email inválido."
            }   
        }

        if ('birthDate' in fieldValues) {
          if(fieldValues.birthDate === "") {
            temp.birthDate = "Este campo é obrigatório."
          }else {
            temp.birthDate = ""
          }
        }

        if ('startDate' in fieldValues) {
            if(fieldValues.startDate === "") {
              temp.startDate = "Este campo é obrigatório."
            }else {
                temp.startDate = ""
            }
        }

        if ('gender' in fieldValues)
            temp.gender = fieldValues.gender ? "" : "Este campo é obrigatório."
   
        /*if ('mobile' in fieldValues)
            temp.mobile = fieldValues.mobile.length > 9 ? "" : "Mínimo de 10 números é obrigatório."*/

        if ('CPF' in fieldValues) {
            const inputLength = fieldValues.CPF.length;
            if(fieldValues.CPF === "") {
                temp.CPF = "Este campo é obrigatório."
            }else if(inputLength < 11) {
                temp.CPF = "Mínimo de 11 números é obrigatório."
            }else if(inputLength > 11) {
                temp.CPF = "Máximo de 11 números."
            }else {
                temp.CPF = ""
            }
        }
            
        /*if ('teamId' in fieldValues)
            temp.teamId = fieldValues.teamId.length !== 0 ? "" : "Este campo é obrigatório."*/

        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit, setValues])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="fullName"
                        label="Nome Completo"
                        value={values.fullName}
                        onChange={handleInputChange}
                        error={errors.fullName}
                    />
                    <Controls.Input
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                    <Controls.DatePicker
                        id="birthDate"
                        name="birthDate"
                        label="Data de Nascimento"
                        value={values.birthDate}
                        onChange={handleInputChange}
                        error={errors.birthDate}
                    />
                    {/*<Controls.RadioGroup
                        name="gender"
                        label="Gênero"
                        value={values.gender}
                        onChange={handleInputChange}
                        items={employeeService.getGenderCollection()}
                    />*/}
                </Grid>
                <Grid item xs={6}>
                    <Controls.Select
                        name="gender"
                        label="Gênero"
                        value={values.gender}
                        onChange={handleInputChange}
                        options={employeeService.getGenderCollection()}
                        mandatory={true}
                        error={errors.gender}
                    />
                    <Controls.Input
                        name="CPF"
                        label="CPF"
                        type="number"
                        //InputProps={{ range: { min: 11, max: 11 } }}
                        value={values.CPF}
                        onChange={handleInputChange}
                        error={errors.CPF}
                    />
                    <Controls.Select
                        name="teamId"
                        label="Time"
                        value={values.teamId}
                        onChange={handleInputChange}
                        options={employeeService.getTeamCollection()}
                        error={errors.teamId}
                    />
                    <Controls.DatePicker
                        name="startDate"
                        label="Data de Início"
                        value={values.startDate}
                        onChange={handleInputChange}
                        error={errors.startDate}
                    />
                    {/*<Controls.Checkbox
                        name="isPermanent"
                        label="Permanent Employee"
                        value={values.isPermanent}
                        onChange={handleInputChange}
                    />*/}

                    <div>
                        <Controls.Button
                            type="submit"
                            text="Enviar" />
                        <Controls.Button
                            text="Limpar"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}
