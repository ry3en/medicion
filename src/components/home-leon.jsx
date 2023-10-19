import {
    Box,
    Button, ButtonGroup,
    Center,
    Flex, FormControl, FormLabel, Input,
    Modal, ModalBody, ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Select,
    Stack, Image,
    useDisclosure
} from "@chakra-ui/react";
import {RiShipLine, RiAdminFill} from "react-icons/ri";
import {Text} from '@chakra-ui/react'
import {GiAutoRepair} from "react-icons/gi";
import {Link} from "react-router-dom";
import {createClient} from "@supabase/supabase-js";
import {useEffect, useState} from "react";
import {GoPerson} from "react-icons/go";
import LOGO from "./plastic_omnium_logo.png";

const supabaseUrl = "https://caeqghefggsotenegpzt.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhZXFnaGVmZ2dzb3RlbmVncHp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODIzNjEzNDEsImV4cCI6MTk5NzkzNzM0MX0.CZ8e3D2Q8iGwixC8Hj1srZ8DvAs1UxkBLyvLVaZSvus";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Home() {

    //Validacion de Modals
    const {isOpen: isMantOpen, onOpen: onMantOpen, onClose: onMantClose} = useDisclosure()
    const [passM, setPassM] = useState("");
    const [passP, setPassP] = useState("");
    const [sessionM, setSessionM] = useState(false);

    //variables forms
    const [tipo, setTip] = useState("")
    const [x, setX] = useState(false);
    const [Medicion, setMedicion] = useState([]);
    const [ID, setId] = useState('');
    const [peso, setPeso] = useState('');
    const [check, setCheck] = useState(false);


    //Funcion para obtener registros de Supabase
    async function getMed() {
        const {data: mediciones, error} = await supabase
            .from('mediciones')
            .select('*')
        setMedicion(mediciones)
        console.log(Medicion)
    }

     function checkParams(){
        if (tipo === ""){
            alert("Missing type")
        }else if( peso === ""){
            alert("missing weigth / Falta el peso")
        }else if( ID === ""){
            alert("missing ID / Falta el ID")
        }else{
            setCheck(true)
        }
    }
    

//CHANGE LABELS AND SET VARIABLE VALUES
    const onChange = async (e) => {
        if (e.target.name === "peso") {
            setPeso(e.target.value)
            console.log(peso)
        }
        if (e.target.name === "id") {
            setId(e.target.value)
            console.log(ID)
        }
        if (e.target.name === "passM") {
            setPassM(e.target.value)
        }
        if (e.target.name === "passP") {
            setPassP(e.target.value)
        }
        if (e.target.name === "passC") {
            setPassC(e.target.value)
        }
        if (e.target.name === "passL") {
            setPassL(e.target.value)
        }
        if (e.target.name === "tipo") {
            setTip(e.target.value)
            console.log(tipo)
        }
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        //FOR LOGISTICS FORM
        if (e.target.name === "logistica") {
            //search in the array
            setX(search(Medicion, ID));
            //checks if id already exist
            if (x === true) {
                alert("Updating ", ID)
                const {data, error} = await supabase
                    .from('mediciones')
                    .update({logistica: peso})
                    .eq('id', ID)
                setX(false)
                window.location.reload()
            }
            //if not exists
            else {
                alert("No existe ese numero de ID")
            }
        } else if (e.target.name === "mant") {
            //search in the array
            console.log(x, "1")
            if (search(Medicion, ID) === true) {
                checkParams();
                if (check === true) {
                    alert("Updating ", ID)
                    const {data, error} = await supabase
                        .from('mediciones')
                        .update({mantenimiento: peso, tipo: tipo})
                        .eq('id', ID)
                    window.location.reload()
                }
            } else {
                checkParams();
                if (check === true){
                    alert("Creating new Record")
                    const {data, error} = await supabase
                        .from('mediciones')
                        .insert([
                            {id: ID, mantenimiento: peso, tipo: tipo},
                        ])
                    window.location.reload()
                }
            }
        }else if (e.target.name === "prod") {
            //search in the array
            if (search(Medicion, ID) === true) {
                checkParams();
                if (check === true){
                    alert("Updating ", ID)
                    const {data, error} = await supabase
                        .from('mediciones')
                        .update({Produccion: peso, tipo: tipo})
                        .eq('id', ID)
                    window.location.reload()
                }
            } else {
                checkParams();
                if (check === true){
                    alert("Creating new Record")
                    const {data, error} = await supabase
                        .from('mediciones')
                        .insert([
                            {id: ID, Produccion: peso, tipo: tipo},
                        ])
                    window.location.reload()
                }
            }
        }else if(e.target.name === "qua"){
            //search in the array
            if (search(Medicion, ID) === true) {
                checkParams();
                if (check === true){
                    alert("Updating ", ID)
                    const {data, error} = await supabase
                        .from('mediciones')
                        .update({calidad: peso, tipo: tipo})
                        .eq('id', ID)
                    window.location.reload()
                }
            } else {
                checkParams();
                if (check === true){
                    alert("Creating new Record")
                    const {data, error} = await supabase
                        .from('mediciones')
                        .insert([
                            {id: ID, calidad: peso, tipo: tipo},
                        ])
                    window.location.reload()
                }
            }
        }else if (e.target.name === "loginM") {
            if (passM === "@2582") {
                setSessionM(true);
            } else {
                alert("Wrong Password")
            }
        }
    }

    useEffect(function () {
        //GETS THE ROWS FROM SUPABASE
        getMed()
    }, [peso,ID]);

    return (
        <main>
            <Button fontSize='2xl'
                    w={'10vh'} h={'10vh'}
                    color='black'
                    fontWeight='bold'
                    borderRadius='md'
                    variant={"outline"}
                    name={"esp"}
                    onClick={onSubmit}
            >
                ESP
            </Button>
            <Button fontSize='2xl'
                    w={'10vh'} h={'10vh'}
                    color='black'
                    fontWeight='bold'
                    borderRadius='md'
                    variant={"outline"}
                    name={"eng"}
                    onClick={onSubmit}
            >
                ENG
            </Button>
            <Button fontSize='2xl'
                    w={'10vh'} h={'10vh'}
                    color='black'
                    fontWeight='bold'
                    borderRadius='md'
                    variant={"outline"}
                    name={"fr"}
                    onClick={onSubmit}
            >
                FR
            </Button> <span></span>
            <Button fontSize='2xl'
                    w={'30vh'} h={'10vh'}
                    color='black'
                    fontWeight='bold'
                    borderRadius='md'
                    colorScheme={'yellow'}
                    variant={"solid"}
                    name={"leon"}
                    onClick={onSubmit}
            >
                Material de Leon
            </Button>


            <Center h={['100vh', '100vh', '100vh', '100VH']} c="white">

                <Flex direction={['column', 'column', 'column', 'row']}>

                    {esp === true?
                        <Box>
                            <Center>
                                <Image src={LOGO} alt="Dan Abramov"/>
                            </Center>
                            <Center>
                                <Text
                                    bgGradient="linear(to right, #4b79a1, #283e51)"
                                    bgClip="text"
                                    fontSize={['4xl', '4xl', '6xl', '6xl']}
                                    fontWeight="extrabold"
                                >
                                    Control de Salida de Materiales
                                </Text>
                            </Center>

                            <Center>
                                <Text
                                    bgGradient="linear(to right, #4b79a1, #283e51)"
                                    bgClip="text"
                                    fontSize={['2xl', '2xl', '4xl', '4xl']}
                                    fontWeight="extrabold"
                                >
                                    Selecciona el Área a la que perteneces
                                </Text>
                            </Center>

                            <Center>
                                <Stack
                                    spacing={4}
                                    direction={['column', 'column', 'row', 'row']}
                                    align={['center', 'center', 'start', 'start']}>
                                    <Button fontSize='2xl'
                                            leftIcon={<GiAutoRepair/>}
                                            w={'35vh'} h={'10vh'}
                                            p={4}
                                            color='white'
                                            fontWeight='bold'
                                            borderRadius='md'
                                            bgGradient='linear(to right, #4b79a1, #283e51)'
                                            _hover={{
                                                bgGradient: 'linear(to-r, red.500, yellow.500)',
                                            }}
                                            variant={"solid"}
                                            onClick={onMantOpen}
                                    >Mantenimiento
                                    </Button>

                                    <Modal onClose={onMantClose} size={'xl'} isOpen={isMantOpen}>
                                        <ModalOverlay/>
                                        <ModalContent>
                                            <ModalHeader>Mantenimiento</ModalHeader>
                                            <ModalCloseButton/>
                                            {sessionM === true ?
                                                <>
                                                    <ModalBody>
                                                        <form onSubmit={onSubmit} name={"GEN"}>
                                                            <FormLabel>ID</FormLabel>
                                                            <Input name={"id"} placeholder='ID del contenedor'
                                                                   onChange={onChange}
                                                                   value={ID}/>
                                                            {/*<Button colorScheme='blue' onClick={onSubmit}
                                                                    name={"genM"}>Generar</Button>*/}
                                                            <FormLabel>Peso</FormLabel>
                                                            <Input name={"peso"} placeholder='Peso del contenedor '
                                                                   onChange={onChange} value={peso}/>
                                                            <FormLabel>Tipo</FormLabel>
                                                            <Select placeholder='-------' onChange={onChange} name={"tipo"}>
                                                                <option value='Purgas'>Purgas</option>
                                                                <option value='Polvo'>Polvo</option>
                                                                <option value='Material Contaminado'>Material Contaminado</option>
                                                                <option value='Regenerado Contaminado'>Regenerado Contaminado</option>


                                                            </Select>
                                                        </form>
                                                    </ModalBody>
                                                    <ModalFooter>
                                                        <ButtonGroup gap='1'>
                                                            <Button colorScheme='blue' onClick={onSubmit}
                                                                    name={"mant"}>Accept</Button>
                                                            <Button colorScheme='red' onClick={onMantClose}>Close</Button>
                                                        </ButtonGroup>
                                                    </ModalFooter>
                                                </> : <>
                                                    <ModalBody>
                                                        <form className="form-inline" name={"loginM"} onSubmit={onSubmit}>
                                                            <div className="form-group">
                                                                <label htmlFor="inputPassword6">Password</label>
                                                                <input type="password" name={"passM"} id="inputPassword6"
                                                                       className="form-control mx-sm-3"
                                                                       aria-describedby="passwordHelpInline"
                                                                       onChange={onChange}
                                                                       value={passM}/>
                                                                <button className={"btn btn-primary"}>Login
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </ModalBody>
                                                </>
                                            }
                                        </ModalContent>
                                    </Modal>

                                    <Button fontSize='2xl'
                                            leftIcon={<GoPerson/>}
                                            w={'35vh'} h={'10vh'}
                                            p={4}
                                            color='white'
                                            fontWeight='bold'
                                            borderRadius='md'
                                            bgGradient='linear(to right, #4b79a1, #283e51)'
                                            _hover={{
                                                bgGradient: 'linear(to-r, red.500, yellow.500)',
                                            }}
                                            variant={"solid"}
                                            onClick={onPodOpen}
                                    >
                                        Produccion
                                    </Button>

                                    <Modal onClose={onPodClose} size={'xl'} isOpen={isPodOpen}>
                                        <ModalOverlay/>
                                        <ModalContent>
                                            <ModalHeader>Produccion</ModalHeader>
                                            <ModalCloseButton/>
                                            {sessionP === true ?
                                                <>
                                                    <ModalBody>
                                                        <form name={"produccion"} onSubmit={onSubmit}>
                                                            <FormLabel>ID</FormLabel>
                                                            <Input id={"contenedor"} placeholder='ID del contenedor'
                                                                   onChange={onChange} name={"id"} value={ID}/>
                                                            {/*<Button colorScheme='blue' onClick={onSubmit}
                                                                    name={"genP"}>Generar</Button>*/}
                                                            <FormLabel>Peso</FormLabel>
                                                            <Input id={"peso"} placeholder='Peso del contenedor '
                                                                   onChange={onChange} name={"peso"} value={peso}/>
                                                            <FormLabel>Tipo</FormLabel>
                                                            <Select placeholder='-------' onChange={onChange} name={"tipo"}>
                                                                <option value='Purgas'>Purgas</option>
                                                                <option value='Polvo'>Polvo</option>
                                                                <option value='Material Contaminado'>Material Contaminado
                                                                </option>
                                                            </Select>
                                                        </form>
                                                    </ModalBody>
                                                    <ModalFooter>
                                                        <ButtonGroup gap='1'>
                                                            <Button colorScheme='blue' onClick={onSubmit}
                                                                    name={"prod"}>Accept</Button>
                                                            <Button colorScheme='red' onClick={onPodClose}>Close</Button>
                                                        </ButtonGroup>
                                                    </ModalFooter>
                                                </> : <>
                                                    <ModalBody>
                                                        <form className="form-inline" name={"loginP"} onSubmit={onSubmit}>
                                                            <div className="form-group">
                                                                <label htmlFor="inputPassword6">Password</label>
                                                                <input type="password" name={"passP"} id="inputPassword6"
                                                                       className="form-control mx-sm-3"
                                                                       aria-describedby="passwordHelpInline"
                                                                       onChange={onChange}
                                                                       value={passP}/>
                                                                <button className={"btn btn-primary"}>Login
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </ModalBody>
                                                </>
                                            }
                                        </ModalContent>
                                    </Modal>

                                    <Button fontSize='2xl'
                                            leftIcon={<GoPerson/>}
                                            w={'35vh'} h={'10vh'}
                                            p={4}
                                            color='white'
                                            fontWeight='bold'
                                            borderRadius='md'
                                            bgGradient='linear(to right, #4b79a1, #283e51)'
                                            _hover={{
                                                bgGradient: 'linear(to-r, red.500, yellow.500)',
                                            }}
                                            variant={"solid"}
                                            onClick={onQuaOpen}
                                    >
                                        Calidad
                                    </Button>

                                    <Modal onClose={onQuaClose} size={'xl'} isOpen={isQuaOpen}>
                                        <ModalOverlay/>
                                        <ModalContent>
                                            <ModalHeader>Calidad</ModalHeader>
                                            <ModalCloseButton/>
                                            {sessionC === true ?
                                                <>
                                                    <ModalBody>
                                                        <form name={"calidad"} onSubmit={onSubmit}>
                                                            <FormLabel>ID</FormLabel>
                                                            <Input id={"contenedor"} placeholder='ID del contenedor'
                                                                   onChange={onChange} name={"id"} value={ID}/>
                                                            {/*<Button colorScheme='blue' onClick={onSubmit}
                                                                    name={"genP"}>Generar</Button>*/}
                                                            <FormLabel>Peso</FormLabel>
                                                            <Input id={"peso"} placeholder='Peso del contenedor '
                                                                   onChange={onChange} name={"peso"} value={peso}/>
                                                            <FormLabel>Tipo</FormLabel>
                                                            <Select placeholder='-------' onChange={onChange} name={"tipo"}>
                                                                <option value='Recortes y Metales'>Recortes y Metales</option>
                                                                <option value='Material Contaminado'>Material Contaminado
                                                                </option>
                                                            </Select>
                                                        </form>
                                                    </ModalBody>
                                                    <ModalFooter>
                                                        <ButtonGroup gap='1'>
                                                            <Button colorScheme='blue' onClick={onSubmit}
                                                                    name={"qua"}>Accept</Button>
                                                            <Button colorScheme='red' onClick={onQuaClose}>Close</Button>
                                                        </ButtonGroup>
                                                    </ModalFooter>
                                                </> : <>
                                                    <ModalBody>
                                                        <form className="form-inline" name={"loginC"} onSubmit={onSubmit}>
                                                            <div className="form-group">
                                                                <label htmlFor="inputPassword6">Password</label>
                                                                <input type="password" name={"passC"} id="inputPassword6"
                                                                       className="form-control mx-sm-3"
                                                                       aria-describedby="passwordHelpInline"
                                                                       onChange={onChange}
                                                                       value={passC}/>
                                                                <button className={"btn btn-primary"}>Login
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </ModalBody>
                                                </>
                                            }
                                        </ModalContent>
                                    </Modal>

                                    <Button fontSize='2xl'
                                            leftIcon={<RiShipLine/>}
                                            w={'35vh'} h={'10vh'}
                                            p={4}
                                            color='white'
                                            fontWeight='bold'
                                            borderRadius='md'
                                            bgGradient='linear(to right, #4b79a1, #283e51)'

                                            _hover={{
                                                bgGradient: 'linear(to-r, red.500, yellow.500)',
                                            }}
                                            variant={"solid"}
                                            onClick={onLogOpen}
                                    >
                                        Logistica
                                    </Button>

                                    <Modal onClose={onLogClose} size={'xl'} isOpen={isLogOpen}>
                                        <ModalOverlay/>
                                        <ModalContent>
                                            <ModalHeader>Logistica</ModalHeader>
                                            <ModalCloseButton/>
                                            {sessionL === true ?
                                                <>
                                                    <ModalBody>
                                                        <form name={"logistica"} onSubmit={onSubmit}>
                                                            <FormLabel>ID</FormLabel>
                                                            <Input id={"contenedor"} placeholder='ID del contenedor'
                                                                   onChange={onChange} name={"id"} value={ID}/>
                                                            <FormLabel>Peso</FormLabel>
                                                            <Input id={"peso"} placeholder='Peso del contenedor '
                                                                   onChange={onChange} name={"peso"} value={peso}/>
                                                        </form>
                                                    </ModalBody>
                                                    <ModalFooter>
                                                        <ButtonGroup gap='1'>
                                                            <Button colorScheme='blue' onClick={onSubmit}
                                                                    name={"logistica"}>Accept</Button>
                                                            <Button colorScheme='red' onClick={onLogClose}>Close</Button>
                                                        </ButtonGroup>
                                                    </ModalFooter>
                                                </> : <>
                                                    <ModalBody>
                                                        <form className="form-inline" name={"loginL"} onSubmit={onSubmit}>
                                                            <div className="form-group">
                                                                <label htmlFor="inputPassword6">Password</label>
                                                                <input type="password" name={"passL"} id="inputPassword6"
                                                                       className="form-control mx-sm-3"
                                                                       aria-describedby="passwordHelpInline"
                                                                       onChange={onChange}
                                                                       value={passL}/>
                                                                <button className={"btn btn-primary"}>Login
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </ModalBody>
                                                </>}
                                        </ModalContent>
                                    </Modal>

                                    <Link to={'/controller'}>
                                        <Button fontSize='2xl'
                                                leftIcon={<RiAdminFill/>}
                                                w={'35vh'} h={'10vh'}
                                                p={4}
                                                color='white'
                                                fontWeight='bold'
                                                borderRadius='md'
                                                bgGradient='linear(to right, #4b79a1, #283e51)'

                                                _hover={{
                                                    bgGradient: 'linear(to-r, red.500, yellow.500)',
                                                }}
                                                variant={"solid"}>
                                            Controller
                                        </Button>
                                    </Link>
                                </Stack>
                            </Center>
                        </Box>: null
                    }
                    {eng === true?
                        <Box>
                            <Center>
                                <Image src={LOGO} alt="Dan Abramov"/>
                            </Center>
                            <Center>
                                <Text
                                    bgGradient="linear(to right, #4b79a1, #283e51)"
                                    bgClip="text"
                                    fontSize={['4xl', '4xl', '6xl', '6xl']}
                                    fontWeight="extrabold"
                                >
                                    Material Output Control
                                </Text>
                            </Center>

                            <Center>
                                <Text
                                    bgGradient="linear(to right, #4b79a1, #283e51)"
                                    bgClip="text"
                                    fontSize={['2xl', '2xl', '4xl', '4xl']}
                                    fontWeight="extrabold"
                                >
                                    Select the Area to which you belong
                                </Text>
                            </Center>

                            <Center>
                                <Stack
                                    spacing={4}
                                    direction={['column', 'column', 'row', 'row']}
                                    align={['center', 'center', 'start', 'start']}>
                                    <Button fontSize='2xl'
                                            leftIcon={<GiAutoRepair/>}
                                            w={'35vh'} h={'10vh'}
                                            p={4}
                                            color='white'
                                            fontWeight='bold'
                                            borderRadius='md'
                                            bgGradient='linear(to right, #4b79a1, #283e51)'
                                            _hover={{
                                                bgGradient: 'linear(to-r, red.500, yellow.500)',
                                            }}
                                            variant={"solid"}
                                            onClick={onMantOpen}
                                    >Maintenance
                                    </Button>

                                    <Modal onClose={onMantClose} size={'xl'} isOpen={isMantOpen}>
                                        <ModalOverlay/>
                                        <ModalContent>
                                            <ModalHeader>Maintenance</ModalHeader>
                                            <ModalCloseButton/>
                                            {sessionM === true ?
                                                <>
                                                    <ModalBody>
                                                        <form onSubmit={onSubmit} name={"GEN"}>
                                                            <FormLabel>ID</FormLabel>
                                                            <Input name={"id"} placeholder='ID del contenedor'
                                                                   onChange={onChange}
                                                                   value={ID}/>
                                                            {/*<Button colorScheme='blue' onClick={onSubmit}
                                                                    name={"genM"}>Generate</Button>*/}
                                                            <FormLabel>Peso</FormLabel>
                                                            <Input name={"peso"} placeholder='Peso del contenedor '
                                                                   onChange={onChange} value={peso}/>
                                                            <FormLabel>Tipo</FormLabel>
                                                            <Select placeholder='-------' onChange={onChange} name={"tipo"}>
                                                                <option value='Purgas'>Purgas</option>
                                                                <option value='Polvo'>Polvo</option>
                                                                <option value='Material Contaminado'>Material Contaminado</option>
                                                                <option value='Regenerado Contaminado'>Regenerado Contaminado</option>

                                                            </Select>
                                                        </form>
                                                    </ModalBody>
                                                    <ModalFooter>
                                                        <ButtonGroup gap='1'>
                                                            <Button colorScheme='blue' onClick={onSubmit}
                                                                    name={"mant"}>Accept</Button>
                                                            <Button colorScheme='red' onClick={onMantClose}>Close</Button>
                                                        </ButtonGroup>
                                                    </ModalFooter>
                                                </> : <>
                                                    <ModalBody>
                                                        <form className="form-inline" name={"loginM"} onSubmit={onSubmit}>
                                                            <div className="form-group">
                                                                <label htmlFor="inputPassword6">Password</label>
                                                                <input type="password" name={"passM"} id="inputPassword6"
                                                                       className="form-control mx-sm-3"
                                                                       aria-describedby="passwordHelpInline"
                                                                       onChange={onChange}
                                                                       value={passM}/>
                                                                <button className={"btn btn-primary"}>Login
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </ModalBody>
                                                </>
                                            }
                                        </ModalContent>
                                    </Modal>

                                    <Button fontSize='2xl'
                                            leftIcon={<GoPerson/>}
                                            w={'35vh'} h={'10vh'}
                                            p={4}
                                            color='white'
                                            fontWeight='bold'
                                            borderRadius='md'
                                            bgGradient='linear(to right, #4b79a1, #283e51)'
                                            _hover={{
                                                bgGradient: 'linear(to-r, red.500, yellow.500)',
                                            }}
                                            variant={"solid"}
                                            onClick={onPodOpen}
                                    >
                                        Production
                                    </Button>

                                    <Modal onClose={onPodClose} size={'xl'} isOpen={isPodOpen}>
                                        <ModalOverlay/>
                                        <ModalContent>
                                            <ModalHeader>Production</ModalHeader>
                                            <ModalCloseButton/>
                                            {sessionP === true ?
                                                <>
                                                    <ModalBody>
                                                        <form name={"produccion"} onSubmit={onSubmit}>
                                                            <FormLabel>ID</FormLabel>
                                                            <Input id={"contenedor"} placeholder='ID del contenedor'
                                                                   onChange={onChange} name={"id"} value={ID}/>
                                                            {/*<Button colorScheme='blue' onClick={onSubmit}
                                                                    name={"genP"}>Generar</Button>*/}
                                                            <FormLabel>Peso</FormLabel>
                                                            <Input id={"peso"} placeholder='Peso del contenedor '
                                                                   onChange={onChange} name={"peso"} value={peso}/>
                                                            <FormLabel>Tipo</FormLabel>
                                                            <Select placeholder='-------' onChange={onChange} name={"tipo"}>
                                                                <option value='Purgas'>Purgas</option>
                                                                <option value='Polvo'>Polvo</option>
                                                                <option value='Material Contaminado'>Material Contaminado </option>
                                                            </Select>
                                                        </form>
                                                    </ModalBody>
                                                    <ModalFooter>
                                                        <ButtonGroup gap='1'>
                                                            <Button colorScheme='blue' onClick={onSubmit}
                                                                    name={"prod"}>Accept</Button>
                                                            <Button colorScheme='red' onClick={onPodClose}>Close</Button>
                                                        </ButtonGroup>
                                                    </ModalFooter>
                                                </> : <>
                                                    <ModalBody>
                                                        <form className="form-inline" name={"loginP"} onSubmit={onSubmit}>
                                                            <div className="form-group">
                                                                <label htmlFor="inputPassword6">Password</label>
                                                                <input type="password" name={"passP"} id="inputPassword6"
                                                                       className="form-control mx-sm-3"
                                                                       aria-describedby="passwordHelpInline"
                                                                       onChange={onChange}
                                                                       value={passP}/>
                                                                <button className={"btn btn-primary"}>Login
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </ModalBody>
                                                </>
                                            }
                                        </ModalContent>
                                    </Modal>

                                    <Button fontSize='2xl'
                                            leftIcon={<RiShipLine/>}
                                            w={'35vh'} h={'10vh'}
                                            p={4}
                                            color='white'
                                            fontWeight='bold'
                                            borderRadius='md'
                                            bgGradient='linear(to right, #4b79a1, #283e51)'

                                            _hover={{
                                                bgGradient: 'linear(to-r, red.500, yellow.500)',
                                            }}
                                            variant={"solid"}
                                            onClick={onLogOpen}
                                    >
                                        Logistic
                                    </Button>

                                    <Modal onClose={onLogClose} size={'xl'} isOpen={isLogOpen}>
                                        <ModalOverlay/>
                                        <ModalContent>
                                            <ModalHeader>Logistic</ModalHeader>
                                            <ModalCloseButton/>
                                            {sessionL === true ?
                                                <>
                                                    <ModalBody>
                                                        <form name={"logistica"} onSubmit={onSubmit}>
                                                            <FormLabel>ID</FormLabel>
                                                            <Input id={"contenedor"} placeholder='ID del contenedor'
                                                                   onChange={onChange} name={"id"} value={ID}/>
                                                            <FormLabel>Peso</FormLabel>
                                                            <Input id={"peso"} placeholder='Peso del contenedor '
                                                                   onChange={onChange} name={"peso"} value={peso}/>
                                                        </form>
                                                    </ModalBody>
                                                    <ModalFooter>
                                                        <ButtonGroup gap='1'>
                                                            <Button colorScheme='blue' onClick={onSubmit}
                                                                    name={"logistica"}>Accept</Button>
                                                            <Button colorScheme='red' onClick={onLogClose}>Close</Button>
                                                        </ButtonGroup>
                                                    </ModalFooter>
                                                </> : <>
                                                    <ModalBody>
                                                        <form className="form-inline" name={"loginL"} onSubmit={onSubmit}>
                                                            <div className="form-group">
                                                                <label htmlFor="inputPassword6">Password</label>
                                                                <input type="password" name={"passL"} id="inputPassword6"
                                                                       className="form-control mx-sm-3"
                                                                       aria-describedby="passwordHelpInline"
                                                                       onChange={onChange}
                                                                       value={passL}/>
                                                                <button className={"btn btn-primary"}>Login
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </ModalBody>
                                                </>}
                                        </ModalContent>
                                    </Modal>

                                    <Link to={'/controller'}>
                                        <Button fontSize='2xl'
                                                leftIcon={<RiAdminFill/>}
                                                w={'35vh'} h={'10vh'}
                                                p={4}
                                                color='white'
                                                fontWeight='bold'
                                                borderRadius='md'
                                                bgGradient='linear(to right, #4b79a1, #283e51)'

                                                _hover={{
                                                    bgGradient: 'linear(to-r, red.500, yellow.500)',
                                                }}
                                                variant={"solid"}>
                                            Controller
                                        </Button>
                                    </Link>
                                </Stack>
                            </Center>
                        </Box>: null
                    }
                    {fr === true?
                        <Box>
                            <Center>
                                <Image src={LOGO} alt="Dan Abramov"/>
                            </Center>
                            <Center>
                                <Text
                                    bgGradient="linear(to right, #4b79a1, #283e51)"
                                    bgClip="text"
                                    fontSize={['4xl', '4xl', '6xl', '6xl']}
                                    fontWeight="extrabold"
                                >
                                    Contrôle de la sortie des matériaux
                                </Text>
                            </Center>

                            <Center>
                                <Text
                                    bgGradient="linear(to right, #4b79a1, #283e51)"
                                    bgClip="text"
                                    fontSize={['2xl', '2xl', '4xl', '4xl']}
                                    fontWeight="extrabold"
                                >
                                    Sélectionnez la zone à laquelle vous appartenez
                                </Text>
                            </Center>

                            <Center>
                                <Stack
                                    spacing={4}
                                    direction={['column', 'column', 'row', 'row']}
                                    align={['center', 'center', 'start', 'start']}>
                                    <Button fontSize='2xl'
                                            leftIcon={<GiAutoRepair/>}
                                            w={'35vh'} h={'10vh'}
                                            p={4}
                                            color='white'
                                            fontWeight='bold'
                                            borderRadius='md'
                                            bgGradient='linear(to right, #4b79a1, #283e51)'
                                            _hover={{
                                                bgGradient: 'linear(to-r, red.500, yellow.500)',
                                            }}
                                            variant={"solid"}
                                            onClick={onMantOpen}
                                    >Entretien
                                    </Button>

                                    <Modal onClose={onMantClose} size={'xl'} isOpen={isMantOpen}>
                                        <ModalOverlay/>
                                        <ModalContent>
                                            <ModalHeader>Entretien</ModalHeader>
                                            <ModalCloseButton/>
                                            {sessionM === true ?
                                                <>
                                                    <ModalBody>
                                                        <form onSubmit={onSubmit} name={"GEN"}>
                                                            <FormLabel>ID</FormLabel>
                                                            <Input name={"id"} placeholder='ID de conteneur'
                                                                   onChange={onChange}
                                                                   value={ID}/>
                                                            <Button colorScheme='blue' onClick={onSubmit}
                                                                    name={"gen"}>Générer</Button>
                                                            <FormLabel>Poids</FormLabel>
                                                            <Input name={"peso"} placeholder='Poids du conteneur'
                                                                   onChange={onChange} value={peso}/>
                                                            <FormLabel>Mec</FormLabel>
                                                            <Select placeholder='-------' onChange={onChange} name={"tipo"}>
                                                                <option value='Purgas'>Purges</option>
                                                                <option value='Polvo'>Poussière</option>
                                                                <option value='Material Contaminado'>Matériel contaminé
                                                                </option>
                                                            </Select>
                                                        </form>
                                                    </ModalBody>
                                                    <ModalFooter>
                                                        <ButtonGroup gap='1'>
                                                            <Button colorScheme='blue' onClick={onSubmit}
                                                                    name={"mant"}>Accepter</Button>
                                                            <Button colorScheme='red' onClick={onMantClose}>fermer</Button>
                                                        </ButtonGroup>
                                                    </ModalFooter>
                                                </> : <>
                                                    <ModalBody>
                                                        <form className="form-inline" name={"loginM"} onSubmit={onSubmit}>
                                                            <div className="form-group">
                                                                <label htmlFor="inputPassword6">Password</label>
                                                                <input type="password" name={"passM"} id="inputPassword6"
                                                                       className="form-control mx-sm-3"
                                                                       aria-describedby="passwordHelpInline"
                                                                       onChange={onChange}
                                                                       value={passM}/>
                                                                <button className={"btn btn-primary"}>Login
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </ModalBody>
                                                </>
                                            }
                                        </ModalContent>
                                    </Modal>

                                    <Button fontSize='2xl'
                                            leftIcon={<GoPerson/>}
                                            w={'35vh'} h={'10vh'}
                                            p={4}
                                            color='white'
                                            fontWeight='bold'
                                            borderRadius='md'
                                            bgGradient='linear(to right, #4b79a1, #283e51)'
                                            _hover={{
                                                bgGradient: 'linear(to-r, red.500, yellow.500)',
                                            }}
                                            variant={"solid"}
                                            onClick={onPodOpen}
                                    >
                                        Production
                                    </Button>

                                    <Modal onClose={onPodClose} size={'xl'} isOpen={isPodOpen}>
                                        <ModalOverlay/>
                                        <ModalContent>
                                            <ModalHeader>Produccion</ModalHeader>
                                            <ModalCloseButton/>
                                            {sessionP === true ?
                                                <>
                                                    <ModalBody>
                                                        <form name={"produccion"} onSubmit={onSubmit}>
                                                            <FormLabel>ID</FormLabel>
                                                            <Input id={"contenedor"} placeholder='ID de conteneur'
                                                                   onChange={onChange} name={"id"} value={ID}/>
                                                            <Button colorScheme='blue' onClick={onSubmit}
                                                                    name={"gen"}>Générer</Button>
                                                            <FormLabel>Poids</FormLabel>
                                                            <Input id={"peso"} placeholder='Poids du conteneur'
                                                                   onChange={onChange} name={"peso"} value={peso}/>
                                                            <FormLabel>Mec</FormLabel>
                                                            <Select placeholder='-------' onChange={onChange} name={"tipo"}>
                                                                <option value='Purgas'>Purges</option>
                                                                <option value='Polvo'>Poussière</option>
                                                                <option value='Material Contaminado'>Matériel contaminé</option>
                                                            </Select>
                                                        </form>
                                                    </ModalBody>
                                                    <ModalFooter>
                                                        <ButtonGroup gap='1'>
                                                            <Button colorScheme='blue' onClick={onSubmit}
                                                                    name={"prod"}>Accepter</Button>
                                                            <Button colorScheme='red' onClick={onPodClose}>Fermer</Button>
                                                        </ButtonGroup>
                                                    </ModalFooter>
                                                </> : <>
                                                    <ModalBody>
                                                        <form className="form-inline" name={"loginP"} onSubmit={onSubmit}>
                                                            <div className="form-group">
                                                                <label htmlFor="inputPassword6">Password</label>
                                                                <input type="password" name={"passP"} id="inputPassword6"
                                                                       className="form-control mx-sm-3"
                                                                       aria-describedby="passwordHelpInline"
                                                                       onChange={onChange}
                                                                       value={passP}/>
                                                                <button className={"btn btn-primary"}>Login
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </ModalBody>
                                                </>
                                            }
                                        </ModalContent>
                                    </Modal>

                                    <Button fontSize='2xl'
                                            leftIcon={<RiShipLine/>}
                                            w={'35vh'} h={'10vh'}
                                            p={4}
                                            color='white'
                                            fontWeight='bold'
                                            borderRadius='md'
                                            bgGradient='linear(to right, #4b79a1, #283e51)'

                                            _hover={{
                                                bgGradient: 'linear(to-r, red.500, yellow.500)',
                                            }}
                                            variant={"solid"}
                                            onClick={onLogOpen}
                                    >
                                        Logistique
                                    </Button>

                                    <Modal onClose={onLogClose} size={'xl'} isOpen={isLogOpen}>
                                        <ModalOverlay/>
                                        <ModalContent>
                                            <ModalHeader>Logistique</ModalHeader>
                                            <ModalCloseButton/>
                                            {sessionL === true ?
                                                <>
                                                    <ModalBody>
                                                        <form name={"logistica"} onSubmit={onSubmit}>
                                                            <FormLabel>ID</FormLabel>
                                                            <Input id={"contenedor"} placeholder='ID de conteneur'
                                                                   onChange={onChange} name={"id"} value={ID}/>
                                                            <FormLabel>Poids</FormLabel>
                                                            <Input id={"peso"} placeholder='Poids du conteneur'
                                                                   onChange={onChange} name={"peso"} value={peso}/>
                                                        </form>
                                                    </ModalBody>
                                                    <ModalFooter>
                                                        <ButtonGroup gap='1'>
                                                            <Button colorScheme='blue' onClick={onSubmit}
                                                                    name={"logistica"}>Accept</Button>
                                                            <Button colorScheme='red' onClick={onLogClose}>Close</Button>
                                                        </ButtonGroup>
                                                    </ModalFooter>
                                                </> : <>
                                                    <ModalBody>
                                                        <form className="form-inline" name={"loginL"} onSubmit={onSubmit}>
                                                            <div className="form-group">
                                                                <label htmlFor="inputPassword6">Password</label>
                                                                <input type="password" name={"passL"} id="inputPassword6"
                                                                       className="form-control mx-sm-3"
                                                                       aria-describedby="passwordHelpInline"
                                                                       onChange={onChange}
                                                                       value={passL}/>
                                                                <button className={"btn btn-primary"}>Login
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </ModalBody>
                                                </>}
                                        </ModalContent>
                                    </Modal>

                                    <Link to={'/controller'}>
                                        <Button fontSize='2xl'
                                                leftIcon={<RiAdminFill/>}
                                                w={'35vh'} h={'10vh'}
                                                p={4}
                                                color='white'
                                                fontWeight='bold'
                                                borderRadius='md'
                                                bgGradient='linear(to right, #4b79a1, #283e51)'

                                                _hover={{
                                                    bgGradient: 'linear(to-r, red.500, yellow.500)',
                                                }}
                                                variant={"solid"}>
                                            Contrôleur
                                        </Button>
                                    </Link>
                                </Stack>
                            </Center>
                        </Box>: null
                    }
                </Flex>
            </Center>
        </main>
    )
        ;
}

function search(Medicion, ID) {
    let x = false;
    for (let i = 0; i < Medicion.length; i++) {
        if (String(Medicion[i].id) === String(ID)) {
            console.log(Medicion[i]);
            x = true;
            console.log(x)
        }
    }
    return x;
}
