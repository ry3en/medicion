const Row = ({medicion}) => {
    let date = new Date(medicion.created_at);
    return (
        <>
            <tr>
                <td className={"id"}>{medicion.id}</td>
                <td className={"Produccion"}>{medicion.Produccion} Kg</td>
                <td className={"Mantenimiento"}>{medicion.mantenimiento} Kg</td>
                <td className={"Logistica"}>{medicion.logistica} Kg</td>
                <td className={"Tipo"}>{medicion.tipo}</td>
                {medicion.mantenimiento === null ?
                    <>
                        <td>N/A</td>
                        {medicion.logistica === null ?
                            <>
                                <td> -- %</td>

                            </> :
                            <>
                                <td>{(Math.abs((medicion.Produccion - medicion.logistica) / ((medicion.Produccion + medicion.logistica) / 2)) * 100).toFixed(2)} %</td>

                            </>}
                    </> :
                    <>
                        {medicion.logistica === null ?
                            <>
                                <td> -- %</td>

                            </> :
                            <>
                                <td>{(Math.abs((medicion.mantenimiento - medicion.logistica) / ((medicion.mantenimiento + medicion.logistica) / 2)) * 100).toFixed(2)} %</td>
                            </>}
                        <td>N/A %</td>
                    </>
                }

                <td>{date.toLocaleDateString()}</td>
                <td>{medicion.num_control}</td>
            </tr>
        </>
    )
};
export default Row;