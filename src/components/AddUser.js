import { useState } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button, makeStyles, Typography, Select, MenuItem } from '@material-ui/core';

import { useHistory } from 'react-router-dom';

import { addUser } from '../service/api';


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

const AddUser = () => {
    const [user, setUser] = useState(initialValue);
    const { firstname, lastname, email, role } = user;
    const classes = useStyles();
    const history = useHistory();

    const onValueChange = (e) => {
        console.log(e.target.value);
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const addUserDetails = async () => {
        await addUser(user);
        history.push('./');
    }

    return (
        <FormGroup className={classes.container}  >
            <Typography variant="h4">Add User</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">FirstName</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='firstname' value={firstname} id="my-input" type="text" required />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">LastName</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='lastname' value={lastname} id="my-input" type="text" required />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Email</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='email' value={email} id="my-input" type="email" required />
            </FormControl>

            <FormControl>
                <InputLabel htmlFor="my-input">Role</InputLabel>

                <Select name="role" value={role} id="my-input" onChange={(e) => onValueChange(e)}>
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Designer">Designer</MenuItem>
                    <MenuItem value="Artist">Artist</MenuItem>
                    <MenuItem value="ArtManager">ArtManager</MenuItem>
                </Select>
            </FormControl>




            <FormControl>
                <Button variant="contained" color="primary" onClick={() => addUserDetails()} style={{ marginTop: 10 }}>Submit</Button>
            </FormControl>
        </FormGroup>
    )
}

export default AddUser;