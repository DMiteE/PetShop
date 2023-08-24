import React, { useEffect } from 'react';
import { useContext,useState } from 'react';
import { Context } from '..';
import { DeleteOutlined } from '@ant-design/icons';
import { getBasket , deleteFromBasket} from '../http/deviceAPI';
import { Button, Card, Col, Container, FormControl, Row, Form } from 'react-bootstrap'
import { observer } from 'mobx-react-lite';
import axios from 'axios';

//import close from '../assets/close.svg'

const Basket = observer(() => {
    const {device} = useContext(Context)
    useEffect(() => {
        getBasket().then(data => device.setBaskets(data))
    }, [])
    let productName;
    const TOKEN = "6112289360:AAFmj8qe0R9fmO2InO0Yw19__rqTd3H4ncU",
      CHAT_ID = "-1001705979712",
      URI_API = `https://api.telegram.org/bot${ TOKEN }/sendMessage`;
      const [namePerson, setnamePerson] = useState('')
      const [twelvename, settwelvename] = useState('')
      const [phone, setphone] = useState('')
      const [adress, setadress] = useState('')
      const [index, setindex] = useState('')
      const [count, setCount] = useState(1);
      const [id, setID] = useState();
      let message = ''
     
    // ----- Считаем общую сумму, которую юзер набрал в корзину ------- //
    let prices = 0;
    let productnames = []
    let prodcutcount = []
    {device.basket.map(price =>
        prices += Number(price.device.price * price.device.count)
    )}
    {device.basket.map(product =>
        productnames.push(product.device.name +" в кооличестве "+product.device.count+ " штук")
    )}
    {device.basket.map(product =>
        prodcutcount.push(product.device.count)
    )}
    const post =  async () =>{
        message = `<b>Заказ с сайта</b>\n`;
        message += `<b>Имя: </b>${namePerson}\n`;
        message += `<b>Фамилия: </b>${twelvename}\n`;
        message += `<b>Номер: </b>${phone}\n`;
        message += `<b>Адрес: </b>${adress}\n`;
        message += `<b>Почтовый индекс: </b>${index}\n`;
        message += `<b>Товары: </b>${productnames} (${prodcutcount}) \n `;
        message += `<b>На сумму: </b>${prices}\n`;
        axios.post(URI_API,{
           chat_id: CHAT_ID,
           parse_mode: 'html',
           text: message
        })
    }
    const refreshPage = ()=>{
      window.location.reload();
  }
    const _delete = (id) => {
      deleteFromBasket(id).then(response => alert(`Товар удален`)).then(response => refreshPage())

  }

    const onClickPlus = (id) =>{
        setCount(device.basket.map(product =>{
            if(product.id === id){
                product.device.count++;
               console.log(product.id)
            }

        }))
        
        console.log(count)
    }
    const onClickMinus = (id) =>{
      setCount(device.basket.map(product =>{
          if(product.id === id){
              product.device.count--;
             console.log(product.device.count)
             if( product.device.count < 1){
              product.device.count++
             }
          }

      }))
      
      console.log(count)
  }
   
    return (
        <Container
            className="d-flex flex-sm-column justify-content-center align-items-center mt-3"
        >
            <h1 className="pb-2">Корзина</h1>



            {/* ------- Считаем общую сумму ------- */}

            <Card className="d-flex flex-row  p-2 justify-content-between align-items-center mb-2">
                <h1 className="pr-2">Итого:</h1>
                <h3 className="pl-2">{prices}<span className="font-weight-light pl-2">рублей</span></h3>
            </Card>



            {device.basket.map((product, index) =>(
                <Card className="d-flex w-100 p-2 justify-content-center mb-2" key={product.id}>
                    <Row className="d-flex w-100">
                      <div>
                      <DeleteOutlined onClick={() => _delete(product.id)} className="d-flex ml-4 h-100 flex-row justify-content-start align-items-center" />
                      </div>
                     
                    
                    
                        <Col>
                            <div className="d-flex flex-row align-items-center">
                                <img src={process.env.REACT_APP_API_URL + product.device.img} width={50} />
                                <h1 className="pl-3">{product.device.name}</h1>
                            </div>
                        </Col>
                        
                        <Col>
                            <div className="d-flex h-100 flex-row justify-content-end align-items-center">
                                <h2 className="font-weight-light">{product.device.price} рублей</h2>
                            </div>
                        </Col>
                        <Col>
                        <div  className="d-flex h-100 flex-row justify-content-end align-items-center">
                        <Button className="btn-warning" type="submit" onClick={() => onClickMinus(product.id)}>-</Button>
                             <h3 style={{margin: 5 + 'px'}} key={product.id} >{product.device.count}</h3>
                           
                             <Button className="btn-warning" key={product.id} type="submit" onClick={() => onClickPlus(product.id)}>+</Button>
                         </div>
                        </Col>
                
                    </Row>

                </Card>
        
          
                
                ))}

            
    <Form >
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Имя</Form.Label>
          <Form.Control
            required
            type="text"
            value={namePerson}
            placeholder="Иван"
            defaultValue=""
            onChange={e => setnamePerson(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Фамилия</Form.Label>
          <Form.Control
            required
            type="text"
            value={twelvename}
            placeholder="Иванов"
            defaultValue=""
            onChange={e => settwelvename(e.target.value)}
          />
          <Form.Control.Feedback>Телефон</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label>Телефон</Form.Label>
            <Form.Control
              type="text"
              placeholder="89009999999"
              value={phone}
              aria-describedby="inputGroupPrepend"
              required
              onChange={e => setphone(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>Город,дом,квартира</Form.Label>
          <Form.Control type="text" placeholder="Город" value={adress} 
                  onChange={e => setadress(e.target.value)}
                  required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom05">
          <Form.Label>Почтовый индекс</Form.Label>
          <Form.Control type="text" placeholder="398000" value={index}       
            onChange={e => setindex(e.target.value)} required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid zip.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Button className="btn-warning" type="submit" onClick={post}>Заказать</Button>
    </Form>
    
        </Container>
    );
});

export default Basket;
