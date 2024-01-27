import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row';

const MainScreen = ({title,children}) => {
  return (
    <div className='mainBack'>
        <Container className='flex m:20'>
            <Row>
                <div className='page'>
                    {
                        title && <>
                            <h1 className='heading'>{title}</h1>
                            <hr></hr>
                        </>
                    }
                    {children}
                </div>
            </Row>
        </Container>
    </div>
  )
}

export default MainScreen