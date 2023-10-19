import {
    Button,
    ButtonGroup,
    Center,
    FormLabel,
    Icon,
    Input,
    InputLeftAddon, InputRightAddon,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
    useDisclosure
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {createClient} from "@supabase/supabase-js";
import Row from "./row";
import {Form, Link} from "react-router-dom";
import {FaHome} from "react-icons/fa";
import {Field, Formik} from "formik";
import {EditIcon} from "@chakra-ui/icons";
import {InputGroup, Table} from "react-bootstrap";

const supabaseUrl = "https://caeqghefggsotenegpzt.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhZXFnaGVmZ2dzb3RlbmVncHp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODIzNjEzNDEsImV4cCI6MTk5NzkzNzM0MX0.CZ8e3D2Q8iGwixC8Hj1srZ8DvAs1UxkBLyvLVaZSvus";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Controller() {

    const [Medicion, setMedicion] = useState([]);
    const [session, setSession] = useState(false);
    const [pass, setPass] = useState("");
    const [numc, setNc] = useState("");
    const [ID, setId] = useState("");
    const [x, setX] = useState(false);
    const [esp, setEsp] = useState(true);
    const [eng, setEng] = useState(false);
    const [fr, setFr] = useState(false);
    const [filt, setFilt] = useState("");
    const [xid, setXID] = useState("");
    const {isOpen: isConOpen, onOpen: onConOpen, onClose: onConClose} = useDisclosure()

    const onSubmit = async (e) => {
        e.preventDefault();
        if (e.target.name === "login") {
            if (pass === "@%123") {
                setSession(true)
            } else {
                alert("Wrong Password")
            }
        } else if (e.target.name === 'update') {
            setX(search(Medicion, ID, x))
            if (x === true) {
                const {data, error} = await supabase
                    .from('mediciones')
                    .update({num_control: numc})
                    .eq('id', ID)
                alert("Numero de control añadido")
                setX(false)
            } else {
                alert("No se encontro el ID")
            }
        }
    }

    const onChange = async (e) => {
        if (e.target.name === "pass") {
            setPass(e.target.value)
        } else if (e.target.name === "numc") {
            setNc(e.target.value)
        } else if (e.target.name === "id") {
            setId(e.target.value)
        } else if (e.target.name === "IDD") {
            setXID(e.target.value)
        }
        else if (e.target.name === "filter") {
            setFilt(e.target.value)
            console.log(filt)
        }
    }

    async function getMed() {
        if (filt === "" && xid ==="") {
            const {data: mediciones, error} = await supabase
                .from('mediciones')
                .select('*')
                .order('id', { ascending: true })
            setMedicion(mediciones)
            console.log(Medicion, "todos")
        } else if (filt !== "" && xid === "") {
            const {data: mediciones, error} = await supabase
                .from('mediciones')
                .select('*')
                .eq('num_control', filt)
                .order('id', { ascending: true })
            setMedicion(mediciones)
            console.log("%" + filt + "%", "filtered NUM CONT")
        }else if (filt === "" && xid !== "") {
            const {data: mediciones, error} = await supabase
                .from('mediciones')
                .select('*')
                .eq('id', xid)
                .order('id', { ascending: true })
            setMedicion(mediciones)
            console.log("%" + filt + "%", "filtered ID")
        }
        else if (filt !== "" && xid !== "") {
            const {data: mediciones, error} = await supabase
                .from('mediciones')
                .select('*')
                .eq( 'id', xid)
                .eq( 'num_control', filt)
                .order('id', { ascending: true })
            setMedicion(mediciones)
            console.log("%" + filt + "%", "filtered ID")
        }
    }

    useEffect(() => {
        getMed()
    }, [filt, xid]);

    return (
        <>
            <ul className="nav justify-content-center">
                <li><Link to={'/'}> <Icon as={FaHome} w={10} h={10}/> Home</Link></li>
            </ul>
            <Center h={'100%'} bgGradient={'linear(to right, #2196f3, #f44336)'}>
                {esp === true ?
                    <div className={'w-75 p-3'}>
                        {session === true ?
                            <>
                                <Center>
                                    <Text
                                        bgGradient='linear(62deg, #FBAB7E 0%, #F7CE68 100%)'
                                        bgClip='text'
                                        fontSize='6xl'
                                        fontWeight='extrabold'
                                    >
                                        Controller
                                    </Text>
                                </Center>
                                <br/><br/><br/>
                                <Button leftIcon={<EditIcon/>}
                                        p={3}
                                        name={"asd"}
                                        color='white'
                                        fontWeight='bold'
                                        borderRadius='md'
                                        colorScheme='whiteAlpha'
                                        onSubmit={onSubmit}
                                        variant={"solid"}
                                        onClick={onConOpen}
                                >
                                    Actualizar
                                </Button>

                                <spacer type="horizontal" width="100" height="100"> ♢ </spacer>

                                <Input htmlSize={6} width='auto' id={"contenedor demo-helper-text-aligned"}
                                       placeholder='ID'
                                       onChange={onChange} name={"IDD"} value={xid} variant='filled'/>
                                <spacer type="horizontal" width="100" height="100"> ♢ </spacer>

                                <Input htmlSize={14} width='auto' id={"contenedor demo-helper-text-aligned"}
                                       placeholder='ID del contenedor'
                                       onChange={onChange} name={"filter"} value={filt} variant='filled'/>

                                <Modal onClose={onConClose} size={'xl'} isOpen={isConOpen}>
                                    <ModalOverlay/>
                                    <ModalContent>
                                        <ModalHeader>Agregar Numero de control</ModalHeader>
                                        <ModalCloseButton/>
                                        <ModalBody>
                                            <form>
                                                <FormLabel>ID</FormLabel>
                                                <Input id={"contenedor"} placeholder='ID del contenedor'
                                                       onChange={onChange} name={"id"} value={ID}/>
                                                <FormLabel>Numero de Control</FormLabel>
                                                <Input id={"peso"} placeholder='Numero de control'
                                                       onChange={onChange} name={"numc"} value={numc}/>
                                            </form>
                                        </ModalBody>

                                        <ModalFooter>
                                            <ButtonGroup gap='1'>
                                                <Button colorScheme='blue' name={"update"}
                                                        onClick={onSubmit}>Accept</Button>
                                                <Button colorScheme='red' onClick={onConClose}>Close</Button>
                                            </ButtonGroup>
                                        </ModalFooter>
                                    </ModalContent>
                                </Modal>

                                <Table responsive bordered hover>
                                    <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">PRODUCCION</th>
                                        <th scope="col">MANTENIIENTO</th>
                                        <th scope="col">Calidad
                                        </th>
                                        <th scope="col">LOGISTICS</th>
                                        <th scope="col">Tipo</th>
                                        <th scope="col">Diferencia</th>
                                        <th scope="col">Ult. Actualizacion</th>
                                        <th scope="col">Num Control</th>
                                    </tr>
                                    </thead>
                                    <tbody className="table-light">
                                    {Medicion === null ?
                                        <>
                                            <td className={"id"}></td>
                                            <td className={"Produccion"}></td>
                                            <td className={"Mantenimiento"}></td>
                                            <td className={"Logistica"}></td>
                                            <td></td>
                                            <td> No hay registros</td>
                                            <td className={"Tipo"}></td>
                                            <td></td>
                                            <td></td>
                                        </> :
                                        <>
                                            {Medicion.map((med) => {
                                                return <Row key={med.id} medicion={med}/>;
                                            })}

                                        </>
                                    }
                                    </tbody>
                                </Table>
                            </> : <>
                                <Center>
                                    <div className="card" style={{width: 600}}>
                                        <form className="form-inline" name={"login"} onSubmit={onSubmit}>
                                            <div className="form-group">
                                                <label htmlFor="inputPassword6">Password</label>
                                                <input type="password" name={"pass"} id="inputPassword6"
                                                       className="form-control mx-sm-3"
                                                       aria-describedby="passwordHelpInline" onChange={onChange}
                                                       value={pass}/>
                                                <button className={"btn btn-primary"}>Login
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </Center>
                            </>
                        }
                    </div> : null}
                {eng === true ?
                    <>
                        <div className={'w-75 p-3'}>
                            {session === true ?
                                <>
                                    <Center>
                                        <Text
                                            bgGradient='linear(62deg, #FBAB7E 0%, #F7CE68 100%)'
                                            bgClip='text'
                                            fontSize='6xl'
                                            fontWeight='extrabold'
                                        >
                                            Controller
                                        </Text>
                                    </Center>
                                    <br/><br/><br/>
                                    <Button leftIcon={<EditIcon/>}
                                            p={3}
                                            name={"asd"}
                                            color='white'
                                            fontWeight='bold'
                                            borderRadius='md'
                                            colorScheme='whiteAlpha'
                                            onSubmit={onSubmit}
                                            variant={"solid"}
                                            onClick={onConOpen}
                                    >
                                        Update
                                    </Button>
                                    <Modal onClose={onConClose} size={'xl'} isOpen={isConOpen}>
                                        <ModalOverlay/>
                                        <ModalContent>
                                            <ModalHeader>Agregar Numero de control</ModalHeader>
                                            <ModalCloseButton/>
                                            <ModalBody>
                                                <form>
                                                    <FormLabel>ID</FormLabel>
                                                    <Input id={"contenedor"} placeholder='ID del contenedor'
                                                           onChange={onChange} name={"id"} value={ID}/>
                                                    <FormLabel>Numero de Control</FormLabel>
                                                    <Input id={"peso"} placeholder='Numero de control'
                                                           onChange={onChange} name={"numc"} value={numc}/>
                                                </form>
                                            </ModalBody>

                                            <ModalFooter>
                                                <ButtonGroup gap='1'>
                                                    <Button colorScheme='blue' name={"update"}
                                                            onClick={onSubmit}>Accept</Button>
                                                    <Button colorScheme='red' onClick={onConClose}>Close</Button>
                                                </ButtonGroup>
                                            </ModalFooter>
                                        </ModalContent>
                                    </Modal>

                                    <Table responsive bordered hover>
                                        <thead className="thead-dark">
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">PRODUCTION</th>
                                            <th scope="col">MAINTENANCE</th>
                                            <th scope="col">LOGISTICS</th>
                                            <th scope="col">Type</th>
                                            <th scope="col">Difference</th>
                                            <th scope="col">Creation Date</th>
                                            <th scope="col">Control Number</th>
                                        </tr>
                                        </thead>
                                        <tbody className="table-light">
                                        {
                                            Medicion.map((med) => {
                                                return <Row key={med} medicion={med}/>;
                                            })}
                                        </tbody>
                                    </Table>
                                </> : <>
                                    <Center>
                                        <div className="card" style={{width: 600}}>
                                            <form className="form-inline" name={"login"} onSubmit={onSubmit}>
                                                <div className="form-group">
                                                    <label htmlFor="inputPassword6">Password</label>
                                                    <input type="password" name={"pass"} id="inputPassword6"
                                                           className="form-control mx-sm-3"
                                                           aria-describedby="passwordHelpInline" onChange={onChange}
                                                           value={pass}/>
                                                    <button className={"btn btn-primary"}>Login
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </Center>
                                </>
                            }
                        </div>
                    </> : null
                }
            </Center>
        </>
    );
}

function search(Medicion, ID, x) {
    for (let i = 0; i < Medicion.length; i++) {
        console.log(typeof (ID), typeof (Medicion[i].id));
        if (String(Medicion[i].id) === String(ID)) {
            console.log(Medicion[i]);
            x = true;
        }
    }
    return x;
}

