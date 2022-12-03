import { useState } from "react";
import Header from "../components/header"
import { Container, } from "@mui/system";
import TextField from "@mui/material/TextField";
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, Stack } from "@mui/material";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function Home() {
    const [value, setValue] = useState<Dayjs | null>(
        
      );
    return (
        <div>
            <Header />
            <div style={{padding: "20px 0px"}}>
                <Container maxWidth="xl">
                    <Stack spacing={3}>
                        <TextField id="outlined-basic" label="Insira uma expressão" variant="outlined"
                            InputProps={{endAdornment: <InputAdornment position="end"><SearchIcon/>
                        </InputAdornment>}}/>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack direction="row" spacing={3}>
                                <DatePicker label="Início"
                                    inputFormat="DD/MM/YYYY"
                                    value={value}
                                    onChange={()=>{}}
                                    renderInput={(params) => <TextField {...params} />}/>
                                <DatePicker label="Fim"
                                    inputFormat="DD/MM/YYYY"
                                    value={value}
                                    onChange={()=>{}}
                                    renderInput={(params) => <TextField {...params} />}/>
                            </Stack>
                        </LocalizationProvider>
                    </Stack>
                </Container>
            </div>
        </div>
    )
}
export default Home;