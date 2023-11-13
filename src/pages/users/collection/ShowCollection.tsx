import { Container, List } from "@mui/material"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCollection } from "../../../utils/api/users/collections";

const ShowCollection = () => {
    const { id } = useParams();
    const [data, setData] = useState({});

    const fetchCollection = async () => {
        const data = await getCollection(Number(id));
        setData(data);
    }

    useEffect(() => {
        fetchCollection();
        console.log(data)
    },[data])

    return (
        <Container>

        </Container>
    )
}

export default ShowCollection;