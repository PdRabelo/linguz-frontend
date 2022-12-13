import React, { FormEvent, useState } from "react";
import Header from "../components/header"
import { Container, } from "@mui/system";
import TextField from "@mui/material/TextField";
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import { AlertTitle, Collapse, IconButton, InputAdornment, LinearProgress, RatingClassKey, Stack } from "@mui/material";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormControl, FormLabel, FormControlLabel, RadioGroup, Radio } from '@mui/material';
import { Alert } from '@mui/material';
import axios from 'axios';
import "./home.css"

function Home() {
    const [valueDatePickerInicio, setValueDatePickerInicio] = useState<Dayjs>(dayjs().startOf('day'));
    const [valueDatePickerFinal, setValueDatePickerFinal] = useState<Dayjs>(dayjs());
    const [valueSearchExpression, setValueSearchExpression] = useState('')
    const [valueRadio, setValueRadio] = useState('')
    const [button, setButton] = useState(true)
    const [isOpen, setIsOpen] = useState(false)
    const [alertText, setAlertText] = useState("")
    const [alertTextSuccess, setAlertSuccess] = useState("")
    const [alertSuccessIsOpen, setAlertSuccesIsOpen] = useState(false)
    const [linearShow, setLinearShow] = useState(false)


    async function downloadTextFile() {
        const response = await axios.post("http://localhost:3001/api/v1/download", {
            "fileData": "eu adoro meus amigos de serviço, Lu levou o macarrão integral hoje pra eu comer no almoço, ainda colocou carne moída (que ela não gosta, só pra ficar mais gostoso pra mim) e um bife de porco maravilhoso. É sobre ❤\n\npoxa eu adoro meus amigos\n\nMds eu adoro meus amigos tá doido",
            "fileType": "txt",
            "fileName": "asdsaf"
        }, { responseType: 'blob' });

        const type = response.headers['content-type']
        const blob = new Blob([response.data], { type: type })

        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = 'test.txt'
        link.click()
    }

    function validFieldValue() {
        let diference = valueDatePickerInicio!.diff(valueDatePickerFinal)
        if (diference > 0) {
            setAlertText("Insert a valid date")
            setIsOpen(true)
            return false
        }
        return true
    }

    async function postExpression(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLinearShow(true)
        if (validFieldValue()) {
            let response
            let allTweets: string[] = [];
            try {
                response = await axios.post("http://localhost:3001/api/v1/search", {
                    query: valueSearchExpression,
                    options : {
                        start_time: valueDatePickerInicio?.toISOString(),
                        end_time: valueDatePickerFinal?.toISOString(),
                        sort_order: valueRadio,
                        max_result: 100
                    }
                });
                if(response.status == 200 && response.data.data.meta.result_count > 0){
                    setButton(false)
                    setAlertSuccesIsOpen(true)
                    setAlertSuccess(`${response.data.data.meta.result_count} occurrences were found`)
                }
                else if(response.status == 200 && response.data.data.meta.result_count == 0){
                    setAlertSuccesIsOpen(true)
                    setAlertSuccess(`${response.data.data.meta.result_count} occurrences were found`)
                }

                if(response.status === 200) {
                    response.data.data.tweets.forEach((element: { text: string; }) => {
                        allTweets.push(element.text);
                    });
                }
                console.log(allTweets);
            }
            catch (error: any) {
                setAlertText(`${error.response.data.data} : ${error.response.data.errorDetails}`)
                setIsOpen(true)
            }
                
        }
        setLinearShow(false)
    }

    const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValueRadio(event.target.value)
    }
    const handleChangeSearchExpression = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValueSearchExpression(event.target.value)
    }

    return (
        <div>
            <Header />
            <div style={{ padding: "20px 0px" }}>
                <Container maxWidth="xl">
                <Collapse in={isOpen}>
                <Alert
                    className="alert-box"
                    severity="error"
                    onClose={() =>{
                        setIsOpen(false)
                      }}>
                    <AlertTitle>Something gone wrong!</AlertTitle>
                    {alertText}
                </Alert>
                </Collapse>
                    <form onSubmit={postExpression}>
                        <Stack spacing={3}>
                            <TextField
                                required
                                id="outlined-basic"
                                label="Insira uma expressão"
                                variant="outlined"
                                value={valueSearchExpression}
                                onChange={handleChangeSearchExpression}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end"><SearchIcon />
                                    </InputAdornment>
                                }} />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Stack direction="row" spacing={3}>
                                    <DatePicker label="Início"
                                        inputFormat="DD/MM/YYYY"
                                        value={valueDatePickerInicio}
                                        onChange={(newDateInicio: any) => {
                                            if (newDateInicio == undefined) {
                                                setValueDatePickerInicio(dayjs().startOf('day'))
                                            }
                                            else {
                                                setValueDatePickerInicio(newDateInicio)
                                            }
                                        }}
                                        renderInput={(params) => <TextField {...params} />} />
                                    <DatePicker label="Fim"
                                        inputFormat="DD/MM/YYYY"
                                        value={valueDatePickerFinal}
                                        onChange={(newDateFinal: any) => {
                                            if (newDateFinal == undefined) {
                                                setValueDatePickerFinal(dayjs().endOf('day'))
                                            }
                                            else {
                                                setValueDatePickerFinal(newDateFinal)
                                            }
                                            if(newDateFinal.startOf('day') == dayjs().startOf('day')){
                                                setValueDatePickerFinal(dayjs())
                                            }
                                        }}
                                        renderInput={(params) => <TextField {...params} />} />
                                </Stack>
                                <FormControl>
                                    <FormLabel id="order-by-type-group-label">
                                        Tipos de ordenação
                                    </FormLabel>
                                    <RadioGroup
                                        name="order-by-type-group"
                                        aria-labelledby="order-by-type-group-label"
                                        onChange={handleChangeRadio}
                                        value={valueRadio}>
                                        <FormControlLabel control={<Radio required />} label="Mais recentes" value="recency" />
                                        <FormControlLabel control={<Radio />} label="Mais relevantes" value="relevancy" />
                                    </RadioGroup>
                                </FormControl>
                            </LocalizationProvider>
                            <Button type="submit" variant="contained">Pesquisar expressões</Button>
                            <Collapse in={linearShow}>
                                <LinearProgress/>
                            </Collapse>
                            <Collapse in={alertSuccessIsOpen}>
                                <Alert
                                    className="alert-box"
                                    severity="success"
                                    onClose={() =>{
                                        setAlertSuccesIsOpen(false)
                                    }}>
                                    <AlertTitle>Research is completed!</AlertTitle>
                                    {alertTextSuccess}
                                </Alert>
                            </Collapse>
                                    </Stack>
                        <Button variant="contained"disabled={button} onClick={downloadTextFile} color="secondary">Baixar Ocorrrências</Button>
                    </form>
                </Container>
            </div>
        </div>
    )
}
export default Home;