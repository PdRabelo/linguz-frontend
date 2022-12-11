import React, { useState } from "react";
import Header from "../components/header"
import { Container, } from "@mui/system";
import TextField from "@mui/material/TextField";
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import { InputAdornment, RatingClassKey, Stack } from "@mui/material";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {FormControl, FormLabel, FormControlLabel, RadioGroup, Radio} from '@mui/material';
import axios from 'axios';

function Home() {
    const [valueDatePickerInicio, setValueDatePickerInicio] = useState<Dayjs | null>();
    const [valueDatePickerFinal, setValueDatePickerFinal] = useState<Dayjs | null>();
    const [valueSearchExpression, setValueSearchExpression] = useState('')
    const [valueRadio, setValueRadio] = useState('')
    /*async function postOnBack(){
        const config = {
            headers : {
                "Access-Control-Expose-Headers" : "Content-Disposition",
                "Content-Disposition" : "attachment; filename=testando.txt"
            }
        }
        axios.post("http://localhost:3001/api/v1/download", {
            "fileData": "aa",
            "fileType": "txt",
            "fileName": "Testando"
        },config).then(res => res.blob()).then(blob => saveAs(blob, filename)
    }*/

    function validFieldValue(){
        //let datateste = valueDatePickerInicio.toISOString()
        let startDate = new Date()

        if(valueSearchExpression == ""){
            window.alert("Preencha o campo de expressão!")
            return false
        }
        /*if(){
            window.alert("Insira uma data Válida")
            return false
        }*/
        return true
    }

    async function postExpression(){
        if(validFieldValue()){
            await axios.post("http://localhost:3001/api/v1/search", {
                start_time : valueDatePickerInicio,
                end_time : valueDatePickerFinal,
                query : valueSearchExpression,
                sort_order : valueRadio,
                max_result : 100
                }
            );
        }
    }

    const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setValueRadio(event.target.value)
    }
    console.log({valueSearchExpression})
    const handleChangeSearchExpression = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setValueSearchExpression(event.target.value)
    }

    return (
        <div>
            <Header />
            <div style={{padding: "20px 0px"}}>
                <Container maxWidth="xl">
                    <Stack spacing={3}>
                        <TextField
                            id="outlined-basic"
                            label="Insira uma expressão"
                            variant="outlined"
                            value={valueSearchExpression}
                            onChange={handleChangeSearchExpression}
                            InputProps={{endAdornment: <InputAdornment position="end"><SearchIcon/>
                        </InputAdornment>}}/>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack direction="row" spacing={3}>
                                <DatePicker label="Início"
                                    inputFormat="DD/MM/YYYY"
                                    value={valueDatePickerInicio}
                                    onChange={(newDateInicio: any)=>{
                                        setValueDatePickerInicio(newDateInicio.toISOString())
                                    }}
                                    renderInput={(params) => <TextField {...params} />}/>
                                <DatePicker label="Fim"
                                    inputFormat="DD/MM/YYYY"
                                    value={valueDatePickerFinal}
                                    onChange={(newDateFinal: any)=>{
                                        setValueDatePickerFinal(newDateFinal.toISOString())
                                    }}
                                    renderInput={(params) => <TextField {...params} />}/> 
                            </Stack>
                            <FormControl>
                                    <FormLabel id="order-by-type-group-label">
                                        Tipos de ordenação
                                    </FormLabel>
                                    <RadioGroup 
                                        name="order-by-type-group"
                                        aria-labelledby="order-by-type-group-label"
                                        onChange = {handleChangeRadio}
                                        value = {valueRadio}>
                                            <FormControlLabel control={<Radio/>} label = "Mais recentes" value="recency"/>
                                            <FormControlLabel control={<Radio/>} label = "Mais relevantes" value="relevancy"/>
                                    </RadioGroup>
                                </FormControl>
                        </LocalizationProvider>
                    </Stack>
                    <Button onClick={postExpression} variant="contained">Baixar Ocorrrências</Button>
                </Container>
            </div>
        </div>
    )
}
export default Home;