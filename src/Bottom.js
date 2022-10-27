import { Avatar } from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';
import React from "react";
import { Link } from "react-router-dom";


export default function Bottom() {
    return (
        <>
            <Avatar>
                <Link to="https://github.com/johann017">
                    <FolderIcon/>
                </Link>
            </Avatar>
        </>
    )
}