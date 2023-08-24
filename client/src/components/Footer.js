import React, {useContext} from 'react';
import {Context} from "../index";
import Nav from "react-bootstrap/Nav";
import {NavLink} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import Container from "react-bootstrap/Container";
const Footer = () => {
    return (
            <Container fluid style={{backgroundColor: '#212529', color: '#fff'}}>
            <Container style={{display: 'flex', justifyContent: 'center', padding: '10px', flex:'0 0 auto'}}>
            <p>Магазин пушистик</p>
            <React.Fragment><br/></React.Fragment>
            <p>Время работы: <strong>9ч до 18ч</strong></p>
            </Container>
            </Container>
    )
};

export default Footer;
