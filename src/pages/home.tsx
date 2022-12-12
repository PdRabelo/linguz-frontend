import React, { FormEvent, useState } from "react";
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
import { FormControl, FormLabel, FormControlLabel, RadioGroup, Radio } from '@mui/material';
import axios from 'axios';

function Home() {
    const [valueDatePickerInicio, setValueDatePickerInicio] = useState<Dayjs>(dayjs());
    const [valueDatePickerFinal, setValueDatePickerFinal] = useState<Dayjs>(dayjs());
    const [valueSearchExpression, setValueSearchExpression] = useState('')
    const [valueRadio, setValueRadio] = useState('')

    async function postOnBack() {
        axios.post("http://localhost:3001/api/v1/download", {
            "fileData": "eu adoro meus amigos de serviço, Lu levou o macarrão integral hoje pra eu comer no almoço, ainda colocou carne moída (que ela não gosta, só pra ficar mais gostoso pra mim) e um bife de porco maravilhoso. É sobre ❤️\n\npoxa eu adoro meus amigos\n\nMds eu adoro meus amigos tá doido",
            "fileType": "txt",
            "fileName": "asdsaf"
        })
    }

    function validFieldValue() {
        let diference = valueDatePickerInicio!.diff(valueDatePickerFinal)
        console.log(diference)
        if (diference > 0) {
            window.alert("Insira uma data válida")
            return false
        }
        return true
    }

    async function postExpression(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (validFieldValue()) {
            await axios.post("http://localhost:3001/api/v1/search", {
                start_time: valueDatePickerInicio?.toISOString(),
                end_time: valueDatePickerFinal?.toISOString(),
                query: valueSearchExpression,
                sort_order: valueRadio,
                max_result: 100
            }
            );
        }
    }

    const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValueRadio(event.target.value)
    }
    console.log({ valueSearchExpression })
    const handleChangeSearchExpression = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValueSearchExpression(event.target.value)
    }

    return (
        <div>
            <Header />
            <div style={{ padding: "20px 0px" }}>
                <Container maxWidth="xl">
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
                                                setValueDatePickerInicio(dayjs())
                                                console.log(valueDatePickerInicio)
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
                                                setValueDatePickerFinal(dayjs())
                                                console.log(valueDatePickerFinal)
                                            }
                                            else {
                                                setValueDatePickerFinal(newDateFinal)
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
                        </Stack>
                        <Button variant="contained">Baixar Ocorrrências</Button>
                    </form>
                </Container>
            </div>
        </div>
    )
}
export default Home;