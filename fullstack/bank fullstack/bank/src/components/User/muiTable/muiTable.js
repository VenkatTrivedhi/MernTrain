import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import dateFormat from 'dateformat';
import { Chip } from '@mui/material';

export default function SpanningTable(props) {
    let rows = props.transactions
    const balance = props.balance
    console.log()
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                <TableHead>

                    <TableRow>
                        <TableCell>time</TableCell>
                        <TableCell align="left">status</TableCell>
                        <TableCell align="left">type</TableCell>
                        <TableCell align="left">effect</TableCell>
                        <TableCell align="left">amount</TableCell>
                        <TableCell align="left">from</TableCell>
                        <TableCell align="left">to</TableCell>
                        <TableCell align="left">balance</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{dateFormat(row.doneAt)}</TableCell>
                            <TableCell align="left">
                                {row.isSuccess?
                                <Chip label="done" color='success'/>:
                                <Chip label="failed" color='error'/>}
                            </TableCell>
                            <TableCell align="left">{row.type}</TableCell>
                            <TableCell align="left">
                                {row.effect==="credit"?
                                <Chip label={row.effect} color='success' variant='outlined'/>:
                                <Chip label={row.effect} color='error'variant='outlined'/>}
                            </TableCell>
                            <TableCell align="left">{row.amount}</TableCell>
                            <TableCell align="left">
                                {row.type=="transfer"?
                                row.effect==="credit"?row.counterCustomer.name:"--":
                                "--"}
                            </TableCell>
                            <TableCell align="left">
                                {row.type=="transfer"?
                                row.effect==="debit"?row.counterCustomer.name:"--":
                                "--"}
                            </TableCell>
                            <TableCell align="left">{row.balanceAfterTransaction}</TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell rowSpan={1} />
                        <TableCell colSpan={1} id="balance">Balance :</TableCell>
                        <TableCell align="left" id="balance">Rs.  {balance}</TableCell>
                    </TableRow>


                </TableBody>
            </Table>
        </TableContainer>
    );
}
