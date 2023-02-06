import React, { useState } from "react";
import "./index.css"
import { Button, Checkbox, DialogContentText, DialogTitle, FormControlLabel, FormGroup } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

function ModalTerms(){

    const [open, setOpen] = useState(true)
    const [checked, setChecked] = useState(false)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
      };

    const handleClose = (event: any, reason: any)=>{
        if(reason &&  reason === "backdropClick")
            return;
        setOpen(false)
    }

    function handleButtonClick(){
        console.log(checked)
        if(checked){    
            setOpen(false)
        }
    }

    return <div>
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth={"md"}
            
        >
            <DialogTitle className="center-all">Bem vindo ao projeto Linguz!</DialogTitle>
            <DialogContent>
                <DialogContentText id="" className="center-all">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean posuere sapien in lacus aliquet vehicula. Praesent nibh justo, consectetur vitae vehicula et, ultrices non turpis. Sed vel ipsum eget sapien eleifend facilisis vitae eu orci. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam condimentum orci ut nibh elementum, ut viverra est aliquam. Ut ut porta diam. Suspendisse in efficitur tellus. Duis volutpat mattis mi, at interdum leo pharetra vel.

                                                          Curabitur sed odio vitae massa sollicitudin lacinia. Curabitur laoreet felis eget magna dapibus tincidunt at a justo. Proin purus risus, gravida ac nunc sed, fringilla porta ante. Donec tellus sapien, porta eget risus ac, imperdiet viverra magna. Integer dapibus finibus odio, quis tempus eros. Sed placerat diam augue. Duis rutrum dolor dui. Donec dui urna, convallis eget mollis vitae, lobortis quis mauris. Nunc a elit fringilla, cursus ex id, consectetur tellus. Proin posuere ligula lacus, quis posuere ipsum elementum sed. Phasellus varius sapien sed purus tempus dictum. Curabitur dapibus augue placerat tellus tincidunt commodo. Suspendisse felis leo, faucibus eu nisi quis, faucibus mattis ante. Curabitur mollis, ex vel imperdiet maximus, lacus magna aliquet massa, sed elementum mauris ipsum et urna. Sed vestibulum aliquet risus ac auctor. Curabitur sem enim, mollis nec quam ullamcorper, semper ultricies nulla.

                                                           Nullam eget rhoncus lectus. Maecenas cursus tincidunt tortor, non cursus tellus tempor ut. Cras ut odio sit amet sem commodo malesuada. Suspendisse hendrerit, nisl in faucibus blandit, massa arcu malesuada magna, vel cursus dolor lacus ac arcu. Nunc in felis egestas, condimentum urna ut, sagittis erat. Pellentesque at tellus non eros interdum rutrum vel at orci. Suspendisse tempor euismod nibh sit amet tristique. Sed mollis velit at dolor molestie faucibus. Morbi condimentum ex nulla, ac vulputate est iaculis at. In vel mattis neque, eget fermentum lorem. Curabitur ut consectetur lectus. Nunc in vehicula turpis. Aliquam a tortor imperdiet, viverra quam sit amet, tempor dolor.

                                                           Etiam nec eleifend mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed sit amet metus pulvinar, ornare erat vel, suscipit lacus. Integer posuere aliquet dolor, vitae cursus velit pulvinar sed. Sed laoreet ipsum eget turpis accumsan vestibulum. Nulla facilisi. Sed ac pretium velit, sed hendrerit elit. Aliquam rutrum quam at vestibulum vestibulum. Maecenas rhoncus ligula vitae arcu molestie, sed laoreet metus tempor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed imperdiet mattis malesuada. Nam sollicitudin enim pulvinar, pulvinar nibh sed, ultrices est. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum mattis magna eget tempus volutpat. Vestibulum iaculis, quam non auctor vulputate, elit ipsum lacinia orci, sit amet elementum ligula ipsum id enim.

                                                           Suspendisse id purus sem. Praesent ultrices bibendum pretium. Sed eu finibus mi, a pulvinar massa. Mauris scelerisque augue non nisi blandit, a venenatis ipsum hendrerit. Sed bibendum massa sit amet lectus scelerisque, ac fringilla quam suscipit. Duis vel risus luctus, accumsan urna a, sodales enim. Praesent ac imperdiet neque, a dictum sem. Aenean euismod vehicula erat hendrerit ultrices. Suspendisse tempor vitae mi et iaculis. Ut tincidunt vel sem non mollis. Integer imperdiet mi nec nisi consectetur gravida. Etiam a porta ante. Donec mi lectus, iaculis a posuere at, faucibus a mi.</DialogContentText>
                <DialogContentText id="quote" className="center-all">LinguZ: software livre. Versão Beta. Belo Horizonte: CEFET/MG, 2022. Disponível em: Link do heroku</DialogContentText>
            </DialogContent>
            <FormGroup className="center-all">
                <FormControlLabel control={<Checkbox  checked={checked}
                onChange={handleChange}/>} label="Eu concordo com os termos" />
            </FormGroup>
            <Button onClick={handleButtonClick}>Aceito</Button>
        </Dialog>
</div>
}
export default ModalTerms;