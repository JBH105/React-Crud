import { useState, useEffect } from 'react';
import { Table, TableHead, TableCell, TableRow, TableBody, Button, makeStyles, Input, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { getUsers, deleteUser } from "../service/api"
import { Link } from 'react-router-dom';
const useStyles = makeStyles({
    table: {
        width: '90%',
        margin: '50px 0 0 50px'
    },
    thead: {
        '& > *': {
            fontSize: 20,
            background: '#000000',
            color: '#FFFFFF'
        }
    },
    row: {
        '& > *': {
            fontSize: 18
        }
    }
})


const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const classes = useStyles();
    // console.log("user  is", users)
    useEffect(() => {
        getAllUsers();
    }, []);

    const deleteUserData = async (id) => {
        await deleteUser(id);
        getAllUsers();
    }

    const getAllUsers = async () => {
        const response = await getUsers();
        setUsers(response.data);

    }


    const [searchTerm, setSearchTerm] = useState("")
    const [dropTerm, setDropTerm] = useState("")


    return (
        <>

            <FormControl style={{ width: "10%", marginLeft: 250 }} >
                <InputLabel htmlFor="my-input">Role</InputLabel>

                <Select name="role" id="my-input" onChange={(event) => {
                    setDropTerm(event.target.value)
                }}>
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Designer">Designer</MenuItem>
                    <MenuItem value="Artist">Artist</MenuItem>
                    <MenuItem value="ArtManager">ArtManager</MenuItem>
                </Select>
            </FormControl>



            <Input style={{ marginTop: 10, marginLeft: 550 }} placeholder="Search......" name="search" onChange={(event) => {
                setSearchTerm(event.target.value);
            }}
            />


            <Table className={classes.table}>
                <TableHead>
                    <TableRow className={classes.thead}>
                        {/* <TableCell>Id</TableCell> */}
                        <TableCell>FirstName</TableCell>
                        <TableCell>LastName</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>
                            <Button color="primary" variant="contained" component={Link} to={`/add`} style={{ marginTop: 10 }}>add User</Button>
                        </TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>




                    {users.filter((user) => {

                        if (searchTerm === "" && dropTerm === "") {
                            return user
                        } else if (user.role.toLowerCase().includes(dropTerm.toLowerCase()) && (
                            (user.firstname.toLowerCase().includes(searchTerm.toLowerCase())) ||
                            (user.lastname.toLowerCase().includes(searchTerm.toLowerCase())) ||
                            (user.email.toLowerCase().includes(searchTerm.toLowerCase())))) {
                            return user
                        }
                    }   
                    ).map((user, key) => {
                        return (
                            <TableRow className={classes.row} key={user._id}>
                                {/* <TableCell>{user._id}</TableCell> change it to user.id to use JSON Server */}
                                <TableCell>{user.firstname}</TableCell>
                                <TableCell>{user.lastname}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell></TableCell>

                                <TableCell>
                                    <Button variant="contained" color="primary" style={{ marginRight: 10 }} component={Link} to={`/edit/${user._id}`}>Edit</Button>

                                    <Button variant="contained" color="secondary" onClick={() => {
                                        const confirmBox = window.confirm(
                                            "Do you really want to delete " + user.firstname
                                        )
                                        if (confirmBox === true) {
                                            deleteUserData(user._id)
                                        }
                                    }} >Delete</Button>
                                </TableCell>


                            </TableRow>
                        )
                    })}




                </TableBody>
            </Table>
        </>
    )
}

export default AllUsers;