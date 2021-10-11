import { useState, useEffect } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button, makeStyles, Typography, Select } from '@material-ui/core';

import { useHistory, useParams } from 'react-router-dom';

import { editUser, getUsers } from '../service/api';

const initialValue = {
    firstname: '',
    lastname: '',
    email: '',
    role: ''
}

const useStyles = makeStyles({
    container: {
        width: '50%',
        margin: '5% 0 0 25%',
        '& > *': {
            marginTop: 20
        }
    }
})

const EditUser = () => {
    const [user, setUser] = useState(initialValue);
    const { firstname, lastname, email, role } = user;
    const { id } = useParams();
    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        const response = await getUsers(id);
        setUser(response.data)
    }

    const onValueChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const editUserDetails = async () => {
        await editUser(id, user);
        history.push('/');
    }

    return (
        <FormGroup className={classes.container}>
            <Typography variant="h4">Edit User</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">FirstName</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='firstname' value={firstname} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">LastName</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='lastname' value={lastname} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Email</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='email' value={email} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Role</InputLabel>

                <Select name="role" value={role} id="my-input" onChange={(e) => onValueChange(e)}>
                    <option value="All">All</option>
                    <option value="Designer">Designer</option>
                    <option value="Artist">Artist</option>
                    <option value="ArtManager">ArtManager</option>
                </Select>
            </FormControl>
            <FormControl>
                <Button variant="contained" color="primary" onClick={() => editUserDetails()} style={{ marginTop: 10 }}>Update</Button>
            </FormControl>
        </FormGroup>
    )
}

export default EditUser;